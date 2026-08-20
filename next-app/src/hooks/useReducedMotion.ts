import { useEffect, useState } from "react";

/**
 * useReducedMotion — Phase 3 Accessibility Hook
 *
 * Reads the user's OS-level `prefers-reduced-motion` media query.
 * Returns `true` if the user has requested reduced motion, `false` otherwise.
 *
 * Usage:
 *   const prefersReducedMotion = useReducedMotion();
 *   if (prefersReducedMotion) { return <StaticVersion /> }
 *   return <AnimatedVersion />
 *
 * NOTE: This is a NEW file — no existing files were edited.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    // Safe SSR default: assume motion is OK until we can query
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    // Modern browsers
    mq.addEventListener("change", handler);

    // Sync initial value in case it changed between render and effect
    setPrefersReduced(mq.matches);

    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

export default useReducedMotion;
