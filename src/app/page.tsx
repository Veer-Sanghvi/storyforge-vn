import Link from "next/link";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FeaturedWithImageOnRight } from "@/components/ui/featured-with-image-on-right";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { OpeningBook } from "@/components/story/book-mark";

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
            <Link href="/create" className="inline-flex">
              <ShimmerButton className="h-12 bg-[#a855f7] px-7 text-sm font-semibold text-white">
                Create Your Story
              </ShimmerButton>
            </Link>
            <Link href="/story/demo-lighthouse" className="inline-flex">
              <ShimmerButton className="h-12 border-[#fbbf24]/40 bg-[#160a24] px-7 text-sm font-semibold text-[#fde68a]">
                Try Demo Story
              </ShimmerButton>
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
