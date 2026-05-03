import Note from "../models/note.model.js";
import Chat from "../models/chat.model.js"; // NEW
import { askQuestion } from "../config/ai.js";

export const askFromNotes = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    // 🔥 Step 1: user notes fetch
    const notes = await Note.find({ user: req.user.id });

    // 🔥 Step 2: combine notes safely
    const context = notes.map((note) => note.extractedText || "").join("\n");

    console.log("QUESTION:", question);
    console.log("CONTEXT LENGTH:", context.length);

    let answer;

    // 🔥 Step 3: HYBRID LOGIC (SAFE)
    if (!context || context.trim().length < 50) {
      // 👉 No notes → normal AI
      answer = await askQuestion("", question);
    } else {
      // 👉 Notes exist → smart prompt
      const smartPrompt = `
You are a helpful AI assistant.

1. Try to answer using the user's notes.
2. If notes do not contain the answer, answer normally.

Notes:
${context}

Question:
${question}

Answer:
`;

      answer = await askQuestion(smartPrompt, question);
    }

    // 🔥 Step 4: SAVE CHAT (NEW - SAFE)
    try {
      await Chat.create({
        user: req.user.id,
        question,
        answer,
      });
    } catch (err) {
      console.log("Chat save error:", err.message);
      // ❌ agar save fail ho bhi jaye to response rukna nahi chahiye
    }

    // 🔥 Step 5: response
    res.json({
      question,
      answer,
    });
  } catch (error) {
    console.log("AI Q&A error:", error.message);
    res.status(500).json({ error: "AI error" });
  }
};
