"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Code2, TrendingUp, Award, Target, BarChart3, Trophy, Flame,
  Calendar, ExternalLink, ChevronUp, CheckCircle, Wifi, WifiOff, RefreshCw
} from "lucide-react";

/* ─── types ──────────────────────────────────────────── */
type RecentSub = {
  title: string;
  slug: string;
  timestamp: string;
  lang: string;
  url: string;
};

type LeetCodeData = {
  success: boolean;
  fallback?: boolean;
  username: string;
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  ranking: number;
  contestRating: number;
  contestRanking: number | null;
  attendedContests: number;
  topPercentage: string;
  streak: number;
  totalActiveDays: number;
  submissionCalendar: Record<string, number>;
  recentSubmissions: RecentSub[];
};

/* ─── static default profile ──────────────────────────── */
const PROFILE = {
  username: "SamEbenezer",
  url: "https://leetcode.com/u/SamEbenezer/",
  solved: 312,
  total: 3200,
  easy: 185, easyTotal: 800,
  medium: 110, mediumTotal: 1600,
  hard: 17, hardTotal: 800,
  contestRating: 1582,
  globalRank: "TOP 8.4%",
  streak: 14,
  attendedContests: 12,
};

const BADGES = [
  { name: "50 Days\n2024",    icon: "🔥", color: "#FF3366", glow: "#FF336660" },
  { name: "100 Days\nBadge",  icon: "💯", color: "#FFC107", glow: "#FFC10760" },
  { name: "Annual\n2024",     icon: "🏆", color: "#00E5FF", glow: "#00E5FF60" },
  { name: "Guardian\n500",    icon: "⚔️", color: "#00FF88", glow: "#00FF8860" },
  { name: "Knight\n1500",     icon: "🗡️", color: "#A855F7", glow: "#A855F760" },
];

const LANG_STATS = [
  { lang: "Java",   solved: 180, color: "#F89820" },
  { lang: "Python", solved:  85, color: "#3776AB" },
  { lang: "SQL",    solved:  47, color: "#00E5FF" },
];

const CONTEST_HISTORY = [
  { name: "Weekly Contest 395", rank: 2180, delta: +12 },
  { name: "Biweekly Contest 128", rank: 1980, delta: +47 },
  { name: "Weekly Contest 390", rank: 2350, delta: -38 },
  { name: "Biweekly Contest 125", rank: 2150, delta: +25 },
];

/* stable fallback heatmap */
function makeHeatmap(): number[][] {
  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      const seed = (w * 7 + d + 13) * 1234567;
      const r = ((seed ^ (seed >> 8)) & 0xff) / 255;
      week.push(r < 0.35 ? 0 : r < 0.55 ? 1 : r < 0.75 ? 2 : r < 0.9 ? 3 : 4);
    }
    weeks.push(week);
  }
  return weeks;
}
const SEEDED_HEATMAP = makeHeatmap();
const HEAT_COLORS = ["#1a1a2e", "#1a3a4c", "#0e7490", "#0891b2", "#00E5FF"];

function relativeTime(unixSeconds: string): string {
  const ts = parseInt(unixSeconds, 10) * 1000;
  if (isNaN(ts)) return "recently";
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

/* ─── sub-components ────────────────────────────────── */
function AnimCounter({ to, duration = 1.8, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - p, 3);
      if (ref.current) ref.current.textContent = Math.floor(to * ease) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

function ProgressRing({
  size, strokeW, value, max, color, children
}: {
  size: number; strokeW: number; value: number; max: number;
  color: string; children?: React.ReactNode;
}) {
  const r = (size - strokeW) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={`${color}18`} strokeWidth={strokeW} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={`${color}15`} strokeWidth={strokeW + 4} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={strokeW} strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ * (1 - pct) }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="z-10 text-center">{children}</div>
    </div>
  );
}

