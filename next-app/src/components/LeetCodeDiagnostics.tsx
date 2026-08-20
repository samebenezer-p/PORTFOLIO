"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Code2, Zap, Calendar, TrendingUp } from "lucide-react";

export default function LeetCodeDiagnostics() {
  const solved = 312;
  const total = 3200;
  const rating = 1582;

  // Mock difficulty breakdown
  const difficulties = [
    { name: "EASY", count: 185, total: 800, color: "#00FF88", shadow: "shadow-[0_0_8px_#00FF88]" },
    { name: "MEDIUM", count: 110, total: 1600, color: "#FFC107", shadow: "shadow-[0_0_8px_#FFC107]" },
    { name: "HARD", count: 17, total: 800, color: "#FF3366", shadow: "shadow-[0_0_8px_#FF3366]" }
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-[#00E5FF]/20 relative overflow-hidden bg-[#08121E]/30 w-full space-y-6">
      {/* HUD Header */}
      <div className="flex justify-between items-center border-b border-[#00E5FF]/10 pb-3">
        <span className="font-mono text-xs text-[#00E5FF] tracking-[0.2em] font-bold flex items-center gap-2">
          <Code2 className="w-4 h-4" /> LEETCODE_ALGO_PROCESSOR
        </span>
        <span className="font-mono text-[9px] text-[#FFC107] border border-[#FFC107]/20 px-2 py-0.5 rounded bg-[#FFC107]/10 animate-pulse">
          SYNCING...
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Overall Solved Arc Ring */}
        <div className="flex flex-col items-center justify-center bg-[#050816] p-4 rounded-xl border border-[#00E5FF]/10 text-center relative overflow-hidden">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Pulsing glow background */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#00E5FF]/25 animate-spin duration-3000" />
            
            <div className="text-center font-mono">
              <span className="text-2xl font-black text-white">{solved}</span>
              <span className="text-[10px] text-[#A5B4C3]/60 block border-t border-[#00E5FF]/10 pt-1 mt-1">SOLVED</span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#A5B4C3]/80 mt-3">SUCCESS_RATE: 94.2%</span>
        </div>

        {/* Center: Difficulty breakdown */}
        <div className="flex flex-col justify-center space-y-3 bg-[#050816] p-4 rounded-xl border border-[#00E5FF]/10 font-mono">
          {difficulties.map((diff, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span style={{ color: diff.color }}>{diff.name}</span>
                <span className="text-[#A5B4C3]">{diff.count} / {diff.total}</span>
              </div>
              <div className="w-full h-1.5 bg-[#08121E] rounded-full overflow-hidden border border-[#00E5FF]/5">
                <div
                  className={`h-full rounded-full ${diff.shadow}`}
                  style={{
                    backgroundColor: diff.color,
                    width: `${(diff.count / diff.total) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right: Contest & Stats Card */}
        <div className="flex flex-col justify-between bg-[#050816] p-4 rounded-xl border border-[#00E5FF]/10 font-mono text-xs text-[#A5B4C3] space-y-3">
          <div className="flex justify-between items-center border-b border-[#00E5FF]/10 pb-1.5">
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-[#00E5FF]" /> CONTEST_RATING</span>
            <span className="text-white font-bold">{rating}</span>
          </div>
          <div className="flex justify-between items-center border-b border-[#00E5FF]/10 pb-1.5">
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-[#00E5FF]" /> SOLVING_STREAK</span>
            <span className="text-[#00FF88] font-bold">14 DAYS</span>
          </div>
          <div className="flex justify-between items-center pb-0.5">
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-[#00E5FF]" /> GLOBAL_RANK</span>
            <span className="text-white">TOP 8.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
