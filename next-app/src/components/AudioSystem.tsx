"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   PHASE 20 — AUDIO SYSTEM
   Procedural Web Audio API synthesis — no external files needed.
   Boot · Hover · Click · Typing · Notification
   Mute/unmute persisted to localStorage.
═══════════════════════════════════════════════════════════════ */

class NexusAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private muted = false;
  private initialized = false;

  init(muted: boolean) {
    if (this.initialized) return;
    this.muted = muted;
    try {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = muted ? 0 : 0.35;
      this.masterGain.connect(this.ctx.destination);
      this.initialized = true;
    } catch {
      /* AudioContext not available */
    }
  }

  resume() {
    if (this.ctx?.state === "suspended") this.ctx.resume();
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (!this.masterGain) return;
    const now = this.ctx!.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setTargetAtTime(m ? 0 : 0.35, now, 0.08);
  }

  /* ── Internal helpers ── */
  private ensureReady(): AudioContext | null {
    if (!this.ctx || !this.masterGain) return null;
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  }

  private osc(
    freq: number,
    type: OscillatorType,
    durationSec: number,
    gain = 0.3,
    freqEnd?: number
  ) {
    const ctx = this.ensureReady();
    if (!ctx || !this.masterGain) return;

    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationSec);
    g.connect(this.masterGain);

    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, ctx.currentTime);
    if (freqEnd !== undefined) {
      o.frequency.exponentialRampToValueAtTime(
        freqEnd,
        ctx.currentTime + durationSec
      );
    }
    o.connect(g);
    o.start(ctx.currentTime);
    o.stop(ctx.currentTime + durationSec + 0.05);
  }

  private noise(durationSec: number, gain = 0.08, filterFreq = 800) {
    const ctx = this.ensureReady();
    if (!ctx || !this.masterGain) return;

    const bufSize = ctx.sampleRate * durationSec;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = filterFreq;
    filter.Q.value = 0.5;

    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationSec);

    src.connect(filter);
    filter.connect(g);
    g.connect(this.masterGain);
    src.start(ctx.currentTime);
  }

  /* ── Public sound API ── */

  /** Ascending sweep + noise burst — plays once on first interaction */
  playBoot() {
    if (this.muted) return;
    // Ascending chord sweep
    this.osc(110, "sine", 0.6, 0.18, 440);
    setTimeout(() => this.osc(220, "triangle", 0.5, 0.12, 660), 120);
    setTimeout(() => this.osc(440, "sine", 0.4, 0.10, 880), 280);
    setTimeout(() => this.noise(0.25, 0.04, 1200), 350);
    setTimeout(() => this.osc(880, "sine", 0.3, 0.08), 520);
  }

  /** Short blip on button/link hover */
  playHover() {
    if (this.muted) return;
    this.osc(660, "sine", 0.055, 0.06, 800);
  }

  /** Click confirmation tone */
  playClick() {
    if (this.muted) return;
    this.osc(300, "sine", 0.04, 0.12);
    setTimeout(() => this.osc(600, "sine", 0.03, 0.06), 20);
  }

  /** Terminal keystroke tick */
  playTyping() {
    if (this.muted) return;
    const freq = 700 + Math.random() * 300;
    this.osc(freq, "square", 0.028, 0.04);
  }

  /** Two-tone notification chime */
  playNotification() {
    if (this.muted) return;
    this.osc(523, "sine", 0.18, 0.15); // C5
    setTimeout(() => this.osc(659, "sine", 0.22, 0.12), 170); // E5
    setTimeout(() => this.osc(784, "sine", 0.28, 0.09), 330); // G5
  }
}

/* ─── Singleton ─── */
let engineInstance: NexusAudioEngine | null = null;
function getEngine(): NexusAudioEngine {
  if (!engineInstance) engineInstance = new NexusAudioEngine();
  return engineInstance;
}

/* ════════════════════════════════════════
   React Component
════════════════════════════════════════ */
export default function AudioSystem() {
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("nexus_audio_muted") === "true";
  });
  const [showHint, setShowHint] = useState(false);
  const bootFired = useRef(false);
  const engine = useRef<NexusAudioEngine>(getEngine());

  /* Expose to global window so FuturisticTerminal can reach it */
  useEffect(() => {
    window.nexusAudio = engine.current;
  }, []);

  /* Initialize on first user gesture */
  useEffect(() => {
    const initialMuted =
      typeof window !== "undefined"
        ? localStorage.getItem("nexus_audio_muted") === "true"
        : false;

    const onFirstInteraction = () => {
      engine.current.init(initialMuted);
      engine.current.resume();

      if (!bootFired.current && !initialMuted) {
        bootFired.current = true;
        setTimeout(() => engine.current.playBoot(), 200);
      }

      // Show hint briefly
      setShowHint(true);
      setTimeout(() => setShowHint(false), 2800);

      // Wire hover sound on interactive elements
      const addHover = () => {
        document.querySelectorAll<HTMLElement>(
          "button, a, .mag-btn"
        ).forEach((el) => {
          if (el.dataset.audioWired) return;
          el.dataset.audioWired = "1";
          el.addEventListener(
            "mouseenter",
            () => engine.current.playHover(),
            { passive: true }
          );
          el.addEventListener(
            "click",
            () => engine.current.playClick(),
            { passive: true }
          );
        });
      };
      addHover();
      setTimeout(addHover, 2000); // re-run after lazy components mount

      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };

    window.addEventListener("click", onFirstInteraction, { once: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, []);

  /* Sync muted state to engine */
  useEffect(() => {
    engine.current.setMuted(muted);
    localStorage.setItem("nexus_audio_muted", String(muted));
  }, [muted]);

  const toggle = useCallback(() => {
    setMuted((m) => !m);
    engine.current.playClick();
  }, []);

  return (
    <>
      {/* ── Mute / Unmute Button ── */}
      <motion.button
        id="audio-toggle-btn"
        onClick={toggle}
        title={muted ? "Unmute Audio" : "Mute Audio"}
        aria-label={muted ? "Unmute Audio" : "Mute Audio"}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring", bounce: 0.4 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: "fixed",
          bottom: "6rem",
          right: "1.5rem",
          zIndex: 9000,
          width: "2.8rem",
          height: "2.8rem",
          borderRadius: "50%",
          border: "1px solid rgba(0,229,255,0.25)",
          background: "rgba(8,18,30,0.85)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: muted
            ? "0 0 10px rgba(165,180,195,0.15)"
            : "0 0 14px rgba(0,229,255,0.3)",
          transition: "box-shadow 0.3s",
        }}
      >
        {muted ? (
          <VolumeX className="w-4 h-4 text-[#A5B4C3]" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#00E5FF]" />
        )}
      </motion.button>

      {/* ── "Audio active" hint tooltip ── */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            style={{
              position: "fixed",
              bottom: "6.6rem",
              right: "5rem",
              zIndex: 9000,
              background: "rgba(8,18,30,0.9)",
              border: "1px solid rgba(0,229,255,0.2)",
              borderRadius: "6px",
              padding: "4px 10px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: "#00E5FF",
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
            }}
          >
            AUDIO ONLINE
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
