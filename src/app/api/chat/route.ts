import { NextRequest } from "next/server";
import { streamText } from "ai";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
//import { google } from "@ai-sdk/google";

const cg = createGoogleGenerativeAI({
  apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
});

const model = cg("gemini-2.0-flash");


export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const result = streamText({
    model,
    system: "You're a helpful assistance. Your response output should be in markdown format",
    messages
  });

  return result.toDataStreamResponse();
}
