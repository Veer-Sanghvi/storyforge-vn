import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(request: Request) {
  const { line, speaker, atmosphere } = await request.json();

  const result = streamText({
    model: openai("gpt-5-mini"),
    prompt: `Rewrite this visual novel line with the same meaning, more immersive pacing, and no extra commentary.
Speaker: ${speaker}
Atmosphere: ${atmosphere}
Line: ${line}`,
  });

  return result.toTextStreamResponse();
}
