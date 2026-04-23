import express from "express";
import {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
  getNoteById,
} from "../controllers/notes.controller.js";
import upload from "../config/multer.js";
import protect from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/", protect, upload.single("file"), createNote);
router.get("/", protect, getNotes);
router.get("/:id", protect, getNoteById);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

export default router;
