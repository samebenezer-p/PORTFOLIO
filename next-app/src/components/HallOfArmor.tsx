"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, Trophy, Star, Cpu, Database, Shield, GitBranch, Code, BookOpen, Award, Zap } from "lucide-react";

interface Milestone {
  id: string;
  name: string;
  locked: boolean;
  icon: React.ReactNode;
  skills: string[];
  projects: string[];
  technologies: string[];
  certificates: string[];
  experience: string[];
  learningJourney: string;
  glowColor: string;
  category: string;
}

function RotatingGlowRing({ color, locked }: { color: string; locked: boolean }) {
  if (locked) {
    return (
      <div className="relative w-14 h-14 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#A5B4C3]/20" />
        <Lock className="w-5 h-5 text-[#A5B4C3]/30" />
      </div>
    );
  }

  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      {/* Outer pulse */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: color, filter: "blur(6px)" }}
      />
      {/* Rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: `${color}60`, borderTopColor: color }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner static ring */}
      <div
        className="absolute inset-1.5 rounded-full border"
        style={{ borderColor: `${color}30` }}
      />
      {/* Core glow */}
      <div
        className="w-5 h-5 rounded-full animate-pulse"
        style={{ background: color, boxShadow: `0 0 12px ${color}` }}
      />
    </div>
  );
}

