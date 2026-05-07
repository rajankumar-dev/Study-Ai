import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { askFromNotes } from "../controllers/ai.controller.js";

// NEW IMPORT
import { generateSummary } from "../config/ai.js";

const router = express.Router();

// EXISTING
router.post("/ask", protect, askFromNotes);

//  ADD THIS (SUMMARY ROUTE)
router.post("/summary", protect, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const summary = await generateSummary(text);

    res.status(200).json({ summary });
  } catch (error) {
    console.error("Summary Error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
