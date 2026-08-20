"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Terminal, Cpu, Database, Wrench, Layers, Wifi } from "lucide-react";

interface SkillItem {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: SkillItem[];
}

function HolographicCard({
  cat,
  idx,
}: {
  cat: SkillCategory;
  idx: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(e.clientX - cx);
    y.set(e.clientY - cy);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.08 }}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-default"
    >
      <div
        className="relative rounded-2xl border overflow-hidden transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(8,18,30,0.85), rgba(5,8,22,0.9))",
          borderColor: isHovered ? `${cat.color}60` : `${cat.color}20`,
          boxShadow: isHovered
            ? `0 0 30px ${cat.color}30, 0 0 60px ${cat.color}15, inset 0 0 20px ${cat.color}08`
            : `0 0 10px ${cat.color}10`,
        }}
      >
        {/* Holographic shimmer overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(135deg, ${cat.color}08 0%, transparent 50%, ${cat.color}05 100%)`,
          }}
        />

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ background: `linear-gradient(to right, transparent, ${cat.color}60, transparent)` }}
          animate={isHovered ? { top: ["0%", "100%", "0%"] } : { top: "50%" }}
          transition={{ duration: 2.5, repeat: isHovered ? Infinity : 0, ease: "linear" }}
        />

        {/* Corner bracket decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 rounded-tl-sm" style={{ borderColor: cat.color }} />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 rounded-tr-sm" style={{ borderColor: cat.color }} />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 rounded-bl-sm" style={{ borderColor: cat.color }} />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 rounded-br-sm" style={{ borderColor: cat.color }} />

        <div className="p-6">
          {/* Header */}
          <div
            className="flex items-center gap-3 pb-4 mb-4 border-b"
            style={{ borderColor: `${cat.color}15` }}
          >
            <motion.div
              animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="p-2.5 rounded-xl border"
              style={{
                background: `${cat.color}15`,
                borderColor: `${cat.color}30`,
                color: cat.color,
                boxShadow: isHovered ? `0 0 15px ${cat.color}40` : "none",
              }}
            >
              {cat.icon}
            </motion.div>
            <div>
              <h3 className="font-black text-sm text-white tracking-widest uppercase">{cat.title}</h3>
              <span
                className="text-[9px] font-mono tracking-widest"
                style={{ color: cat.color }}
              >
                SKILL_MODULE // {cat.skills.length} LOADED
              </span>
            </div>
          </div>

          {/* Skill Bars */}
          <div className="space-y-3.5">
            {cat.skills.map((skill, sIdx) => (
              <div key={sIdx} className="space-y-1 font-mono text-xs">
                <div className="flex justify-between text-[#A5B4C3]">
                  <span className="text-white/80">{skill.name}</span>
                  <motion.span
                    className="font-bold"
                    style={{ color: cat.color }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>

                {/* Progress track */}
                <div
                  className="w-full h-1.5 rounded-full overflow-hidden relative"
                  style={{ background: `${cat.color}10`, border: `1px solid ${cat.color}15` }}
                >
                  <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: sIdx * 0.06 }}
                    style={{
                      background: `linear-gradient(to right, ${cat.color}80, ${cat.color})`,
                      boxShadow: `0 0 8px ${cat.color}`,
                    }}
                  >
                    {/* Inner shimmer */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)`,
                      }}
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: sIdx * 0.1 }}
                    />
                  </motion.div>

                  {/* Segment markers */}
                  {[25, 50, 75].map((mark) => (
                    <div
                      key={mark}
                      className="absolute top-0 bottom-0 w-px"
                      style={{ left: `${mark}%`, background: `${cat.color}20` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillMatrix() {
  const categories: SkillCategory[] = [
    {
      title: "Languages",
      icon: <Terminal className="w-5 h-5" />,
      color: "#00E5FF",
      skills: [
        { name: "Java", level: 90 },
        { name: "Python", level: 80 },
        { name: "SQL", level: 85 },
        { name: "JavaScript", level: 75 },
        { name: "HTML", level: 90 },
        { name: "CSS", level: 88 },
        { name: "C", level: 70 },
      ],
    },
    {
      title: "Core Subjects",
      icon: <Cpu className="w-5 h-5" />,
      color: "#18FFFF",
      skills: [
        { name: "Data Structures", level: 85 },
        { name: "Algorithms", level: 82 },
        { name: "DBMS", level: 85 },
        { name: "Operating Systems", level: 78 },
        { name: "Computer Networks", level: 82 },
        { name: "OOP", level: 92 },
        { name: "Software Engineering", level: 85 },
      ],
    },
    {
      title: "Database",
      icon: <Database className="w-5 h-5" />,
      color: "#00FF88",
      skills: [
        { name: "MySQL", level: 88 },
        { name: "JDBC", level: 80 },
        { name: "Oracle DB", level: 72 },
        { name: "Schema Design", level: 82 },
      ],
    },
    {
      title: "Tools",
      icon: <Wrench className="w-5 h-5" />,
      color: "#FFC107",
      skills: [
        { name: "Git", level: 85 },
        { name: "GitHub", level: 88 },
        { name: "VS Code", level: 92 },
        { name: "Arduino IDE", level: 78 },
        { name: "Packet Tracer", level: 82 },
      ],
    },
    {
      title: "Technologies",
      icon: <Layers className="w-5 h-5" />,
      color: "#FF3366",
      skills: [
        { name: "Artificial Intelligence", level: 75 },
        { name: "IoT", level: 80 },
        { name: "Embedded Systems", level: 78 },
        { name: "Cloud (Azure/Oracle)", level: 72 },
      ],
    },
    {
      title: "Networking",
      icon: <Wifi className="w-5 h-5" />,
      color: "#A855F7",
      skills: [
        { name: "Network Protocols", level: 82 },
        { name: "Cyber Security", level: 78 },
        { name: "OSPF / RIP Routing", level: 75 },
        { name: "Subnetting", level: 80 },
      ],
    },
  ];

  return (
    <div className="space-y-8 w-full">
      {/* Header stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Skills Loaded", value: "30+", color: "#00E5FF" },
          { label: "Proficiency Avg", value: "82%", color: "#00FF88" },
          { label: "Categories", value: "6", color: "#FFC107" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-4 rounded-xl border text-center"
            style={{ borderColor: `${stat.color}20`, background: `${stat.color}05` }}
          >
            <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[10px] font-mono text-[#A5B4C3]/60 mt-1 uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Holographic skill cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {categories.map((cat, idx) => (
          <HolographicCard key={idx} cat={cat} idx={idx} />
        ))}
      </div>
    </div>
  );
}
