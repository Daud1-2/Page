"use client";

import { motion } from "framer-motion";

interface FooterProps {
  weddingDateISO: string;
  coupleNames: string;
  creditUrl?: string;
}

function formatDisplayDate(isoDate: string): string {
  const parsedDate = new Date(`${isoDate}T00:00:00`);

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function splitCoupleNames(coupleNames: string): { first: string; second: string } {
  const normalized = coupleNames.replace(/\s*&\s*/g, "&");
  const [first, second] = normalized.split("&");

  return {
    first: first?.trim() || coupleNames,
    second: second?.trim() || "",
  };
}

export default function Footer({ weddingDateISO, coupleNames, creditUrl }: FooterProps) {
  const { first, second } = splitCoupleNames(coupleNames);

  return (
    <footer
      id="footer"
      data-testid="section-footer"
      className="mx-[calc(50%-50vw)] w-screen bg-[#f7f4ec] px-5 pb-20 pt-14 sm:px-8"
    >
      <motion.div
        className="mx-auto max-w-xl rounded-[1.8rem] border border-[#e7dfcf] bg-[#fbf8f2] p-8 text-center shadow-[0_18px_35px_rgba(28,20,10,0.12)] sm:p-10"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <motion.p
          className="font-heading text-7xl italic text-[#8a653b]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
        >
          {first}
        </motion.p>
        <motion.p
          className="mt-3 font-heading text-4xl text-[#8a653b]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
        >
          &amp;
        </motion.p>
        {second ? (
          <motion.p
            className="mt-2 font-heading text-7xl italic text-[#8a653b]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
          >
            {second}
          </motion.p>
        ) : null}
        <motion.p
          className="mt-8 font-heading text-5xl font-semibold text-[#b59a67]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.32 }}
        >
          {formatDisplayDate(weddingDateISO)}
        </motion.p>
        <motion.p
          className="mt-14 text-2xl text-[#8f8470]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.42 }}
        >
          Made with love by{" "}
          <motion.a
            href={creditUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline decoration-2 underline-offset-4"
            whileHover={{ y: -1 }}
          >
            The Digital Yes
          </motion.a>
        </motion.p>
      </motion.div>
    </footer>
  );
}
