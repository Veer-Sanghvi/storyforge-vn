"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltedCardProps {
  children: ReactNode;
  className?: string;
}

export function TiltedCard({ children, className }: TiltedCardProps) {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  return (
    <motion.div
      className={cn("relative transform-gpu", className)}
      style={{ transform }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        rotateX.set(((y / rect.height) - 0.5) * -10);
        rotateY.set(((x / rect.width) - 0.5) * 10);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
