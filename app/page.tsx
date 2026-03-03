"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getThemeStyle } from "@/config/themes";
import { weddingConfig } from "@/config/wedding";
import { startBackgroundAudio } from "@/lib/background-audio";

export default function Home() {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);
  const themeStyle = getThemeStyle(weddingConfig.theme);

  const openInvitation = () => {
    if (isClosing) {
      return;
    }
    void startBackgroundAudio(weddingConfig.backgroundMusic);
    setIsClosing(true);
    window.setTimeout(() => {
      router.push("/preview");
    }, 900);
  };

  return (
    <main className="opening-screen min-h-screen" style={themeStyle} data-testid="opening-screen">
      <h1 className="sr-only">Wedding Invitation</h1>
      <button
        type="button"
        className={`opening-letter ${isClosing ? "is-closing" : ""}`}
        onClick={openInvitation}
        aria-label="Open invitation"
        data-testid="open-invitation-trigger"
      >
        <Image
          src="/images/envelope-seal.png"
          alt="Envelope with wax seal"
          fill
          priority
          className="opening-image"
          sizes="100vw"
        />
        <span className="opening-hint">Click here</span>
      </button>
    </main>
  );
}
