"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";

// Phase 20 — ambient type for audio engine exposed on window
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nexusAudio: { playTyping: () => void; playClick: () => void; playHover: () => void } | null;
  }
}

interface HistoryEntry {
  input: string;
  output: string;
}

const COMMANDS: Record<string, string> = {
  help: `NEXUS OS v2.0.26 — Command Reference
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  about          → System profile & identity
  skills         → Loaded skill modules
  projects       → Research lab experiments
  education      → Chronological archive
  experience     → Mission logs
  certifications → Decrypted credentials
  resume         → Download resume
  github         → GitHub analytics
  leetcode       → LeetCode diagnostics
  hackerrank     → HackerRank profile
  contact        → Communication channels
  clear          → Clear terminal buffer
  help           → Show this reference
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  about: `╔══════════════════════════════════════╗
║   IDENTITY: SAM EBENEZER P           ║
║   ROLE: Final Year CSE Student       ║
║   INSTITUTE: Karunya Inst. of Tech   ║
║   LOCATION: Coimbatore, TN, India    ║
╠══════════════════════════════════════╣
║   STATUS: Seeking SWE Opportunities  ║
║   CLEARANCE: ALPHA                   ║
║   NEXUS OS v2.0.26 // ALL NOMINAL    ║
╚══════════════════════════════════════╝`,

  skills: `⚡ SKILL_MATRIX LOADED:

  Languages    → Java [90%] Python [80%] SQL [85%]
                 JS [75%] HTML [90%] CSS [88%] C [70%]
  Core CS      → DSA · DBMS · OS · Networks · OOP
                 Software Engineering
  Database     → MySQL · JDBC · Oracle DB
  Tools        → Git · GitHub · VS Code
                 Arduino IDE · Cisco Packet Tracer
  Technologies → AI · IoT · Embedded Systems
                 Cloud (Azure + Oracle) · Networking`,

  projects: `🔬 RESEARCH LABORATORY — EXPERIMENTS:

  [EXP-001] Automated Theft Reporting Device
            ESP32 + GPS + GSM | Embedded C++
  
  [EXP-002] Online Quiz Application
            Java Servlet + MySQL + HTML/CSS/JS
  
  [EXP-003] Morse Code Encryption Engine
            Java SE | HashMap-based translation
  
  [EXP-004] CareerForge (FLAGSHIP)
            AI Career Platform | Generative AI
            React + Node.js + Express`,

  education: `📅 CHRONOLOGICAL_ARCHIVE:

  2023  → Joined KITS (B.Tech CSE, Coimbatore)
  2024  → Core Programming (Java, Python, DSA, SQL)
  2025  → Networking + Cloud + Certifications
            Cisco AICTE Cyber Security Internship
  2026  → Final Year | CareerForge | Career Prep
  →→→→  🚀 MISSION OBJECTIVE: Software Engineer`,

  experience: `📋 MISSION_LOGS:

  [MISSION-001] Cisco Networking Academy
    Duration : 2024 – 2025
    Role     : Networking Essentials Specialist
    Skills   : OSPF, RIP, Subnetting, Packet Tracer
    Status   : ✓ COMPLETED

  [MISSION-002] Cisco AICTE Virtual Internship
    Duration : 2025
    Role     : Cyber Security Architect
    Skills   : SHA-256, Firewalls, Threat Analysis
    Status   : ✓ COMPLETED`,

  certifications: `🏆 SAM'S VERIFIED CREDENTIALS:

  Oracle Certified Foundations Associate  → Data Platform [2025]
  Microsoft Azure Data Fundamentals        → DP-900 [2025]
  Cisco AICTE Cybersecurity Virtual Intern → Cyber Security Architect
  Cisco Networking Academy                 → Networking Essentials
  Cisco Packet Tracer                      → Packet Tracer Professional`,

  resume: `📄 RESUME_DOWNLOAD initiated...

  File: Sam_Ebenezer_P_Resume.pdf
  Status: Generating secure link...

  [████████████████████] 100%
  
  → Redirecting to download...
  → Contact samebenezer718@gmail.com
     to request the latest version.`,

  github: `🐙 GITHUB_ANALYTICS:
  
  Username      : samebenezer-p
  URL           : github.com/samebenezer-p
  Repositories  : 12
  Contributions : 847 this year
  Followers     : 38 | Following: 21
  
  Top Languages:
  ├── Java        42%
  ├── Python      22%
  ├── JavaScript  16%
  ├── HTML/CSS    12%
  └── C            8%`,

  leetcode: `⚔️ LEETCODE_DIAGNOSTICS:
  
  Username      : samebenezer
  Problems      : 312 / 3200 solved
  Contest Rank  : 1582
  Global Rank   : Top 8.4%
  Streak        : 14 Days 🔥
  
  Difficulty Breakdown:
  ├── Easy    185/800
  ├── Medium  110/1600
  └── Hard     17/800`,

  hackerrank: `⭐ HACKERRANK_PROFILE:
  
  Username : samebenezer2005
  Rank     : Top 5%
  Points   : 3,240
  
  Domain Stars:
  ├── Java            ★★★★★
  ├── SQL             ★★★★★
  ├── Problem Solving ★★★★★
  └── Python          ★★★★☆
  
  Gold Badges: Java · SQL · Problem Solving`,

  contact: `📡 COMMUNICATION_CHANNELS:

  Email     : samebenezer718@gmail.com
  Location  : Coimbatore, Tamil Nadu, India
  GitHub    : github.com/samebenezer-p
  LinkedIn  : linkedin.com/in/samebenezer
  LeetCode  : leetcode.com/u/samebenezer
  HackerRank: hackerrank.com/samebenezer2005`,
};

function TerminalOutput({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i += 3;
      } else {
        setDisplayed(text);
        clearInterval(interval);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [text]);

  return <span className="whitespace-pre-wrap">{displayed}</span>;
}

export default function FuturisticTerminal() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Ctrl+J shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "j") {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCmdHistory(h => [trimmed, ...h]);
    setHistoryIdx(-1);

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    const output = COMMANDS[trimmed]
      ?? `Command not found: '${trimmed}'\nType 'help' to see available commands.`;

    setHistory(h => [...h, { input: trimmed, output }]);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next] ?? "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.toLowerCase();
      const match = Object.keys(COMMANDS).find(k => k.startsWith(partial));
      if (match) setInput(match);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[75] w-[90vw] max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: "rgba(3, 6, 15, 0.97)",
            border: "1px solid #00E5FF30",
            boxShadow: "0 0 60px #00E5FF20",
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between px-4 py-2.5 border-b select-none"
            style={{ borderColor: "#00E5FF15", background: "#030610" }}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF3366]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFC107]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#00FF88]" />
              </div>
              <span className="font-mono text-[10px] text-[#00E5FF]/60 tracking-widest">
                NEXUS OS — TERMINAL v2.0.26 [Ctrl+J]
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5 text-[#A5B4C3]" />
            </button>
          </div>

          {/* Output area */}
          <div
            className="h-72 overflow-y-auto p-4 font-mono text-xs space-y-2"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Welcome banner */}
            {history.length === 0 && (
              <div className="text-[#00E5FF] space-y-0.5">
                <div>╔══════════════════════════════════════════╗</div>
                <div>║   NEXUS OS v2.0.26 — TERMINAL SHELL      ║</div>
                <div>║   Operator: SAM EBENEZER P               ║</div>
                <div>║   Type 'help' for available commands      ║</div>
                <div>╚══════════════════════════════════════════╝</div>
                <div className="text-[#A5B4C3]/40 mt-2 text-[9px]">Use ↑↓ for command history · Tab for autocomplete · Ctrl+J to toggle</div>
              </div>
            )}

            {history.map((entry, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2 text-[#00E5FF]">
                  <span className="text-[#00FF88]">nexus@os</span>
                  <span className="text-[#A5B4C3]/40">:</span>
                  <span className="text-[#A855F7]">~</span>
                  <span className="text-[#A5B4C3]/40">$</span>
                  <span className="text-white">{entry.input}</span>
                </div>
                <div className="text-[#A5B4C3] pl-0 leading-relaxed">
                  <TerminalOutput key={`${i}-${entry.input}`} text={entry.output} />
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input line */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-t font-mono text-xs"
            style={{ borderColor: "#00E5FF10", background: "#030610" }}
          >
            <span className="text-[#00FF88]">nexus@os</span>
            <span className="text-[#A5B4C3]/40">:</span>
            <span className="text-[#A855F7]">~</span>
            <span className="text-[#A5B4C3]/40">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => {
                setInput(e.target.value);
                // Phase 20 — Audio: play typing sound per character
                if (typeof window !== "undefined" && window.nexusAudio) {
                  window.nexusAudio.playTyping();
                }
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none caret-[#00E5FF] placeholder:text-[#A5B4C3]/20"
              placeholder="type a command..."
              spellCheck={false}
              autoComplete="off"
            />
            <motion.div
              className="w-2 h-4 bg-[#00E5FF]"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>

          {/* Shortcut hint */}
          <div className="text-center font-mono text-[8px] text-[#A5B4C3]/25 py-1.5">
            Press Ctrl+J to toggle terminal
          </div>
        </motion.div>
      )}

      {/* Persistent hint badge (when closed) */}
      {!open && (
        <motion.button
          key="hint"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-6 left-6 z-[70] flex items-center gap-2 px-3 py-2 rounded-lg border font-mono text-[10px] cursor-pointer hover:border-[#00E5FF] transition-all duration-300"
          style={{ borderColor: "#00E5FF20", background: "rgba(3,6,15,0.9)", color: "#A5B4C3" }}
        >
          <ChevronRight className="w-3 h-3 text-[#00E5FF]" />
          TERMINAL [Ctrl+J]
        </motion.button>
      )}
    </AnimatePresence>
  );
}
