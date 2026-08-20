"use client";

/**
 * CaseStudyLink.tsx — Phase 5 Standalone Case Study Link Component
 *
 * This is a NEW small component. No existing Hall of Armor card is modified.
 *
 * How to use:
 * Drop <CaseStudyLink href="/projects/theft-reporting-device" /> inside any
 * Hall of Armor card wherever you choose. The original card file is untouched.
 *
 * Example:
 *   import CaseStudyLink from "@/components/CaseStudyLink";
 *   // Inside your card JSX:
 *   <CaseStudyLink href="/projects/theft-reporting-device" />
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";

interface CaseStudyLinkProps {
  /** Route to the full case study page, e.g. "/projects/theft-reporting-device" */
  href: string;
  /** Optional custom label — defaults to "Read full case study" */
  label?: string;
  /** Accent color — defaults to NEXUS cyan */
  color?: string;
}

export default function CaseStudyLink({
  href,
  label = "Read full case study",
  color = "#00E5FF",
}: CaseStudyLinkProps) {
  return (
    <Link href={href} legacyBehavior={false}>
      <motion.span
        className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-widest cursor-pointer group"
        style={{ color }}
        whileHover={{ x: 3 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        aria-label={label}
      >
        <BookOpen
          className="w-3 h-3 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />
        <span className="border-b border-current/30 group-hover:border-current/80 transition-colors">
          {label}
        </span>
        <ArrowRight
          className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
          aria-hidden="true"
        />
      </motion.span>
    </Link>
  );
}
