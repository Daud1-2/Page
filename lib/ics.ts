import type { WeddingConfig } from "@/config/wedding";

interface ParsedTime {
  hours: number;
  minutes: number;
}

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

function escapeICS(input: string): string {
  return input
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function parseTimeLabel(timeLabel: string): ParsedTime {
  const match = timeLabel.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) {
    throw new Error(`Invalid time format: ${timeLabel}`);
  }

  const rawHours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (rawHours < 1 || rawHours > 12 || minutes < 0 || minutes > 59) {
    throw new Error(`Invalid time value: ${timeLabel}`);
  }

  const hours = (rawHours % 12) + (period === "PM" ? 12 : 0);
  return { hours, minutes };
}

export function buildEventDate(
  dateISO: string,
  timeLabel: string,
  durationMinutes = 120,
): { start: Date; end: Date } {
  const parts = dateISO.split("-").map(Number);
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    throw new Error(`Invalid date format: ${dateISO}`);
  }

  const [year, month, day] = parts;
  const { hours, minutes } = parseTimeLabel(timeLabel);
  const start = new Date(year, month - 1, day, hours, minutes, 0, 0);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  return { start, end };
}

export function formatICSDate(date: Date): string {
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(
    date.getHours(),
  )}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

export function generateCalendarIcs(config: Pick<
  WeddingConfig,
  "coupleNames" | "weddingDateISO" | "weddingTime" | "venueName" | "venueAddress"
>): string {
  const { start, end } = buildEventDate(config.weddingDateISO, config.weddingTime);
  const now = new Date();
  const uid = `${config.weddingDateISO}-${config.coupleNames.replace(/\s+/g, "-")}@wedding-invite`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${escapeICS(uid)}`,
    `DTSTAMP:${formatICSDate(now)}`,
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    `SUMMARY:${escapeICS(`${config.coupleNames} Wedding`)}`,
    `LOCATION:${escapeICS(`${config.venueName}, ${config.venueAddress}`)}`,
    `DESCRIPTION:${escapeICS(`Join us to celebrate the wedding of ${config.coupleNames}.`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return `${lines.join("\r\n")}\r\n`;
}

export function downloadCalendarIcs(config: Pick<
  WeddingConfig,
  "coupleNames" | "weddingDateISO" | "weddingTime" | "venueName" | "venueAddress"
>): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const icsData = generateCalendarIcs(config);
  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${config.coupleNames.toLowerCase().replace(/\s+/g, "-")}-wedding.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
