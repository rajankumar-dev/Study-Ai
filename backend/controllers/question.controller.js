import Groq from "groq-sdk";

// Lazy init function
const getClient = () => {
  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  console.log(process.env.GROQ_API_KEY);
};

export const generateQuestions = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Text is required",
      });
    }

    const completion = await Groq.chat.completion.create({
      messages: [
        {
          role: "system",
          content:
            "Generate 10 important study questions from the provided notes.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      model: "llama3-8b-8192",
    });

    const questions = completion.choices[0]?.message?.content;

    res.status(200).json({
      questions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
