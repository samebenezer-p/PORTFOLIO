"use client";

import React, { useEffect, useState, memo } from "react";
import { Activity, ShieldAlert, Cpu, HardDrive, CheckCircle } from "lucide-react";

/* Phase 21 — React.memo: SystemStatus only re-renders on its own state changes */
const SystemStatus = memo(function SystemStatus() {
  const [latency, setLatency] = useState(24);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const latencyInterval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 15 + 15));
    }, 3000);

    const uptimeInterval = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(latencyInterval);
      clearInterval(uptimeInterval);
    };
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="glass-panel rounded-lg p-5 border border-[#00E5FF]/20 space-y-4 max-w-sm w-full font-mono text-xs text-[#A5B4C3]">
      <div className="flex items-center justify-between border-b border-[#00E5FF]/10 pb-2">
        <span className="text-[#00E5FF] font-bold tracking-wider">// SYSTEM DIAGNOSTICS</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-[#00FF88] rounded-full animate-ping" />
          <span className="text-[#00FF88] font-bold">ONLINE</span>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-[#00E5FF]" /> AI CORE ACTIVE</span>
          <span className="text-[#00E5FF] font-semibold">98.4%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-[#00E5FF]" /> GITHUB CONNECTED</span>
          <span className="text-[#00FF88] font-semibold">SECURE</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2"><Activity className="w-4 h-4 text-[#00E5FF]" /> NETWORK LATENCY</span>
          <span className="text-white font-semibold">{latency} ms</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#00E5FF]" /> SYS ARCHIVES</span>
          <span className="text-white">VERIFIED</span>
        </div>
      </div>

      <div className="border-t border-[#00E5FF]/10 pt-2.5 flex justify-between text-[10px] text-[#A5B4C3]/70">
        <span>CORE UPTIME: {formatUptime(uptime)}</span>
        <span>SYS_STATUS: NOMINAL</span>
      </div>
    </div>
  );
});

export default SystemStatus;
