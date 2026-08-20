"use client";

import React, { useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FileText, Mail, Code, Server, Shield, Sparkles } from "lucide-react";

// ── Static imports — in initial viewport, must not be lazy ──
import ParticleBackground from "@/components/ParticleBackground";
import ArcReactorCore from "@/components/ArcReactorCore";
import Typewriter from "@/components/Typewriter";
import SystemStatus from "@/components/SystemStatus";

// ── Phase 21: Dynamic imports — below fold, lazy loaded ──
const EducationTimeline = dynamic(() => import("@/components/EducationTimeline"), {
  loading: () => <HudSpinner label="LOADING TIMELINE" />,
  ssr: false,
});
const SkillMatrix = dynamic(() => import("@/components/SkillMatrix"), {
  loading: () => <HudSpinner label="LOADING SKILL MATRIX" />,
  ssr: false,
});
const ExperienceLogs = dynamic(() => import("@/components/ExperienceLogs"), {
  loading: () => <HudSpinner label="LOADING MISSION LOGS" />,
  ssr: false,
});
const ResearchLaboratory = dynamic(() => import("@/components/ResearchLaboratory"), {
  loading: () => <HudSpinner label="LOADING RESEARCH LAB" />,
  ssr: false,
});
const CertificateGallery = dynamic(() => import("@/components/CertificateGallery"), {
  loading: () => <HudSpinner label="LOADING CREDENTIALS" />,
  ssr: false,
});
const HallOfArmor = dynamic(() => import("@/components/HallOfArmor"), {
  loading: () => <HudSpinner label="LOADING ACHIEVEMENT VAULT" />,
  ssr: false,
});
const GitHubDashboard = dynamic(() => import("@/components/GitHubDashboard"), {
  loading: () => <HudSpinner label="LOADING GITHUB INTEL" />,
  ssr: false,
});
const LeetCodeDashboard = dynamic(() => import("@/components/LeetCodeDashboard"), {
  loading: () => <HudSpinner label="LOADING LEETCODE HQ" />,
  ssr: false,
});
const HackerRankDashboard = dynamic(() => import("@/components/HackerRankDashboard"), {
  loading: () => <HudSpinner label="LOADING HACKERRANK OPS" />,
  ssr: false,
});
const ContactPanel = dynamic(() => import("@/components/ContactPanel"), {
  loading: () => <HudSpinner label="LOADING SECURE CHANNEL" />,
  ssr: false,
});
const AIAssistant = dynamic(() => import("@/components/AIAssistant"), {
  loading: () => null,
  ssr: false,
});
const FuturisticTerminal = dynamic(() => import("@/components/FuturisticTerminal"), {
  loading: () => null,
  ssr: false,
});
const CinematicFooter = dynamic(() => import("@/components/CinematicFooter"), {
  loading: () => <HudSpinner label="FINALIZING SEQUENCE" />,
  ssr: false,
});

/* ── Lightweight HUD loading placeholder ── */
function HudSpinner({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 font-mono">
      <div
        className="w-8 h-8 rounded-full border-2 border-[#00E5FF]/30 border-t-[#00E5FF] animate-spin"
        aria-hidden="true"
      />
      <span className="text-[10px] text-[#00E5FF]/50 tracking-widest">{label}...</span>
    </div>
  );
}


