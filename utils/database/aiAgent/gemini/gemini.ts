import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.GOOGLE_API_KEY);

const GeminiAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || "" });
export default GeminiAI;
// async function main() {
//   const response = await GeminiAI.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// await main();
