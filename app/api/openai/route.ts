import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { initMessages } from "@/lib/data";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
  compatibility: "strict",
});

export const runtime = "edge";
export async function POST(request: Request) {
  const { messages } = await request.json();
  const stream = await streamText({
    model: openai("gtp-4o-mini"),
    messages: [initMessages, ...messages],
    temperature: 0.7,
  });
  return stream?.toDataStreamResponse();
}
