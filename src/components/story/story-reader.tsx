"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useStoryStore } from "@/store/story-store";

const moodClasses = {
  dawn: "from-[#fbbf24] via-[#a855f7] to-[#090016]",
  day: "from-[#38bdf8] via-[#6366f1] to-[#090016]",
  dusk: "from-[#fb7185] via-[#7c3aed] to-[#090016]",
  night: "from-[#0f172a] via-[#312e81] to-[#090016]",
  storm: "from-[#111827] via-[#1e3a8a] to-[#090016]",
  dream: "from-[#581c87] via-[#0891b2] to-[#090016]",
};

const emotionMarks = {
  neutral: "•",
  happy: "✦",
  sad: "◦",
  angry: "!",
  surprised: "?",
  fearful: "…",
};

export function StoryReader({ storyId }: { storyId: string }) {
  const { stories, currentStory, currentChapterId, startStory, makeChoice, saveProgress, hydrateDemo } =
    useStoryStore();
  const [lineIndex, setLineIndex] = useState(-1);
  const [typedText, setTypedText] = useState("");
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    hydrateDemo();
  }, [hydrateDemo]);

  useEffect(() => {
    const story = stories[storyId];
    if (story && currentStory?.id !== story.id) startStory(story);
  }, [currentStory?.id, startStory, stories, storyId]);

  const story = currentStory?.id === storyId ? currentStory : stories[storyId];
  const chapter = story?.chapters.find((item) => item.id === currentChapterId) ?? story?.chapters[0];
  const activeLine = lineIndex >= 0 ? chapter?.dialogue[lineIndex] : null;
  const activeCharacter = story?.characters.find((character) => character.name === activeLine?.speaker);
  const isNarration = lineIndex === -1;
  const fullText = isNarration ? chapter?.narration ?? "" : activeLine?.text ?? "";
  const choicesVisible = chapter ? lineIndex >= chapter.dialogue.length : false;

  const progress = useMemo(() => {
    if (!story || !chapter) return 0;
    return ((story.chapters.findIndex((item) => item.id === chapter.id) + 1) / story.chapters.length) * 100;
  }, [chapter, story]);

  useEffect(() => {
    let index = 0;
    const reset = window.setTimeout(() => setTypedText(""), 0);
    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(fullText.slice(0, index));
      if (index >= fullText.length) window.clearInterval(interval);
    }, 18);

    return () => {
      window.clearTimeout(reset);
      window.clearInterval(interval);
    };
  }, [fullText]);

  if (!story || !chapter) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-[#0a0014] p-6 text-center">
        <div>
          <h1 className="font-story text-4xl text-[#f4ecff]">Story not found</h1>
          <Button asChild className="mt-6">
            <Link href="/library">Open Library</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className={`particle-field relative min-h-svh overflow-hidden bg-gradient-to-br ${moodClasses[chapter.backgroundMood]}`}>
      <AnimatePresence>{flash ? <motion.div className="fixed inset-0 z-50 bg-[#fbbf24]" initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} exit={{ opacity: 0 }} /> : null}</AnimatePresence>
      <div className="absolute inset-0 bg-[#05000d]/35" />
      <header className="relative z-10 flex items-center gap-4 px-4 py-4 md:px-8">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#f4ecff]">{story.title}</p>
          <Progress value={progress} className="mt-2 h-1 bg-white/10" />
        </div>
        <div className="hidden gap-2 md:flex">
          {story.characters.map((character) => (
            <span key={character.name} title={character.name} className="h-3 w-3 rounded-full" style={{ background: character.accentColor }} />
          ))}
        </div>
        <Button variant="secondary" size="sm" onClick={saveProgress} asChild>
          <Link href="/library">Save & Exit</Link>
        </Button>
      </header>

      {story.isDemo ? (
        <div className="relative z-10 mx-auto mt-1 w-fit rounded-full border border-[#fbbf24]/30 bg-[#fbbf24]/15 px-4 py-2 text-xs font-semibold text-[#fde68a]">
          Playing Demo — Create your own story to unlock AI generation
        </div>
      ) : null}

      <section className="relative z-10 flex min-h-[52svh] items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {isNarration ? (
            <motion.div key="narration" className="max-w-3xl text-center" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}>
              <Badge className="mb-4 bg-white/10 text-[#e2d9f3]">{chapter.scene}</Badge>
              <p className="font-story text-3xl italic leading-tight text-[#f4ecff] md:text-5xl">{typedText}</p>
            </motion.div>
          ) : (
            <motion.div key={activeLine?.speaker} className="flex flex-col items-center" initial={{ opacity: 0, x: lineIndex % 2 ? 90 : -90 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.92 }}>
              <motion.div
                className="text-8xl md:text-9xl"
                animate={{ scale: activeLine?.emotion === "surprised" ? 1.18 : 1, rotate: activeLine?.emotion === "angry" ? [-2, 2, -2] : 0 }}
                transition={{ duration: 0.35 }}
              >
                {activeCharacter?.avatarEmoji ?? "✨"}
              </motion.div>
              <div className="mt-4 rounded-full border border-white/15 bg-black/30 px-5 py-2 text-sm font-semibold backdrop-blur" style={{ color: activeCharacter?.accentColor }}>
                {activeLine?.speaker} <span className="text-[#e2d9f3]/60">{activeLine ? emotionMarks[activeLine.emotion] : ""}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="relative z-20 mx-auto mb-6 w-[min(960px,calc(100%-2rem))] rounded-lg border border-white/15 bg-[rgba(10,0,20,0.85)] p-5 shadow-2xl backdrop-blur-xl md:p-7">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="text-sm font-semibold" style={{ color: activeCharacter?.accentColor ?? "#fbbf24" }}>
            {isNarration ? "Narrator" : activeLine?.speaker}
          </span>
          <Button variant="ghost" size="sm" onClick={() => setTypedText(fullText)}>
            Skip
          </Button>
        </div>
        <p className={`${isNarration ? "font-story italic" : ""} min-h-20 text-lg leading-8 text-[#f4ecff] md:text-xl`}>
          {typedText}
        </p>

        <AnimatePresence mode="wait">
          {choicesVisible ? (
            <motion.div className="mt-5 grid gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {chapter.choices.map((choice, index) => (
                <motion.button
                  key={choice.id}
                  className="rounded-lg border border-[#a855f7]/35 bg-white/8 px-4 py-3 text-left text-sm text-[#e2d9f3] transition hover:border-[#fbbf24] hover:bg-[#fbbf24]/10"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -3 }}
                  onClick={() => {
                    setFlash(true);
                    window.setTimeout(() => {
                      makeChoice(choice.id);
                      setLineIndex(-1);
                      setFlash(false);
                    }, 260);
                  }}
                >
                  <span className="font-semibold text-[#fbbf24]">{choice.text}</span>
                  <span className="mt-1 block text-xs text-[#cfc1e8]/70">{choice.consequence}</span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <button
              className="mt-5 text-sm text-[#fbbf24]"
              onClick={() => setLineIndex((current) => (current < chapter.dialogue.length ? current + 1 : current))}
            >
              <span className="animate-pulse">Click to continue</span>
            </button>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
