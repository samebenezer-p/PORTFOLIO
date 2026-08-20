"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  GitBranch, Star, GitFork, Users, Activity, Code2, Globe, Calendar,
  ExternalLink, TrendingUp, Layers, Eye, GitPullRequest, AlertCircle,
  Terminal, RefreshCw, CheckCircle2, Search, GitCommit, Wifi, WifiOff,
} from "lucide-react";

/* ─── types ──────────────────────────────────────────── */
type LiveRepo = {
  name: string;
  url: string;
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  language: string;
  langColor: string;
  updatedAt: string;
};

type LangStat = { name: string; pct: number; color: string };

type RecentCommit = {
  repo: string;
  message: string;
  sha: string;
  time: string;
};

type GitHubData = {
  success: boolean;
  fallback?: boolean;
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topRepos: LiveRepo[];
  languageStats: LangStat[];
  recentCommits: RecentCommit[];
  contributionGrid: number[][] | null;
};

/* ─── static fallback data ───────────────────────────── */
const PROFILE = {
  name: "Sam Ebenezer P",
  login: "samebenezer-p",
  bio: "Final Year CSE Student | Java Dev | AI & IoT Enthusiast",
  location: "Coimbatore, TN, India",
  url: "https://github.com/samebenezer-p",
};

const STATIC_LANGS: LangStat[] = [
  { name: "Java",       pct: 42, color: "#F89820" },
  { name: "Python",     pct: 22, color: "#3776AB" },
  { name: "JavaScript", pct: 16, color: "#F7DF1E" },
  { name: "HTML/CSS",   pct: 12, color: "#E34F26" },
  { name: "C",          pct:  8, color: "#A8B9CC" },
];

const STATIC_REPOS: LiveRepo[] = [
  { name: "CareerForge",       url: PROFILE.url, description: "AI-powered career planning with resume NLP & skill-gap detection",        stars: 12, forks: 3, watchers: 48, language: "JavaScript", langColor: "#F7DF1E", updatedAt: "" },
  { name: "AutoTheftReporter", url: PROFILE.url, description: "ESP32 + GPS + GSM real-time theft detection & SMS alert IoT system",       stars:  9, forks: 2, watchers: 36, language: "C++",        langColor: "#f34b7d", updatedAt: "" },
  { name: "OnlineQuizApp",     url: PROFILE.url, description: "Java Servlet + MySQL multi-client competitive quiz application",           stars:  7, forks: 1, watchers: 28, language: "Java",       langColor: "#F89820", updatedAt: "" },
  { name: "MorseEncoder",      url: PROFILE.url, description: "Bi-directional Morse code encryption & decryption engine in Java",        stars:  5, forks: 1, watchers: 20, language: "Java",       langColor: "#F89820", updatedAt: "" },
  { name: "PortfolioOS",       url: PROFILE.url, description: "NEXUS AI Operating System — personal futuristic portfolio in Next.js",    stars:  8, forks: 2, watchers: 32, language: "TypeScript", langColor: "#3178c6", updatedAt: "" },
  { name: "DSA-Mastery",       url: PROFILE.url, description: "Java & Python DSA solutions — 300+ LeetCode problems with explanations",  stars:  4, forks: 0, watchers: 16, language: "Java",       langColor: "#F89820", updatedAt: "" },
];

const STATIC_CODING_STATS = [
  { label: "Total Commits",  value: 847, color: "#00E5FF" },
  { label: "Pull Requests",  value: 23,  color: "#00FF88" },
  { label: "Issues Raised",  value: 11,  color: "#FFC107" },
  { label: "Code Reviews",   value: 19,  color: "#A855F7" },
];

