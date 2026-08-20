"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch,
  X,
  FileCode2,
  Cpu,
  Workflow,
  Sparkles,
  Image,
  Clock,
  Rocket,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface Experiment {
  id: string;
  name: string;
  tagline: string;
  blueprint: string;
  architecture: string;
  workflow: string;
  features: string[];
  techStack: string[];
  githubUrl: string;
  futureScope: string;
  timeline: string;
  color: string;
}

type TabKey = "blueprint" | "architecture" | "workflow" | "features" | "gallery" | "timeline" | "future";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "blueprint", label: "Blueprint", icon: <FileCode2 className="w-3.5 h-3.5" /> },
  { key: "architecture", label: "Architecture", icon: <Cpu className="w-3.5 h-3.5" /> },
  { key: "workflow", label: "Workflow", icon: <Workflow className="w-3.5 h-3.5" /> },
  { key: "features", label: "Features", icon: <Sparkles className="w-3.5 h-3.5" /> },
  { key: "gallery", label: "Gallery", icon: <Image className="w-3.5 h-3.5" /> },
  { key: "timeline", label: "Timeline", icon: <Clock className="w-3.5 h-3.5" /> },
  { key: "future", label: "Future Scope", icon: <Rocket className="w-3.5 h-3.5" /> },
];

