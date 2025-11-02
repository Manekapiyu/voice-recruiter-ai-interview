// app/api/ai-feedback/route.js
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { FEEDBACK_PROMPT } from "@/services/Constants";

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
      model: "openai/gpt-4o-mini", 
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    const content = completion.choices[0].message.content;
    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error("AI Feedback API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
