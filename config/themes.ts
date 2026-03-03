import type { ThemeKey } from "@/config/wedding";

export interface ThemeTokens {
  primary: string;
  secondary: string;
  accent: string;
  headingFont: string;
  bodyFont: string;
}

export const themePresets: Record<ThemeKey, ThemeTokens> = {
  classic: {
    primary: "#D4AF37",
    secondary: "#F5F5DC",
    accent: "#8B4513",
    headingFont: "var(--font-playfair)",
    bodyFont: "var(--font-lato)",
  },
  rustic: {
    primary: "#8B7355",
    secondary: "#F0EAD6",
    accent: "#556B2F",
    headingFont: "var(--font-cormorant)",
    bodyFont: "var(--font-open-sans)",
  },
  modern: {
    primary: "#000000",
    secondary: "#FFFFFF",
    accent: "#808080",
    headingFont: "var(--font-montserrat)",
    bodyFont: "var(--font-inter)",
  },
};

export function getThemeStyle(theme: ThemeKey): Record<string, string> {
  const tokens = themePresets[theme];

  return {
    "--theme-primary": tokens.primary,
    "--theme-secondary": tokens.secondary,
    "--theme-accent": tokens.accent,
    "--theme-heading-font": tokens.headingFont,
    "--theme-body-font": tokens.bodyFont,
  };
}
