"use client";

import { useEffect, useRef, useState } from "react";
import { getOrCreateBackgroundAudio, pauseBackgroundAudio, startBackgroundAudio } from "@/lib/background-audio";

interface MusicToggleProps {
  src?: string;
}

export default function MusicToggle({ src }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!src) {
      return;
    }

    const audio = getOrCreateBackgroundAudio(src);
    if (!audio) {
      return;
    }

    const syncState = () => {
      setIsPlaying(!audio.paused);
    };

    syncState();
    audio.addEventListener("play", syncState);
    audio.addEventListener("pause", syncState);
    audio.addEventListener("ended", syncState);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener("play", syncState);
      audio.removeEventListener("pause", syncState);
      audio.removeEventListener("ended", syncState);
    };
  }, [src]);

  const toggleAudio = async () => {
    const audio = audioRef.current ?? (src ? getOrCreateBackgroundAudio(src) : null);
    if (!audio) {
      return;
    }

    try {
      if (!audio.paused) {
        pauseBackgroundAudio(src);
        setIsPlaying(false);
      } else {
        await startBackgroundAudio(src);
        setIsPlaying(true);
      }
    } catch {
      setIsPlaying(false);
    }
  };

  if (!src) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleAudio}
      className="music-toggle"
      aria-label={isPlaying ? "Stop background music" : "Play background music"}
      title={isPlaying ? "Stop music" : "Play music"}
      data-testid="music-toggle"
    >
      {isPlaying ? (
        <svg
          className="music-toggle-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="m16 9 5 5" />
          <path d="m21 9-5 5" />
        </svg>
      ) : (
        <svg
          className="music-toggle-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 6a9 9 0 0 1 0 12" />
        </svg>
      )}
      <span className="sr-only">{isPlaying ? "Music On" : "Music Off"}</span>
    </button>
  );
}