function UnlockSequence({ color, onDone }: { color: string; onDone: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.2, times: [0, 0.1, 0.8, 1] }}
      onAnimationComplete={onDone}
    >
      <motion.div
        className="text-center font-mono"
        initial={{ scale: 0.5 }}
        animate={{ scale: [0.5, 1.2, 1] }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-4xl font-black tracking-widest"
          style={{ color, textShadow: `0 0 30px ${color}` }}
        >
          MILESTONE UNLOCKED
        </motion.div>
        <div className="text-sm mt-2" style={{ color: `${color}80` }}>
          // ACCESSING ARCHIVE DATA...
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HallOfAchievements() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [showUnlock, setShowUnlock] = useState(false);
  const [pendingMilestone, setPendingMilestone] = useState<Milestone | null>(null);

  const milestones: Milestone[] = [
    {
      id: "MS-I",
      name: "Java Foundations",
      locked: false,
      icon: <Code className="w-5 h-5" />,
      skills: ["Java SE Basics", "Object-Oriented Programming (OOP)", "Recursion & Data Structures Core", "Exception Handling"],
      projects: ["Morse Code Encryption Engine", "Online Quiz Platform"],
      technologies: ["Java Runtime Environment (JRE)", "JDBC Connections", "Java Collections Framework"],
      certificates: ["Java Basics Badge", "KITS Java Lab Certification"],
      experience: ["Self-led software labs", "Academic Java programming coursework"],
      learningJourney: "Constructed during the initiation sequence. Solidified Java compiler understanding, OOP design patterns, and core data structure implementations.",
      glowColor: "#00E5FF",
      category: "LANGUAGE",
    },
    {
      id: "MS-II",
      name: "Python Developer",
      locked: false,
      icon: <Cpu className="w-5 h-5" />,
      skills: ["Python scripting", "Data manipulation", "OOP in Python", "Standard library mastery"],
      projects: ["Text classification experiments", "Network ping utilities", "Data analysis scripts"],
      technologies: ["Python 3 Engine", "Standard Libraries", "pip ecosystem"],
      certificates: ["KITS Python Certification"],
      experience: ["CSE Python programming labs", "AI module coursework"],
      learningJourney: "Expanded computational skills to include rapid prototyping with Python's versatile ecosystem for data processing and automation.",
      glowColor: "#18FFFF",
      category: "LANGUAGE",
    },
    {
      id: "MS-III",
      name: "SQL Developer",
      locked: false,
      icon: <Database className="w-5 h-5" />,
      skills: ["Database indexing", "JOIN optimization strategies", "Transaction management", "Schema design"],
      projects: ["Online Quiz database schema", "CareerForge database backend"],
      technologies: ["MySQL Storage Engine", "JDBC DB Drivers", "Oracle DB"],
      certificates: ["DBMS Academic Excellence Award"],
      experience: ["Backend database engineering projects"],
      learningJourney: "Engineered robust SQL queries, optimizing index usage and reducing query durations across relational database systems.",
      glowColor: "#00FF88",
      category: "DATABASE",
    },
    {
      id: "MS-IV",
      name: "Web Developer",
      locked: false,
      icon: <Code className="w-5 h-5" />,
      skills: ["HTML5 semantics", "CSS3 animations & layouts", "Client-side JavaScript", "Responsive design"],
      projects: ["NEXUS OS Portfolio UI", "Online Quiz frontend", "Academic web layouts"],
      technologies: ["Modern DOM API", "CSS Grid & Flexbox", "JavaScript ES6+"],
      certificates: ["Frontend Foundations Credential"],
      experience: ["Portfolio engineering", "Academic web development labs"],
      learningJourney: "Built high-performance interfaces with customized CSS animations, responsive layouts, and interactive JavaScript components.",
      glowColor: "#FFC107",
      category: "WEB",
    },
    {
      id: "MS-V",
      name: "IoT Engineer",
      locked: false,
      icon: <Zap className="w-5 h-5" />,
      skills: ["Microcontroller programming", "Peripheral integration", "Signal processing", "Embedded firmware"],
      projects: ["Automated Theft Reporting Device (ESP32 + GPS + GSM)"],
      technologies: ["ESP32 MCU", "Arduino IDE", "GPS u-blox NEO-6M", "SIM800L GSM"],
      certificates: ["Hardware Labs Completion Card"],
      experience: ["Hardware prototyping & testing routines"],
      learningJourney: "Connected software systems with physical environments using wireless ESP32 architectures with real-time GPS and GSM communication.",
      glowColor: "#FF3366",
      category: "IoT",
    },
    {
      id: "MS-VI",
      name: "Embedded Systems",
      locked: false,
      icon: <Cpu className="w-5 h-5" />,
      skills: ["Signal latency optimization", "Sensor calibration", "Low-power firmware design", "UART serial comms"],
      projects: ["Automated Theft Reporting GPS mapping module"],
      technologies: ["GPS/GSM Serial Communication Protocols", "Arduino IDE", "Embedded C++"],
      certificates: ["Microcontrollers Lab Certificate"],
      experience: ["Embedded prototype lab engineering"],
      learningJourney: "Optimized firmware codebases to operate under low-power sleep parameters while maintaining real-time sensor responsiveness.",
      glowColor: "#A855F7",
      category: "EMBEDDED",
    },
    {
      id: "MS-VII",
      name: "Networking",
      locked: false,
      icon: <GitBranch className="w-5 h-5" />,
      skills: ["Subnet calculation", "Virtual routing protocol setup (OSPF/RIP)", "Infrastructure modeling", "Network troubleshooting"],
      projects: ["Virtual Cisco router topologies", "Campus network simulation"],
      technologies: ["Cisco Packet Tracer Platform", "OSPF Routing", "RIP Protocol", "VLAN Configuration"],
      certificates: ["Cisco Networking Essentials Certificate"],
      experience: ["Cisco Networking Academy Program (2024–2025)"],
      learningJourney: "Engineered scalable mock network topologies using Cisco routing frameworks, demonstrating subnetting and advanced routing protocols.",
      glowColor: "#00E5FF",
      category: "NETWORKING",
    },
    {
      id: "MS-VIII",
      name: "Cyber Security",
      locked: false,
      icon: <Shield className="w-5 h-5" />,
      skills: ["Threat surface minimization", "Vulnerability assessment", "SHA-256 cryptography", "Firewall configuration"],
      projects: ["Simulated corporate network security audit", "Intrusion detection analysis"],
      technologies: ["Cisco Cyber Threat Shield", "SHA-256 Encryption", "Firewall Tools"],
      certificates: ["Cisco AICTE Cyber Security Internship Certificate"],
      experience: ["Cisco AICTE Virtual Internship (2025)"],
      learningJourney: "Constructed mitigation frameworks defending mock infrastructure layers against malware, phishing, and network intrusion vectors.",
      glowColor: "#00FF88",
      category: "SECURITY",
    },
    {
      id: "MS-IX",
      name: "Oracle Certified",
      locked: false,
      icon: <Award className="w-5 h-5" />,
      skills: ["Cloud architecture design", "Data pipeline management", "Data integrity validation", "OCI services"],
      projects: ["Oracle cloud data mapping prototypes"],
      technologies: ["Oracle Cloud Infrastructure (OCI)", "Oracle Database Engine", "Data Platform"],
      certificates: ["Oracle Data Platform 2025 Certified Foundations Associate"],
      experience: ["Oracle cloud systems training programs"],
      learningJourney: "Authenticated skills in structural data platforms, cloud architecture design, and Oracle database administration practices.",
      glowColor: "#FF3366",
      category: "CLOUD",
    },
    {
      id: "MS-X",
      name: "Microsoft Azure Certified",
      locked: false,
      icon: <Award className="w-5 h-5" />,
      skills: ["Azure storage setup", "Relational/non-relational DB design", "Data analytics engines", "Azure services"],
      projects: ["Azure Data Factory configuration layouts"],
      technologies: ["Microsoft Azure Data Platforms (DP-900)", "Azure Storage", "Azure Analytics"],
      certificates: ["Microsoft Azure Data Fundamentals Certificate (DP-900)"],
      experience: ["Azure certification training workshops"],
      learningJourney: "Acquired core Azure credentials validating modern cloud data storage, analytics, and infrastructure management architectures.",
      glowColor: "#00E5FF",
      category: "CLOUD",
    },
    {
      id: "MS-XI",
      name: "GitHub Developer",
      locked: false,
      icon: <GitBranch className="w-5 h-5" />,
      skills: ["Branch management", "Conflict resolution", "CI/CD workflows", "Collaborative development"],
      projects: ["CareerForge codebase versioning", "Portfolio GitHub management"],
      technologies: ["Git CLI", "GitHub Actions", "GitHub Enterprise features"],
      certificates: ["GitHub Foundations (In Progress)"],
      experience: ["Open-source repository contributions", "Team collaborative projects"],
      learningJourney: "Automated continuous integrations and streamlined version control workflows across multiple collaborative software projects.",
      glowColor: "#18FFFF",
      category: "TOOLS",
    },
    {
      id: "MS-XII",
      name: "LeetCode Problem Solver",
      locked: false,
      icon: <Trophy className="w-5 h-5" />,
      skills: ["Dynamic programming", "Graph traversal algorithms", "Time/space complexity optimization", "Binary search patterns"],
      projects: ["300+ Algorithm challenge solutions"],
      technologies: ["Java Collections Framework", "Python algorithms", "Data Structures"],
      certificates: ["LeetCode 300+ Solved Badge"],
      experience: ["Competitive programming practice sessions"],
      learningJourney: "Consistently reduced runtime processing boundaries on algorithmic challenges through systematic pattern recognition and optimization.",
      glowColor: "#FFC107",
      category: "COMPETITIVE",
    },
    {
      id: "MS-XIII",
      name: "HackerRank Programmer",
      locked: false,
      icon: <Star className="w-5 h-5" />,
      skills: ["Mathematical logic formulation", "SQL query optimization", "Algorithm design patterns", "Data cleaning techniques"],
      projects: ["HackerRank challenge archives across multiple domains"],
      technologies: ["Advanced Java", "MySQL Engine", "Python scripting"],
      certificates: ["HackerRank Gold Badge Achievements", "SQL & Java skill certifications"],
      experience: ["Competitive coding assessments & challenges"],
      learningJourney: "Achieved verified skill certifications across Java, Python, SQL, and algorithmic domains through structured competitive programming.",
      glowColor: "#00FF88",
      category: "COMPETITIVE",
    },
    {
      id: "MS-XIV",
      name: "CareerForge Creator",
      locked: false,
      icon: <Zap className="w-5 h-5" />,
      skills: ["AI API integration", "React UI development", "Resume parsing engine design", "Generative AI prompting"],
      projects: ["CareerForge — AI Career Planning Platform (Flagship)"],
      technologies: ["Generative AI APIs", "React Framework", "Node.js + Express Backend", "NLP Processing"],
      certificates: ["Project Showcase Spotlight Nomination"],
      experience: ["Principal Frontend & System Architect role", "AI integration engineering"],
      learningJourney: "Integrated Generative AI engines with React client dashboards to create an intelligent career roadmap generation system.",
      glowColor: "#A855F7",
      category: "AI",
    },
    {
      id: "MS-XV",
      name: "Future Software Engineer",
      locked: true,
      icon: <Lock className="w-5 h-5" />,
      skills: ["Locked", "Awaiting production credentials", "Enterprise architecture patterns"],
      projects: ["Awaiting deployment pipelines"],
      technologies: ["Enterprise frameworks", "Production cloud infrastructure"],
      certificates: ["University B.Tech Graduation Certificate — PENDING"],
      experience: ["Future career pathways — INITIALIZING"],
      learningJourney: "System pipeline initialized. Awaiting final authorization clearance upon university graduation and career deployment.",
      glowColor: "#A5B4C3",
      category: "FUTURE",
    },
  ];

  const handleMilestoneClick = (milestone: Milestone) => {
    if (!milestone.locked) {
      setPendingMilestone(milestone);
      setShowUnlock(true);
    } else {
      setSelectedMilestone(milestone);
    }
  };

  const categoryColors: Record<string, string> = {
    LANGUAGE: "#00E5FF",
    DATABASE: "#00FF88",
    WEB: "#FFC107",
    IoT: "#FF3366",
    EMBEDDED: "#A855F7",
    NETWORKING: "#18FFFF",
    SECURITY: "#00FF88",
    CLOUD: "#FF6B6B",
    TOOLS: "#18FFFF",
    COMPETITIVE: "#FFC107",
    AI: "#A855F7",
    FUTURE: "#A5B4C3",
  };

  return (
    <div className="space-y-12 w-full">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Milestones Unlocked", value: "14/15", color: "#00FF88" },
          { label: "Domains Mastered", value: "10", color: "#00E5FF" },
          { label: "Final Mission", value: "INCOMING", color: "#FFC107" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-4 rounded-xl border text-center"
            style={{ borderColor: `${s.color}20`, background: `${s.color}05` }}
          >
            <div className="text-xl font-black font-mono" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[9px] font-mono text-[#A5B4C3]/50 mt-0.5 uppercase tracking-widest">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Milestone grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {milestones.map((milestone, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            whileHover={!milestone.locked ? { scale: 1.07, y: -4 } : { scale: 1.02 }}
            onClick={() => handleMilestoneClick(milestone)}
            className="relative overflow-hidden rounded-2xl cursor-pointer group flex flex-col items-center justify-center text-center gap-3 p-4 min-h-[160px]"
            style={{
              background: milestone.locked
                ? "rgba(8, 10, 18, 0.6)"
                : `linear-gradient(135deg, rgba(8,18,30,0.9), rgba(5,8,22,0.95))`,
              border: `1px solid ${milestone.locked ? "#A5B4C3" : milestone.glowColor}${milestone.locked ? "15" : "25"}`,
              boxShadow: milestone.locked ? "none" : `0 0 20px ${milestone.glowColor}15`,
            }}
          >
            {/* Hover glow */}
            {!milestone.locked && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 25px ${milestone.glowColor}15, 0 0 30px ${milestone.glowColor}20` }}
              />
            )}

            {/* Bottom color bar */}
            {!milestone.locked && (
              <div
                className="absolute inset-x-0 bottom-0 h-0.5"
                style={{
                  background: `linear-gradient(to right, transparent, ${milestone.glowColor}, transparent)`,
                  boxShadow: `0 0 8px ${milestone.glowColor}`,
                }}
              />
            )}

            {/* Category tag */}
            <div
              className="absolute top-2 right-2 text-[8px] font-mono tracking-widest px-1.5 py-0.5 rounded"
              style={{
                color: categoryColors[milestone.category] ?? "#A5B4C3",
                background: `${categoryColors[milestone.category] ?? "#A5B4C3"}15`,
              }}
            >
              {milestone.category}
            </div>

            {/* Rotating glow orb */}
            <RotatingGlowRing color={milestone.glowColor} locked={milestone.locked} />

            {/* Label */}
            <div className="font-mono">
              <span className="text-[9px] text-[#A5B4C3]/40 block">{milestone.id}</span>
              <span
                className="text-[11px] font-bold tracking-wide uppercase leading-tight block"
                style={{ color: milestone.locked ? "#A5B4C3" : "white" }}
              >
                {milestone.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Unlock flash overlay */}
      <AnimatePresence>
        {showUnlock && pendingMilestone && (
          <UnlockSequence
            color={pendingMilestone.glowColor}
            onDone={() => {
              setShowUnlock(false);
              setSelectedMilestone(pendingMilestone);
              setPendingMilestone(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedMilestone && (
          <div className="fixed inset-0 bg-[#050816]/92 backdrop-blur-md z-[60] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              className="w-full max-w-xl rounded-2xl overflow-hidden relative my-4"
              style={{
                background: "linear-gradient(135deg, rgba(8,18,30,0.99), rgba(5,8,22,1))",
                border: `1px solid ${selectedMilestone.glowColor}30`,
                boxShadow: `0 0 60px ${selectedMilestone.glowColor}20`,
              }}
            >
              {/* Corner brackets */}
              {[
                "top-0 left-0 border-t-2 border-l-2",
                "top-0 right-0 border-t-2 border-r-2",
                "bottom-0 left-0 border-b-2 border-l-2",
                "bottom-0 right-0 border-b-2 border-r-2",
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-5 h-5 rounded ${cls}`}
                  style={{ borderColor: selectedMilestone.glowColor }}
                />
              ))}

              {/* Header */}
              <div
                className="flex items-center justify-between p-5 border-b"
                style={{ borderColor: `${selectedMilestone.glowColor}15` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-black font-mono text-xs border"
                    style={{
                      background: `${selectedMilestone.glowColor}15`,
                      borderColor: `${selectedMilestone.glowColor}40`,
                      color: selectedMilestone.glowColor,
                      boxShadow: `0 0 15px ${selectedMilestone.glowColor}30`,
                    }}
                  >
                    {selectedMilestone.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-white uppercase tracking-wide">
                        {selectedMilestone.name}
                      </h3>
                      {selectedMilestone.locked && (
                        <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30 font-mono">
                          LOCKED
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-[#A5B4C3]/60">
                      ACHIEVEMENT_ARCHIVE // CATEGORY: {selectedMilestone.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="p-2 rounded-lg border cursor-pointer hover:bg-red-500/10 transition-colors"
                  style={{ borderColor: `${selectedMilestone.glowColor}20`, color: "#A5B4C3" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto">
                {/* Journey log */}
                <div
                  className="p-3.5 rounded-xl border font-mono text-xs text-white leading-relaxed"
                  style={{ background: "#050816", borderColor: `${selectedMilestone.glowColor}15` }}
                >
                  <span style={{ color: selectedMilestone.glowColor }} className="text-[9px] block mb-1.5 tracking-widest">
                    // LEARNING JOURNEY LOG:
                  </span>
                  {selectedMilestone.learningJourney}
                </div>

                {/* 6-category grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "SKILLS", items: selectedMilestone.skills, icon: "⚡" },
                    { label: "PROJECTS", items: selectedMilestone.projects, icon: "🔬" },
                    { label: "TECHNOLOGIES", items: selectedMilestone.technologies, icon: "🛠️" },
                    { label: "CERTIFICATES", items: selectedMilestone.certificates, icon: "🏆" },
                    { label: "EXPERIENCE", items: selectedMilestone.experience, icon: "📋" },
                  ].map((section, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-lg border"
                      style={{ borderColor: `${selectedMilestone.glowColor}15`, background: `${selectedMilestone.glowColor}04` }}
                    >
                      <h4
                        className="font-mono text-[9px] font-bold tracking-widest mb-2 flex items-center gap-1.5"
                        style={{ color: selectedMilestone.glowColor }}
                      >
                        <span>{section.icon}</span>
                        {section.label}
                      </h4>
                      <ul className="space-y-1">
                        {section.items.map((item, iIdx) => (
                          <li
                            key={iIdx}
                            className="font-mono text-[10px] text-[#A5B4C3] flex items-start gap-1.5 leading-snug"
                          >
                            <span
                              className="mt-0.5 flex-shrink-0 text-[8px]"
                              style={{ color: selectedMilestone.glowColor }}
                            >
                              ▸
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div
                className="flex justify-center px-5 py-4 border-t"
                style={{ borderColor: `${selectedMilestone.glowColor}10` }}
              >
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="px-6 py-2.5 rounded-xl border font-mono text-xs transition-all duration-300 cursor-pointer hover:scale-105"
                  style={{
                    borderColor: `${selectedMilestone.glowColor}30`,
                    color: "#A5B4C3",
                    background: `${selectedMilestone.glowColor}05`,
                  }}
                >
                  DISMISS_MILESTONE_LOG.sys
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
