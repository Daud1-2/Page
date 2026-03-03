"use client";

import { motion } from "framer-motion";

interface InvitationMessageProps {
  message: string;
}

export default function InvitationMessage({ message }: InvitationMessageProps) {
  return (
    <section id="message" data-testid="section-message" className="welcome-section">
      <motion.div
        className="welcome-card relative"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="pointer-events-none absolute -left-4 top-6 h-16 w-16 rounded-full bg-[color:var(--theme-primary)]/10 blur-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -right-6 bottom-6 h-20 w-20 rounded-full bg-[color:var(--theme-primary)]/10 blur-xl"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
        <motion.h2
          className="welcome-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          Welcome!
        </motion.h2>
        <motion.p
          className="welcome-text"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.18 }}
        >
          {message}
        </motion.p>
      </motion.div>
    </section>
  );
}
