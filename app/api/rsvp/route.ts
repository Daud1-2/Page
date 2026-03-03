import { NextResponse } from "next/server";
import { weddingConfig } from "@/config/wedding";

export const runtime = "nodejs";

interface RSVPRequestBody {
  fullName?: string;
  attendance?: "yes" | "no";
  guests?: number;
  childrenAttending?: "yes" | "no";
  messageForCouple?: string;
  mode?: string;
  link?: string;
}

function isMissing(value: string | undefined): boolean {
  return !value || value.trim().length === 0;
}

function toSafeGuests(value: unknown): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return 1;
  }
  return Math.min(Math.max(Math.round(parsed), 1), 20);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as RSVPRequestBody | null;

  if (!body?.fullName || body.fullName.trim().length === 0) {
    return NextResponse.json({ message: "Full name is required." }, { status: 400 });
  }

  const recipientEmail = weddingConfig.rsvpRecipientEmail;
  if (isMissing(recipientEmail)) {
    return NextResponse.json({ message: "RSVP service is not configured yet." }, { status: 500 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RSVP_FROM_EMAIL;
  const hasPlaceholderKey = (resendApiKey ?? "").includes("REPLACE_WITH");

  if (isMissing(resendApiKey) || isMissing(fromEmail) || hasPlaceholderKey) {
    return NextResponse.json(
      { message: "RSVP service is not configured yet. Please ask host to finish email setup." },
      { status: 500 },
    );
  }

  try {
    const guests = toSafeGuests(body.guests);
    const attendance = body.attendance === "no" ? "No" : "Yes";
    const children = body.childrenAttending === "yes" ? "Yes" : "No";
    const message = body.messageForCouple?.trim() || "-";
    const mode = body.mode || "-";
    const rsvpLink = body.link || "-";

    const text = [
      "New RSVP Submission",
      "",
      `Full Name: ${body.fullName.trim()}`,
      `Attending: ${attendance}`,
      `Number of Guests: ${guests}`,
      `Children Attending: ${children}`,
      `Message for the Couple: ${message}`,
      `RSVP Mode: ${mode}`,
      `RSVP Link: ${rsvpLink}`,
    ].join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        subject: `Wedding RSVP - ${body.fullName.trim()}`,
        text,
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text().catch(() => "");
      console.error("RSVP email send failed", errorBody);
      return NextResponse.json({ message: "Failed to send RSVP email." }, { status: 500 });
    }

    return NextResponse.json({ message: "RSVP sent successfully." });
  } catch {
    console.error("RSVP email send failed");
    return NextResponse.json({ message: "Failed to send RSVP email." }, { status: 500 });
  }
}
