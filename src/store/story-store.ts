"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { demoStory } from "@/lib/story/demo-story";
import type { LibraryStory, Story } from "@/lib/story/types";

interface StoryState {
  currentStory: Story | null;
  currentChapterId: string;
  choiceHistory: string[];
  charactersEncountered: string[];
  library: LibraryStory[];
  stories: Record<string, Story>;
  startStory: (story: Story) => void;
  makeChoice: (choiceId: string) => void;
  saveProgress: () => void;
  addStory: (story: Story) => void;
  restartStory: (storyId: string) => void;
  hydrateDemo: () => void;
}

const getChapterIndex = (story: Story | null, chapterId: string) =>
  story?.chapters.findIndex((chapter) => chapter.id === chapterId) ?? 0;

const libraryEntryFor = (story: Story, chapterId = story.chapters[0]?.id ?? ""): LibraryStory => {
  const chaptersRead = Math.max(1, getChapterIndex(story, chapterId) + 1);
  const totalChapters = Math.max(1, story.chapters.length);

  return {
    id: story.id,
    title: story.title,
    genre: story.genre,
    chaptersRead,
    totalChapters,
    completionPercentage: Math.round((chaptersRead / totalChapters) * 100),
    lastPlayed: new Date().toISOString(),
    isDemo: story.isDemo,
  };
};

export const useStoryStore = create<StoryState>()(
  persist(
    (set, get) => ({
      currentStory: null,
      currentChapterId: "",
      choiceHistory: [],
      charactersEncountered: [],
      library: [libraryEntryFor(demoStory)],
      stories: { [demoStory.id]: demoStory },
      startStory: (story) =>
        set((state) => ({
          currentStory: story,
          currentChapterId: story.chapters[0]?.id ?? "",
          choiceHistory: [],
          charactersEncountered: story.characters.slice(0, 2).map((character) => character.name),
          stories: { ...state.stories, [story.id]: story },
          library: [
            libraryEntryFor(story),
            ...state.library.filter((item) => item.id !== story.id),
          ],
        })),
      makeChoice: (choiceId) =>
        set((state) => {
          const story = state.currentStory;
          const chapter = story?.chapters.find((item) => item.id === state.currentChapterId);
          const choice = chapter?.choices.find((item) => item.id === choiceId);
          const nextChapterId = choice?.nextChapterId ?? state.currentChapterId;
          const nextChapter = story?.chapters.find((item) => item.id === nextChapterId);
          const encountered = new Set(state.charactersEncountered);

          nextChapter?.dialogue.forEach((line) => encountered.add(line.speaker));

          return {
            currentChapterId: nextChapterId,
            choiceHistory: [...state.choiceHistory, choiceId],
            charactersEncountered: Array.from(encountered),
            library: story
              ? [
                  libraryEntryFor(story, nextChapterId),
                  ...state.library.filter((item) => item.id !== story.id),
                ]
              : state.library,
          };
        }),
      saveProgress: () => {
        const { currentStory, currentChapterId, library } = get();
        if (!currentStory) return;

        set({
          library: [
            libraryEntryFor(currentStory, currentChapterId),
            ...library.filter((item) => item.id !== currentStory.id),
          ],
        });
      },
      addStory: (story) =>
        set((state) => ({
          stories: { ...state.stories, [story.id]: story },
          library: [
            libraryEntryFor(story),
            ...state.library.filter((item) => item.id !== story.id),
          ],
        })),
      restartStory: (storyId) => {
        const story = get().stories[storyId];
        if (story) get().startStory(story);
      },
      hydrateDemo: () =>
        set((state) => ({
          stories: { [demoStory.id]: demoStory, ...state.stories },
          library: state.library.some((item) => item.id === demoStory.id)
            ? state.library
            : [libraryEntryFor(demoStory), ...state.library],
        })),
    }),
    {
      name: "storyforge-vn-state",
      partialize: (state) => ({
        currentStory: state.currentStory,
        currentChapterId: state.currentChapterId,
        choiceHistory: state.choiceHistory,
        charactersEncountered: state.charactersEncountered,
        library: state.library,
        stories: state.stories,
      }),
    },
  ),
);