/* stable seeded contribution heatmap */
function makeContribs(): number[][] {
  const data: number[][] = [];
  for (let w = 0; w < 52; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      const seed = (w * 7 + d) * 2654435761;
      const r = ((seed ^ (seed >> 16)) & 0xffff) / 0xffff;
      week.push(r < 0.4 ? 0 : r < 0.6 ? 1 : r < 0.78 ? 2 : r < 0.92 ? 3 : 4);
    }
    data.push(week);
  }
  return data;
}
const SEEDED_CONTRIBS = makeContribs();
const CONTRIB_COLORS = ["#0d1117", "#0e4429", "#006d32", "#26a641", "#39d353"];

/* relative time helper */
function relativeTime(iso: string): string {
  if (!iso) return "recently";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

/* ─── sub-components ────────────────────────────────── */
function AnimCounter({ to, duration = 1.5 }: { to: number; duration?: number }) {
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

/* Shimmer skeleton block */
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded bg-white/5 animate-pulse ${className}`}
      style={{ background: "linear-gradient(90deg, rgba(0,229,255,0.04) 25%, rgba(0,229,255,0.10) 50%, rgba(0,229,255,0.04) 75%)", backgroundSize: "200% 100%", animation: "shimmerSweep 1.6s ease-in-out infinite" }}
    />
  );
}

function ScannerOverlay({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="scan"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 z-20 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-6"
          style={{ background: "rgba(5,8,22,0.96)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            className="absolute left-0 right-0 h-0.5 pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent, #00E5FF80, transparent)" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="w-20 h-20 rounded-full border-2 border-[#00E5FF] flex items-center justify-center relative"
            style={{ boxShadow: "0 0 30px #00E5FF60" }}
            animate={{ boxShadow: ["0 0 20px #00E5FF40", "0 0 50px #00E5FF90", "0 0 20px #00E5FF40"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border border-[#00E5FF]"
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <GitBranch className="w-8 h-8 text-[#00E5FF]" />
          </motion.div>
          <div className="text-center space-y-2">
            <div className="font-mono text-sm text-[#00E5FF] font-bold tracking-widest">
              SCANNING GITHUB INTELLIGENCE...
            </div>
            <div className="flex justify-center gap-1.5">
              {[0, 1, 2, 3, 4].map(i => (
                <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"
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

/* Fallback / Live status badge */
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
export default function GitHubDashboard() {
  const [ready, setReady] = useState(false);
  const [apiLoading, setApiLoading] = useState(true);
  const [hoveredRepo, setHoveredRepo] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"pinned" | "all">("pinned");
  const [searchQuery, setSearchQuery] = useState("");
  const [liveData, setLiveData] = useState<GitHubData | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data: GitHubData) => {
        setLiveData(data);
        setApiLoading(false);
      })
      .catch(() => setApiLoading(false));

    const t = setTimeout(() => setReady(true), 2200);
    return () => clearTimeout(t);
  }, []);

  /* ── derived values */
  const isFallback = !liveData?.success || !!liveData?.fallback;
  const stats = [
    { label: "Repositories", value: liveData?.publicRepos ?? 12,  icon: Layers,   color: "#00E5FF" },
    { label: "Followers",    value: liveData?.followers   ?? 38,  icon: Users,    color: "#00FF88" },
    { label: "Following",    value: liveData?.following   ?? 25,  icon: TrendingUp,color: "#A855F7" },
    { label: "Total Stars",  value: liveData?.totalStars  ?? 33,  icon: Star,     color: "#FFC107" },
  ];

  const langs: LangStat[] = (liveData?.languageStats?.length ?? 0) > 0
    ? liveData!.languageStats
    : STATIC_LANGS;

  const repos: LiveRepo[] = (liveData?.topRepos?.length ?? 0) > 0
    ? liveData!.topRepos
    : STATIC_REPOS;

  const contribGrid: number[][] =
    liveData?.contributionGrid ?? SEEDED_CONTRIBS;

  const recentCommits: RecentCommit[] =
    liveData?.recentCommits?.length ? liveData.recentCommits : [];

  /* search filter */
  const filteredRepos = repos.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
  });

  const displayRepos = activeTab === "pinned"
    ? filteredRepos.slice(0, 4)
    : filteredRepos;

  return (
    <div className="relative space-y-6 w-full">
      <ScannerOverlay done={ready} />

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-6 rounded-2xl border border-[#00E5FF]/20 relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 30%, rgba(0,229,255,0.04) 50%, transparent 70%)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <motion.div
            className="w-20 h-20 rounded-2xl border-2 border-[#00E5FF] flex items-center justify-center text-2xl font-black text-[#00E5FF] flex-shrink-0 relative"
            style={{ background: "rgba(0,229,255,0.08)", boxShadow: "0 0 25px #00E5FF40" }}
            animate={{ boxShadow: ["0 0 15px #00E5FF30", "0 0 40px #00E5FF70", "0 0 15px #00E5FF30"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            SE
            <motion.div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#00FF88] flex items-center justify-center border border-[#050816]">
              <CheckCircle2 className="w-3 h-3 text-[#050816]" />
            </motion.div>
          </motion.div>

          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="font-mono text-[10px] text-[#00E5FF]/60 tracking-widest mb-1">// GITHUB_INTELLIGENCE_PROFILE</div>
            <h3 className="text-xl font-black text-white">{PROFILE.name}</h3>
            <p className="font-mono text-xs text-[#A5B4C3]/60 mt-0.5">@{PROFILE.login}</p>
            <p className="font-mono text-xs text-[#A5B4C3]/80 mt-1.5 leading-relaxed">{PROFILE.bio}</p>
            <div className="flex items-center gap-1.5 mt-2 justify-center sm:justify-start">
              <Globe className="w-3 h-3 text-[#A5B4C3]/40" />
              <span className="font-mono text-[10px] text-[#A5B4C3]/50">{PROFILE.location}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <motion.a
              href={PROFILE.url} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#00E5FF] font-mono text-xs text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all duration-300"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Profile
            </motion.a>
            <StatusBadge isFallback={isFallback} loading={apiLoading} />
          </div>
        </div>
      </motion.div>

      {/* Animated stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", bounce: 0.3 }}
            whileHover={{ y: -3, scale: 1.03 }}
            className="glass-panel p-4 rounded-xl border text-center relative overflow-hidden group cursor-default"
            style={{ borderColor: `${stat.color}20` }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at center, ${stat.color}10, transparent)` }}
            />
            <div className="absolute inset-x-0 bottom-0 h-0.5" style={{ background: stat.color, opacity: 0.35 }} />
            <div className="flex items-center justify-center gap-1.5 mb-2" style={{ color: stat.color }}>
              <stat.icon className="w-4 h-4" />
              <span className="font-mono text-[9px] tracking-widest text-[#A5B4C3]/50">{stat.label.toUpperCase()}</span>
            </div>
            {apiLoading ? (
              <Skeleton className="h-7 w-12 mx-auto mt-1" />
            ) : (
              <div className="text-2xl font-black font-mono" style={{ color: stat.color, textShadow: `0 0 15px ${stat.color}60` }}>
                {ready ? <AnimCounter to={stat.value} /> : "—"}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Contribution Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-5 rounded-2xl border border-[#00E5FF]/15 overflow-hidden"
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <span className="font-mono text-xs text-[#00E5FF] font-bold tracking-widest flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            CONTRIBUTION_GRAPH
            {liveData?.contributionGrid && (
              <span className="text-[9px] text-[#00FF88] font-mono ml-1">// LIVE</span>
            )}
          </span>
          <a
            href="https://github.com/samebenezer-p"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-[10px] font-bold tracking-wider hover:bg-[#00E5FF]/10 transition-colors"
            style={{ borderColor: "#00E5FF40", color: "#00E5FF" }}
          >
            <ExternalLink className="w-3 h-3" /> github.com/samebenezer-p
          </a>
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-[3px]" style={{ minWidth: "max-content" }}>
            {contribGrid.map((week, w) => (
              <div key={w} className="flex flex-col gap-[3px]">
                {week.map((level, d) => (
                  <motion.div
                    key={d}
                    className="w-[10px] h-[10px] rounded-sm cursor-pointer"
                    style={{ background: CONTRIB_COLORS[level] }}
                    whileHover={{ scale: 1.7, zIndex: 10 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (w * 7 + d) * 0.0005, duration: 0.18 }}
                    title={`${level} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 text-[9px] font-mono text-[#A5B4C3]/40">
          <span>Less</span>
          {CONTRIB_COLORS.map((c, i) => (
            <div key={i} className="w-[10px] h-[10px] rounded-sm" style={{ background: c }} />
          ))}
          <span>More</span>
        </div>
      </motion.div>

      {/* Repo explorer + Language + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Repo section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header + Tabs + Search */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="font-mono text-xs text-[#00E5FF] tracking-widest font-bold flex items-center gap-2">
              <Star className="w-4 h-4" /> REPOSITORY_EXPLORER
            </div>
            <div className="flex gap-1 ml-auto">
              {(["pinned", "all"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="font-mono text-[9px] px-3 py-1 rounded-md border transition-all duration-200 cursor-pointer"
                  style={{
                    borderColor: activeTab === tab ? "#00E5FF" : "#00E5FF20",
                    background: activeTab === tab ? "#00E5FF15" : "transparent",
                    color: activeTab === tab ? "#00E5FF" : "#A5B4C3",
                  }}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#00E5FF]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repositories..."
              className="w-full glass-panel pl-9 pr-4 py-2 rounded-lg border border-[#00E5FF]/20 font-mono text-xs text-white placeholder:text-[#A5B4C3]/30 bg-transparent focus:outline-none focus:border-[#00E5FF]/50 transition-colors"
            />
          </div>

          {/* Repo cards */}
          {apiLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="glass-panel p-4 rounded-xl border border-[#00E5FF]/15 space-y-3">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-2 w-full" />
                  <Skeleton className="h-2 w-3/4" />
                  <div className="flex gap-3">
                    <Skeleton className="h-2 w-12" />
                    <Skeleton className="h-2 w-10" />
                  </div>
                </div>
              ))}
            </div>
          ) : displayRepos.length === 0 ? (
            <div className="glass-panel p-8 rounded-xl border border-[#00E5FF]/15 text-center">
              <Search className="w-8 h-8 text-[#00E5FF]/20 mx-auto mb-2" />
              <p className="font-mono text-xs text-[#A5B4C3]/40">No repositories match &ldquo;{searchQuery}&rdquo;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {displayRepos.map((repo, i) => (
                <motion.a
                  key={`${activeTab}-${repo.name}`}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.07, type: "spring", bounce: 0.2 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  onMouseEnter={() => setHoveredRepo(i)}
                  onMouseLeave={() => setHoveredRepo(null)}
                  className="glass-panel p-4 rounded-xl border border-[#00E5FF]/15 hover:border-[#00E5FF]/45 transition-all duration-300 block group relative overflow-hidden"
                >
                  <AnimatePresence>
                    {hoveredRepo === i && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse at top left, rgba(0,229,255,0.06), transparent)" }}
                      />
                    )}
                  </AnimatePresence>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span className="font-mono text-xs font-bold text-[#00E5FF] group-hover:underline">{repo.name}</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-[#A5B4C3]/30 group-hover:text-[#00E5FF] transition-colors" />
                  </div>
                  <p className="font-mono text-[10px] text-[#A5B4C3]/70 leading-relaxed mb-3 line-clamp-2">{repo.description}</p>
                  <div className="flex items-center gap-3 font-mono text-[10px] text-[#A5B4C3]">
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: repo.langColor }} />
                      <span>{repo.language}</span>
                    </div>
                    <div className="flex items-center gap-1"><Star className="w-3 h-3" /><span>{repo.stars}</span></div>
                    <div className="flex items-center gap-1"><GitFork className="w-3 h-3" /><span>{repo.forks}</span></div>
                    <div className="flex items-center gap-1"><Eye className="w-3 h-3" /><span>{repo.watchers}</span></div>
                  </div>
                  {repo.updatedAt && (
                    <div className="font-mono text-[9px] text-[#A5B4C3]/30 mt-2">Updated {relativeTime(repo.updatedAt)}</div>
                  )}
                </motion.a>
              ))}
            </div>
          )}
        </div>

        {/* Right col: Languages + Activity */}
        <div className="space-y-4">
          {/* Language Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-5 rounded-xl border border-[#00E5FF]/15"
          >
            <div className="font-mono text-xs text-[#00E5FF] tracking-widest font-bold flex items-center gap-2 mb-4">
              <Code2 className="w-4 h-4" /> LANGUAGE_MATRIX
            </div>
            {apiLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-3 w-full rounded-full mb-4" />
                {[0,1,2,3,4].map(i => <Skeleton key={i} className="h-4 w-full" />)}
              </div>
            ) : (
              <>
                {/* Stacked bar */}
                <div className="flex h-3 rounded-full overflow-hidden mb-4 gap-0.5">
                  {langs.map((l, i) => (
                    <motion.div
                      key={i}
                      className="h-full rounded-sm"
                      style={{ background: l.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, delay: i * 0.12, ease: "easeOut" }}
                      title={`${l.name}: ${l.pct}%`}
                    />
                  ))}
                </div>
                <div className="space-y-2.5">
                  {langs.map((l, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center justify-between font-mono text-[10px]"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                        <span className="text-[#A5B4C3]">{l.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: l.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${l.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, delay: i * 0.1 }}
                          />
                        </div>
                        <span style={{ color: l.color }} className="font-bold w-8 text-right">{l.pct}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* Activity Timeline — live commits OR static events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="glass-panel p-5 rounded-xl border border-[#00E5FF]/15"
          >
            <div className="font-mono text-xs text-[#00E5FF] tracking-widest font-bold flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4" />
              {recentCommits.length ? "LATEST_COMMITS" : "ACTIVITY_TIMELINE"}
            </div>
            {apiLoading ? (
              <div className="space-y-4">
                {[0,1,2,3].map(i => (
                  <div key={i} className="flex gap-3 pl-5 relative">
                    <Skeleton className="absolute left-0 top-1.5 w-3 h-3 rounded-full" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-2.5 w-full" />
                      <Skeleton className="h-2 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentCommits.length > 0 ? (
              <div className="space-y-3 relative">
                <div className="absolute left-1.5 top-2 bottom-0 w-px bg-[#00E5FF]/15" />
                {recentCommits.map((commit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                    className="flex items-start gap-3 pl-5 relative"
                  >
                    <div
                      className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 flex-shrink-0"
                      style={{ background: "#050816", borderColor: "#00E5FF", boxShadow: "0 0 6px #00E5FF80" }}
                    />
                    <div className="font-mono text-[10px] min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <GitCommit className="w-3 h-3 text-[#00E5FF]" />
                        <span className="font-bold text-white">{commit.repo}</span>
                        <span className="text-[#A5B4C3]/40 font-mono text-[9px]">{commit.sha}</span>
                      </div>
                      <div className="text-[#A5B4C3]/70 mt-0.5 text-[10px] truncate max-w-[180px]">{commit.message}</div>
                      <div className="text-[#A5B4C3]/40 text-[9px] mt-0.5">{relativeTime(commit.time)}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Static fallback activity */
              <div className="space-y-3 relative">
                <div className="absolute left-1.5 top-2 bottom-0 w-px bg-[#00E5FF]/15" />
                {[
                  { type: "PUSH",  repo: "CareerForge",       time: "2h ago",  color: "#00E5FF", icon: GitBranch },
                  { type: "STAR",  repo: "awesome-java",      time: "1d ago",  color: "#FFC107", icon: Star },
                  { type: "FORK",  repo: "react-three-fiber", time: "3d ago",  color: "#00FF88", icon: GitFork },
                  { type: "PUSH",  repo: "OnlineQuizApp",     time: "5d ago",  color: "#00E5FF", icon: GitBranch },
                  { type: "PR",    repo: "CareerForge",       time: "1wk ago", color: "#A855F7", icon: GitPullRequest },
                  { type: "ISSUE", repo: "AutoTheftReporter", time: "1wk ago", color: "#FF3366", icon: AlertCircle },
                ].map((act, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                    className="flex items-start gap-3 pl-5 relative"
                  >
                    <div
                      className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 flex-shrink-0"
                      style={{ background: "#050816", borderColor: act.color, boxShadow: `0 0 6px ${act.color}80` }}
                    />
                    <div className="font-mono text-[10px] min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold uppercase" style={{ color: act.color }}>{act.type}</span>
                        <span className="text-[#A5B4C3]/50">→</span>
                        <span className="text-white font-semibold">{act.repo}</span>
                      </div>
                      <div className="text-[#A5B4C3]/40 text-[9px] mt-0.5">{act.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Coding stats + Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coding stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-5 rounded-xl border border-[#00E5FF]/15"
        >
          <div className="font-mono text-xs text-[#00E5FF] tracking-widest font-bold flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4" /> CODING_STATISTICS
          </div>
          <div className="grid grid-cols-2 gap-3">
            {STATIC_CODING_STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", bounce: 0.3 }}
                whileHover={{ y: -2 }}
                className="text-center p-3 rounded-lg border relative overflow-hidden"
                style={{ borderColor: `${s.color}20`, background: `${s.color}06` }}
              >
                <div className="absolute inset-x-0 bottom-0 h-0.5" style={{ background: s.color, opacity: 0.4 }} />
                <div className="text-2xl font-black font-mono" style={{ color: s.color, textShadow: `0 0 12px ${s.color}60` }}>
                  {ready ? <AnimCounter to={s.value} /> : "—"}
                </div>
                <div className="text-[9px] font-mono text-[#A5B4C3]/50 mt-0.5 uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-5 rounded-xl border border-[#00E5FF]/15"
        >
          <div className="font-mono text-xs text-[#00E5FF] tracking-widest font-bold flex items-center gap-2 mb-4">
            <Terminal className="w-4 h-4" /> QUICK_ACTIONS
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {[
              { label: "VIEW_GITHUB_PROFILE",   icon: ExternalLink, color: "#00E5FF", href: PROFILE.url },
              { label: "EXPLORE_REPOSITORIES",  icon: Layers,       color: "#00FF88", href: `${PROFILE.url}?tab=repositories` },
              { label: "CHECK_CONTRIBUTIONS",   icon: Activity,     color: "#A855F7", href: `${PROFILE.url}?tab=overview` },
              { label: "FOLLOW_ON_GITHUB",      icon: Users,        color: "#FFC107", href: PROFILE.url },
            ].map((a, i) => (
              <motion.a
                key={i}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ x: 4, scale: 1.01 }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 group"
                style={{ borderColor: `${a.color}20`, background: `${a.color}06` }}
              >
                <a.icon className="w-4 h-4 flex-shrink-0" style={{ color: a.color }} />
                <span className="font-mono text-xs" style={{ color: a.color }}>{a.label}</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: a.color }} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Last refreshed */}
      {!apiLoading && (
        <div className="flex items-center gap-2 font-mono text-[9px] text-[#A5B4C3]/30 justify-end">
          <RefreshCw className="w-2.5 h-2.5" />
          <span>Data cached 1h · {isFallback ? "API unavailable — showing static data" : "GitHub REST API"}</span>
        </div>
      )}
    </div>
  );
}
