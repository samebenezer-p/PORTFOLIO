"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitBranch, Code, GitFork, Star, Users, Terminal } from "lucide-react";

export default function GitHubDiagnostics() {
  const [stats, setStats] = useState({
    followers: 12,
    publicRepos: 8,
    stars: 15,
    forks: 4,
    commitsThisMonth: 142
  });

  // Simulated live contributions map
  const [activityGrid, setActivityGrid] = useState<number[]>([]);

  useEffect(() => {
    // Generate a simulated activity grid (7 days * 15 weeks = 105 blocks)
    const grid = Array.from({ length: 105 }, () => Math.floor(Math.random() * 5));
    setActivityGrid(grid);
  }, []);

  const pinnedRepos = [
    {
      name: "CareerForge",
      desc: "AI Career Planning Platform featuring Resume Analysis, Skill Gap Detection & Career Roadmap.",
      stars: 4,
      forks: 1,
      lang: "TypeScript",
      color: "#3178c6"
    },
    {
      name: "Automated-Theft-Reporting",
      desc: "ESP32, GPS and GSM based anti-theft tracking firmware module.",
      stars: 3,
      forks: 2,
      lang: "C++",
      color: "#f34b7d"
    }
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-[#00E5FF]/20 relative overflow-hidden bg-[#08121E]/30 w-full space-y-6">
      {/* HUD Header */}
      <div className="flex justify-between items-center border-b border-[#00E5FF]/10 pb-3">
        <span className="font-mono text-xs text-[#00E5FF] tracking-[0.2em] font-bold flex items-center gap-2">
          <GitBranch className="w-4 h-4" /> GITHUB_METRICS_SYNC
        </span>
        <span className="font-mono text-[9px] text-[#00FF88] border border-[#00FF88]/20 px-2 py-0.5 rounded bg-[#00FF88]/10 animate-pulse">
          CONNECTED
        </span>
      </div>

      {/* Main Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
        <div className="bg-[#050816] p-3 rounded-lg border border-[#00E5FF]/10">
          <span className="text-[10px] text-[#A5B4C3]/60 block uppercase">FOLLOWERS</span>
          <span className="text-lg font-bold text-white">{stats.followers}</span>
        </div>
        <div className="bg-[#050816] p-3 rounded-lg border border-[#00E5FF]/10">
          <span className="text-[10px] text-[#A5B4C3]/60 block uppercase">REPOSITORIES</span>
          <span className="text-lg font-bold text-[#00E5FF]">{stats.publicRepos}</span>
        </div>
        <div className="bg-[#050816] p-3 rounded-lg border border-[#00E5FF]/10">
          <span className="text-[10px] text-[#A5B4C3]/60 block uppercase">STAR_POWER</span>
          <span className="text-lg font-bold text-[#18FFFF]">{stats.stars}</span>
        </div>
        <div className="bg-[#050816] p-3 rounded-lg border border-[#00E5FF]/10">
          <span className="text-[10px] text-[#A5B4C3]/60 block uppercase">COMMITS_YTD</span>
          <span className="text-lg font-bold text-[#00FF88]">{stats.commitsThisMonth}</span>
        </div>
      </div>

      {/* Pinned Repositories */}
      <div className="space-y-3">
        <span className="font-mono text-[10px] text-[#A5B4C3]/60 block">// PINNED_ARCHIVES</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pinnedRepos.map((repo, i) => (
            <div key={i} className="bg-[#050816] p-4 rounded-xl border border-[#00E5FF]/10 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#00E5FF]" /> {repo.name}
                </h4>
                <p className="text-[11px] text-[#A5B4C3] mt-1.5 leading-relaxed font-mono">{repo.desc}</p>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.color }} />
                  {repo.lang}
                </span>
                <div className="flex items-center gap-3 text-[#A5B4C3]/80">
                  <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-[#FFC107]" /> {repo.stars}</span>
                  <span className="flex items-center gap-0.5"><GitFork className="w-3 h-3 text-[#00E5FF]" /> {repo.forks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Contribution Graph */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] font-mono text-[#A5B4C3]/60">
          <span>// CONTRIBUTION_GRID</span>
          <span>1,412 CONTRIBUTIONS YTD</span>
        </div>
        <div className="bg-[#050816] p-3 rounded-lg border border-[#00E5FF]/10 overflow-x-auto flex items-center justify-center">
          <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[500px]">
            {activityGrid.map((val, idx) => {
              const colors = [
                "bg-[#08121E]",
                "bg-[#00E5FF]/20",
                "bg-[#00E5FF]/40",
                "bg-[#00E5FF]/70",
                "bg-[#00E5FF]"
              ];
              return (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-sm ${colors[val]}`}
                  style={{
                    boxShadow: val > 2 ? "0 0 4px #00E5FF" : "none"
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
