"use client";

const AUDIO_CACHE_KEY = "__weddingBackgroundAudio__";

interface WindowWithBackgroundAudio extends Window {
  __weddingBackgroundAudio__?: HTMLAudioElement;
}

function resolveSrc(src: string): string {
  return new URL(src, window.location.origin).toString();
}

export function getOrCreateBackgroundAudio(src: string): HTMLAudioElement | null {
  if (typeof window === "undefined" || !src) {
    return null;
  }

  const windowWithAudio = window as WindowWithBackgroundAudio;
  const desiredSrc = resolveSrc(src);
  const cachedAudio = windowWithAudio[AUDIO_CACHE_KEY];

  if (cachedAudio && cachedAudio.src === desiredSrc) {
    return cachedAudio;
  }

  if (cachedAudio) {
    cachedAudio.pause();
  }

  const audio = new Audio(src);
  audio.loop = true;
  audio.preload = "auto";
  windowWithAudio[AUDIO_CACHE_KEY] = audio;
  return audio;
}

export async function startBackgroundAudio(src?: string): Promise<boolean> {
  if (!src) {
    return false;
  }

  const audio = getOrCreateBackgroundAudio(src);
  if (!audio) {
    return false;
  }

  try {
    await audio.play();
    return true;
  } catch {
    return false;
  }
}

export function pauseBackgroundAudio(src?: string): void {
  if (!src) {
    return;
  }

  const audio = getOrCreateBackgroundAudio(src);
  audio?.pause();
}
