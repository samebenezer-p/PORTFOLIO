"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { Rocket, Cpu, Zap, Globe, Sparkles, Power } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   PHASE 24 — CINEMATIC FOOTER + SHUTDOWN SEQUENCE
   Interactive shutdown trigger with typewriter-style sequence
═══════════════════════════════════════════════════════════════ */

const POWERS = [
  { label: "Innovation", icon: <Zap className="w-5 h-5" />, color: "#FFC107", delay: 0.3 },
  { label: "Consistency", icon: <Cpu className="w-5 h-5" />, color: "#00E5FF", delay: 0.5 },
  { label: "Curiosity", icon: <Globe className="w-5 h-5" />, color: "#00FF88", delay: 0.7 },
];

const SHUTDOWN_STEPS = [
  "Saving Session...",
  "Closing Neural Interface...",
  "Powering Down...",
  "Session Terminated.",
];

function CounterUp({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (ref.current) ref.current.textContent = String(Math.floor(from + (to - from) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, from, to, duration]);

  return <span ref={ref}>{from}</span>;
}

function ShutdownTypewriter({ text, onDone }: { text: string; onDone: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const doneRef = useRef(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        // Play typing sound
        if (typeof window !== "undefined" && window.nexusAudio) {
          window.nexusAudio.playTyping();
        }
        i++;
      } else {
        clearInterval(interval);
        if (!doneRef.current) {
          doneRef.current = true;
          setTimeout(onDone, 600);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, onDone]);

  return (
    <div className="font-mono text-sm text-[#00E5FF] tracking-widest flex items-center justify-center gap-2">
      <span className="text-[#00FF88]">&gt;</span>
      <span>{displayed}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="inline-block w-2 h-4 bg-[#00E5FF]"
      />
    </div>
  );
}

export default function CinematicFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [shutdownActive, setShutdownActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [shutdownComplete, setShutdownComplete] = useState(false);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const initiateShutdown = useCallback(() => {
    if (shutdownActive) return;
    setShutdownActive(true);

    // Play click sound
    if (typeof window !== "undefined" && window.nexusAudio) {
      window.nexusAudio.playClick();
    }

    // Emit custom event for Arc Reactor & Particle fade
    window.dispatchEvent(new CustomEvent("nexus-shutdown-start"));

    // Start the first step
    setCurrentStep(0);
  }, [shutdownActive]);

  const advanceStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev + 1;
      if (next >= SHUTDOWN_STEPS.length) {
        // Final step done — complete shutdown
        setTimeout(() => {
          setShutdownComplete(true);
          window.dispatchEvent(new CustomEvent("nexus-shutdown-complete"));
        }, 800);
        return prev;
      }
      return next;
    });
  }, []);

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-[#00E5FF]/10"
      style={{ background: "linear-gradient(to bottom, #050816, #020510)" }}
      role="contentinfo"
      aria-label="Footer"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top energy core */}
      <div className="flex justify-center pt-16 pb-4 relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="relative"
        >
          {/* Outer rings */}
          {[60, 80, 100].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-[#00E5FF]"
              style={{
                width: size,
                height: size,
                top: `calc(50% - ${size / 2}px)`,
                left: `calc(50% - ${size / 2}px)`,
                opacity: 0.15 + i * 0.05,
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* Core glow */}
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-[#00E5FF] relative z-10"
            style={{
              background: "radial-gradient(circle, rgba(0,229,255,0.3), rgba(5,8,22,0.9))",
              boxShadow: "0 0 40px #00E5FF, 0 0 80px #00E5FF40",
            }}
            animate={{ boxShadow: ["0 0 30px #00E5FF60", "0 0 60px #00E5FF", "0 0 30px #00E5FF60"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Rocket className="w-7 h-7 text-[#00E5FF]" />
          </motion.div>
        </motion.div>
      </div>

      {/* MISSION COMPLETE */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center px-6 py-8 space-y-3"
      >
        <motion.div
          initial={{ letterSpacing: "0.5em", opacity: 0 }}
          animate={inView ? { letterSpacing: "0.3em", opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-mono text-[10px] text-[#00E5FF]/50 tracking-[0.5em] uppercase"
        >
          // MISSION COMPLETE
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-3xl md:text-5xl font-black text-white tracking-wider"
          style={{ textShadow: "0 0 30px rgba(0,229,255,0.4)" }}
        >
          Thank You For Visiting
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="space-y-1"
        >
          <p className="text-xl font-bold text-[#00E5FF] font-mono tracking-widest">SAM EBENEZER P</p>
          <p className="text-sm text-[#A5B4C3]/60 font-mono">Personal AI Operating System // NEXUS v2.0.26</p>
        </motion.div>
      </motion.div>

      {/* Powered By */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9 }}
        className="text-center pb-8 px-6"
      >
        <p className="font-mono text-[10px] text-[#A5B4C3]/40 tracking-widest mb-6 uppercase">Powered By</p>
        <div className="flex flex-wrap justify-center gap-6">
          {POWERS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: p.delay, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.1, y: -4 }}
              className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border cursor-default"
              style={{
                borderColor: `${p.color}25`,
                background: `${p.color}08`,
                boxShadow: `0 0 20px ${p.color}15`,
              }}
            >
              <div style={{ color: p.color }}>{p.icon}</div>
              <span className="font-mono text-xs font-bold" style={{ color: p.color }}>{p.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.0 }}
        className="flex flex-wrap justify-center gap-8 pb-8 px-6"
      >
        {[
          { label: "Problems Solved", value: 312, suffix: "+" },
          { label: "Certifications", value: 5, suffix: "" },
          { label: "Projects Built", value: 4, suffix: "" },
          { label: "GitHub Commits", value: 847, suffix: "" },
        ].map((s, i) => (
          <div key={i} className="text-center font-mono">
            <div className="text-2xl font-black text-[#00E5FF]">
              <CounterUp from={0} to={s.value} duration={2} />{s.suffix}
            </div>
            <div className="text-[9px] text-[#A5B4C3]/40 mt-0.5 uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Future Software Engineer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.1 }}
        className="text-center pb-10 px-6"
      >
        <div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full border"
          style={{
            borderColor: "#00E5FF50",
            background: "linear-gradient(135deg, rgba(0,229,255,0.1), rgba(24,255,255,0.05))",
            boxShadow: "0 0 20px rgba(0,229,255,0.2)",
          }}
        >
          <Sparkles className="w-4 h-4 text-[#00E5FF]" />
          <span className="font-mono text-sm font-bold text-white tracking-widest">Future Software Engineer</span>
          <Sparkles className="w-4 h-4 text-[#00E5FF]" />
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════
         PHASE 24 — SHUTDOWN SEQUENCE SECTION
      ════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
        className="border-t border-[#00E5FF]/5 py-8 px-6 text-center space-y-6"
      >
        {/* Shutdown button (before activation) */}
        <AnimatePresence mode="wait">
          {!shutdownActive && (
            <motion.button
              key="shutdown-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={initiateShutdown}
              aria-label="Initiate shutdown sequence"
              className="mag-btn inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border font-mono text-xs tracking-widest cursor-pointer transition-all duration-300 hover:scale-105 group"
              style={{
                borderColor: "rgba(255,51,102,0.25)",
                background: "rgba(255,51,102,0.04)",
                color: "#FF3366",
                boxShadow: "0 0 15px rgba(255,51,102,0.1)",
              }}
            >
              <Power className="w-4 h-4 group-hover:animate-spin" />
              INITIATE_SHUTDOWN_SEQUENCE.sys
            </motion.button>
          )}
        </AnimatePresence>

        {/* Shutdown typewriter sequence */}
        <AnimatePresence>
          {shutdownActive && currentStep >= 0 && !shutdownComplete && (
            <motion.div
              key="shutdown-sequence"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 py-4"
            >
              {/* Previous completed steps */}
              {SHUTDOWN_STEPS.slice(0, currentStep).map((step, i) => (
                <motion.div
                  key={`done-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  className="font-mono text-sm text-[#A5B4C3] tracking-widest flex items-center justify-center gap-2"
                >
                  <span className="text-[#00FF88]">✓</span>
                  <span>{step}</span>
                </motion.div>
              ))}

              {/* Current typing step */}
              {currentStep < SHUTDOWN_STEPS.length && (
                <ShutdownTypewriter
                  key={`step-${currentStep}`}
                  text={SHUTDOWN_STEPS[currentStep]}
                  onDone={advanceStep}
                />
              )}

              {/* Progress bar */}
              <div className="max-w-xs mx-auto">
                <div className="h-1 rounded-full bg-[#08121E] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(to right, #00E5FF, #FF3366)" }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${((currentStep + 1) / SHUTDOWN_STEPS.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="font-mono text-[9px] text-[#A5B4C3]/30 mt-1.5 tracking-widest">
                  SHUTDOWN PROGRESS: {Math.min(Math.round(((currentStep + 1) / SHUTDOWN_STEPS.length) * 100), 100)}%
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final shutdown state */}
        <AnimatePresence>
          {shutdownComplete && (
            <motion.div
              key="shutdown-done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="space-y-4 py-6"
            >
              <motion.div
                className="font-mono text-lg font-bold text-[#FF3366] tracking-[0.3em]"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                SESSION TERMINATED
              </motion.div>
              <div className="font-mono text-[10px] text-[#A5B4C3]/20 tracking-widest space-y-1">
                <div>NEXUS_OS_SHUTDOWN // CLEARANCE_REVOKED</div>
                <div>ALL NEURAL INTERFACES DISCONNECTED</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Static pulsing text (before shutdown) */}
        {!shutdownActive && (
          <motion.div
            className="font-mono text-[10px] text-[#00E5FF]/30 tracking-[0.4em]"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            SESSION_ACTIVE // NEXUS_OS_ONLINE // AWAITING_COMMAND
          </motion.div>
        )}

        <div className="font-mono text-[9px] text-[#A5B4C3]/20">
          © 2026 SAM EBENEZER P. NEXUS OS v2.0.26. ALL RIGHTS RESERVED.
        </div>
      </motion.div>
    </footer>
  );
}
