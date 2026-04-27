import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeaturedWithImageOnRightProps {
  eyebrow?: string;
  title: ReactNode;
  description: string;
  actions?: ReactNode;
  visual: ReactNode;
  className?: string;
}

export function FeaturedWithImageOnRight({
  eyebrow,
  title,
  description,
  actions,
  visual,
  className,
}: FeaturedWithImageOnRightProps) {
  return (
    <section
      className={cn(
        "grid min-h-[calc(100svh-2rem)] items-center gap-10 overflow-hidden px-6 py-10 md:grid-cols-[1fr_0.9fr] md:px-12 lg:px-20",
        className,
      )}
    >
      <div className="relative z-10 max-w-3xl">
        {eyebrow ? (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#fbbf24]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-story text-5xl leading-[0.95] text-[#f4ecff] md:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#cfc1e8] md:text-xl">{description}</p>
        {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
      </div>
      <div className="relative z-10 min-h-[320px] md:min-h-[560px]">{visual}</div>
    </section>
  );
}
