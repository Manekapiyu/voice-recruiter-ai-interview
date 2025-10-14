import { NextResponse } from "next/server";
import OpenAI from "openai";

const QUESTIONS_PROMPT = `
Generate a set of interview questions for a {{type}} interview.
Job Title: {{jobTitle}}
Description: {{jobDescription}}
Duration: {{duration}} minutes
`;

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace("{{jobTitle}}", jobPosition || "")
      .replace("{{jobDescription}}", jobDescription || "")
      .replace("{{duration}}", duration || "")
      .replace("{{type}}", type || "");

    console.log("Final Prompt:", FINAL_PROMPT);

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000", // Required by OpenRouter
        "X-Title": "Interview Question Generator",
      },
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    const message = completion.choices?.[0]?.message?.content || "No response";
    console.log("✅ AI Response:", message);

    return NextResponse.json({ message }, { status: 200 });
  } catch (e) {
    console.error("Error generating questions:", e);
    return NextResponse.json(
      { error: e.message || "Failed to generate interview questions" },
      { status: 500 }
    );
  }
}
