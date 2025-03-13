import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { errorToast, successToast } from "@/utils/UIUtilities/toaster";
import { PrinterIcon, XMarkIcon } from "@heroicons/react/24/solid";

export function InvoiceModal({ invoiceopen, handleInvoiceOpen, invoicedata }) {
  const [file, setFile] = useState(null);
  const [allfiles, setAllFiles] = useState([]);

  useEffect(() => {
    if (!invoiceopen || !invoicedata?._id) return;

    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_GATEWAY}/files/${invoicedata._id}`
        );

        if (response.status === 200) {
          setAllFiles(response.data);
          console.log("📂 Files fetched:", response.data);
        }
      } catch (error) {
        console.error("❌ Error fetching files:", error.response?.data || error.message);
        setAllFiles([]); 
      }
    };

    fetchFiles();
  }, [invoiceopen, invoicedata]);

  const handleFileChange = useCallback((event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    console.log("📂 File selected:", selectedFile);
  }, []);

  const handleUpload = useCallback(async () => {
    try {
      if (!file) {
        errorToast("Please select a file");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      console.log("🚀 Uploading file:", file.name);

      const response = await axios.post(
        `${import.meta.env.VITE_API_GATEWAY}/upload/${invoicedata._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        successToast(response.data.message);
        setFile(null);
        setAllFiles((prevFiles) => [...prevFiles, response.data.file]); 
      } else {
        errorToast("Upload failed");
      }
    } catch (error) {
      console.error("❌ Error uploading file:", error.response?.data || error.message);
      errorToast("Upload failed");
    }
  }, [file, invoicedata]);

  return (
    <Dialog open={invoiceopen} size="lg" handler={handleInvoiceOpen} className="max-h-screen">
      <DialogBody className="max-h-[80vh] w-full overflow-y-auto">
        <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
          <input
            type="file"
            accept="image/*, application/pdf"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />

          {allfiles.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Uploaded Files:</h3>
              <ul className="list-disc pl-5 mt-2">
                {allfiles.map((file) => (
                  <li key={file._id}>
                    <a
                      href={`${import.meta.env.VITE_API_GATEWAY}/file/${file._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {file.filename}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-between">
        <Button variant="text" onClick={handleInvoiceOpen} className="flex items-center gap-1 text-red-500">
          <XMarkIcon className="h-4 w-4" /> Close
        </Button>
        <Button variant="gradient" onClick={handleUpload} className="flex items-center gap-1">
         Upload
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

InvoiceModal.propTypes = {
  invoiceopen: PropTypes.bool,
  handleInvoiceOpen: PropTypes.func,
  invoicedata: PropTypes.object,
};

InvoiceModal.defaultProps = {
  invoiceopen: false,
};

export default InvoiceModal;
