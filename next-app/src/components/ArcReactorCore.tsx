"use client";

import React, { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";

/* Phase 19 — Arc Reactor sonar-ping ring added
   Phase 21 — React.memo to prevent unnecessary re-renders
   Phase 24 — Shutdown fade listener */
const ArcReactorCore = memo(function ArcReactorCore() {
  const [shuttingDown, setShuttingDown] = useState(false);

  useEffect(() => {
    const onShutdown = () => setShuttingDown(true);
    window.addEventListener("nexus-shutdown-start", onShutdown);
    return () => window.removeEventListener("nexus-shutdown-start", onShutdown);
  }, []);

  return (
    <motion.div
      className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center select-none"
      animate={shuttingDown ? { opacity: 0, scale: 0.3 } : { opacity: 1, scale: 1 }}
      transition={shuttingDown ? { duration: 4, ease: "easeInOut" } : {}}
    >
      {/* Outer energy ripple glow */}
      <div className="absolute inset-0 bg-radial from-[#00E5FF]/10 to-transparent rounded-full blur-3xl animate-pulse duration-3000" />

      {/* ── SONAR PING RING (Phase 19) ── */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ping-${i}`}
          className="absolute rounded-full border border-[#00E5FF]/30"
          style={{ width: "100%", height: "100%" }}
          animate={{
            scale: [1, 1.55, 1.55],
            opacity: [0.45, 0, 0],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.07,
          }}
        />
      ))}

      {/* Rotating outer ring */}
      <motion.div
        className="absolute w-[90%] h-[90%] border border-dashed border-[#00E5FF]/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />

      {/* Counter-rotating mid ring with ticks */}
      <motion.div
        className="absolute w-[75%] h-[75%] border border-[#18FFFF]/40 rounded-full flex items-center justify-center"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-4 bg-[#00E5FF]/50"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-110px)`,
              height: "8px",
              width: "2px",
            }}
          />
        ))}
      </motion.div>

      {/* Fast rotating inner core structure */}
      <motion.div
        className="absolute w-[50%] h-[50%] border-2 border-[#00E5FF]/70 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)]"
        animate={{ rotate: 720 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        {/* Hexagonal overlay */}
        <div
          className="absolute w-[80%] h-[80%] opacity-35 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,229,255,0.15))] clip-polygon"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            border: "1.5px solid #00E5FF",
          }}
        />
      </motion.div>

      {/* Pulsing energy heart */}
      <motion.div
        className="absolute w-20 h-20 bg-radial from-white via-[#00E5FF] to-transparent rounded-full flex items-center justify-center shadow-[0_0_40px_#18FFFF]"
        animate={{
          scale: [0.95, 1.08, 0.95],
          opacity: [0.85, 1, 0.85],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Small center core */}
        <div className="w-8 h-8 bg-white rounded-full shadow-[0_0_15px_#FFFFFF]" />
      </motion.div>
    </motion.div>
  );
});

export default ArcReactorCore;
