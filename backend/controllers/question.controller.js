import Groq from "groq-sdk";
import Note from "../models/note.model.js";

const getClient = () => {
  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
};

export const generateQuestions = async (req, res) => {
  try {
    const { text, noteId } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Text is required",
      });
    }

    const groq = getClient();

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Generate 10 important study questions from the provided notes. Return only numbered questions.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 700,
    });

    const questions =
      completion.choices?.[0]?.message?.content || "No questions generated";

    // Save in DB
    if (noteId) {
      await Note.findByIdAndUpdate(noteId, {
        questions,
      });
    }

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    console.log("QUESTION GENERATION ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Question generation failed",
    });
  }
};
