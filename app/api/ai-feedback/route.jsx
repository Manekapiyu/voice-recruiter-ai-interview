import OpenAI from "openai";
import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { conversation } = await req.json();
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      JSON.stringify(conversation)
    );

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    const message = completion.choices?.[0]?.message?.content || "No feedback generated";

    return NextResponse.json({ message }, { status: 200 });
  } catch (e) {
    console.error("Error in /api/ai-feedback:", e);
    return NextResponse.json(
      { error: "Failed to generate AI feedback", details: e.message },
      { status: 500 }
    );
  }
}
