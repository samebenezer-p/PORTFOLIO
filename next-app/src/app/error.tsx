"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   PHASE 23 — ERROR BOUNDARY
   Catches unexpected runtime errors and presents a themed recovery UI
═══════════════════════════════════════════════════════════════ */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[NEXUS_OS_ERROR]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6 font-mono text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="max-w-lg w-full text-center space-y-8"
      >
        {/* Pulsing error icon */}
        <motion.div
          className="w-24 h-24 mx-auto rounded-full border-2 border-[#FF3366] flex items-center justify-center"
          style={{
            background: "rgba(255,51,102,0.08)",
            boxShadow: "0 0 40px rgba(255,51,102,0.2)",
          }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(255,51,102,0.15)",
              "0 0 50px rgba(255,51,102,0.35)",
              "0 0 20px rgba(255,51,102,0.15)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertTriangle className="w-10 h-10 text-[#FF3366]" />
        </motion.div>

        {/* Error heading */}
        <div className="space-y-2">
          <div className="text-[10px] text-[#FF3366] tracking-[0.4em] uppercase">
            // SYSTEM FAULT DETECTED
          </div>
          <h1 className="text-3xl font-black tracking-wider text-white">
            CRITICAL ERROR
          </h1>
          <p className="text-sm text-[#A5B4C3]/60 max-w-sm mx-auto leading-relaxed">
            NEXUS OS encountered an unexpected anomaly. The diagnostic core has
            logged the event for analysis.
          </p>
        </div>

        {/* Error digest */}
        {error.digest && (
          <div
            className="inline-block px-3 py-1.5 rounded border text-[10px] text-[#FF3366]"
            style={{
              borderColor: "rgba(255,51,102,0.2)",
              background: "rgba(255,51,102,0.05)",
            }}
          >
            DIGEST: {error.digest}
          </div>
        )}

        {/* Recovery button */}
        <motion.button
          onClick={reset}
          whileHover={{ scale: 1.05 }}
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
          <RefreshCw className="w-4 h-4" />
          REINITIALIZE_SYSTEM.exe
        </motion.button>

        {/* Session footer */}
        <div className="text-[9px] text-[#A5B4C3]/25 tracking-widest">
          NEXUS OS v2.0.26 // ERROR_RECOVERY_PROTOCOL
        </div>
      </motion.div>
    </div>
  );
}
