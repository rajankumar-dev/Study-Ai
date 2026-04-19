import express from "express";
const router = express.Router();
import upload from "../config/multer.js";
import authMiddleware from "../middlewares/auth.middleware.js";

// Single file upload
router.post("/upload", authMiddleware, upload.single("file"), (req, res) => {
  try {
    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
