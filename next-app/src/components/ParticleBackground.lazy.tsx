"use client";

/**
 * ParticleBackground.lazy.tsx — Phase 3 Lazy Loader Wrapper
 *
 * This is a NEW wrapper file. The original ParticleBackground.tsx is NOT modified.
 *
 * Why: ParticleBackground runs a heavy canvas animation loop. Lazy-loading it
 * with `next/dynamic` and `ssr: false` ensures it never blocks the initial HTML
 * parse or server render, improving Time-to-Interactive (TTI) and Largest
 * Contentful Paint (LCP) scores on Lighthouse.
 *
 * To use this instead of the direct import in page.tsx, change ONE import line:
 *   - Before: import ParticleBackground from "@/components/ParticleBackground";
 *   - After:  import ParticleBackground from "@/components/ParticleBackground.lazy";
 *
 * The original file remains untouched for easy rollback.
 */

import dynamic from "next/dynamic";

/** Null loading fallback — canvas is purely decorative, so no skeleton needed */
const ParticleBackgroundLazy = dynamic(
  () => import("@/components/ParticleBackground"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default ParticleBackgroundLazy;
