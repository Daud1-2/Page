"use client";

import { motion } from "framer-motion";

interface FloralDecorProps {
  mirrored?: boolean;
  className?: string;
}

export default function FloralDecor({ mirrored = false, className = "" }: FloralDecorProps) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none ${className}`}
      animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" }}
      style={mirrored ? { transform: "scaleY(-1)" } : undefined}
    >
      <svg viewBox="0 0 240 80" className="h-auto w-full text-[var(--theme-primary)]/60">
        <path
          d="M10 50 C40 20, 70 20, 100 50 S160 80, 190 50 S220 20, 230 35"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="45" cy="35" r="5" fill="currentColor" />
        <circle cx="120" cy="55" r="6" fill="currentColor" />
        <circle cx="200" cy="32" r="4" fill="currentColor" />
        <path d="M35 44 L45 28 L55 44 Z" fill="currentColor" opacity="0.6" />
        <path d="M112 66 L120 48 L128 66 Z" fill="currentColor" opacity="0.6" />
        <path d="M192 40 L200 24 L208 40 Z" fill="currentColor" opacity="0.6" />
      </svg>
    </motion.div>
  );
}
