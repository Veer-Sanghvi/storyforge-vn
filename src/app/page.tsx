import Link from "next/link";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FeaturedWithImageOnRight } from "@/components/ui/featured-with-image-on-right";
import { OpeningBook } from "@/components/story/book-mark";

const heroButtonClass =
  "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-white/15 px-7 text-sm font-semibold text-[#f4ecff] shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fbbf24]";

export default function Home() {
  const letters = "StoryForge VN".split("");

  return (
    <main className="story-gradient relative min-h-svh overflow-hidden">
      <BackgroundBeams className="opacity-45" />
      <FeaturedWithImageOnRight
        eyebrow="AI Visual Novel Studio"
        title={letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="inline-block animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 55}ms`, animationFillMode: "both" }}
          >
            {letter === " " ? "\u00a0" : letter}
          </span>
        ))}
        description="Your story. Your choices. Powered by AI."
        actions={
          <>
            <Link href="/create" className={`${heroButtonClass} bg-[#a855f7]`}>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition duration-700 group-hover:translate-x-full" />
              <span className="relative z-10">
                Create Your Story
              </span>
            </Link>
            <Link href="/story/demo" className={`${heroButtonClass} border-[#fbbf24]/40 bg-[#160a24] text-[#fde68a]`}>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#fbbf24]/35 to-transparent transition duration-700 group-hover:translate-x-full" />
              <span className="relative z-10">
                Try Demo Story
              </span>
            </Link>
          </>
        }
        visual={
          <div className="relative flex h-full items-center">
            <div className="absolute -inset-10 rounded-full bg-[#a855f7]/20 blur-3xl" />
            <OpeningBook />
            <div className="absolute bottom-8 left-0 right-0 mx-auto w-fit rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm backdrop-blur">
              <AnimatedGradientText>Branching chapters, living characters, instant demo.</AnimatedGradientText>
            </div>
          </div>
        }
      />
    </main>
  );
}
