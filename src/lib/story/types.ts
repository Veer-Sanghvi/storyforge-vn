export type CharacterRole = "protagonist" | "ally" | "antagonist" | "neutral";
export type Emotion = "neutral" | "happy" | "sad" | "angry" | "surprised" | "fearful";
export type BackgroundMood = "dawn" | "day" | "dusk" | "night" | "storm" | "dream";

export interface StoryCharacter {
  name: string;
  role: CharacterRole;
  personality: string;
  visualDescription: string;
  avatarEmoji: string;
  accentColor: string;
}

export interface DialogueLine {
  speaker: string;
  text: string;
  emotion: Emotion;
}

export interface StoryChoice {
  id: string;
  text: string;
  nextChapterId: string;
  consequence: string;
}

export interface StoryChapter {
  id: string;
  title: string;
  scene: string;
  narration: string;
  dialogue: DialogueLine[];
  choices: StoryChoice[];
  backgroundMood: BackgroundMood;
}

export interface Story {
  id: string;
  title: string;
  genre: string;
  setting: string;
  atmosphere: string;
  characters: StoryCharacter[];
  chapters: StoryChapter[];
  isDemo?: boolean;
  createdAt?: string;
}

export interface LibraryStory {
  id: string;
  title: string;
  genre: string;
  chaptersRead: number;
  totalChapters: number;
  completionPercentage: number;
  lastPlayed: string;
  isDemo?: boolean;
}
