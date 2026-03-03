"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import FloralDecor from "@/components/FloralDecor";

interface HeroProps {
  coupleNames: string;
  weddingDateLabel: string;
  heroVideo: string;
}

export default function Hero({ coupleNames, weddingDateLabel, heroVideo }: HeroProps) {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <section id="hero" data-testid="section-hero" className="relative min-h-screen overflow-hidden">
      <motion.div style={{ y: parallaxY }} className="absolute inset-0">
        <video className="h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata" aria-hidden>
          <source src={heroVideo} type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/60" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center text-white">
        <FloralDecor className="w-56 text-white/80" />
        <motion.h1
          className="mt-8 font-heading text-5xl tracking-wide sm:text-7xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {coupleNames}
        </motion.h1>
        <motion.p
          className="mt-6 font-heading text-2xl sm:text-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {weddingDateLabel}
        </motion.p>
      </div>
    </section>
  );
}
