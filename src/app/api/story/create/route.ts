import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { StorySchema } from "@/lib/story/schema";

export const runtime = "edge";

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_key_here") {
    return Response.json(
      { error: "OPENAI_API_KEY is not configured for this deployment." },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();

    const result = await generateText({
      model: openai("gpt-5-mini"),
      output: Output.object({ schema: StorySchema }),
      maxOutputTokens: 9000,
      prompt: `Create a complete branching visual novel story.

Requirements:
- Genre: ${body.genre}
- Setting: ${body.setting}
- Premise: ${body.premise}
- Tone: ${body.tone}
- Length: ${body.length} chapters
- Characters: ${JSON.stringify(body.characters)}
- Use exactly ${body.length} chapters.
- Every chapter needs 2-3 choices. For non-final chapters, nextChapterId must point to a later chapter id.
- Use vivid narration, concise dialogue, and visual character descriptions.
- accentColor must be a valid hex color.
- avatarEmoji must be a single expressive emoji.`,
    });

    return Response.json(result.output);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown story generation error.";

    return Response.json({ error: message }, { status: 500 });
  }
}
