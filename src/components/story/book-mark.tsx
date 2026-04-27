"use client";

import { motion } from "framer-motion";

export function OpeningBook() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center">
      <motion.svg
        viewBox="0 0 520 420"
        className="h-full w-full drop-shadow-[0_30px_80px_rgba(168,85,247,0.45)]"
        initial="hidden"
        animate="show"
      >
        <defs>
          <linearGradient id="cover" x1="0" x2="1">
            <stop offset="0%" stopColor="#3b0764" />
            <stop offset="55%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="page" x1="0" x2="1">
            <stop offset="0%" stopColor="#f5e8ff" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>
        </defs>
        <motion.path
          d="M260 92 C210 54 132 56 82 92 V330 C132 296 210 298 260 342 Z"
          fill="url(#cover)"
          stroke="#fbbf24"
          strokeWidth="3"
          variants={{ hidden: { rotateY: -30, opacity: 0 }, show: { rotateY: 0, opacity: 1 } }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        <motion.path
          d="M260 92 C310 54 388 56 438 92 V330 C388 296 310 298 260 342 Z"
          fill="url(#cover)"
          stroke="#fbbf24"
          strokeWidth="3"
          variants={{ hidden: { rotateY: 30, opacity: 0 }, show: { rotateY: 0, opacity: 1 } }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        {[0, 1, 2].map((page) => (
          <motion.path
            key={page}
            d={`M260 ${108 + page * 12} C310 ${78 + page * 9} 374 ${82 + page * 7} 420 ${108 + page * 12} V${302 - page * 8} C372 ${280 - page * 4} 310 ${284 - page * 5} 260 ${320 - page * 8} Z`}
            fill="url(#page)"
            opacity={0.8 - page * 0.16}
            animate={{ rotateY: [0, -18, 0], x: [0, -8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: page * 0.28 }}
          />
        ))}
        <motion.circle
          cx="260"
          cy="206"
          r="42"
          fill="#a855f7"
          opacity="0.22"
          animate={{ r: [36, 58, 36], opacity: [0.16, 0.36, 0.16] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        />
      </motion.svg>
    </div>
  );
}
