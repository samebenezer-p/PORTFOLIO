"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Star, Award, Shield, Code2, ExternalLink,
  CheckCircle, Trophy, TrendingUp, Cpu, Globe, Terminal
} from "lucide-react";

/* ─── data ───────────────────────────────────────────── */
const PROFILE_STATS = [
  { label: "Global Rank", value: "#Top 5%", color: "#00FF88" },
  { label: "Points",      value: "3,240",   color: "#FFC107" },
  { label: "Submissions", value: "420+",    color: "#00E5FF" },
  { label: "Problems",    value: "180+",    color: "#A855F7" },
];

const DOMAIN_STARS = [
  { domain: "Problem Solving", stars: 5, color: "#00FF88", icon: "🧩" },
  { domain: "Java",           stars: 5, color: "#F89820", icon: "☕" },
  { domain: "SQL",            stars: 5, color: "#00E5FF", icon: "🗄️" },
  { domain: "Python",         stars: 4, color: "#3776AB", icon: "🐍" },
  { domain: "C",              stars: 3, color: "#A8B9CC", icon: "⚙️" },
];

const SKILL_BADGES = [
  { name: "Java (Gold)",             level: "GOLD",   color: "#F89820", icon: "☕",  glow: "#F8982060" },
  { name: "SQL (Gold)",              level: "GOLD",   color: "#F89820", icon: "🗄️", glow: "#F8982060" },
  { name: "Problem Solving (Gold)",  level: "GOLD",   color: "#F89820", icon: "🧩", glow: "#F8982060" },
  { name: "Python (Silver)",         level: "SILVER", color: "#C0C0C0", icon: "🐍", glow: "#C0C0C060" },
  { name: "30 Days of Code",         level: "SILVER", color: "#C0C0C0", icon: "🔥", glow: "#C0C0C060" },
  { name: "10 Days of JS",           level: "BRONZE", color: "#CD7F32", icon: "⚡", glow: "#CD7F3260" },
];

const CERTIFICATIONS = [
  { name: "Software Engineer Certificate", issuer: "HackerRank", date: "2024", color: "#00FF88", verified: true },
  { name: "Java (Basic) Certificate",      issuer: "HackerRank", date: "2024", color: "#F89820", verified: true },
  { name: "SQL (Advanced) Certificate",    issuer: "HackerRank", date: "2024", color: "#00E5FF", verified: true },
  { name: "Problem Solving (Basic)",       issuer: "HackerRank", date: "2025", color: "#A855F7", verified: true },
];

const SKILL_LEVELS = [
  { name: "Java",             pct: 90, color: "#F89820" },
  { name: "SQL",              pct: 88, color: "#00E5FF" },
  { name: "Problem Solving",  pct: 85, color: "#00FF88" },
  { name: "Python",           pct: 78, color: "#3776AB" },
  { name: "Data Structures",  pct: 82, color: "#FFC107" },
  { name: "Algorithms",       pct: 80, color: "#FF3366" },
];

