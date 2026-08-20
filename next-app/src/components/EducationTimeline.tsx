"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Code2, Server, Award, Rocket, ChevronDown, Cpu, Cloud, Shield } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  details: string[];
  color: string;
  tags: string[];
}

const ScanLine = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
    initial={false}
  >
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/60 to-transparent"
      initial={{ top: "-4px" }}
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
);

export default function EducationTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const events: TimelineEvent[] = [
    {
      year: "2023",
      title: "Joined KITS",
      subtitle: "Karunya Institute of Technology and Sciences",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "#00E5FF",
      tags: ["B.Tech CSE", "Coimbatore"],
      details: [
        "B.Tech Computer Science & Engineering",
        "Foundation core sciences & mathematics",
        "First-year design laboratories & labs",
        "Campus orientation & club activities",
      ],
    },
    {
      year: "2024",
      title: "Core Programming",
      subtitle: "Algorithms & OOP Paradigms",
      icon: <Code2 className="w-5 h-5" />,
      color: "#18FFFF",
      tags: ["Java", "Python", "SQL", "DSA"],
      details: [
        "Mastered Java, Python & OOP Concepts",
        "Data Structures & Algorithms mastery",
        "Relational Database management & Design",
        "Online Quiz App & Morse Code projects",
      ],
    },
    {
      year: "2025",
      title: "Networking & Cloud",
      subtitle: "Certifications & Architecture",
      icon: <Server className="w-5 h-5" />,
      color: "#00FF88",
      tags: ["Cisco", "Azure", "Oracle", "Cyber Security"],
      details: [
        "Computer Networks & OS architectures",
        "AI systems modeling & Cloud deployments",
        "Cisco AICTE Cyber Security Internship",
        "Oracle & Microsoft Azure certifications",
      ],
    },
    {
      year: "2026",
      title: "Final Year Mission",
      subtitle: "Career Preparation & Full-Stack",
      icon: <Award className="w-5 h-5" />,
      color: "#FFC107",
      tags: ["CareerForge", "AI", "Full Stack"],
      details: [
        "CareerForge AI career planning platform",
        "Full-stack application development",
        "System design & architecture patterns",
        "Professional career preparation pipeline",
      ],
    },
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-8 px-4">
      {/* Central beam track (background) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#00E5FF]/10" />

      {/* Animated fill beam */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 top-0 w-[2px] origin-top"
        style={{
          height: lineHeight,
          background: "linear-gradient(to bottom, #00E5FF, #18FFFF, #00FF88, #FFC107)",
          boxShadow: "0 0 12px #00E5FF",
        }}
      />

      <div className="space-y-0">
        {events.map((event, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div key={idx}>
              {/* Card Row */}
              <div className="relative flex items-center justify-center w-full min-h-[180px]">
                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.05 }}
                  className={`absolute w-full md:w-[45%] ${isLeft ? "md:right-[55%] md:pr-8" : "md:left-[55%] md:pl-8"}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, rotateX: 2 }}
                    className="glass-panel p-5 rounded-xl border relative overflow-hidden cursor-default group transition-all duration-300"
                    style={{
                      borderColor: `${event.color}30`,
                      background: "rgba(8,18,30,0.5)",
                    }}
                    whileHover-style={{ borderColor: `${event.color}80` } as Record<string, unknown>}
                  >
                    {/* Hover glow border */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 20px ${event.color}15` }}
                    />

                    <ScanLine />

                    {/* Corner tag */}
                    <div
                      className="absolute top-3 right-3 text-[9px] font-mono px-2 py-0.5 rounded border"
                      style={{ color: event.color, borderColor: `${event.color}30`, background: `${event.color}10` }}
                    >
                      MOD_{String(idx + 1).padStart(2, "0")}
                    </div>

                    {/* Year badge */}
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold mb-3 border"
                      style={{
                        color: event.color,
                        borderColor: `${event.color}40`,
                        background: `${event.color}15`,
                        boxShadow: `0 0 10px ${event.color}20`,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: event.color }} />
                      {event.year}
                    </div>

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="p-2 rounded-lg border flex-shrink-0"
                        style={{
                          background: `${event.color}15`,
                          borderColor: `${event.color}30`,
                          color: event.color,
                          boxShadow: `0 0 10px ${event.color}20`,
                        }}
                      >
                        {event.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-black text-white tracking-wide leading-tight">{event.title}</h3>
                        <p className="text-xs text-[#A5B4C3] font-mono">{event.subtitle}</p>
                      </div>
                    </div>

                    {/* Details */}
                    <ul className="space-y-1 font-mono text-[11px] text-[#A5B4C3]/80 mb-3">
                      {event.details.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span style={{ color: event.color }} className="mt-0.5 flex-shrink-0">▸</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {event.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded border"
                          style={{ color: event.color, borderColor: `${event.color}20`, background: `${event.color}10` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Central glowing node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.4 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center border-2 relative cursor-pointer"
                    style={{
                      background: "#050816",
                      borderColor: event.color,
                      boxShadow: `0 0 15px ${event.color}, 0 0 30px ${event.color}40`,
                    }}
                  >
                    <div
                      className="absolute w-14 h-14 rounded-full opacity-10 animate-ping"
                      style={{ background: event.color }}
                    />
                    <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: event.color }} />
                  </motion.div>
                </div>
              </div>

              {/* Animated downward arrow between nodes */}
              {idx < events.length - 1 && (
                <div className="flex justify-center my-1 z-10 relative">
                  <motion.div
                    animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <ChevronDown className="w-4 h-4 text-[#00E5FF]" />
                    <ChevronDown className="w-4 h-4 text-[#00E5FF]/40 -mt-2" />
                  </motion.div>
                </div>
              )}
            </div>
          );
        })}

        {/* Final Arrow before destination */}
        <div className="flex justify-center my-2 z-10 relative">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-0.5"
          >
            <ChevronDown className="w-5 h-5 text-[#00E5FF]" />
            <ChevronDown className="w-5 h-5 text-[#00E5FF]/50 -mt-2.5" />
            <ChevronDown className="w-5 h-5 text-[#00E5FF]/20 -mt-2.5" />
          </motion.div>
        </div>

        {/* Future destination node */}
        <div className="relative flex items-center justify-center w-full pt-4 pb-8">
          {/* Central rocket node */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10 -top-2">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#00E5FF]"
              style={{
                background: "linear-gradient(135deg, #00E5FF20, #18FFFF10)",
                boxShadow: "0 0 25px #00E5FF, 0 0 50px #00E5FF40",
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket className="w-5 h-5 text-[#00E5FF]" />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-16"
          >
            {/* Outer glow ring */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl"
              style={{ background: "linear-gradient(135deg, #00E5FF20, #18FFFF10)", filter: "blur(12px)" }}
            />

            <div
              className="relative px-8 py-4 rounded-2xl border-2 text-center"
              style={{
                borderColor: "#00E5FF",
                background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(24,255,255,0.05))",
                boxShadow: "0 0 30px #00E5FF40, inset 0 0 20px #00E5FF10",
              }}
            >
              <span className="font-mono text-[10px] text-[#00E5FF]/70 tracking-[0.3em] block mb-1">
                // MISSION OBJECTIVE
              </span>
              <span className="font-display font-black text-xl md:text-2xl tracking-widest uppercase text-white">
                🚀 Software Engineer
              </span>
              <span className="font-mono text-[10px] text-[#18FFFF]/60 tracking-widest block mt-1">
                DESTINATION: PRODUCTION // STATUS: INCOMING
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
