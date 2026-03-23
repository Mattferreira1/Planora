import GeminiAI from "@/utils/database/aiAgent/gemini/gemini";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const prompt = await request.json();
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    const response = await GeminiAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return NextResponse.json({ response: response.text });
  } catch (e) {
    console.error("Failed to parse request body:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
