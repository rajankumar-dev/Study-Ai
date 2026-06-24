import express from "express";
const router = express.Router();

import upload from "../config/multer.js";
import authMiddleware from "../middlewares/auth.middleware.js";

import fs from "fs";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs"; // ✅ correct import
import Note from "../models/note.model.js";

// 🔥 TEXT EXTRACTION FUNCTION
const extractText = async (filePath, mimetype) => {
  try {
    // ✅ PDF
    if (mimetype === "application/pdf") {
      const data = new Uint8Array(fs.readFileSync(filePath));

      const pdf = await getDocument({ data }).promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        const strings = content.items.map((item) => item.str);
        text += strings.join(" ") + "\n";
      }

      return text;
    }

    // ✅ TXT
    if (mimetype === "text/plain") {
      return fs.readFileSync(filePath, "utf-8");
    }

    return "";
  } catch (err) {
    console.error("Text Extraction Error:", err);
    return "";
  }
};

// 🚀 UPLOAD ROUTE
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      const file = req.file;

      // No file
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Only PDF & TXT allowed
      if (
        file.mimetype !== "application/pdf" &&
        file.mimetype !== "text/plain"
      ) {
        return res.status(400).json({
          message: "Only PDF and TXT files are allowed",
        });
      }

      // Extract text
      const extractedText = await extractText(file.path, file.mimetype);

      if (!extractedText || extractedText.trim().length === 0) {
        return res.status(400).json({
          message: "No readable text found in file",
        });
      }

      //Create note
      const note = await Note.create({
        user: req.user.id,
        title: file.originalname,
        content: extractedText,
      });

      //Response
      res.status(200).json({
        message: "File uploaded & note created successfully",
        noteId: note._id,
        title: note.title,
      });
    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({ message: error.message });
    }
  },
);

export default router;
