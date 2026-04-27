"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { CharacterRole, Story } from "@/lib/story/types";
import { useStoryStore } from "@/store/story-store";

const genres = [
  ["Fantasy", "🗡️", "from-purple-600 to-amber-500"],
  ["Sci-Fi", "🚀", "from-cyan-500 to-blue-700"],
  ["Romance", "💌", "from-rose-500 to-fuchsia-600"],
  ["Mystery", "🕵️", "from-slate-600 to-violet-700"],
  ["Horror", "🕯️", "from-red-950 to-zinc-950"],
  ["Adventure", "🧭", "from-emerald-500 to-sky-700"],
  ["Historical", "🏛️", "from-yellow-700 to-stone-700"],
  ["Slice of Life", "☕", "from-orange-300 to-teal-500"],
];

const roleEmoji: Record<CharacterRole, string> = {
  protagonist: "🌟",
  ally: "🛡️",
  antagonist: "🔥",
  neutral: "🌓",
};

const settingSuggestions = [
  "a floating archive above a ruined moon",
  "a rainlit city where memories are traded",
  "a seaside inn caught between two timelines",
  "a palace garden that blooms only during eclipses",
];

export default function CreatePage() {
  const router = useRouter();
  const addStory = useStoryStore((state) => state.addStory);
  const startStory = useStoryStore((state) => state.startStory);
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [generationError, setGenerationError] = useState("");
  const [form, setForm] = useState({
    genre: "Fantasy",
    setting: "",
    characters: [
      { name: "Aria", personality: "brilliant but haunted by a promise", role: "protagonist" as CharacterRole },
      { name: "Noct", personality: "loyal, theatrical, and hiding useful secrets", role: "ally" as CharacterRole },
    ],
    premise: "",
    tone: "Mysterious",
    length: "3",
  });

  const statuses = ["Crafting your world...", "Building characters...", "Writing Act 1..."];
  const selectedGenre = genres.find(([name]) => name === form.genre);
  const canAdvance = step !== 0 || Boolean(form.setting.trim());

  const characters = useMemo(
    () =>
      form.characters.map((character, index) => ({
        ...character,
        avatarEmoji: roleEmoji[character.role],
        visualDescription: `${character.name || "Unnamed"} appears as a ${character.role} shaped by ${character.personality || "unwritten motives"}.`,
        accentColor: ["#fbbf24", "#34d399", "#fb7185", "#38bdf8"][index] ?? "#a855f7",
      })),
    [form.characters],
  );

  async function generateStory() {
    setIsGenerating(true);
    setGenerationError("");
    const statusTimer = window.setInterval(() => setStatusIndex((current) => (current + 1) % statuses.length), 1100);

    try {
      const response = await fetch("/api/story/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, characters, length: Number(form.length) }),
      });
      const parsed = await response.json();

      if (!response.ok) {
        throw new Error(parsed.error ?? "Story generation failed.");
      }

      const story: Story = {
        ...parsed,
        id: crypto.randomUUID(),
        isDemo: false,
        createdAt: new Date().toISOString(),
      };
      addStory(story);
      startStory(story);
      router.push(`/story/${story.id}`);
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : "Story generation failed.");
    } finally {
      window.clearInterval(statusTimer);
      setIsGenerating(false);
    }
  }

  return (
    <main className="min-h-svh bg-[#0a0014] px-4 py-6 text-[#e2d9f3] md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Badge className="bg-[#a855f7]/20 text-[#e9d5ff]">Story Creation Wizard</Badge>
            <h1 className="mt-3 font-story text-4xl text-[#f4ecff] md:text-6xl">Forge a new route</h1>
          </div>
          <div className="text-sm text-[#cfc1e8]">Step {step + 1} / 4</div>
        </div>

        <AnimatePresence mode="wait">
          <motion.section
            key={step}
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -36 }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
            className="rounded-lg border border-white/15 bg-white/[0.06] p-5 backdrop-blur md:p-8"
          >
            {step === 0 ? (
              <div>
                <h2 className="mb-5 text-xl font-semibold">Genre & Setting</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {genres.map(([name, emoji, gradient]) => (
                    <motion.button
                      key={name}
                      className={`rounded-lg bg-gradient-to-br ${gradient} p-5 text-left shadow-lg ${form.genre === name ? "ring-2 ring-[#fbbf24]" : "ring-1 ring-white/10"}`}
                      whileHover={{ y: -4 }}
                      animate={{ scale: form.genre === name ? 1.04 : 1 }}
                      onClick={() => setForm((current) => ({ ...current, genre: name }))}
                    >
                      <span className="text-3xl">{emoji}</span>
                      <span className="mt-4 block font-semibold text-white">{name}</span>
                    </motion.button>
                  ))}
                </div>
                <div className="mt-6">
                  <Input value={form.setting} onChange={(event) => setForm((current) => ({ ...current, setting: event.target.value }))} placeholder="Setting, world, or opening location" />
                  <div className="mt-3 flex flex-wrap gap-2">
                    {settingSuggestions.map((suggestion) => (
                      <button key={suggestion} className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#cfc1e8]" onClick={() => setForm((current) => ({ ...current, setting: suggestion }))}>
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {step === 1 ? (
              <div>
                <h2 className="mb-5 text-xl font-semibold">Characters</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {form.characters.map((character, index) => (
                    <Card key={index} className="border-white/15 bg-[#10001f]/80 p-4">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="text-4xl">{roleEmoji[character.role]}</div>
                        <div>
                          <p className="font-semibold text-[#f4ecff]">{character.name || "Unnamed character"}</p>
                          <p className="text-xs text-[#cfc1e8]">{character.role}</p>
                        </div>
                      </div>
                      <div className="grid gap-3">
                        <Input value={character.name} onChange={(event) => setForm((current) => ({ ...current, characters: current.characters.map((item, itemIndex) => itemIndex === index ? { ...item, name: event.target.value } : item) }))} placeholder="Name" />
                        <Input value={character.personality} onChange={(event) => setForm((current) => ({ ...current, characters: current.characters.map((item, itemIndex) => itemIndex === index ? { ...item, personality: event.target.value } : item) }))} placeholder="Personality" />
                        <Tabs value={character.role} onValueChange={(value) => setForm((current) => ({ ...current, characters: current.characters.map((item, itemIndex) => itemIndex === index ? { ...item, role: value as CharacterRole } : item) }))}>
                          <TabsList className="grid w-full grid-cols-4">
                            {(["protagonist", "ally", "antagonist", "neutral"] as CharacterRole[]).map((role) => <TabsTrigger key={role} value={role}>{roleEmoji[role]}</TabsTrigger>)}
                          </TabsList>
                        </Tabs>
                      </div>
                    </Card>
                  ))}
                </div>
                {form.characters.length < 4 ? <Button className="mt-4" onClick={() => setForm((current) => ({ ...current, characters: [...current.characters, { name: "", personality: "", role: "neutral" }] }))}>Add Character Slot</Button> : null}
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <h2 className="mb-5 text-xl font-semibold">Story Premise</h2>
                <Textarea className="min-h-44" value={form.premise} onChange={(event) => setForm((current) => ({ ...current, premise: event.target.value }))} placeholder="What is your story about?" />
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <Tabs value={form.tone} onValueChange={(tone) => setForm((current) => ({ ...current, tone }))}>
                    <TabsList className="grid w-full grid-cols-5"><TabsTrigger value="Dark">Dark</TabsTrigger><TabsTrigger value="Light-hearted">Light</TabsTrigger><TabsTrigger value="Romantic">Romance</TabsTrigger><TabsTrigger value="Mysterious">Mystery</TabsTrigger><TabsTrigger value="Epic">Epic</TabsTrigger></TabsList>
                  </Tabs>
                  <Tabs value={form.length} onValueChange={(length) => setForm((current) => ({ ...current, length }))}>
                    <TabsList className="grid w-full grid-cols-3"><TabsTrigger value="3">Short</TabsTrigger><TabsTrigger value="5">Medium</TabsTrigger><TabsTrigger value="8">Long</TabsTrigger></TabsList>
                  </Tabs>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <BlurFade>
                <h2 className="mb-5 text-xl font-semibold">Review & Generate</h2>
                <Card className="border-[#fbbf24]/25 bg-[#10001f]/90 p-5">
                  <p className="text-sm text-[#fbbf24]">{selectedGenre?.[1]} {form.genre}</p>
                  <h3 className="mt-2 font-story text-3xl text-[#f4ecff]">{form.setting || "Unnamed world"}</h3>
                  <p className="mt-3 text-[#cfc1e8]">{form.premise || "A story waiting for its first secret."}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{characters.map((character) => <Badge key={character.name} className="bg-white/10">{character.avatarEmoji} {character.name || character.role}</Badge>)}</div>
                </Card>
                {isGenerating ? (
                  <div className="mt-8 flex items-center gap-4">
                    <div className="relative h-16 w-20 rounded border border-[#fbbf24]/40 bg-[#f4ecff]/10"><div className="book-page absolute inset-y-2 left-1/2 w-8 rounded bg-[#f4ecff]/70" /></div>
                    <p className="text-[#fbbf24]">{statuses[statusIndex]}</p>
                  </div>
                ) : (
                  <ShimmerButton className="mt-8" onClick={generateStory}><Sparkles className="mr-2 size-4" />Generate My Story</ShimmerButton>
                )}
                {generationError ? (
                  <div className="mt-5 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
                    {generationError}
                  </div>
                ) : null}
              </BlurFade>
            ) : null}
          </motion.section>
        </AnimatePresence>

        <div className="mt-6 flex justify-between">
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep((current) => current - 1)}>Back</Button>
          {step < 3 ? <Button disabled={!canAdvance} onClick={() => setStep((current) => current + 1)}>Next</Button> : null}
        </div>
      </div>
    </main>
  );
}
