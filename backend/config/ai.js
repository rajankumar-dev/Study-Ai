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
