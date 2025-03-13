const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({ origin: "*", credentials: true }));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); 
  }
};
connectDB();

const conn = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "uploads" });
  console.log("✅ GridFS initialized");
});

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: `${req.params.campaignId}_${file.originalname}`, 
      bucketName: "uploads",
      metadata: { campaignId: req.params.campaignId },
    };
  },
});

const upload = multer({ storage });

app.post("/upload/:campaignId", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "File upload failed" });
  }

  console.log("✅ File uploaded:", req.file.filename);
  res.status(200).json({ success: true, file: req.file, message: "File Uploaded Successfully" });
});

app.get("/files/:campaignId", async (req, res) => {
  const { campaignId } = req.params;

  if (!gfs) {
    return res.status(500).json({ message: "GridFS is not initialized" });
  }

  try {
    const files = await gfs
      .find({ "metadata.campaignId": campaignId })
      .toArray();

    if (!files.length) {
      return res.status(404).json({ message: "No files found for this campaign" });
    }

    res.json(files);
  } catch (error) {
    console.error("❌ Error fetching files:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/file/:id", async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    if (!gfs) {
      return res.status(500).json({ message: "GridFS is not initialized" });
    }

    const files = await gfs.find({ _id: fileId }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    res.set("Content-Type", files[0].contentType);
    res.set("Content-Disposition", `attachment; filename="${files[0].filename}"`);

    gfs.openDownloadStream(fileId).pipe(res);
  } catch (error) {
    console.error("❌ Error fetching file:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Auth Service running on port ${PORT}`);
});
