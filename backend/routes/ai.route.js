import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { askFromNotes } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/ask", protect, askFromNotes);

export default router;
