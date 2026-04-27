import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { ContinueChapterSchema } from "@/lib/story/schema";

export const runtime = "edge";

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_key_here") {
    return Response.json(
      { error: "OPENAI_API_KEY is not configured for this deployment." },
      { status: 500 },
    );
  }

  try {
    const { storyContext, choiceMade, previousChapters } = await request.json();

    const result = streamObject({
      model: openai("gpt-5-mini"),
      schema: ContinueChapterSchema,
      maxOutputTokens: 2500,
      prompt: `Continue this AI visual novel with one new chapter.

Story context:
${JSON.stringify(storyContext)}

Choice made:
${JSON.stringify(choiceMade)}

Previous chapters:
${JSON.stringify(previousChapters)}

Return a single chapter with a new id, immersive scene text, narration, dialogue, 2-3 choices, and a backgroundMood.`,
    });

    const chapter = await result.object;

    return Response.json(chapter);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown chapter generation error.";

    return Response.json({ error: message }, { status: 500 });
  }
}
