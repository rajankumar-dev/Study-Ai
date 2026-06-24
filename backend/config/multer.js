import multer from "multer";
import fs from "fs";
import path from "path";

// Create folders if they don't exist
const pdfDir = "uploads/pdfs";
const imageDir = "uploads/images";

if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, pdfDir);
    } else {
      cb(null, imageDir);
    }
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");

    cb(null, uniqueName);
  },
});

// File filter using pdf
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and Images allowed"), false);
  }
  console.log("FILE:", req.file);
  console.log("FILE PATH:", req.file?.path);
  console.log("EXISTS:", fs.existsSync(req.file?.path));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
