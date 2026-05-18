// Code comment bcz my openAi free credit is finished

// import OpenAI from "openai";
// const getClient = () => {
//   return new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
// };

// export default getClient;

// export const generateSummary = async (text) => {
//   try {
//     const client = getClient();

//     const response = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content: "You summarize notes in simple bullet points.",
//         },
//         {
//           role: "user",
//           content: text,
//         },
//       ],
//     });

//     return response.choices[0].message.content;
//   } catch (error) {
//     console.log("AI error:", error.message);
//     return "";
//   }
// };

// We are using groq-ai free ai summary extracter
import Groq from "groq-sdk";

// ✅ Lazy client init
const getClient = () => {
  console.log("GROQ KEY:", process.env.GROQ_API_KEY ? "Loaded" : "Missing");

  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
};

// ✅ SUMMARY FUNCTION
export const generateSummary = async (text) => {
  try {
    const client = getClient();

    // safety check
    if (!text || text.trim() === "") {
      return "No content to summarize";
    }

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You summarize study notes into short and easy bullet points.",
        },
        {
          role: "user",
          content: `
Summarize this content into 3-5 short bullet points.

ONLY return bullet points.

CONTENT:
${text}
          `,
        },
      ],

      temperature: 0.5,
      max_tokens: 500,
    });

    const result = response?.choices?.[0]?.message?.content;

    return result || "Summary not generated";
  } catch (error) {
    console.log("SUMMARY ERROR:", error);

    return "Summary not available";
  }
};

// ✅ ASK AI FUNCTION
export const askQuestion = async (context, question) => {
  try {
    const client = getClient();

    const hasNotes = context && context.trim().length > 50;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are StudyAI assistant.

Rules:
- If notes are provided, prioritize notes.
- If answer is not available in notes, answer using general knowledge.
- Never say "No notes available".
- Give clean, student-friendly answers.
- Keep answers clear and concise.
          `,
        },

        {
          role: "user",
          content: hasNotes
            ? `
NOTES:
${context}

QUESTION:
${question}

Answer the question using notes if relevant.
If notes do not contain the answer, answer normally.
`
            : `
QUESTION:
${question}

Answer normally.
`,
        },
      ],

      temperature: 0.6,
      max_tokens: 800,
    });

    console.log("QUESTION:", question);
    console.log("CONTEXT LENGTH:", context?.length || 0);

    return response?.choices?.[0]?.message?.content || "No answer generated";
  } catch (error) {
    console.log("AI Q&A ERROR:", error);

    return "Error getting answer";
  }
};
