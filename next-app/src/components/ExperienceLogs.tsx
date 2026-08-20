"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Radio, CheckCircle2, Clock, Zap, Terminal } from "lucide-react";

interface MissionLog {
  organization: string;
  role: string;
  duration: string;
  missionId: string;
  status: "COMPLETED" | "ACTIVE";
  icon: React.ReactNode;
  objectives: string[];
  systemReadout: string;
  techStack: string[];
  clearanceLevel: string;
  color: string;
}

function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [started, text]);

  return <span>{displayed}<span className="animate-pulse">_</span></span>;
}

export default function ExperienceLogs() {
  const missions: MissionLog[] = [
    {
      organization: "Cisco Networking Academy",
      role: "Networking Essentials & Packet Tracer Specialist",
      duration: "2024 – 2025",
      missionId: "CISCO-NET-001",
      status: "COMPLETED",
      icon: <Radio className="w-6 h-6" />,
      color: "#00E5FF",
      clearanceLevel: "CLEARANCE-LVL-3",
      objectives: [
        "Constructed advanced virtual network topologies using Cisco Packet Tracer with OSPF & RIP routing protocols.",
        "Demonstrated subnetting, routing protocols, and basic firewall security configurations across simulated environments.",
        "Developed network troubleshooting routines with simulated diagnostic instruments and protocol analyzers.",
      ],
      systemReadout: "ROUTING_TABLE: INITIALIZED // SUBNET_MASK: VERIFIED // INFRASTRUCTURE: OPERATIONAL",
      techStack: ["Cisco Packet Tracer", "OSPF", "RIP", "Subnetting", "Network Protocols"],
    },
    {
      organization: "Cisco AICTE Virtual Internship",
      role: "Cyber Security Architect & Analyst",
      duration: "2025",
      missionId: "CISCO-AICTE-002",
      status: "COMPLETED",
      icon: <Shield className="w-6 h-6" />,
      color: "#00FF88",
      clearanceLevel: "CLEARANCE-LVL-4",
      objectives: [
        "Analyzed operational threats and implemented cryptographic principles (SHA-256) for data protection.",
        "Executed network vulnerability assessments and security system audits across simulated corporate networks.",
        "Engineered mitigation tactics against malware, phishing, and intrusion vectors using industry frameworks.",
      ],
      systemReadout: "FIREWALL: ENFORCED // ENCRYPTION: SHA-256 // THREAT_SHIELD: NOMINAL // INTRUSION_DETECT: ACTIVE",
      techStack: ["Cyber Security", "Cryptography", "SHA-256", "Firewall Config", "Threat Analysis"],
    },
  ];

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      {missions.map((mission, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: idx * 0.15 }}
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(8,18,30,0.9), rgba(5,8,22,0.95))",
            border: `1px solid ${mission.color}25`,
            boxShadow: `0 0 30px ${mission.color}10`,
          }}
        >
          {/* Animated entry scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none z-10"
            style={{ background: `linear-gradient(to right, transparent, ${mission.color}80, transparent)` }}
            initial={{ top: "0%", opacity: 1 }}
            whileInView={{ top: ["0%", "100%"] }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: idx * 0.2, ease: "easeInOut" }}
          />

          {/* Left accent stripe */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
            style={{
              background: `linear-gradient(to bottom, ${mission.color}, ${mission.color}30)`,
              boxShadow: `0 0 12px ${mission.color}`,
            }}
          />

          <div className="pl-6 pr-6 pt-5 pb-6">
            {/* Top diagnostic bar */}
            <div
              className="flex items-center justify-between text-[9px] font-mono border-b pb-3 mb-5"
              style={{ borderColor: `${mission.color}15`, color: "#A5B4C3" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="px-2 py-0.5 rounded border font-bold tracking-widest"
                  style={{ color: mission.color, borderColor: `${mission.color}30`, background: `${mission.color}10` }}
                >
                  MISSION_LOG
                </span>
                <span className="text-[#A5B4C3]/50">{mission.missionId}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: mission.color }}
                />
                <span style={{ color: mission.color }} className="font-bold tracking-widest">
                  STATUS: {mission.status}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Mission icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-4 rounded-xl border flex-shrink-0 relative overflow-hidden"
                style={{
                  background: `${mission.color}10`,
                  borderColor: `${mission.color}30`,
                  color: mission.color,
                  boxShadow: `0 0 20px ${mission.color}20`,
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{
                    background: `conic-gradient(${mission.color}, transparent, ${mission.color})`,
                  }}
                />
                <div className="relative z-10">{mission.icon}</div>
              </motion.div>

              <div className="space-y-4 w-full">
                {/* Identity */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[9px] font-mono px-2 py-0.5 rounded border"
                      style={{ color: mission.color, borderColor: `${mission.color}30`, background: `${mission.color}10` }}
                    >
                      {mission.clearanceLevel}
                    </span>
                    <span className="text-[10px] font-mono text-[#A5B4C3]/60">{mission.duration}</span>
                  </div>
                  <h3 className="text-xl font-black text-white tracking-wide">{mission.organization}</h3>
                  <h4 className="text-sm font-mono text-[#A5B4C3]/80 mt-0.5">{mission.role}</h4>
                </div>

                {/* Objectives */}
                <div>
                  <span
                    className="text-[9px] font-mono tracking-widest block mb-2"
                    style={{ color: `${mission.color}80` }}
                  >
                    // MISSION DIRECTIVES:
                  </span>
                  <ul className="space-y-2">
                    {mission.objectives.map((obj, oIdx) => (
                      <motion.li
                        key={oIdx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + oIdx * 0.1 }}
                        className="flex items-start gap-2.5 text-xs text-[#A5B4C3] font-mono leading-relaxed"
                      >
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: mission.color }}
                        />
                        <span>{obj}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack pills */}
                <div>
                  <span
                    className="text-[9px] font-mono tracking-widest block mb-2"
                    style={{ color: `${mission.color}80` }}
                  >
                    // TECH ARSENAL:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {mission.techStack.map((tech, tIdx) => (
                      <motion.span
                        key={tIdx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: tIdx * 0.05 }}
                        className="text-[9px] font-mono px-2 py-0.5 rounded border"
                        style={{
                          color: mission.color,
                          borderColor: `${mission.color}30`,
                          background: `${mission.color}08`,
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Terminal readout */}
                <div
                  className="p-3 rounded-lg border font-mono text-[10px] flex items-center gap-2"
                  style={{
                    background: "#050816",
                    borderColor: `${mission.color}15`,
                    color: mission.color,
                  }}
                >
                  <Terminal className="w-3 h-3 flex-shrink-0" />
                  <span className="text-[#A5B4C3]/60 mr-1">$</span>
                  <TypingText text={mission.systemReadout} delay={idx * 0.5 + 0.5} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
