import express from "express";
import {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
  getNoteById,
  toggleFavorite,
} from "../controllers/notes.controller.js";

import protect from "../middlewares/auth.middleware.js";
import upload from "../config/multer.js";

const router = express.Router();

// CREATE NOTE
router.post("/", protect, upload.single("file"), createNote);

// GET ALL NOTES
router.get("/", protect, getNotes);

// FAVORITE ROUTE
router.put("/favorite/:id", protect, toggleFavorite);

// GET SINGLE NOTE
router.get("/:id", protect, getNoteById);

// UPDATE NOTE
router.put("/:id", protect, updateNote);

// DELETE NOTE
router.delete("/:id", protect, deleteNote);

export default router;
