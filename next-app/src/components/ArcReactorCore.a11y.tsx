"use client";

/**
 * ArcReactorCore.a11y.tsx — Phase 3 Accessibility Wrapper
 *
 * This is a NEW wrapper component. The original ArcReactorCore.tsx is NOT modified.
 *
 * Behavior:
 * - If user has `prefers-reduced-motion: reduce`, renders a simplified static SVG
 *   that conveys the same visual identity without any animation loops.
 * - Otherwise, renders the original animated ArcReactorCore component unchanged.
 *
 * To use this instead of ArcReactorCore in page.tsx, change ONE import line:
 *   - Before: import ArcReactorCore from "@/components/ArcReactorCore";
 *   - After:  import ArcReactorCore from "@/components/ArcReactorCore.a11y";
 *
 * The original file remains untouched for easy rollback.
 */

import React from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import OriginalArcReactorCore from "@/components/ArcReactorCore";

/** Static fallback — no animation loops, same visual shape */
function ArcReactorStatic() {
  return (
    <div
      aria-label="Arc Reactor Core — static display (reduced motion)"
      role="img"
      className="relative flex items-center justify-center"
      style={{ width: 320, height: 320 }}
    >
      <svg
        viewBox="0 0 200 200"
        width="320"
        height="320"
        aria-hidden="true"
      >
        {/* Outer ring */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        {/* Mid ring */}
        <circle
          cx="100"
          cy="100"
          r="66"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="1"
          strokeOpacity="0.25"
        />
        {/* Inner ring */}
        <circle
          cx="100"
          cy="100"
          r="42"
          fill="none"
          stroke="#18FFFF"
          strokeWidth="2"
          strokeOpacity="0.6"
        />
        {/* Core glow */}
        <circle
          cx="100"
          cy="100"
          r="18"
          fill="#18FFFF"
          fillOpacity="0.9"
          filter="url(#glow)"
        />
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      {/* Accessible label below */}
      <span className="sr-only">Arc Reactor Core — active</span>
    </div>
  );
}

/** Drop-in replacement for ArcReactorCore with a11y awareness */
export default function ArcReactorCoreA11y(
  props: React.ComponentProps<typeof OriginalArcReactorCore>
) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <ArcReactorStatic />;
  }

  return <OriginalArcReactorCore {...props} />;
}
