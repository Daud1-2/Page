import { buildEventDate, formatICSDate, generateCalendarIcs } from "@/lib/ics";

describe("ics utility", () => {
  it("generates a valid VCALENDAR payload", () => {
    const ics = generateCalendarIcs({
      coupleNames: "Priya & Rahul",
      weddingDateISO: "2026-12-15",
      weddingTime: "4:00 PM",
      venueName: "The Grand Palace",
      venueAddress: "123 MG Road, Bangalore, India",
    });

    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("SUMMARY:Priya & Rahul Wedding");
    expect(ics).toContain("END:VCALENDAR");
  });

  it("builds start and end event times from date and 12-hour labels", () => {
    const { start, end } = buildEventDate("2026-12-15", "4:00 PM", 120);

    expect(start.getHours()).toBe(16);
    expect(start.getMinutes()).toBe(0);
    expect(end.getHours()).toBe(18);
    expect(end.getMinutes()).toBe(0);
    expect(formatICSDate(start)).toMatch(/^20261215T160000$/);
  });
});
