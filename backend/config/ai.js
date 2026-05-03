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

// Lazy init function
const getClient = () => {
  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  console.log(process.env.GROQ_API_KEY);
};

// Summary function
export const generateSummary = async (text) => {
  try {
    const client = getClient();

    // safety check
    if (!text || text.trim() === "") {
      return "No content to summarize";
    }

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are an AI that summarizes text.",
        },
        {
          role: "user",
          content: `Summarize the following content in 3-5 SHORT bullet points.
ONLY return bullet points. No extra text.

${text}`,
        },
      ],
      temperature: 0.5,
    });

    const result = response?.choices?.[0]?.message?.content;

    return result || "Summary not generated";
  } catch (error) {
    console.log("Groq error:", error.message);
    return "Summary not available";
  }
};

export const askQuestion = async (context, question) => {
  try {
    const client = getClient();

    // 🔥 smart fallback
    const hasNotes = context && context.trim().length > 50;

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are a helpful AI assistant.

- If notes are provided, try to answer from them.
- If the answer is NOT in notes, answer normally using your knowledge.
- Never say "No notes available".
- Give clear and helpful answers.
          `,
        },
        {
          role: "user",
          content: hasNotes
            ? `
Use the notes if relevant.

NOTES:
"""${context}"""

QUESTION:
${question}

If answer is not in notes, answer normally.
            `
            : `
Answer this question normally:

${question}
            `,
        },
      ],
      temperature: 0.5,
    });

    console.log("QUESTION:", question);
    console.log("CONTEXT LENGTH:", context?.length || 0);

    return response?.choices?.[0]?.message?.content || "No answer generated";
  } catch (error) {
    console.log("AI Q&A error:", error.message);
    return "Error getting answer";
  }
};
