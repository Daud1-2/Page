"use client";

import { useMemo } from "react";
import EventDetails from "@/components/EventDetails";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InvitationMessage from "@/components/InvitationMessage";
import CountdownSection from "@/components/CountdownSection";
import Location from "@/components/Location";
import MusicToggle from "@/components/MusicToggle";
import RSVP from "@/components/RSVP";
import SectionDecoration from "@/components/SectionDecoration";
import { getThemeStyle } from "@/config/themes";
import { weddingConfig } from "@/config/wedding";

export default function PreviewPage() {
  const themeStyle = useMemo(() => getThemeStyle(weddingConfig.theme), []);
  const message =
    weddingConfig.personalMessage ?? "We joyfully invite you to celebrate our special day with us.";

  return (
    <div className="invite-root" style={themeStyle}>
      <MusicToggle src={weddingConfig.backgroundMusic} />

      <main>
        <Hero
          coupleNames={weddingConfig.coupleNames}
          weddingDateLabel={weddingConfig.weddingDateLabel}
          heroVideo={weddingConfig.heroVideo}
        />
        <CountdownSection
          weddingDateISO={weddingConfig.weddingDateISO}
          weddingTime={weddingConfig.weddingTime}
        />
        <SectionDecoration src="/images/decoration1.png" />
        <InvitationMessage message={message} />
        <SectionDecoration src="/images/decoration2.png" mirrored />
        <EventDetails config={weddingConfig} />
        <SectionDecoration src="/images/decoration3.png" />
        <Location
          venueName={weddingConfig.venueName}
          venueAddress={weddingConfig.venueAddress}
          venueMapLink={weddingConfig.venueMapLink}
          ceremonyDetails={weddingConfig.ceremonyDetails}
        />
        <RSVP
          mode={weddingConfig.rsvpMode}
          link={weddingConfig.rsvpLink}
        />
        <Footer
          weddingDateISO={weddingConfig.weddingDateISO}
          coupleNames={weddingConfig.coupleNames}
          creditUrl={weddingConfig.footerCreditUrl}
        />
      </main>
    </div>
  );
}