function DifficultyBar({ name, count, total, color }: { name: string; count: number; total: number; color: string }) {
  return (
    <div className="space-y-1.5 font-mono text-xs">
      <div className="flex justify-between items-center">
        <span className="font-bold" style={{ color }}>{name}</span>
        <span className="text-[#A5B4C3]/60">{count}<span className="text-[#A5B4C3]/30">/{total}</span></span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: `${color}12` }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}aa, ${color})`, boxShadow: `0 0 8px ${color}` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${(count / total) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function ScanOverlay({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="leet-scan"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 z-20 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-6"
          style={{ background: "rgba(5,8,22,0.96)" }}
        >
          <motion.div
            className="absolute left-0 right-0 h-0.5 pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent, #FFC10780, transparent)" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="w-20 h-20 rounded-full border-2 border-[#FFC107] flex items-center justify-center relative"
            style={{ boxShadow: "0 0 30px #FFC10760" }}
            animate={{ boxShadow: ["0 0 20px #FFC10740", "0 0 50px #FFC10790", "0 0 20px #FFC10740"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border border-[#FFC107]"
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <Code2 className="w-8 h-8 text-[#FFC107]" />
          </motion.div>
          <div className="text-center space-y-2">
            <div className="font-mono text-sm text-[#FFC107] font-bold tracking-widest">
              LOADING LEETCODE COMMAND CENTER...
            </div>
            <div className="flex justify-center gap-1.5">
              {[0, 1, 2, 3, 4].map(i => (
                <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#FFC107]"
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

function StatusBadge({ isFallback, loading }: { isFallback: boolean; loading: boolean }) {
  if (loading) return null;
  if (isFallback) {
    return (
      <div className="flex items-center gap-1.5 px-2 py-1 rounded border font-mono text-[9px] font-bold"
        style={{ borderColor: "#FF336630", background: "#FF336608", color: "#FF3366" }}>
        <WifiOff className="w-3 h-3" />
        FALLBACK_MODE
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded border font-mono text-[9px] font-bold"
      style={{ borderColor: "#00FF8830", background: "#00FF8808", color: "#00FF88" }}>
      <Wifi className="w-3 h-3" />
      LIVE_DATA
    </div>
  );
}

/* ─── main component ────────────────────────────────── */
export default function LeetCodeDashboard() {
  const [ready, setReady] = useState(false);
  const [apiLoading, setApiLoading] = useState(true);
  const [liveData, setLiveData] = useState<LeetCodeData | null>(null);

  useEffect(() => {
    fetch("/api/leetcode")
      .then((res) => res.json())
      .then((data: LeetCodeData) => {
        if (data) setLiveData(data);
        setApiLoading(false);
      })
      .catch(() => setApiLoading(false));

    const t = setTimeout(() => setReady(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const isFallback = !liveData?.success || !!liveData?.fallback;
  const totalSolved = liveData?.totalSolved ?? PROFILE.solved;
  const easyCount = liveData?.easy ?? PROFILE.easy;
  const mediumCount = liveData?.medium ?? PROFILE.medium;
  const hardCount = liveData?.hard ?? PROFILE.hard;
  const contestRating = liveData?.contestRating ?? PROFILE.contestRating;
  const globalRank = liveData?.topPercentage ?? PROFILE.globalRank;
  const streak = liveData?.streak ?? PROFILE.streak;
  const attendedContests = liveData?.attendedContests ?? PROFILE.attendedContests;
  const ranking = liveData?.ranking ? `#${liveData.ranking.toLocaleString()}` : PROFILE.globalRank;
  const recentSubmissions = liveData?.recentSubmissions ?? [];

  const pct = Math.round((totalSolved / PROFILE.total) * 100);

  /* Compute live heatmap grid if calendar present */
  const heatmapGrid = React.useMemo(() => {
    if (!liveData?.submissionCalendar || Object.keys(liveData.submissionCalendar).length === 0) {
      return SEEDED_HEATMAP;
    }
    const cal = liveData.submissionCalendar;
    // Map last 364 days to 52 weeks x 7 days
    const now = Math.floor(Date.now() / 1000);
    const daySecs = 86400;
    const grid: number[][] = [];
    for (let w = 0; w < 52; w++) {
      const week: number[] = [];
      for (let d = 0; d < 7; d++) {
        const targetDaySecs = now - (51 - w) * 7 * daySecs - (6 - d) * daySecs;
        // Search calendar timestamps within 12 hours of targetDaySecs
        const count = Object.entries(cal).reduce((sum, [t, cnt]) => {
          const epoch = parseInt(t, 10);
          if (Math.abs(epoch - targetDaySecs) < 43200) return sum + cnt;
          return sum;
        }, 0);
        const lvl = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 7 ? 3 : 4;
        week.push(lvl);
      }
      grid.push(week);
    }
    return grid;
  }, [liveData?.submissionCalendar]);

  return (
    <div className="relative space-y-6 w-full">
      <ScanOverlay done={ready} />

      {/* Profile strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-5 rounded-2xl border border-[#FFC107]/20 flex flex-col sm:flex-row items-center sm:items-start gap-5 relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,193,7,0.03) 50%, transparent 70%)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="w-20 h-20 rounded-2xl border-2 border-[#FFC107] flex items-center justify-center text-2xl font-black text-[#FFC107] flex-shrink-0"
          style={{ background: "rgba(255,193,7,0.08)", boxShadow: "0 0 25px #FFC10740" }}
          animate={{ boxShadow: ["0 0 15px #FFC10730", "0 0 40px #FFC10770", "0 0 15px #FFC10730"] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          LC
        </motion.div>
        <div className="flex-1 text-center sm:text-left">
          <div className="font-mono text-[10px] text-[#FFC107]/60 tracking-widest mb-1">// LEETCODE_COMMAND_CENTER</div>
          <h3 className="text-xl font-black text-white">Sam Ebenezer P</h3>
          <p className="font-mono text-xs text-[#A5B4C3]/60 mt-0.5">@{PROFILE.username}</p>
          <div className="flex flex-wrap gap-4 mt-3 justify-center sm:justify-start">
            {[
              { label: "Solved", value: `${totalSolved}`, color: "#FFC107" },
              { label: "Rating", value: `${contestRating}`, color: "#00E5FF" },
              { label: "Global Rank", value: ranking !== PROFILE.globalRank ? ranking : globalRank, color: "#00FF88" },
              { label: "Streak", value: `${streak}d 🔥`, color: "#FF3366" },
            ].map((s, i) => (
              <div key={i} className="text-center font-mono">
                <div className="text-lg font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[9px] text-[#A5B4C3]/50 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <motion.a
            href={PROFILE.url} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#FFC107] font-mono text-xs text-[#FFC107] hover:bg-[#FFC107]/10 transition-all duration-300"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Profile
          </motion.a>
          <StatusBadge isFallback={isFallback} loading={apiLoading} />
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Problems Solved", value: totalSolved,      icon: Target,     color: "#FFC107" },
          { label: "Contest Rating",  value: contestRating,    icon: TrendingUp, color: "#00E5FF" },
          { label: "Attended",        value: attendedContests, icon: Trophy,     color: "#00FF88" },
          { label: "Streak Days",     value: streak,           icon: Flame,      color: "#FF3366" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.09, type: "spring", bounce: 0.3 }}
            whileHover={{ y: -3 }}
            className="glass-panel p-4 rounded-xl border text-center relative overflow-hidden group"
            style={{ borderColor: `${s.color}20` }}
          >
            <div className="absolute inset-x-0 bottom-0 h-0.5" style={{ background: s.color, opacity: 0.4 }} />
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at center, ${s.color}08, transparent)` }}
            />
            <div className="flex items-center justify-center gap-1.5 mb-1.5" style={{ color: s.color }}>
              <s.icon className="w-4 h-4" />
              <span className="font-mono text-[9px] tracking-widest text-[#A5B4C3]/50">{s.label.toUpperCase()}</span>
            </div>
            <div className="text-xl font-black font-mono" style={{ color: s.color, textShadow: `0 0 12px ${s.color}50` }}>
              {ready ? <AnimCounter to={s.value} /> : "—"}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content: ring + breakdown + heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress ring + difficulty breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-6 rounded-2xl border border-[#FFC107]/20 flex flex-col items-center gap-6"
        >
          <div className="font-mono text-xs text-[#FFC107] font-bold tracking-widest flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> SOLVE_PROGRESS
          </div>
          <ProgressRing size={160} strokeW={10} value={totalSolved} max={PROFILE.total} color="#FFC107">
            <div className="text-center font-mono">
              <div className="text-3xl font-black text-white">{ready ? <AnimCounter to={totalSolved} duration={2} /> : "—"}</div>
              <div className="text-[10px] text-[#A5B4C3]/50">/ {PROFILE.total}</div>
              <div className="text-xs font-bold text-[#FFC107] mt-0.5">{pct}%</div>
            </div>
          </ProgressRing>

          {/* Difficulty breakdown with live counts */}
          <div className="w-full space-y-3">
            <DifficultyBar name="EASY"   count={easyCount}   total={PROFILE.easyTotal}   color="#00FF88" />
            <DifficultyBar name="MEDIUM" count={mediumCount} total={PROFILE.mediumTotal} color="#FFC107" />
            <DifficultyBar name="HARD"   count={hardCount}   total={PROFILE.hardTotal}   color="#FF3366" />
          </div>
        </motion.div>

        {/* Heatmap + language breakdown + Recent submissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-5 rounded-2xl border border-[#FFC107]/15 lg:col-span-2"
        >
          <div className="font-mono text-xs text-[#FFC107] font-bold tracking-widest flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4" /> SUBMISSION_HEATMAP
            {liveData?.submissionCalendar && Object.keys(liveData.submissionCalendar).length > 0 && (
              <span className="text-[9px] text-[#00FF88] font-mono ml-1">// LIVE</span>
            )}
          </div>
          <div className="overflow-x-auto pb-1">
            <div className="flex gap-[3px]" style={{ minWidth: "max-content" }}>
              {heatmapGrid.map((week, w) => (
                <div key={w} className="flex flex-col gap-[3px]">
                  {week.map((lvl, d) => (
                    <motion.div
                      key={d}
                      className="w-[10px] h-[10px] rounded-sm cursor-pointer"
                      style={{ background: HEAT_COLORS[lvl] }}
                      whileHover={{ scale: 1.8 }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (w * 7 + d) * 0.0005 }}
                      title={`${lvl} submissions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 text-[9px] font-mono text-[#A5B4C3]/40">
            <span>Less</span>
            {HEAT_COLORS.map((c, i) => <div key={i} className="w-[10px] h-[10px] rounded-sm" style={{ background: c }} />)}
            <span>More</span>
          </div>

          {/* Recent Submissions List if available */}
          {recentSubmissions.length > 0 && (
            <div className="mt-5 border-t border-[#FFC107]/10 pt-4">
              <div className="font-mono text-[10px] text-[#FFC107]/60 tracking-widest mb-3 flex items-center justify-between">
                <span>// RECENT_ACCEPTED_SUBMISSIONS:</span>
                <span className="text-[#00FF88] text-[9px]">LIVE API</span>
              </div>
              <div className="space-y-2">
                {recentSubmissions.slice(0, 4).map((sub, i) => (
                  <motion.a
                    key={i}
                    href={sub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center justify-between font-mono text-[10px] p-2 rounded-lg hover:bg-[#FFC107]/10 transition-colors block group"
                    style={{ background: "rgba(255,193,7,0.04)", borderLeft: "2px solid rgba(255,193,7,0.3)" }}
                  >
                    <div className="flex items-center gap-2 truncate max-w-[70%]">
                      <CheckCircle className="w-3 h-3 text-[#00FF88] flex-shrink-0" />
                      <span className="text-white font-semibold group-hover:underline truncate">{sub.title}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-[#A5B4C3]">{sub.lang}</span>
                      <span className="text-[#A5B4C3]/40 text-[9px]">{relativeTime(sub.timestamp)}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          {/* Language breakdown */}
          <div className="mt-5 border-t border-[#FFC107]/10 pt-4">
            <div className="font-mono text-[10px] text-[#FFC107]/60 tracking-widest mb-3">// LANGUAGE_BREAKDOWN:</div>
            <div className="grid grid-cols-3 gap-3">
              {LANG_STATS.map((ls, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", bounce: 0.3 }}
                  whileHover={{ y: -3 }}
                  className="text-center p-3 rounded-xl border relative overflow-hidden"
                  style={{ borderColor: `${ls.color}25`, background: `${ls.color}08` }}
                >
                  <div className="absolute inset-x-0 bottom-0 h-0.5" style={{ background: ls.color, opacity: 0.5 }} />
                  <div className="text-xl font-black font-mono" style={{ color: ls.color }}>{ls.solved}</div>
                  <div className="text-[9px] font-mono text-[#A5B4C3]/60 mt-0.5">{ls.lang}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contest history */}
          <div className="mt-4 border-t border-[#FFC107]/10 pt-4">
            <div className="font-mono text-[10px] text-[#FFC107]/60 tracking-widest mb-3">// CONTEST_HISTORY:</div>
            <div className="space-y-2">
              {CONTEST_HISTORY.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center justify-between font-mono text-[10px] p-2 rounded-lg"
                  style={{ background: "rgba(255,193,7,0.04)", borderLeft: "2px solid rgba(255,193,7,0.2)" }}
                >
                  <span className="text-[#A5B4C3]/70 truncate max-w-[55%]">{c.name}</span>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-white font-bold">#{c.rank}</span>
                    <span
                      className="flex items-center gap-0.5 font-bold"
                      style={{ color: c.delta > 0 ? "#00FF88" : "#FF3366" }}
                    >
                      {c.delta > 0 ? <ChevronUp className="w-3 h-3" /> : <ChevronUp className="w-3 h-3 rotate-180" />}
                      {Math.abs(c.delta)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-5 rounded-xl border border-[#FFC107]/15"
      >
        <div className="font-mono text-xs text-[#FFC107] font-bold tracking-widest flex items-center gap-2 mb-5">
          <Award className="w-4 h-4" /> ACHIEVEMENT_BADGES
        </div>
        <div className="flex flex-wrap gap-4">
          {BADGES.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.65, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                type: "spring",
                bounce: 0.5,
                rotate: { type: "tween", duration: 0.4, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.15, y: -5, rotate: [0, -3, 3, 0] }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border cursor-default relative overflow-hidden"
              style={{ borderColor: `${badge.color}30`, background: `${badge.color}08`, minWidth: "100px", boxShadow: `0 0 20px ${badge.glow}` }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{ opacity: [0, 0.15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                style={{ background: `radial-gradient(circle at center, ${badge.color}, transparent)` }}
              />
              <span className="text-3xl relative z-10">{badge.icon}</span>
              <span className="font-mono text-[9px] text-center whitespace-pre-line relative z-10" style={{ color: badge.color }}>
                {badge.name}
              </span>
            </motion.div>
          ))}
          {/* Coding progress bar */}
          <div className="flex-1 flex flex-col justify-center gap-4 min-w-[200px]">
            <div className="font-mono text-[10px] text-[#FFC107]/60 tracking-widest">// CODING_PROGRESS:</div>
            {[
              { label: "Total Solved", pct: (totalSolved / PROFILE.total) * 100, color: "#FFC107" },
              { label: "Easy Progress", pct: (easyCount / PROFILE.easyTotal) * 100, color: "#00FF88" },
              { label: "Medium Progress", pct: (mediumCount / PROFILE.mediumTotal) * 100, color: "#FFC107" },
              { label: "Hard Progress", pct: (hardCount / PROFILE.hardTotal) * 100, color: "#FF3366" },
            ].map((p, i) => (
              <div key={i} className="space-y-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#A5B4C3]/70">{p.label}</span>
                  <span style={{ color: p.color }} className="font-bold">{p.pct.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${p.color}12` }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Footer status */}
      {!apiLoading && (
        <div className="flex items-center gap-2 font-mono text-[9px] text-[#A5B4C3]/30 justify-end">
          <RefreshCw className="w-2.5 h-2.5" />
          <span>Data cached 1h · {isFallback ? "API unavailable — showing cached telemetry" : "LeetCode GraphQL API"}</span>
        </div>
      )}
    </div>
  );
}
