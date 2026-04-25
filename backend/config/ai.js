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

// ✅ Lazy init function
const getClient = () => {
  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
};

// ✅ Summary function
export const generateSummary = async (text) => {
  try {
    const client = getClient(); // 🔥 यहीं बन रहा है

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "Summarize notes in simple bullet points",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.log("Groq error:", error.message);
    return "Summary not available";
  }
};
