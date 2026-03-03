"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CountdownSectionProps {
  weddingDateISO: string;
  weddingTime: string;
}

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function parseTimeLabel(timeLabel: string): { hours: number; minutes: number } {
  const match = timeLabel.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) {
    return { hours: 0, minutes: 0 };
  }

  const rawHours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();
  const hours = (rawHours % 12) + (period === "PM" ? 12 : 0);
  return { hours, minutes };
}

function getTargetDate(dateISO: string, timeLabel: string): Date {
  const [year, month, day] = dateISO.split("-").map(Number);
  const { hours, minutes } = parseTimeLabel(timeLabel);
  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

function getCountdown(targetDateISO: string, weddingTime: string): CountdownParts {
  const target = getTargetDate(targetDateISO, weddingTime);
  const diffMs = Math.max(target.getTime() - Date.now(), 0);
  const totalSeconds = Math.floor(diffMs / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function getDateLabel(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function CountdownSection({ weddingDateISO, weddingTime }: CountdownSectionProps) {
  const [countdown, setCountdown] = useState<CountdownParts | null>(null);
  const countdownItems = [
    { label: "DAYS", value: countdown ? countdown.days : "--" },
    { label: "HOURS", value: countdown ? countdown.hours : "--" },
    { label: "MINUTES", value: countdown ? countdown.minutes : "--" },
    { label: "SECONDS", value: countdown ? countdown.seconds : "--" },
  ];

  useEffect(() => {
    const syncFrame = window.requestAnimationFrame(() => {
      setCountdown(getCountdown(weddingDateISO, weddingTime));
    });

    const timer = window.setInterval(() => {
      setCountdown(getCountdown(weddingDateISO, weddingTime));
    }, 1000);

    return () => {
      window.cancelAnimationFrame(syncFrame);
      window.clearInterval(timer);
    };
  }, [weddingDateISO, weddingTime]);

  return (
    <section id="countdown" data-testid="section-countdown" className="countdown-section">
      <motion.div
        className="countdown-card"
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <motion.p className="countdown-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          Countdown To The Big Day
        </motion.p>
        <motion.p
          className="countdown-subtitle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          UNTIL {getDateLabel(weddingDateISO).toUpperCase()}
        </motion.p>
        <div className="countdown-grid">
          {countdownItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="countdown-cell"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 * index }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={`${item.label}-${item.value}`}
                  className="countdown-value"
                  suppressHydrationWarning
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ duration: 0.22 }}
                >
                  {item.value}
                </motion.p>
              </AnimatePresence>
              <span className="countdown-label">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
