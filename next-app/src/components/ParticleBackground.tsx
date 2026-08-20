"use client";

import React, { useEffect, useRef, memo, useState } from "react";
import { motion } from "framer-motion";

/* Phase 19 — Twinkle color jitter added
   Phase 21 — React.memo + prefers-reduced-motion
   Phase 24 — Shutdown fade out */
const ParticleBackground = memo(function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [shuttingDown, setShuttingDown] = useState(false);

  useEffect(() => {
    const onShutdown = () => setShuttingDown(true);
    window.addEventListener("nexus-shutdown-start", onShutdown);
    return () => window.removeEventListener("nexus-shutdown-start", onShutdown);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let frameCount = 0;

    interface Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      opacity: number;
      hue: number; // For twinkle color jitter
    }

    let particles: Particle[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = prefersReduced
        ? 20
        : Math.min(Math.floor((canvas.width * canvas.height) / 18000), 100);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.5 + 0.2,
          hue: 180 + Math.random() * 20, // cyan range 180–200
        });
      }
    };

    const draw = () => {
      // If shutting down, we could stop drawing to save CPU, but fading out is handled by motion.canvas
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines (subtle blueprint background)
      ctx.strokeStyle = "rgba(0, 229, 255, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw particles with twinkle
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Twinkle: shimmer hue ±10° every 3 frames
        if (frameCount % 3 === 0) {
          p.hue += (Math.random() - 0.5) * 4;
          p.hue = Math.max(170, Math.min(210, p.hue));
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#00E5FF";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0.65 }}
      animate={shuttingDown ? { opacity: 0 } : { opacity: 0.65 }}
      transition={shuttingDown ? { duration: 3, ease: "easeInOut" } : {}}
    />
  );
});

export default ParticleBackground;

