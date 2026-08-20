import React from "react";

/* ═══════════════════════════════════════════════════════════════
   PHASE 23 — GLOBAL LOADING STATE
   Displayed by Next.js while route chunks are being loaded
═══════════════════════════════════════════════════════════════ */

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center font-mono text-white">
      <div className="text-center space-y-6">
        {/* Arc reactor loading spinner */}
        <div className="relative w-24 h-24 mx-auto">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-[#00E5FF]/20 animate-spin"
            style={{
              borderTopColor: "#00E5FF",
              animationDuration: "1.2s",
            }}
          />
          {/* Mid ring */}
          <div
            className="absolute inset-3 rounded-full border border-[#18FFFF]/30 animate-spin"
            style={{
              borderTopColor: "#18FFFF",
              animationDuration: "0.9s",
              animationDirection: "reverse",
            }}
          />
          {/* Core pulse */}
          <div className="absolute inset-7 rounded-full bg-[#00E5FF]/20 animate-pulse flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#00E5FF] shadow-[0_0_15px_#00E5FF]" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-1.5">
          <div className="text-[10px] text-[#00E5FF] tracking-[0.4em] uppercase animate-pulse">
            // LOADING NEXUS MODULES
          </div>
          <div className="text-[9px] text-[#A5B4C3]/40 tracking-widest">
            INITIALIZING SYSTEM CORE...
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
