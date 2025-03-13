const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  budget: { type: String, required: true },
  targetAudience: {
    age: { type: String, required: true },
    location: { type: String, required: true },
    interests: { type: [String], required: true }
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["active", "paused", "completed"],
    required: true
  }
}, { timestamps: true });

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
