"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { WeddingConfig } from "@/config/wedding";

interface LocationProps {
  venueName: string;
  venueAddress: string;
  venueMapLink: string;
  ceremonyDetails?: WeddingConfig["ceremonyDetails"];
}

function buildMapQuery(venueName: string, venueAddress: string[]) {
  return `${venueName}, ${venueAddress.join(", ")}`;
}

export default function Location({ venueName, venueAddress, venueMapLink, ceremonyDetails }: LocationProps) {
  const locations =
    ceremonyDetails && ceremonyDetails.length > 0
      ? ceremonyDetails
      : [
          {
            name: "Wedding",
            dayLabel: "Saturday",
            dateLabel: "",
            timeLabel: "",
            venueName,
            venueAddress: [venueAddress],
            venueMapLink,
          },
        ];

  return (
    <section
      id="location"
      data-testid="section-location"
      className="mx-[calc(50%-50vw)] mt-6 w-screen bg-[#b8965f] px-5 py-14 sm:px-8 sm:py-16"
    >
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
      >
        <motion.p
          className="text-center font-heading text-sm uppercase tracking-[0.24em] text-white/90"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Location
        </motion.p>
        <motion.h2
          className="mt-3 text-center font-heading text-5xl text-white sm:text-6xl"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
        >
          Where We Celebrate
        </motion.h2>

        <motion.div
          className="mt-10 grid gap-7 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {locations.map((ceremony, index) => {
            const mapQuery = buildMapQuery(ceremony.venueName, ceremony.venueAddress);
            const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=14&output=embed`;
            const openMapLink = ceremony.venueMapLink ?? `https://maps.google.com/?q=${encodeURIComponent(mapQuery)}`;

            return (
              <motion.article
                key={ceremony.name}
                className="rounded-[2rem] border border-[#9e7a48]/30 bg-[#f8f6f2] p-6 text-center shadow-[0_18px_35px_rgba(35,25,12,0.2)]"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                whileHover={{ y: -8, boxShadow: "0 22px 38px rgba(35,25,12,0.24)" }}
              >
                <p className="font-heading text-4xl text-[#8a653b]">{ceremony.name}</p>
                <motion.div
                  className="mt-4 border-y border-[#d9ceb9] py-4"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/images/location.png"
                    alt="Venue illustration"
                    width={680}
                    height={420}
                    className="mx-auto h-auto w-full max-w-[280px] object-contain"
                  />
                </motion.div>

                <div className="mt-5 text-[#8a653b]">
                  <p className="font-heading text-sm uppercase tracking-[0.28em] text-[#9a7a4f]">{ceremony.dayLabel}</p>
                  <p className="font-heading text-2xl">{ceremony.venueName}</p>
                  {ceremony.dateLabel || ceremony.timeLabel ? (
                    <p className="mt-4 font-heading text-3xl text-[#9a7a4f]">
                      {ceremony.dateLabel}
                      {ceremony.dateLabel && ceremony.timeLabel ? "  |  " : ""}
                      {ceremony.timeLabel}
                    </p>
                  ) : null}
                  <p className="mt-5 text-2xl leading-[1.28]">{ceremony.venueAddress[0]}</p>
                  {ceremony.venueAddress.slice(1).map((line) => (
                    <p key={line} className="mt-1 text-xl text-[#9a7a4f]">
                      {line}
                    </p>
                  ))}
                </div>

                <motion.div
                  className="mt-6 overflow-hidden rounded-2xl border border-[#d3c8b3]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  <iframe
                    src={mapEmbedUrl}
                    title={`${ceremony.name} location map`}
                    className="h-56 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </motion.div>

                <motion.a
                  href={openMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 border-b border-[#b79a71] pb-1 font-heading text-xl uppercase tracking-[0.2em] text-[#8a653b]"
                  whileHover={{ y: -2 }}
                >
                  Open In Maps
                </motion.a>
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
