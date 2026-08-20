import type { Metadata } from "next";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   Phase 5 — Case Study Route: Automated Theft Reporting Device
   Route: /projects/theft-reporting-device

   STATUS: PLACEHOLDER — Content is intentionally minimal.
   Real project details (tech stack specifics, timeline, images,
   outcomes) have not been provided yet. Fill in the sections
   marked with [YOUR CONTENT HERE] before publishing.

   This file is NEW. No existing components were modified.
═══════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Automated Theft Reporting Device | NEXUS AI OS",
  description:
    "Full case study for the Automated Theft Reporting Device — an ESP32, GPS & GSM-based real-time vehicle anti-theft system by Sam Ebenezer P.",
  openGraph: {
    title: "Automated Theft Reporting Device — Case Study",
    description:
      "Deep-dive into the design, implementation, and outcomes of Sam Ebenezer P's ESP32-based vehicle theft detection system.",
    url: "https://samebenezer.dev/projects/theft-reporting-device",
  },
};

export default function TheftReportingDeviceCaseStudy() {
  return (
    <main
      className="min-h-screen bg-[#050816] text-white font-mono px-6 py-16 max-w-4xl mx-auto"
      aria-label="Case Study: Automated Theft Reporting Device"
    >
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[#00E5FF]/60 hover:text-[#00E5FF] text-xs tracking-widest mb-12 transition-colors"
      >
        ← RETURN_TO_BASE.sys
      </Link>

      {/* Header */}
      <header className="mb-12 space-y-4">
        <div className="text-[10px] text-[#00E5FF]/50 tracking-[0.3em] uppercase">
          // CLASSIFIED EXPERIMENT: EXP-001
        </div>
        <h1 className="text-4xl md:text-5xl font-black leading-tight">
          Automated Theft
          <br />
          <span className="text-[#00E5FF]">Reporting Device</span>
        </h1>
        <p className="text-[#A5B4C3]/70 text-sm leading-relaxed max-w-2xl">
          [YOUR CONTENT HERE — one-line project tagline / elevator pitch]
        </p>

        {/* Meta tags */}
        <div className="flex flex-wrap gap-3 pt-2">
          {["ESP32", "GPS", "GSM", "IoT", "C++"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-[#00E5FF]/20 text-[#00E5FF] text-[10px] tracking-widest bg-[#00E5FF]/05"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Placeholder content sections */}
      <div className="space-y-16 border-t border-[#00E5FF]/10 pt-12">

        {/* Problem Statement */}
        <section aria-labelledby="problem-heading">
          <h2 id="problem-heading" className="text-[#FFC107] text-xs tracking-widest mb-4">
            // 01 — PROBLEM_STATEMENT
          </h2>
          <p className="text-[#A5B4C3]/60 text-sm leading-relaxed">
            [YOUR CONTENT HERE — Describe the real-world problem this device solves.
            E.g., vehicle theft rates, response delays, existing solution gaps.]
          </p>
        </section>

        {/* Technical Architecture */}
        <section aria-labelledby="architecture-heading">
          <h2 id="architecture-heading" className="text-[#00FF88] text-xs tracking-widest mb-4">
            // 02 — TECHNICAL_ARCHITECTURE
          </h2>
          <p className="text-[#A5B4C3]/60 text-sm leading-relaxed">
            [YOUR CONTENT HERE — Component list, wiring diagram description, data flow.
            ESP32 + SIM800L GSM + NEO-6M GPS + buzzer + relay, etc.]
          </p>
        </section>

        {/* Implementation */}
        <section aria-labelledby="implementation-heading">
          <h2 id="implementation-heading" className="text-[#A855F7] text-xs tracking-widest mb-4">
            // 03 — IMPLEMENTATION_LOG
          </h2>
          <p className="text-[#A5B4C3]/60 text-sm leading-relaxed">
            [YOUR CONTENT HERE — Key code decisions, challenges faced, firmware logic.
            Timeline: when started, how long to build, key milestones.]
          </p>
        </section>

        {/* Results */}
        <section aria-labelledby="results-heading">
          <h2 id="results-heading" className="text-[#00E5FF] text-xs tracking-widest mb-4">
            // 04 — OUTCOME_METRICS
          </h2>
          <p className="text-[#A5B4C3]/60 text-sm leading-relaxed">
            [YOUR CONTENT HERE — Test results, accuracy of GPS location, SMS delivery time,
            demo outcomes, any awards/recognition, links to code/video.]
          </p>
        </section>

        {/* Links */}
        <section aria-labelledby="links-heading">
          <h2 id="links-heading" className="text-[#FF3366] text-xs tracking-widest mb-4">
            // 05 — SOURCE_LINKS
          </h2>
          <div className="space-y-2 text-sm">
            <p className="text-[#A5B4C3]/40">
              [YOUR CONTENT HERE — GitHub repo URL, demo video, report PDF, etc.]
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-[#00E5FF]/10 text-[9px] text-[#A5B4C3]/25 tracking-widest">
        NEXUS OS v2.0.26 // CASE_STUDY_CLASSIFIED
      </footer>
    </main>
  );
}
