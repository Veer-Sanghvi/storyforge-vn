import { z } from "zod";

export const CharacterSchema = z.object({
  name: z.string(),
  role: z.enum(["protagonist", "ally", "antagonist", "neutral"]),
  personality: z.string(),
  visualDescription: z.string(),
  avatarEmoji: z.string(),
  accentColor: z.string(),
});

export const ChapterSchema = z.object({
  id: z.string(),
  title: z.string(),
  scene: z.string(),
  narration: z.string(),
  dialogue: z.array(
    z.object({
      speaker: z.string(),
      text: z.string(),
      emotion: z.enum(["neutral", "happy", "sad", "angry", "surprised", "fearful"]),
    }),
  ),
  choices: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      nextChapterId: z.string(),
      consequence: z.string(),
    }),
  ),
  backgroundMood: z.enum(["dawn", "day", "dusk", "night", "storm", "dream"]),
});

export const StorySchema = z.object({
  title: z.string(),
  genre: z.string(),
  setting: z.string(),
  atmosphere: z.string(),
  characters: z.array(CharacterSchema),
  chapters: z.array(ChapterSchema),
});

export const ContinueChapterSchema = ChapterSchema;
