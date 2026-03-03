"use client";

import { motion } from "framer-motion";
import type { WeddingConfig } from "@/config/wedding";
import { downloadCalendarIcs } from "@/lib/ics";

interface EventDetailsProps {
  config: Pick<
    WeddingConfig,
    | "weddingDateLabel"
    | "weddingTime"
    | "venueName"
    | "venueAddress"
    | "events"
    | "ceremonyDetails"
    | "dressCode"
    | "coupleNames"
    | "weddingDateISO"
  >;
}

function parseContact(contact: string): { name: string; phone: string; tel: string } | null {
  const [namePart, phonePart] = contact.split(":");
  if (!namePart || !phonePart) {
    return null;
  }

  const phone = phonePart.trim();
  const tel = phone.replace(/[^\d+]/g, "");
  if (!tel) {
    return null;
  }

  return {
    name: namePart.trim(),
    phone,
    tel,
  };
}

export default function EventDetails({ config }: EventDetailsProps) {
  const ceremonyDetails =
    config.ceremonyDetails && config.ceremonyDetails.length > 0
      ? config.ceremonyDetails
      : [
          {
            name: "Nikkah",
            dayLabel: "Saturday",
            dateLabel: config.weddingDateLabel,
            timeLabel: config.weddingTime,
            venueName: config.venueName,
            venueAddress: [config.venueAddress],
            highlights: config.events,
            contacts: [] as string[],
          },
        ];

  return (
    <section id="details" data-testid="section-details" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="eyebrow text-center">Event Details</p>
        <h2 className="section-title mt-3 text-center">Wedding Event Schedule</h2>
      </motion.div>

      <motion.div
        className="mt-10 grid gap-6 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        {ceremonyDetails.map((ceremony, index) => (
          <motion.article
            key={ceremony.name}
            className="rounded-[2rem] border border-[color:var(--theme-primary)]/22 bg-white/92 p-6 shadow-sm"
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, delay: index * 0.04 }}
            whileHover={{ y: -6, boxShadow: "0 16px 34px rgba(30, 20, 10, 0.14)" }}
          >
            <motion.h3
              className="font-heading text-4xl text-[var(--theme-primary)]"
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {ceremony.name}
            </motion.h3>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-[color:var(--theme-primary)]/15 bg-[var(--theme-secondary)]/28 p-3">
                <p className="text-[var(--theme-primary)]/80">Day</p>
                <p className="mt-1 font-semibold text-stone-800">{ceremony.dayLabel}</p>
              </div>
              <div className="rounded-2xl border border-[color:var(--theme-primary)]/15 bg-[var(--theme-secondary)]/28 p-3">
                <p className="text-[var(--theme-primary)]/80">Time</p>
                <p className="mt-1 font-semibold text-stone-800">{ceremony.timeLabel}</p>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-[color:var(--theme-primary)]/15 bg-[var(--theme-secondary)]/28 p-3">
              <p className="text-sm text-[var(--theme-primary)]/80">Date</p>
              <p className="mt-1 font-semibold text-stone-800">{ceremony.dateLabel}</p>
            </div>

            <div className="mt-5">
              <p className="font-semibold uppercase tracking-[0.2em] text-[var(--theme-primary)]/85">Venue</p>
              <p className="mt-2 text-lg font-semibold text-stone-900">{ceremony.venueName}</p>
              {ceremony.venueAddress.map((line) => (
                <p key={line} className="text-stone-700">
                  {line}
                </p>
              ))}
            </div>

            {ceremony.highlights && ceremony.highlights.length > 0 ? (
              <div className="mt-5">
                <p className="font-semibold uppercase tracking-[0.2em] text-[var(--theme-primary)]/85">Schedule</p>
                <ul className="mt-2 space-y-1.5">
                  {ceremony.highlights.map((item) => (
                    <li key={`${item.name}-${item.time}`} className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-stone-800">{item.name}</span>
                      <span className="font-semibold text-[var(--theme-primary)]">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {ceremony.contacts && ceremony.contacts.length > 0 ? (
              <div className="mt-5 border-t border-[color:var(--theme-primary)]/20 pt-4">
                <p className="font-semibold uppercase tracking-[0.2em] text-[var(--theme-primary)]/85">Contact</p>
                <ul className="mt-2 space-y-1 text-sm text-stone-700">
                  {ceremony.contacts.map((contact) => {
                    const parsed = parseContact(contact);
                    if (!parsed) {
                      return <li key={contact}>{contact}</li>;
                    }

                    return (
                      <li key={contact}>
                        <span>{parsed.name}: </span>
                        <a href={`tel:${parsed.tel}`} className="font-semibold text-[var(--theme-primary)] hover:underline">
                          {parsed.phone}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="mt-8 flex flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {config.dressCode ? (
          <p className="rounded-full border border-[color:var(--theme-primary)]/25 bg-white/90 px-4 py-2 text-sm text-stone-700">
            Dress Code: <span className="font-semibold text-stone-900">{config.dressCode}</span>
          </p>
        ) : null}
        <motion.button
          type="button"
          className="btn-primary"
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            downloadCalendarIcs({
              coupleNames: config.coupleNames,
              weddingDateISO: config.weddingDateISO,
              weddingTime: config.weddingTime,
              venueName: config.venueName,
              venueAddress: config.venueAddress,
            })
          }
        >
          Add to Calendar
        </motion.button>
      </motion.div>
    </section>
  );
}
