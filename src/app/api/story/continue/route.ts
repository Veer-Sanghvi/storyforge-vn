import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { ContinueChapterSchema } from "@/lib/story/schema";

export const runtime = "edge";

export async function POST(request: Request) {
  const { storyContext, choiceMade, previousChapters } = await request.json();

  const result = streamObject({
    model: openai("gpt-5-mini"),
    schema: ContinueChapterSchema,
    prompt: `Continue this AI visual novel with one new chapter.

Story context:
${JSON.stringify(storyContext)}

Choice made:
${JSON.stringify(choiceMade)}

Previous chapters:
${JSON.stringify(previousChapters)}

Return a single chapter with a new id, immersive scene text, narration, dialogue, 2-3 choices, and a backgroundMood.`,
  });

  return result.toTextStreamResponse();
}
