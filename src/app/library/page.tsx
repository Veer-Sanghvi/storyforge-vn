"use client";

import Link from "next/link";
import { useEffect } from "react";
import { BookOpen, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TiltedCard } from "@/components/ui/tilted-card";
import { useStoryStore } from "@/store/story-store";

export default function LibraryPage() {
  const { library, restartStory, hydrateDemo } = useStoryStore();

  useEffect(() => {
    hydrateDemo();
  }, [hydrateDemo]);

  return (
    <main className="min-h-svh bg-[#0a0014] px-4 py-8 text-[#e2d9f3] md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Badge className="bg-[#a855f7]/20 text-[#e9d5ff]">Story Library</Badge>
            <h1 className="mt-3 font-story text-5xl text-[#f4ecff]">Continue a thread</h1>
          </div>
          <Button asChild>
            <Link href="/create">Create New Story</Link>
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {library.map((story) => (
            <TiltedCard key={story.id}>
              <Card className="group min-h-72 overflow-hidden border-white/15 bg-gradient-to-br from-[#1b0734] via-[#10205c] to-[#05000d] p-5 shadow-2xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Badge className="bg-[#fbbf24]/15 text-[#fde68a]">{story.genre}</Badge>
                    <h2 className="mt-4 font-story text-3xl leading-tight text-[#f4ecff]">{story.title}</h2>
                  </div>
                  {story.isDemo ? <Badge className="bg-white/10">Demo</Badge> : null}
                </div>
                <div className="mt-7">
                  <div className="mb-2 flex justify-between text-xs text-[#cfc1e8]">
                    <span>{story.chaptersRead} / {story.totalChapters} chapters</span>
                    <span>{story.completionPercentage}%</span>
                  </div>
                  <Progress value={story.completionPercentage} className="h-1.5 bg-white/10" />
                  <p className="mt-4 text-xs text-[#cfc1e8]/70">Last played {new Date(story.lastPlayed).toLocaleDateString()}</p>
                </div>
                <div className="mt-8 flex gap-3 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
                  <Button asChild className="flex-1">
                    <Link href={`/story/${story.id}`}><BookOpen className="mr-2 size-4" />Continue</Link>
                  </Button>
                  <Button variant="secondary" onClick={() => restartStory(story.id)}>
                    <RotateCcw className="size-4" />
                  </Button>
                </div>
              </Card>
            </TiltedCard>
          ))}
        </div>
      </div>
    </main>
  );
}
