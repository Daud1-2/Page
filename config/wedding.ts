import clientConfigJson from "@/config/client.json";

export type ThemeKey = "classic" | "rustic" | "modern";
export type RSVPMode = "whatsapp" | "google_form" | "email";

export interface WeddingEvent {
  name: string;
  time: string;
}

export interface CeremonyDetail {
  name: string;
  dayLabel: string;
  dateLabel: string;
  timeLabel: string;
  venueName: string;
  venueAddress: string[];
  venueMapLink?: string;
  highlights?: WeddingEvent[];
  contacts?: string[];
}

export interface WeddingConfig {
  brideName: string;
  groomName: string;
  coupleNames: string;
  weddingDateISO: string;
  weddingDateLabel: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  venueMapLink: string;
  events: WeddingEvent[];
  rsvpMode: RSVPMode;
  rsvpLink: string;
  rsvpRecipientEmail?: string;
  footerCreditUrl?: string;
  theme: ThemeKey;
  heroVideo: string;
  ceremonyDetails?: CeremonyDetail[];
  personalMessage?: string;
  dressCode?: string;
  backgroundMusic?: string;
}

export interface ClientConfigContent extends Omit<WeddingConfig, "theme"> {
  schemaVersion: number;
}

const defaultClientConfig: ClientConfigContent = {
  schemaVersion: 1,
  brideName: "Bride",
  groomName: "Groom",
  coupleNames: "Bride & Groom",
  weddingDateISO: "2026-12-15",
  weddingDateLabel: "December 15, 2026",
  weddingTime: "4:00 PM",
  venueName: "Wedding Venue",
  venueAddress: "Venue Address",
  venueMapLink: "https://maps.google.com/",
  events: [{ name: "Ceremony", time: "4:00 PM" }],
  rsvpMode: "whatsapp",
  rsvpLink: "",
  rsvpRecipientEmail: "",
  footerCreditUrl: "",
  heroVideo: "/video/hero.mp4",
  ceremonyDetails: [],
  personalMessage: "We joyfully invite you to celebrate our special day with us.",
  dressCode: "",
  backgroundMusic: "",
};

const clientConfig = clientConfigJson as Partial<ClientConfigContent>;

const mergedClientConfig = {
  ...defaultClientConfig,
  ...clientConfig,
};

const clientContent = Object.fromEntries(
  Object.entries(mergedClientConfig).filter(([key]) => key !== "schemaVersion"),
) as Omit<ClientConfigContent, "schemaVersion">;

export const weddingConfig: WeddingConfig = {
  ...clientContent,
  theme: "rustic",
};
