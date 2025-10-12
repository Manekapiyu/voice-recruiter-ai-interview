import OpenAI from "openai";

export async function POST(req){

    const {jobPosition,jobDescription,duration,type} = await req.json();
    const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  
})

async function main() {
  const completion = await openai.chat.completions.create({
    model: "${Model.GPT_4_Omni}",
    messages: [
      { role: "user", content: "Say this is a test" }
    ],
  })
  console.log(completion.choices[0].message)
}

}