"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   PHASE 23 — 404 NOT FOUND
   Themed "ROUTE NOT DECIPHERED" page with animated glitch effect
═══════════════════════════════════════════════════════════════ */

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6 font-mono text-white relative overflow-hidden">
      {/* Ambient grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative max-w-lg w-full text-center space-y-8 z-10"
      >
        {/* Shield icon */}
        <motion.div
          className="w-28 h-28 mx-auto rounded-full border-2 border-[#FFC107] flex items-center justify-center"
          style={{
            background: "rgba(255,193,7,0.06)",
            boxShadow: "0 0 50px rgba(255,193,7,0.15)",
          }}
          animate={{
            scale: [1, 1.04, 1],
            boxShadow: [
              "0 0 30px rgba(255,193,7,0.1)",
              "0 0 60px rgba(255,193,7,0.25)",
              "0 0 30px rgba(255,193,7,0.1)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <ShieldOff className="w-12 h-12 text-[#FFC107]" />
        </motion.div>

        {/* Error code */}
        <div className="space-y-3">
          <motion.div
            className="text-7xl font-black tracking-widest text-[#FFC107]"
            style={{ textShadow: "0 0 30px rgba(255,193,7,0.3)" }}
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            404
          </motion.div>

          <div className="text-[10px] text-[#FFC107]/80 tracking-[0.3em] uppercase">
            // ERROR: ROUTE NOT DECIPHERED
          </div>

          <p className="text-sm text-[#A5B4C3]/50 max-w-sm mx-auto leading-relaxed">
            The requested sector does not exist in the NEXUS filesystem.
            Authorization denied. Redirecting to main control panel.
          </p>
        </div>

        {/* Fake terminal output */}
        <div
          className="text-left p-4 rounded-xl border text-[10px] text-[#A5B4C3]/60 space-y-1 max-w-xs mx-auto"
          style={{
            borderColor: "rgba(255,193,7,0.15)",
            background: "rgba(3,6,16,0.9)",
          }}
        >
          <div>
            <span className="text-[#00FF88]">nexus@os</span>
            <span className="text-[#A5B4C3]/30">:</span>
            <span className="text-[#A855F7]">~</span>
            <span className="text-[#A5B4C3]/30">$</span>{" "}
            <span className="text-white">resolve_path</span>
          </div>
          <div className="text-[#FF3366]">
            ✗ ERR_NEXUS_PATH_UNRESOLVED: No module found
          </div>
          <div className="text-[#FFC107]">
            ⚠ Suggested action: Return to root directory
          </div>
        </div>

        {/* CTA */}
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="mag-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold tracking-wider cursor-pointer transition-all duration-300"
            style={{
              borderColor: "rgba(0,229,255,0.3)",
              background:
                "linear-gradient(135deg, rgba(0,229,255,0.08), rgba(24,255,255,0.04))",
              color: "#00E5FF",
              boxShadow: "0 0 20px rgba(0,229,255,0.15)",
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            RETURN_TO_BASE.sys
          </motion.div>
        </Link>

        {/* Session footer */}
        <div className="text-[9px] text-[#A5B4C3]/20 tracking-widest">
          NEXUS OS v2.0.26 // PATH_RESOLUTION_FAILURE
        </div>
      </motion.div>
    </div>
  );
}
