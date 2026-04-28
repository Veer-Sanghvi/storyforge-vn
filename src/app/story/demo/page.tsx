"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";

type DemoChoice = {
  text: string;
  next: string;
};

type DemoChapter = {
  id: string;
  title: string;
  stage: number;
  body: string;
  choices: DemoChoice[];
};

const demoChapters: Record<string, DemoChapter> = {
  beacon: {
    id: "beacon",
    title: "Chapter 1: The Beacon",
    stage: 1,
    body:
      "Elara keeps the northern lighthouse with only her brass telescope and the tide for company. Near midnight, the beacon answers a signal from the wreck of the Meridian, a ship that sank thirty years ago. In the glass, a mysterious light blinks back from empty water: three short pulses, one long, then Elara's own name.",
    choices: [
      { text: "Investigate the signal", next: "message" },
      { text: "Ignore it", next: "dream" },
    ],
  },
  message: {
    id: "message",
    title: "Chapter 2A: The Message",
    stage: 2,
    body:
      "Elara descends to the black rocks below the tower. A coded journal page has washed ashore, dry despite the surf, its ink shining with the same cold rhythm as the light. The first line reads: When the keeper remembers, the drowned may speak.",
    choices: [
      { text: "Decode it tonight", next: "convergence" },
      { text: "Wait for dawn", next: "convergence" },
    ],
  },
  dream: {
    id: "dream",
    title: "Chapter 2B: The Dream",
    stage: 2,
    body:
      "Elara shutters the lantern and tries to sleep. A woman's face appears behind her eyelids, pale with sea-salt and grief, whispering from beneath a deck of broken bells. She wakes before dawn to find wet sand scattered across her bedroom floor.",
    choices: [
      { text: "Search the beach", next: "convergence" },
      { text: "Return to the light", next: "convergence" },
    ],
  },
  convergence: {
    id: "convergence",
    title: "Chapter 3: The Keeper's Echo",
    stage: 3,
    body:
      "The signal, the journal, and the dream converge in the lantern room. Elara realizes the Meridian did not sink by storm; it was guided onto the rocks by a previous keeper, then hidden by the light itself. When she turns the lens toward the reef, the mysterious glow becomes a doorway. From beyond it, the drowned woman raises a hand, and every bell in the lighthouse begins to ring.",
    choices: [
      { text: "Restart the demo", next: "beacon" },
      { text: "Create your own story", next: "create" },
    ],
  },
};

export default function DemoStoryPage() {
  const [chapterId, setChapterId] = useState("beacon");
  const [typedText, setTypedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const chapter = demoChapters[chapterId];

  const progress = useMemo(() => {
    return chapter.stage === 1 ? 33 : chapter.stage === 2 ? 66 : 100;
  }, [chapter.stage]);

  useEffect(() => {
    let index = 0;
    const reset = window.setTimeout(() => {
      setTypedText("");
      setIsComplete(false);
    }, 0);
    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(chapter.body.slice(0, index));
      if (index >= chapter.body.length) {
        window.clearInterval(interval);
        setIsComplete(true);
      }
    }, 22);

    return () => {
      window.clearTimeout(reset);
      window.clearInterval(interval);
    };
  }, [chapter.body]);

  return (
    <main className="relative min-h-svh overflow-hidden bg-gradient-to-br from-[#07152f] via-[#082f3a] to-[#02070a] text-[#e2f8f5]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(45,212,191,0.22),transparent_30%),radial-gradient(circle_at_75%_10%,rgba(59,130,246,0.18),transparent_28%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px]" />

      <header className="relative z-10 px-5 py-5 md:px-10">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold uppercase tracking-[0.24em] text-teal-200/80">
              The Lighthouse Keeper&apos;s Secret
            </p>
            <Progress value={progress} className="mt-3 h-1.5 bg-white/10" />
          </div>
          <Link
            href="/"
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-teal-50 backdrop-blur transition hover:bg-white/15"
          >
            Exit
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-96px)] max-w-5xl flex-col items-center justify-center px-5 pb-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-32 items-center justify-center rounded-full border border-teal-200/25 bg-black/25 text-7xl shadow-[0_0_80px_rgba(45,212,191,0.22)] backdrop-blur">
            🔭
          </div>
          <p className="text-sm font-semibold text-teal-200">Elara, keeper of the northern light</p>
        </div>

        <div className="w-full rounded-lg border border-white/15 bg-black/40 p-5 shadow-2xl backdrop-blur-xl md:p-8">
          <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
            <h1 className="font-story text-3xl text-white md:text-5xl">{chapter.title}</h1>
            <span className="text-sm text-teal-100/70">Mysterious light</span>
          </div>
          <p className="min-h-40 text-lg leading-8 text-teal-50 md:text-xl">{typedText}</p>

          {isComplete ? (
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {chapter.choices.map((choice) =>
                choice.next === "create" ? (
                  <Link
                    key={choice.text}
                    href="/create"
                    className="rounded-lg border border-amber-300/35 bg-amber-300/10 px-5 py-4 text-left font-semibold text-amber-100 transition hover:-translate-y-0.5 hover:bg-amber-300/15"
                  >
                    {choice.text}
                  </Link>
                ) : (
                  <button
                    key={choice.text}
                    onClick={() => setChapterId(choice.next)}
                    className="rounded-lg border border-teal-200/25 bg-white/10 px-5 py-4 text-left font-semibold text-teal-50 transition hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    {choice.text}
                  </button>
                ),
              )}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
