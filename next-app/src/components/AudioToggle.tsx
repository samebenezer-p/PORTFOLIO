"use client";

/**
 * AudioToggle.tsx — Phase 3 Standalone Audio Mute/Unmute Component
 *
 * This is a NEW standalone component. The existing AudioSystem.tsx is NOT modified.
 *
 * This component reads/writes the same `nexus_audio_muted` localStorage key
 * used by AudioSystem, so both stay in sync without any coupling.
 *
 * Usage: Drop <AudioToggle /> wherever you want — e.g., inside a nav bar:
 *   import AudioToggle from "@/components/AudioToggle";
 *   <nav>
 *     ...
 *     <AudioToggle />
 *   </nav>
 *
 * The existing AudioSystem mute button continues to work independently.
 */

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const STORAGE_KEY = "nexus_audio_muted";

export default function AudioToggle({
  className = "",
  size = "sm",
}: {
  /** Extra class names for the button */
  className?: string;
  /** "sm" = 36px, "md" = 44px, "lg" = 52px */
  size?: "sm" | "md" | "lg";
}) {
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "true";
  });

  // Keep in sync if AudioSystem changes the value from another instance
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setMuted(e.newValue === "true");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));

      // Notify AudioSystem engine if it's available on window
      if (typeof window !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nexusAudio = (window as unknown as { nexusAudio?: { setMuted: (m: boolean) => void } }).nexusAudio;
        if (nexusAudio?.setMuted) nexusAudio.setMuted(next);
      }
      return next;
    });
  }, []);

  const sizeMap = { sm: 36, md: 44, lg: 52 };
  const dim = sizeMap[size];
  const iconSize = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };

  return (
    <motion.button
      onClick={toggle}
      aria-label={muted ? "Unmute audio" : "Mute audio"}
      title={muted ? "Unmute audio" : "Mute audio"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`flex items-center justify-center rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${className}`}
      style={{
        width: dim,
        height: dim,
        border: muted
          ? "1px solid rgba(165,180,195,0.25)"
          : "1px solid rgba(0,229,255,0.35)",
        background: muted
          ? "rgba(8,18,30,0.7)"
          : "rgba(0,229,255,0.06)",
        boxShadow: muted
          ? "none"
          : "0 0 12px rgba(0,229,255,0.2)",
        backdropFilter: "blur(8px)",
      }}
    >
      {muted ? (
        <VolumeX className={`${iconSize[size]} text-[#A5B4C3]`} />
      ) : (
        <Volume2 className={`${iconSize[size]} text-[#00E5FF]`} />
      )}
    </motion.button>
  );
}
