"use client";

import React, { useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   PHASE 19 — GLOBAL ANIMATION SYSTEM
   Mouse glow · Cursor trail · Magnetic buttons · Scroll reveal
   HUD scanlines
═══════════════════════════════════════════════════════════════ */

const TRAIL_COUNT = 10;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function GlobalAnimationSystem() {
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trailPositions = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -200, y: -200 }))
  );
  const mouse = useRef({ x: -200, y: -200 });
  const rafId = useRef<number | null>(null);
  const scrollObserver = useRef<IntersectionObserver | null>(null);

  /* ─── Mouse glow + cursor trail animation loop ─── */
  const animate = useCallback(() => {
    // Move mouse glow
    if (glowRef.current) {
      glowRef.current.style.left = `${mouse.current.x}px`;
      glowRef.current.style.top = `${mouse.current.y}px`;
    }

    // Each trail dot lerps toward the dot in front of it
    trailPositions.current[0].x = lerp(
      trailPositions.current[0].x,
      mouse.current.x,
      0.35
    );
    trailPositions.current[0].y = lerp(
      trailPositions.current[0].y,
      mouse.current.y,
      0.35
    );

    for (let i = 1; i < TRAIL_COUNT; i++) {
      trailPositions.current[i].x = lerp(
        trailPositions.current[i].x,
        trailPositions.current[i - 1].x,
        0.3 - i * 0.018
      );
      trailPositions.current[i].y = lerp(
        trailPositions.current[i].y,
        trailPositions.current[i - 1].y,
        0.3 - i * 0.018
      );

      const el = trailRefs.current[i];
      if (el) {
        const size = Math.max(2, 10 - i * 0.8);
        const opacity = Math.max(0, 0.5 - i * 0.045);
        el.style.transform = `translate(${trailPositions.current[i].x}px, ${trailPositions.current[i].y}px) translate(-50%, -50%)`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.opacity = `${opacity}`;
      }
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  /* ─── Mouse move listener ─── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  /* ─── Magnetic buttons ─── */
  useEffect(() => {
    const strength = 28;

    const handleMove = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>(".mag-btn").forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const threshold = Math.max(rect.width, rect.height) * 1.2;

        if (dist < threshold) {
          const pull = (1 - dist / threshold) * strength;
          const angle = Math.atan2(dy, dx);
          btn.style.transform = `translate(${Math.cos(angle) * pull}px, ${Math.sin(angle) * pull}px)`;
        } else {
          btn.style.transform = "";
        }
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  /* ─── Scroll reveal via IntersectionObserver ─── */
  useEffect(() => {
    const setupReveal = () => {
      const targets = document.querySelectorAll<HTMLElement>(
        "section h2, [data-reveal]"
      );
      targets.forEach((el) => {
        if (!el.classList.contains("scroll-reveal")) {
          el.classList.add("scroll-reveal");
        }
      });

      scrollObserver.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              scrollObserver.current?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

      document
        .querySelectorAll<HTMLElement>(".scroll-reveal")
        .forEach((el) => scrollObserver.current?.observe(el));
    };

    // Run after paint so lazy-loaded components exist in DOM
    const timer = setTimeout(setupReveal, 600);
    return () => {
      clearTimeout(timer);
      scrollObserver.current?.disconnect();
    };
  }, []);

  return (
    <>
      {/* ── Mouse Glow ── */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 1,
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.3s",
          willChange: "left, top",
        }}
      />

      {/* ── Cursor Trail Dots ── */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          aria-hidden="true"
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background:
              i === 0
                ? "rgba(0,229,255,0.9)"
                : `rgba(0,229,255,${0.45 - i * 0.04})`,
            boxShadow: i < 4 ? `0 0 ${6 - i}px rgba(0,229,255,0.7)` : "none",
            pointerEvents: "none",
            zIndex: 9998,
            transform: "translate(-200px,-200px)",
            willChange: "transform",
          }}
        />
      ))}

      {/* ── HUD Scanlines Overlay ── */}
      <div
        aria-hidden="true"
        className="hud-scanlines"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </>
  );
}
