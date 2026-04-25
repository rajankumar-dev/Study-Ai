import Note from "../models/note.model.js";
import { askQuestion } from "../config/ai.js";

export const askFromNotes = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    // user all notes
    const notes = await Note.find({ user: req.user.id });

    // combine all user notes
    const context = notes.map((note) => note.extractedText).join("\n");

    // AI call
    const answer = await askQuestion(context, question);

    res.json({
      question,
      answer,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