/* ─── sub-components ────────────────────────────────── */
function StarRating({ count, max = 5, color }: { count: number; max?: number; color: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, type: "spring", bounce: 0.5 }}
        >
          <Star
            className="w-3.5 h-3.5"
            fill={i < count ? color : "transparent"}
            style={{
              color: i < count ? color : "#A5B4C360",
              filter: i < count ? `drop-shadow(0 0 4px ${color})` : "none",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function AnimCounter({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - p, 3);
      if (ref.current) ref.current.textContent = String(Math.floor(to * ease));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);
  return <span ref={ref}>0</span>;
}

/* ─── holographic scan overlay ─────────────────────── */
function ScanOverlay({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="hr-scan"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 z-20 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-6"
          style={{ background: "rgba(5,8,22,0.97)" }}
        >
          {/* Horizontal scan beam */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent, #00FF8880, transparent)" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
          {/* Vertical scan beam */}
          <motion.div
            className="absolute top-0 bottom-0 w-0.5 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #00FF8840, transparent)" }}
            animate={{ left: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          {/* Holographic hex ring */}
          <div className="relative">
            <motion.div
              className="w-24 h-24 relative flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              {/* Hexagon ring segments */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#00FF88]"
                  style={{
                    top: "50%", left: "50%",
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-36px)`,
                    boxShadow: "0 0 8px #00FF88",
                  }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ boxShadow: ["0 0 20px #00FF8840", "0 0 50px #00FF8880", "0 0 20px #00FF8840"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Trophy className="w-8 h-8 text-[#00FF88]" />
            </motion.div>
          </div>
          <div className="text-center space-y-2">
            <div className="font-mono text-sm text-[#00FF88] font-bold tracking-widest">
              BOOTING HACKERRANK CONSOLE...
            </div>
            <div className="flex justify-center gap-1.5">
              {[0, 1, 2, 3, 4].map(i => (
                <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#00FF88]"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── holographic card ──────────────────────────────── */
function HoloCard({ children, color = "#00FF88", className = "", delay = 0 }: {
  children: React.ReactNode; color?: string; className?: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={`glass-panel rounded-xl border relative overflow-hidden ${className}`}
      style={{ borderColor: `${color}20` }}
    >
      {/* Corner brackets */}
      {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
        "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
        <div key={i} className={`absolute w-3 h-3 ${cls}`} style={{ borderColor: `${color}50` }} />
      ))}
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${color}60, transparent)` }} />
      {children}
    </motion.div>
  );
}

/* ─── main ──────────────────────────────────────────── */
export default function HackerRankDashboard() {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 2000); return () => clearTimeout(t); }, []);

  return (
    <div className="relative space-y-6 w-full">
      <ScanOverlay done={ready} />

      {/* Profile card */}
      <HoloCard color="#00FF88" className="p-6">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 30%, rgba(0,255,136,0.03) 50%, transparent 70%)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <motion.div
              className="w-20 h-20 rounded-2xl border-2 border-[#00FF88] flex items-center justify-center text-2xl font-black text-[#00FF88]"
              style={{ background: "rgba(0,255,136,0.08)", boxShadow: "0 0 25px #00FF8840" }}
              animate={{ boxShadow: ["0 0 15px #00FF8830", "0 0 40px #00FF8870", "0 0 15px #00FF8830"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              SE
            </motion.div>
            <motion.div
              className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#00FF88] border border-[#050816] flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle className="w-3 h-3 text-[#050816]" />
            </motion.div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="font-mono text-[10px] text-[#00FF88]/60 tracking-widest mb-1">// HACKERRANK_OPERATIONS_CONSOLE</div>
            <h3 className="text-xl font-black text-white">Sam Ebenezer P</h3>
            <p className="font-mono text-xs text-[#A5B4C3]/60 mt-0.5">@samebenezer</p>
            <div className="flex flex-wrap gap-4 mt-3 justify-center md:justify-start">
              {PROFILE_STATS.map((s, i) => (
                <div key={i} className="text-center font-mono">
                  <div className="text-lg font-black" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[9px] text-[#A5B4C3]/50 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.a
            href="https://www.hackerrank.com/profile/samebenezer"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#00FF88] font-mono text-xs text-[#00FF88] hover:bg-[#00FF88]/10 transition-all duration-300 flex-shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Profile
          </motion.a>
        </div>
      </HoloCard>

      {/* Domain stars + Skill proficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Domain Stars */}
        <HoloCard color="#00FF88" className="p-5" delay={0.05}>
          <div className="font-mono text-xs text-[#00FF88] font-bold tracking-widest flex items-center gap-2 mb-5">
            <Star className="w-4 h-4" /> DOMAIN_STARS
          </div>
          <div className="space-y-4">
            {DOMAIN_STARS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ background: `${s.color}06`, borderLeft: `2px solid ${s.color}40` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-mono text-sm text-white font-semibold">{s.domain}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating count={s.stars} color={s.color} />
                  <span className="font-mono text-[10px] font-bold w-6 text-right" style={{ color: s.color }}>{s.stars}/5</span>
                </div>
              </motion.div>
            ))}
          </div>
        </HoloCard>

        {/* Skill proficiency */}
        <HoloCard color="#00FF88" className="p-5" delay={0.1}>
          <div className="font-mono text-xs text-[#00FF88] font-bold tracking-widest flex items-center gap-2 mb-5">
            <Code2 className="w-4 h-4" /> SKILL_PROFICIENCY_MAP
          </div>
          <div className="space-y-4">
            {SKILL_LEVELS.map((sk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
                className="space-y-1.5 font-mono text-xs"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[#A5B4C3] font-medium">{sk.name}</span>
                  <div className="flex items-center gap-2">
                    <span style={{ color: sk.color }} className="font-bold">{sk.pct}%</span>
                    {/* Mini rank badge */}
                    <span
                      className="text-[8px] px-1.5 py-0.5 rounded font-bold"
                      style={{
                        background: `${sk.color}15`,
                        color: sk.color,
                        border: `1px solid ${sk.color}30`
                      }}
                    >
                      {sk.pct >= 85 ? "GOLD" : sk.pct >= 75 ? "SILVER" : "BRONZE"}
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: `${sk.color}10` }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${sk.color}80, ${sk.color})`, boxShadow: `0 0 6px ${sk.color}` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${sk.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.3, ease: "easeOut", delay: i * 0.09 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </HoloCard>
      </div>

      {/* Skill Badges */}
      <HoloCard color="#00FF88" className="p-5" delay={0.15}>
        <div className="font-mono text-xs text-[#00FF88] font-bold tracking-widest flex items-center gap-2 mb-5">
          <Award className="w-4 h-4" /> EARNED_SKILL_BADGES
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {SKILL_BADGES.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", bounce: 0.5 }}
              whileHover={{ scale: 1.12, y: -5 }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border cursor-default relative overflow-hidden"
              style={{
                borderColor: `${b.color}30`,
                background: `${b.color}08`,
                boxShadow: `0 0 15px ${b.glow}`,
              }}
            >
              {/* Glow aura */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                style={{ background: `radial-gradient(circle at center, ${b.color}, transparent)` }}
              />
              {/* Level badge top */}
              <div
                className="absolute top-1.5 right-1.5 text-[7px] font-bold font-mono px-1 py-0.5 rounded"
                style={{ background: `${b.color}20`, color: b.color, border: `1px solid ${b.color}30` }}
              >
                {b.level}
              </div>
              <span className="text-3xl relative z-10 mt-1">{b.icon}</span>
              <span className="font-mono text-[9px] text-center relative z-10 leading-tight" style={{ color: b.color }}>
                {b.name}
              </span>
            </motion.div>
          ))}
        </div>
      </HoloCard>

      {/* Certifications */}
      <HoloCard color="#00FF88" className="p-5" delay={0.2}>
        <div className="font-mono text-xs text-[#00FF88] font-bold tracking-widest flex items-center gap-2 mb-5">
          <Shield className="w-4 h-4" /> VERIFIED_CERTIFICATIONS
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CERTIFICATIONS.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 p-4 rounded-xl border relative overflow-hidden group"
              style={{ borderColor: `${c.color}20`, background: `${c.color}06` }}
            >
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(to right, ${c.color}08, transparent)` }}
              />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}
              >
                <CheckCircle className="w-5 h-5" style={{ color: c.color }} />
              </div>
              <div className="flex-1 min-w-0 relative z-10">
                <div className="font-mono text-xs font-bold text-white leading-tight">{c.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-[9px] text-[#A5B4C3]/50">{c.issuer}</span>
                  <span className="font-mono text-[9px] text-[#A5B4C3]/30">·</span>
                  <span className="font-mono text-[9px]" style={{ color: c.color }}>{c.date}</span>
                </div>
              </div>
              {c.verified && (
                <div
                  className="flex-shrink-0 text-[8px] font-bold font-mono px-2 py-0.5 rounded-full relative z-10"
                  style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}30` }}
                >
                  VERIFIED ✓
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </HoloCard>

      {/* Programming domains grid */}
      <HoloCard color="#00FF88" className="p-5" delay={0.25}>
        <div className="font-mono text-xs text-[#00FF88] font-bold tracking-widest flex items-center gap-2 mb-5">
          <Globe className="w-4 h-4" /> PROGRAMMING_DOMAINS
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { domain: "Algorithms",        color: "#00E5FF", icon: "⚡", pts: 850 },
            { domain: "Data Structures",   color: "#00FF88", icon: "🌲", pts: 780 },
            { domain: "Mathematics",       color: "#FFC107", icon: "📐", pts: 620 },
            { domain: "SQL",               color: "#00E5FF", icon: "🗄️", pts: 720 },
            { domain: "Java",              color: "#F89820", icon: "☕", pts: 900 },
            { domain: "Python",            color: "#3776AB", icon: "🐍", pts: 650 },
          ].map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", bounce: 0.3 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border cursor-default text-center"
              style={{ borderColor: `${d.color}20`, background: `${d.color}07` }}
            >
              <span className="text-2xl">{d.icon}</span>
              <span className="font-mono text-[9px] text-[#A5B4C3]/70 leading-tight">{d.domain}</span>
              <span className="font-mono text-xs font-bold" style={{ color: d.color }}>{d.pts}pts</span>
            </motion.div>
          ))}
        </div>
      </HoloCard>
    </div>
  );
}
