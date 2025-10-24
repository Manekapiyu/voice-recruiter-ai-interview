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
    const body = await req.json();
    const { jobPosition, jobDescription, duration, type } = body || {};

    if (!jobPosition || !jobDescription || !duration || !type) {
      return NextResponse.json(
        { error: "Missing required fields in request body" },
        { status: 400 }
      );
    }

    const FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{jobTitle}}", jobPosition)
      .replace("{{jobDescription}}", jobDescription)
      .replace("{{duration}}", duration)
      .replace("{{type}}", type);

    console.log("Final Prompt:", FINAL_PROMPT);

    if (!process.env.OPENROUTER_API_KEY) {
      console.error("Missing API Key");
      return NextResponse.json({ error: "API key missing" }, { status: 500 });
    }

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
        "X-Title": "Interview Question Generator",
      },
    });

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    const message = completion?.choices?.[0]?.message?.content?.trim() || "No response";

    console.log("AI Response:", message);

    return NextResponse.json({ message }, { status: 200 });
  } catch (e) {
    console.error("Error in /api/ai-model:", e);
    return NextResponse.json(
      {
        error: "Failed to generate interview questions",
        details: e.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
