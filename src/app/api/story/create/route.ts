import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { StorySchema } from "@/lib/story/schema";

export const runtime = "edge";

export async function POST(request: Request) {
  const body = await request.json();

  const result = streamObject({
    model: openai("gpt-5-mini"),
    schema: StorySchema,
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

  return result.toTextStreamResponse();
}
