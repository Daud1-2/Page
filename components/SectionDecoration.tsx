"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionDecorationProps {
  src: string;
  mirrored?: boolean;
}

export default function SectionDecoration({ src, mirrored = false }: SectionDecorationProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  return (
    <div ref={sectionRef} className="section-shell py-5 sm:py-6" aria-hidden="true">
      <motion.div
        style={{ y, scale }}
        className="mx-auto max-w-3xl overflow-hidden rounded-[1.4rem] border border-[color:var(--theme-primary)]/20 bg-white/70 p-2 shadow-sm sm:p-2.5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="overflow-hidden rounded-[1rem] border border-[color:var(--theme-primary)]/15 bg-[var(--theme-secondary)]/35">
          <Image
            src={src}
            alt=""
            width={1600}
            height={520}
            className={`h-auto w-full object-contain transition-transform duration-700 ${mirrored ? "-scale-x-100" : ""}`}
            sizes="(max-width: 1024px) 94vw, 1200px"
          />
        </div>
      </motion.div>
    </div>
  );
}
