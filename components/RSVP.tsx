"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { RSVPMode } from "@/config/wedding";

interface RSVPProps {
  mode: RSVPMode;
  link: string;
}

export default function RSVP({ mode, link }: RSVPProps) {
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState(1);
  const [fullName, setFullName] = useState("");
  const [childrenAttending, setChildrenAttending] = useState<"yes" | "no">("no");
  const [messageForCouple, setMessageForCouple] = useState("");
  const [sendState, setSendState] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const decreaseGuests = () => setGuests((current) => Math.max(current - 1, 1));
  const increaseGuests = () => setGuests((current) => Math.min(current + 1, 20));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName.trim()) {
      setSendState("Please enter your full name.");
      return;
    }

    setIsSubmitting(true);
    setSendState("");

    try {
      const response = await fetch("/api/rsvp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          attendance,
          guests,
          childrenAttending,
          messageForCouple: messageForCouple.trim(),
          mode,
          link,
        }),
      });

      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setSendState(data?.message ?? "Could not send RSVP right now.");
        return;
      }

      setSendState("RSVP sent successfully.");
      setAttendance("yes");
      setGuests(1);
      setFullName("");
      setChildrenAttending("no");
      setMessageForCouple("");
    } catch {
      setSendState("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" data-testid="section-rsvp" className="mx-[calc(50%-50vw)] w-screen bg-[#b8965f] px-5 py-14">
      <motion.div
        className="mx-auto max-w-sm rounded-[1.5rem] border border-[#a5834f]/35 bg-[#f9f8f4] p-4 shadow-[0_14px_28px_rgba(30,20,10,0.2)] sm:p-5"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -4 }}
      >
        <p className="eyebrow">Please RSVP</p>
        <h2 className="mt-2 font-heading text-4xl text-[var(--theme-primary)]">Will You Attend?</h2>

        <form onSubmit={handleSubmit} className="mt-5">
          <motion.div
            className="space-y-3 rounded-xl border border-[#d8c8ac] bg-white/70 p-4 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
          >
            <p className="font-heading text-3xl text-[#8a653b]">Will you be attending? *</p>

            <motion.label
              className="flex cursor-pointer items-center gap-3 text-[#8a653b]"
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            >
              <input
                type="radio"
                name="attendance"
                checked={attendance === "yes"}
                onChange={() => setAttendance("yes")}
                className="h-5 w-5 accent-[#8a653b]"
              />
              <span className="font-heading text-2xl">Yes, I&apos;ll be there</span>
            </motion.label>

            <motion.label
              className="flex cursor-pointer items-center gap-3 text-[#8a653b]"
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            >
              <input
                type="radio"
                name="attendance"
                checked={attendance === "no"}
                onChange={() => setAttendance("no")}
                className="h-5 w-5 accent-[#8a653b]"
              />
              <span className="font-heading text-2xl">Unfortunately, I can&apos;t make it</span>
            </motion.label>

            <div className="pt-1">
              <p className="font-heading text-3xl text-[#8a653b]">How many guests?</p>
              <div className="mt-3 flex items-center gap-4">
                <motion.button
                  type="button"
                  onClick={decreaseGuests}
                  className="h-10 w-10 rounded-xl border border-[#d8c8ac] bg-white text-xl text-[#8a653b]"
                  aria-label="Decrease guests"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                >
                  -
                </motion.button>
                <span className="w-6 text-center font-heading text-3xl text-[#8a653b]">{guests}</span>
                <motion.button
                  type="button"
                  onClick={increaseGuests}
                  className="h-10 w-10 rounded-xl border border-[#d8c8ac] bg-white text-xl text-[#8a653b]"
                  aria-label="Increase guests"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                >
                  +
                </motion.button>
              </div>
            </div>

            <div className="pt-1">
              <label className="text-[#8a653b]">
                <span className="mb-2 block font-heading text-2xl">Full Name *</span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="w-full rounded-xl border border-[#d8c8ac] bg-white px-3 py-2 text-base text-[#5f4a2f] outline-none focus:border-[#b08c57]"
                  placeholder="Your full name"
                  required
                />
              </label>
            </div>

            <label className="block text-[#8a653b]">
              <span className="mb-2 block font-heading text-2xl">Will any children be attending?</span>
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-[#8a653b]">
                  <input
                    type="radio"
                    name="children-attending"
                    checked={childrenAttending === "yes"}
                    onChange={() => setChildrenAttending("yes")}
                    className="h-5 w-5 accent-[#8a653b]"
                  />
                  <span className="font-heading text-2xl">Yes</span>
                </label>
                <label className="flex items-center gap-3 text-[#8a653b]">
                  <input
                    type="radio"
                    name="children-attending"
                    checked={childrenAttending === "no"}
                    onChange={() => setChildrenAttending("no")}
                    className="h-5 w-5 accent-[#8a653b]"
                  />
                  <span className="font-heading text-2xl">No</span>
                </label>
              </div>
            </label>

            <label className="block text-[#8a653b]">
              <span className="mb-2 block font-heading text-2xl">Message for the couple</span>
              <textarea
                value={messageForCouple}
                onChange={(event) => setMessageForCouple(event.target.value)}
                className="min-h-20 w-full rounded-xl border border-[#d8c8ac] bg-white px-3 py-2 text-base text-[#5f4a2f] outline-none focus:border-[#b08c57]"
                placeholder="Type your message here..."
              />
            </label>
          </motion.div>

          <div className="mt-4 rounded-xl border border-[#af9165]/45 bg-gradient-to-r from-[#b18f5a] to-[#aa8652] px-3 py-2">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 font-heading text-2xl text-[#f7f1e7]"
              data-testid="rsvp-button"
              whileHover={{ x: 3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span aria-hidden="true">{">"}</span>
              {isSubmitting ? "Sending..." : "Send RSVP"}
            </motion.button>
          </div>

          {sendState ? (
            <p
              className={`mt-3 rounded-lg px-3 py-2 text-sm ${
                sendState.toLowerCase().includes("success")
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {sendState}
            </p>
          ) : null}
        </form>
      </motion.div>
    </section>
  );
}
