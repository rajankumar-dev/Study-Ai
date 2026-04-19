import multer from "multer";

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, "uploads/pdfs");
    } else {
      cb(null, "uploads/images");
    }
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// File filter (important for validation)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and Images allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
