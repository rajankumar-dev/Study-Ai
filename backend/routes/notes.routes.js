import express from "express";
import {
  createNote,
  getNotes,
  deleteNote,
} from "../controllers/notes.controller.js";

import protect from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.delete("/:id", protect, deleteNote);

export default router;