function ExperimentModal({
  exp,
  onClose,
}: {
  exp: Experiment;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("blueprint");

  const galleryImages = [
    { label: "System Overview", desc: "High-level system architecture diagram" },
    { label: "Core Logic", desc: "Main processing flow visualization" },
    { label: "Tech Stack", desc: "Technology integration map" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "blueprint":
        return (
          <motion.div
            key="blueprint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div
              className="p-4 rounded-xl border font-mono text-sm text-white leading-relaxed"
              style={{ background: "#050816", borderColor: `${exp.color}20` }}
            >
              {exp.blueprint}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {exp.techStack.slice(0, 4).map((t, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border text-center font-mono text-xs"
                  style={{ background: `${exp.color}08`, borderColor: `${exp.color}25`, color: exp.color }}
                >
                  {t}
                </div>
              ))}
            </div>
          </motion.div>
        );
      case "architecture":
        return (
          <motion.div key="architecture" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="p-4 rounded-xl border font-mono text-sm text-white leading-relaxed" style={{ background: "#050816", borderColor: `${exp.color}20` }}>
              {exp.architecture}
            </div>
            {/* ASCII-style architecture diagram */}
            <div className="p-4 rounded-xl border font-mono text-[10px] text-[#A5B4C3] leading-relaxed overflow-auto" style={{ background: "#030610", borderColor: `${exp.color}10` }}>
              <div style={{ color: exp.color }} className="mb-2">// SYSTEM_ARCHITECTURE_DIAGRAM</div>
              {exp.techStack.map((tech, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span style={{ color: exp.color }}>[{String(i + 1).padStart(2, "0")}]</span>
                  <span className="flex-1 text-white">{tech}</span>
                  <span className="text-[#A5B4C3]/40">LAYER_{i + 1}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case "workflow":
        return (
          <motion.div key="workflow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="p-4 rounded-xl border font-mono text-sm text-white leading-relaxed" style={{ background: "#050816", borderColor: `${exp.color}20` }}>
              {exp.workflow}
            </div>
            {/* Step breakdown */}
            {exp.workflow.split("->").map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono flex-shrink-0" style={{ background: exp.color, color: "#050816" }}>
                  {i + 1}
                </div>
                <div className="flex-1 p-2.5 rounded-lg border font-mono text-xs text-[#A5B4C3]" style={{ borderColor: `${exp.color}15`, background: `${exp.color}05` }}>
                  {step.trim()}
                </div>
                {i < exp.workflow.split("->").length - 1 && (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: exp.color }} />
                )}
              </div>
            ))}
          </motion.div>
        );
      case "features":
        return (
          <motion.div key="features" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 gap-2">
            {exp.features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-3 rounded-lg border"
                style={{ borderColor: `${exp.color}20`, background: `${exp.color}05` }}
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: exp.color }} />
                <span className="font-mono text-xs text-white">{feat}</span>
              </motion.div>
            ))}
          </motion.div>
        );
      case "gallery":
        return (
          <motion.div key="gallery" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 gap-4">
            {galleryImages.map((item, i) => (
              <div
                key={i}
                className="relative h-28 rounded-xl border overflow-hidden flex items-center justify-center"
                style={{ borderColor: `${exp.color}25`, background: `linear-gradient(135deg, ${exp.color}08, #050816)` }}
              >
                <div className="text-center font-mono">
                  <div className="text-sm font-bold text-white">{item.label}</div>
                  <div className="text-[10px] text-[#A5B4C3]/60 mt-1">{item.desc}</div>
                  <div className="text-[9px] mt-2" style={{ color: exp.color }}>
                    EXP_{exp.id} // {exp.name.slice(0, 12).toUpperCase()}
                  </div>
                </div>
                {/* Animated grid lines */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(${exp.color}40 1px, transparent 1px), linear-gradient(90deg, ${exp.color}40 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>
            ))}
          </motion.div>
        );
      case "timeline":
        return (
          <motion.div key="timeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div
              className="p-4 rounded-xl border font-mono text-sm text-white leading-relaxed"
              style={{ background: "#050816", borderColor: `${exp.color}20` }}
            >
              <Clock className="w-4 h-4 mb-2 inline-block mr-2" style={{ color: exp.color }} />
              {exp.timeline}
            </div>
            <div className="text-[10px] font-mono text-[#A5B4C3]/50 text-center">
              EXPERIMENT_{exp.id} CHRONOLOGICAL LOG
            </div>
          </motion.div>
        );
      case "future":
        return (
          <motion.div key="future" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="p-4 rounded-xl border font-mono text-sm text-white leading-relaxed" style={{ background: "#050816", borderColor: `${exp.color}20` }}>
              <Rocket className="w-4 h-4 mb-2 inline-block mr-2" style={{ color: exp.color }} />
              {exp.futureScope}
            </div>
            <div
              className="p-3 rounded-lg border text-center"
              style={{ borderColor: `${exp.color}20`, background: `${exp.color}08` }}
            >
              <span className="font-mono text-[10px]" style={{ color: exp.color }}>
                STATUS: ROADMAP_ACTIVE // ITERATION: NEXT
              </span>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-[#050816]/90 backdrop-blur-md z-[60] flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
        className="w-full max-w-2xl rounded-2xl overflow-hidden relative my-4"
        style={{
          background: "linear-gradient(135deg, rgba(8,18,30,0.98), rgba(5,8,22,0.99))",
          border: `1px solid ${exp.color}30`,
          boxShadow: `0 0 50px ${exp.color}20`,
        }}
      >
        {/* Corner brackets */}
        {[
          "top-0 left-0 border-t-2 border-l-2 rounded-tl",
          "top-0 right-0 border-t-2 border-r-2 rounded-tr",
          "bottom-0 left-0 border-b-2 border-l-2 rounded-bl",
          "bottom-0 right-0 border-b-2 border-r-2 rounded-br",
        ].map((cls, i) => (
          <div key={i} className={`absolute w-5 h-5 ${cls}`} style={{ borderColor: exp.color }} />
        ))}

        {/* Header */}
        <div
          className="flex items-start justify-between p-6 border-b"
          style={{ borderColor: `${exp.color}15` }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="font-mono text-[9px] px-2 py-0.5 rounded border font-bold tracking-widest"
                style={{ color: exp.color, borderColor: `${exp.color}30`, background: `${exp.color}10` }}
              >
                EXPERIMENT_{exp.id}
              </span>
              <span
                className="font-mono text-[9px] px-2 py-0.5 rounded border"
                style={{ color: "#00FF88", borderColor: "#00FF8830", background: "#00FF8810" }}
              >
                ACTIVE
              </span>
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-wide">{exp.name}</h2>
            <p className="font-mono text-xs text-[#A5B4C3]/70 mt-0.5">{exp.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-red-500/10"
            style={{ borderColor: `${exp.color}20`, color: "#A5B4C3" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[10px] transition-all duration-200 cursor-pointer"
                style={{
                  background: activeTab === tab.key ? `${exp.color}20` : "transparent",
                  borderColor: activeTab === tab.key ? `${exp.color}60` : `${exp.color}15`,
                  color: activeTab === tab.key ? exp.color : "#A5B4C3",
                  boxShadow: activeTab === tab.key ? `0 0 10px ${exp.color}20` : "none",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="min-h-[200px] pb-6">
            <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex flex-wrap gap-3 items-center justify-between px-6 py-4 border-t"
          style={{ borderColor: `${exp.color}10` }}
        >
          <div className="flex flex-wrap gap-1.5">
            {exp.techStack.map((tech, i) => (
              <span
                key={i}
                className="text-[9px] font-mono px-2 py-0.5 rounded border"
                style={{ color: exp.color, borderColor: `${exp.color}20`, background: `${exp.color}08` }}
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href={exp.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border font-mono text-xs transition-all duration-300 hover:scale-105"
            style={{
              background: `${exp.color}15`,
              borderColor: exp.color,
              color: exp.color,
              boxShadow: `0 0 15px ${exp.color}20`,
            }}
          >
            <GitBranch className="w-4 h-4" />
            GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function ResearchLaboratory() {
  const [selectedExp, setSelectedExp] = useState<Experiment | null>(null);

  const experiments: Experiment[] = [
    {
      id: "001",
      name: "Automated Theft Reporting Device",
      tagline: "IoT-powered real-time theft detection & GPS alert system",
      blueprint: "Hardware/IoT node setup containing ESP32 microcontroller with GPS & GSM peripheral modules reporting directly to a remote alert infrastructure. Designed for ultra-low power consumption with automatic wake-on-motion cycles.",
      architecture: "ESP32 Controller Unit interconnected with GPS (u-blox NEO-6M) & GSM (SIM800L) peripheral modules via serial UART communication protocols.",
      workflow: "Motion sensor reads vibration -> Evaluates motion thresholds -> Fetches real-time GPS coordinates -> Constructs alert payload -> Triggers GSM SMS alarm to registered contacts",
      features: [
        "Real-time GPS tracking with coordinate accuracy",
        "Automated SMS alert dispatcher via GSM module",
        "Motion threshold calibration system",
        "Ultra-low power sleep cycle (deep sleep mode)",
        "Multi-contact alert notification chain",
        "Fail-safe watchdog timer mechanism",
      ],
      techStack: ["ESP32", "GPS Module", "GSM Module", "Arduino IDE", "Embedded C++"],
      githubUrl: "https://github.com/samebenezer-p",
      futureScope: "Incorporate Machine Learning model to evaluate movement patterns and reduce false alerts. Add cloud dashboard for real-time GPS map visualization.",
      timeline: "Complete Prototype: Q2 2024",
      color: "#00E5FF",
    },
    {
      id: "002",
      name: "Online Quiz Application",
      tagline: "Multi-client real-time competitive assessment platform",
      blueprint: "Multi-client web application managing real-time competitive testing evaluations with account management, randomized question generation, and automated scoring systems.",
      architecture: "Java MVC Backend (Servlets) + MySQL Database + HTML/CSS/JS Client Interfaces with JDBC connection pooling for efficient database operations.",
      workflow: "User logins via auth system -> Pulls randomized questions from DB -> Monitors real-time countdown timer -> Evaluates answers -> Tallies and persists results to MySQL",
      features: [
        "Account authentication & session management",
        "Real-time randomized query generation",
        "Dynamic countdown timer engine",
        "Automated grade calculation system",
        "Question bank management interface",
        "Leaderboard & result analytics dashboard",
      ],
      techStack: ["Java Servlet", "JDBC", "MySQL", "HTML5", "CSS3", "JavaScript"],
      githubUrl: "https://github.com/samebenezer-p",
      futureScope: "Transitioning database storage to MongoDB for unstructured question sets. Adding WebSocket real-time competition mode.",
      timeline: "Production Deployment: Q4 2024",
      color: "#18FFFF",
    },
    {
      id: "003",
      name: "Morse Code Encryption & Decryption",
      tagline: "Bi-directional Morse encoding engine built in Java",
      blueprint: "Local software package mapping alphanumeric characters into standard Morse Code symbolic sequences using efficient Java data structures and dynamic string processing.",
      architecture: "Java Runtime application utilizing HashMap-based translation tables for O(1) character lookup with bidirectional encoding/decoding support.",
      workflow: "Input string accepted -> Character tokenization -> HashMap lookup for each token -> Spacing/delay formatting applied -> Morse output rendered to console/display",
      features: [
        "Bi-directional text ↔ Morse conversion",
        "Input string sanitization & validation",
        "Precision timing/spacing algorithms",
        "Dynamic text output renderer",
        "Error handling for unsupported characters",
        "Batch conversion support",
      ],
      techStack: ["Java SE", "HashMap", "Regex Engine", "String Processing", "OOP"],
      githubUrl: "https://github.com/samebenezer-p",
      futureScope: "Add system sound generators translating Morse code strings into hardware audio beeps. Integrate visual LED blink pattern output.",
      timeline: "Stable Release: Q1 2024",
      color: "#00FF88",
    },
    {
      id: "004",
      name: "CareerForge",
      tagline: "AI-powered career planning platform with resume intelligence",
      blueprint: "AI career planner that analyzes uploaded resumes, detects skill gaps against market demand, and generates personalized career roadmaps using Generative AI APIs.",
      architecture: "Generative AI API integration + Node.js/Express backend + React UI dashboard with NLP resume parsing pipeline and real-time skill gap mapping engine.",
      workflow: "Upload resume -> NLP engine parses content & extracts skills -> Maps requirements against market API -> Detects skill gaps -> Generates AI learning roadmap with timeline",
      features: [
        "Resume parsing & analysis engine",
        "AI-powered skill gap detection mapping",
        "LLM-driven personalized resource generation",
        "Interactive career roadmap visualization",
        "Industry trend integration",
        "Personalized learning schedule builder",
      ],
      techStack: ["Generative AI", "React", "Node.js", "Express", "NLP", "REST APIs"],
      githubUrl: "https://github.com/samebenezer-p",
      futureScope: "Integrate direct job API search automatically matching profiles with relevant openings. Add interview preparation module powered by AI.",
      timeline: "Final Beta Release: Q2 2026",
      color: "#FFC107",
    },
  ];

  return (
    <div className="space-y-12 w-full">
      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Experiments", value: "004", color: "#00E5FF" },
          { label: "Tech Stack Items", value: "20+", color: "#00FF88" },
          { label: "Status", value: "ACTIVE", color: "#FFC107" },
          { label: "Domains", value: "IoT·Web·AI", color: "#18FFFF" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-panel p-3 rounded-xl border text-center"
            style={{ borderColor: `${s.color}20`, background: `${s.color}05` }}
          >
            <div className="text-lg font-black font-mono" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[9px] font-mono text-[#A5B4C3]/50 mt-0.5 uppercase tracking-widest">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Experiment cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiments.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={() => setSelectedExp(exp)}
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
            style={{
              background: "linear-gradient(135deg, rgba(8,18,30,0.9), rgba(5,8,22,0.95))",
              border: `1px solid ${exp.color}20`,
              boxShadow: `0 4px 20px ${exp.color}08`,
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: `inset 0 0 30px ${exp.color}10`, border: `1px solid ${exp.color}50` }}
            />

            {/* Top accent bar */}
            <div
              className="h-1"
              style={{ background: `linear-gradient(to right, ${exp.color}, ${exp.color}30)` }}
            />

            <div className="p-5">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded border font-bold tracking-widest"
                    style={{ color: exp.color, borderColor: `${exp.color}30`, background: `${exp.color}10` }}
                  >
                    EXPERIMENT_{exp.id}
                  </span>
                  <h3 className="text-base font-black text-white tracking-wide uppercase mt-2 leading-tight">
                    {exp.name}
                  </h3>
                  <p className="text-[11px] font-mono text-[#A5B4C3]/60 mt-1">{exp.tagline}</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ml-3"
                  style={{
                    background: `${exp.color}10`,
                    borderColor: `${exp.color}30`,
                    color: exp.color,
                    boxShadow: `0 0 12px ${exp.color}20`,
                  }}
                >
                  <span className="font-mono text-xs font-black">{exp.id}</span>
                </motion.div>
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {exp.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[9px] font-mono px-2 py-0.5 rounded border"
                    style={{ color: exp.color, borderColor: `${exp.color}20`, background: `${exp.color}08` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div
                className="flex items-center gap-2 text-[10px] font-mono group-hover:gap-3 transition-all duration-300"
                style={{ color: exp.color }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: exp.color }} />
                ACCESS_EXPERIMENT_SCHEMATICS
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedExp && (
          <ExperimentModal exp={selectedExp} onClose={() => setSelectedExp(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