export default function Home() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <main className="min-h-screen bg-[#050816] text-[#FFFFFF] relative overflow-hidden font-sans selection:bg-[#00E5FF]/20 selection:text-[#18FFFF]">
      {/* Visual background systems */}
      <ParticleBackground />
      
      {/* Decorative top header hud bars */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel h-16 flex items-center justify-between px-6 md:px-12 border-b border-[#00E5FF]/10">
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
          <span className="font-mono text-sm tracking-widest text-[#00E5FF] font-bold">NEXUS // SAM EBENEZER P</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#A5B4C3]/80 bg-[#08121E]/60 border border-[#00E5FF]/10 px-3 py-1.5 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-ping" />
          <span>SECURITY CLEARANCE: ACTIVE</span>
        </div>
      </header>

      {/* Hero commands section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-12 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Identity Info Panel */}
          <div className="space-y-8 order-2 lg:order-1 text-left">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#00E5FF] tracking-[0.3em] block">// IDENTITY REVELATION SEQUENCE</span>
              <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white leading-none">
                Hello,<br />
                I'm <span className="text-[#00E5FF] glow-text-primary">SAM EBENEZER P</span>
              </h1>
              
              <div className="text-lg md:text-2xl font-mono flex items-center gap-2 pt-2 text-[#A5B4C3]">
                <span>&gt;&gt;</span>
                <Typewriter 
                  words={["Final Year Computer Science Student", "Java Developer", "AI Enthusiast", "Software Engineer"]}
                  delay={80}
                  deleteSpeed={40}
                  pause={1600}
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="/SAM_EBENEZER_P_Resume_.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mag-btn px-6 py-3 rounded-lg border border-[#00E5FF] bg-gradient-to-r from-[#00E5FF]/10 to-[#18FFFF]/10 text-white font-mono text-sm hover:shadow-[0_0_20px_#00E5FF] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#18FFFF]" />
                DOWNLOAD_RESUME.sys
              </a>
              
              <a 
                href="#contact"
                className="mag-btn px-6 py-3 rounded-lg border border-[#00E5FF]/20 bg-[#08121E]/60 text-[#A5B4C3] font-mono text-sm hover:border-[#00E5FF] hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                SECURE_CHANNEL.exe
              </a>
            </div>

            {/* Diagnostics HUD Widget */}
            <div className="pt-2">
              <SystemStatus />
            </div>
          </div>

          {/* Energy Core Visual Container */}
          <div className="flex items-center justify-center order-1 lg:order-2">
            <ArcReactorCore />
          </div>
        </div>
      </section>

      {/* About Profile Module */}
      <section ref={ref} className="relative py-24 px-6 md:px-12 z-10 max-w-5xl mx-auto border-t border-[#00E5FF]/10">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="text-center space-y-2">
            <span className="font-mono text-xs text-[#00E5FF] tracking-[0.2em]">// INTEL MODULE 02</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-wider text-white uppercase">
              CLASSIFIED // PROFILE SUMMARY
            </h2>
            <div className="w-24 h-1 bg-[#00E5FF] mx-auto shadow-[0_0_8px_#00E5FF]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-xl border border-[#00E5FF]/10 space-y-3">
              <div className="flex items-center gap-2 text-[#00E5FF] font-bold">
                <Code className="w-5 h-5" />
                <span>CORE LOGIC</span>
              </div>
              <p className="text-xs text-[#A5B4C3] font-mono leading-relaxed">
                Strong foundations in Java, Python, SQL, and Object-Oriented Programming (OOP) paradigms. Structured problem solver with solid algorithm modeling.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-[#00E5FF]/10 space-y-3">
              <div className="flex items-center gap-2 text-[#00E5FF] font-bold">
                <Server className="w-5 h-5" />
                <span>SYSTEM ARCH</span>
              </div>
              <p className="text-xs text-[#A5B4C3] font-mono leading-relaxed">
                Expertise in Database Management Systems (DBMS), Operating Systems core processes, Computer Networks, and Full-Stack web interfaces.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-[#00E5FF]/10 space-y-3">
              <div className="flex items-center gap-2 text-[#00E5FF] font-bold">
                <Shield className="w-5 h-5" />
                <span>AI INTEGRATIONS</span>
              </div>
              <p className="text-xs text-[#A5B4C3] font-mono leading-relaxed">
                Deeply passionate about applying Artificial Intelligence model logic, smart automation, cloud infrastructures, and modern software engineering methods.
              </p>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-[#00E5FF]/20 relative overflow-hidden bg-[#08121E]/30">
            <div className="absolute top-0 right-0 bg-[#00E5FF]/10 text-[#00E5FF] px-3 py-1 text-[10px] font-mono rounded-bl border-l border-b border-[#00E5FF]/10">
              LOG_LEVEL: DETAILED
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Profile Image with HUD frame */}
              <div className="relative w-36 h-36 md:w-40 md:h-40 shrink-0 flex items-center justify-center">
                {/* Outer pulsing/spinning dashed ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-[#00E5FF]/50 animate-spin [animation-duration:20s]" />
                {/* Secondary inner reverse-spinning ring */}
                <div className="absolute inset-1.5 rounded-full border border-double border-[#FF9500]/40 animate-spin [animation-duration:10s] [animation-direction:reverse]" />
                {/* Photo container */}
                <div className="absolute inset-3 rounded-full overflow-hidden border border-[#00E5FF]/40 bg-[#08121E]/60 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                  <img 
                    src="/images/profile.jpg" 
                    alt="Sam Ebenezer P" 
                    className="w-full h-full object-cover pointer-events-none select-none" 
                  />
                  {/* Scanline effect */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#00E5FF]/5 to-transparent h-[200%] animate-scan-hud" />
                </div>
              </div>
              
              <div className="space-y-4 text-left">
                <p className="text-[#A5B4C3] text-sm md:text-base leading-relaxed font-mono">
                  Final-year Computer Science and Engineering student with strong foundations in Java, Python, SQL, Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, and Web Development.
                </p>
                <p className="text-[#A5B4C3] text-sm md:text-base leading-relaxed font-mono">
                  Passionate about solving real-world problems through software development, AI, cloud technologies, and modern engineering practices. Interested in Software Engineering, Backend Development, Artificial Intelligence, and Full Stack Development.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Education Timeline Section */}
      <section className="relative py-24 px-6 md:px-12 z-10 max-w-6xl mx-auto border-t border-[#00E5FF]/10">
        <div className="text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-[#00E5FF] tracking-[0.2em]">// OPERATIONAL ARCHIVE 03</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-wider text-white uppercase">
            CHRONOLOGICAL ENGINE // EDUCATION
          </h2>
          <div className="w-24 h-1 bg-[#00E5FF] mx-auto shadow-[0_0_8px_#00E5FF]" />
        </div>

        <EducationTimeline />
      </section>

      {/* Skill Matrix Section */}
      <section className="relative py-24 px-6 md:px-12 z-10 max-w-5xl mx-auto border-t border-[#00E5FF]/10">
        <div className="text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-[#00E5FF] tracking-[0.2em]">// INTEL CORE MODULE 04</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-wider text-white uppercase">
            HOLOGRAPHIC // SKILL MATRIX
          </h2>
          <div className="w-24 h-1 bg-[#00E5FF] mx-auto shadow-[0_0_8px_#00E5FF]" />
        </div>

        <SkillMatrix />
      </section>

      {/* Experience Mission Logs */}
      <section className="relative py-24 px-6 md:px-12 z-10 max-w-5xl mx-auto border-t border-[#00E5FF]/10">
        <div className="text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-[#00E5FF] tracking-[0.2em]">// OPERATION PROTOCOL 05</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-wider text-white uppercase">
            MISSION LOGS // FIELD EXPERIENCE
          </h2>
          <div className="w-24 h-1 bg-[#00E5FF] mx-auto shadow-[0_0_8px_#00E5FF]" />
        </div>

        <ExperienceLogs />
      </section>

      {/* Research Laboratory Section (Projects) */}
      <section className="relative py-24 px-6 md:px-12 z-10 max-w-5xl mx-auto border-t border-[#00E5FF]/10">
        <div className="text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-[#00E5FF] tracking-[0.2em]">// RESEARCH CELL MODULE 06</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-wider text-white uppercase">
            EXPERIMENT CELL // RESEARCH LABORATORY
          </h2>
          <div className="w-24 h-1 bg-[#00E5FF] mx-auto shadow-[0_0_8px_#00E5FF]" />
        </div>

        <ResearchLaboratory />
      </section>

      {/* Certifications Section */}
      <section className="relative py-24 px-6 md:px-12 z-10 max-w-5xl mx-auto border-t border-[#00E5FF]/10">
        <div className="text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-[#00E5FF] tracking-[0.2em]">// CREDENTIAL ARCHIVE 07</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-wider text-white uppercase">
            SECURE DECRYPTION // CERTIFICATIONS
          </h2>
          <div className="w-24 h-1 bg-[#00E5FF] mx-auto shadow-[0_0_8px_#00E5FF]" />
        </div>

        <CertificateGallery />
      </section>

      {/* Hall Of Armor (Achievements) */}
      <section className="relative py-24 px-6 md:px-12 z-10 max-w-6xl mx-auto border-t border-[#00E5FF]/10">
        <div className="text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-[#00E5FF] tracking-[0.2em]">// ACHIEVEMENT VAULT 08</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-wider text-white uppercase">
            HALL OF ACHIEVEMENTS // MILESTONE ARCHIVE
          </h2>
          <div className="w-24 h-1 bg-[#00E5FF] mx-auto shadow-[0_0_8px_#00E5FF]" />
        </div>

        <HallOfArmor />
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PHASE 13 — GitHub Intelligence Center                      */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        id="github"
        className="relative py-24 px-6 md:px-12 z-10 max-w-6xl mx-auto border-t border-[#00E5FF]/10"
      >
        <div className="text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-[#00E5FF] tracking-[0.2em]">// INTEL NETWORK 13</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-wider text-white uppercase">
            GITHUB // <span className="text-[#00E5FF]">INTELLIGENCE CENTER</span>
          </h2>
          <div className="w-24 h-1 bg-[#00E5FF] mx-auto shadow-[0_0_8px_#00E5FF]" />
          <p className="font-mono text-xs text-[#A5B4C3]/50 mt-2 max-w-xl mx-auto">
            Real-time analytics dashboard • Contribution graph • Repository explorer • Language matrix • Activity timeline
          </p>
        </div>
        <GitHubDashboard />
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PHASE 14 — LeetCode Command Center                         */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        id="leetcode"
        className="relative py-24 px-6 md:px-12 z-10 max-w-6xl mx-auto border-t border-[#FFC107]/10"
      >
        <div className="text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-[#FFC107] tracking-[0.2em]">// ALGORITHM NEXUS 14</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-wider text-white uppercase">
            LEETCODE // <span className="text-[#FFC107]">COMMAND CENTER</span>
          </h2>
          <div className="w-24 h-1 bg-[#FFC107] mx-auto shadow-[0_0_8px_#FFC107]" />
          <p className="font-mono text-xs text-[#A5B4C3]/50 mt-2 max-w-xl mx-auto">
            312+ problems solved • Contest rating 1582 • Progress rings • Difficulty breakdown • Heatmap • Badges
          </p>
        </div>
        <LeetCodeDashboard />
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PHASE 15 — HackerRank Operations Console                   */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        id="hackerrank"
        className="relative py-24 px-6 md:px-12 z-10 max-w-6xl mx-auto border-t border-[#00FF88]/10"
      >
        <div className="text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-[#00FF88] tracking-[0.2em]">// OPERATIONS CONSOLE 15</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-wider text-white uppercase">
            HACKERRANK // <span className="text-[#00FF88]">OPERATIONS CONSOLE</span>
          </h2>
          <div className="w-24 h-1 bg-[#00FF88] mx-auto shadow-[0_0_8px_#00FF88]" />
          <p className="font-mono text-xs text-[#A5B4C3]/50 mt-2 max-w-xl mx-auto">
            Top 5% global • Gold badges • Verified certifications • Domain stars • Skill proficiency map
          </p>
        </div>
        <HackerRankDashboard />
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-24 px-6 md:px-12 z-10 max-w-6xl mx-auto border-t border-[#00E5FF]/10"
      >
        <div className="text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-[#00E5FF] tracking-[0.2em]">// SECURE CHANNEL 16</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-wider text-white uppercase">
            INITIALIZE // <span className="text-[#00E5FF]">SECURE CHANNEL</span>
          </h2>
          <div className="w-24 h-1 bg-[#00E5FF] mx-auto shadow-[0_0_8px_#00E5FF]" />
        </div>
        <ContactPanel />
      </section>

      {/* Cinematic Footer */}
      <CinematicFooter />

      {/* Floating overlays */}
      <AIAssistant />
      <FuturisticTerminal />
    </main>
  );
}
