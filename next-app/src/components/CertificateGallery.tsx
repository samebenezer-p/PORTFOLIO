"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ShieldCheck, X, Star, CheckCircle } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  verificationId: string;
  color: string;
  issuerInitials: string;
  domain: string;
}

function VerifiedStamp({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 2, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: -12 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="absolute top-6 right-6 flex items-center justify-center"
        >
          <div
            className="relative w-24 h-24 flex items-center justify-center rounded-full border-4"
            style={{
              borderColor: "#00FF88",
              background: "rgba(0, 255, 136, 0.05)",
              boxShadow: "0 0 25px #00FF8860",
            }}
          >
            {/* Rotating dashes border */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px dashed #00FF8840",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="text-center">
              <CheckCircle className="w-6 h-6 text-[#00FF88] mx-auto mb-0.5" />
              <div className="text-[#00FF88] font-black text-[9px] font-mono tracking-widest leading-tight">
                VERIFIED<br />✓
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HashTyper({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <span className="font-mono text-[#18FFFF]">
      {displayed}<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>_</motion.span>
    </span>
  );
}

export default function CertificateGallery() {
  const certs: Certificate[] = [
    {
      title: "Oracle Data Platform 2025 Certified Foundations Associate",
      issuer: "Oracle",
      year: "2025",
      verificationId: "ORACLE-DP-2025-FND-ASSOC",
      color: "#FF3366",
      issuerInitials: "ORC",
      domain: "Cloud Data Platform",
    },
    {
      title: "Microsoft Azure Data Fundamentals",
      issuer: "Microsoft",
      year: "2025",
      verificationId: "MS-AZ-DP-900-CERTIFIED",
      color: "#00E5FF",
      issuerInitials: "MS",
      domain: "Cloud Computing",
    },
    {
      title: "Cisco AICTE Cyber Security Internship",
      issuer: "Cisco Academy / AICTE",
      year: "2025",
      verificationId: "CISCO-AICTE-CYBERSEC-2025",
      color: "#00FF88",
      issuerInitials: "CSC",
      domain: "Cyber Security",
    },
    {
      title: "Cisco Networking Essentials",
      issuer: "Cisco Networking Academy",
      year: "2024",
      verificationId: "CISCO-NET-ESSENTIALS-2024",
      color: "#18FFFF",
      issuerInitials: "CNA",
      domain: "Computer Networks",
    },
    {
      title: "Cisco Packet Tracer Professional",
      issuer: "Cisco Networking Academy",
      year: "2024",
      verificationId: "CISCO-PKT-TRACER-PROF-2024",
      color: "#FFC107",
      issuerInitials: "CPT",
      domain: "Network Simulation",
    },
  ];

  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [showStamp, setShowStamp] = useState(false);

  const openCert = (cert: Certificate) => {
    setActiveCert(cert);
    setShowStamp(false);
    setTimeout(() => setShowStamp(true), 800);
  };

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      {/* Certificate grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certs.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            onClick={() => openCert(cert)}
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
            style={{
              background: "linear-gradient(135deg, rgba(8,18,30,0.92), rgba(5,8,22,0.96))",
              border: `1px solid ${cert.color}25`,
              boxShadow: `0 4px 15px ${cert.color}10`,
            }}
          >
            {/* Holographic shimmer on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${cert.color}08 0%, transparent 40%, ${cert.color}06 80%, transparent 100%)`,
              }}
            />

            {/* Shimmer sweep animation */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{
                background: `linear-gradient(90deg, transparent, ${cert.color}20, transparent)`,
                width: "50%",
              }}
            />

            {/* Top accent bar */}
            <div
              className="h-0.5"
              style={{ background: `linear-gradient(to right, ${cert.color}, transparent)` }}
            />

            <div className="p-5">
              {/* Issuer badge */}
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  className="w-12 h-12 rounded-xl border flex items-center justify-center font-black text-xs font-mono flex-shrink-0"
                  style={{
                    background: `${cert.color}15`,
                    borderColor: `${cert.color}35`,
                    color: cert.color,
                    boxShadow: `0 0 15px ${cert.color}20`,
                  }}
                  animate={{ boxShadow: [`0 0 10px ${cert.color}15`, `0 0 25px ${cert.color}30`, `0 0 10px ${cert.color}15`] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  {cert.issuerInitials}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className="text-[9px] font-mono tracking-widest font-bold"
                      style={{ color: cert.color }}
                    >
                      {cert.issuer.toUpperCase()}
                    </span>
                    <span className="text-[9px] font-mono text-[#A5B4C3]/40">{cert.year}</span>
                  </div>
                  <h3 className="text-xs font-bold text-white tracking-wide uppercase leading-snug line-clamp-3">
                    {cert.title}
                  </h3>
                </div>
              </div>

              {/* Domain tag */}
              <div
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded border text-[9px] font-mono"
                style={{ color: cert.color, borderColor: `${cert.color}25`, background: `${cert.color}08` }}
              >
                <Star className="w-2.5 h-2.5" />
                {cert.domain}
              </div>

              {/* CTA */}
              <div
                className="flex items-center gap-1.5 text-[9px] font-mono mt-3 opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ color: cert.color }}
              >
                <Award className="w-3 h-3" />
                DECRYPT_CREDENTIAL.exe
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 bg-[#050816]/92 backdrop-blur-md z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              className="w-full max-w-md relative rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(8,18,30,0.99), rgba(5,8,22,1))",
                border: `2px solid ${activeCert.color}40`,
                boxShadow: `0 0 60px ${activeCert.color}25, 0 0 120px ${activeCert.color}10`,
              }}
            >
              {/* Animated border draw */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ border: `1px solid ${activeCert.color}20` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />

              {/* Corner brackets */}
              {[
                "top-2 left-2 border-t-2 border-l-2",
                "top-2 right-2 border-t-2 border-r-2",
                "bottom-2 left-2 border-b-2 border-l-2",
                "bottom-2 right-2 border-b-2 border-r-2",
              ].map((cls, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-5 h-5 rounded ${cls}`}
                  style={{ borderColor: activeCert.color }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                />
              ))}

              {/* VERIFIED stamp */}
              <VerifiedStamp show={showStamp} />

              {/* Close button */}
              <button
                onClick={() => { setActiveCert(null); setShowStamp(false); }}
                className="absolute top-4 left-4 p-1.5 rounded-lg border cursor-pointer hover:bg-red-500/10 transition-colors z-10"
                style={{ borderColor: `${activeCert.color}20`, color: "#A5B4C3" }}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="pt-14 px-6 pb-6 space-y-5">
                {/* Seal */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: "spring", bounce: 0.4 }}
                  className="mx-auto w-20 h-20 rounded-full flex items-center justify-center border-4 relative"
                  style={{
                    borderColor: activeCert.color,
                    background: `${activeCert.color}10`,
                    boxShadow: `0 0 30px ${activeCert.color}50, inset 0 0 15px ${activeCert.color}10`,
                    color: activeCert.color,
                  }}
                >
                  {/* Rotating outer ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-dashed"
                    style={{ borderColor: `${activeCert.color}40` }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  <ShieldCheck className="w-9 h-9 relative z-10" />
                </motion.div>

                {/* Title */}
                <div className="text-center space-y-1">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span
                      className="font-mono text-[9px] tracking-[0.3em] block uppercase"
                      style={{ color: activeCert.color }}
                    >
                      // SECURITY CREDENTIAL DECRYPTED
                    </span>
                    <h3 className="text-sm font-black text-white mt-1.5 uppercase tracking-wide leading-snug">
                      {activeCert.title}
                    </h3>
                  </motion.div>
                </div>

                {/* Data readout */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-xl border p-4 space-y-3 font-mono text-xs"
                  style={{ background: "#050816", borderColor: `${activeCert.color}15` }}
                >
                  {[
                    { label: "ISSUING AUTHORITY", value: activeCert.issuer, color: "white" },
                    { label: "DOMAIN", value: activeCert.domain, color: "white" },
                    { label: "YEAR ACQUIRED", value: activeCert.year, color: "white" },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between border-b pb-2" style={{ borderColor: `${activeCert.color}10` }}>
                      <span style={{ color: `${activeCert.color}70` }} className="uppercase">{row.label}</span>
                      <span className="text-white font-bold">{row.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-0.5">
                    <span style={{ color: `${activeCert.color}70` }} className="uppercase">VERIFICATION HASH</span>
                    <HashTyper text={activeCert.verificationId} />
                  </div>
                </motion.div>

                {/* Dismiss */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => { setActiveCert(null); setShowStamp(false); }}
                  className="w-full px-6 py-2.5 border rounded-xl font-mono text-xs transition-all duration-300 cursor-pointer hover:scale-105"
                  style={{
                    borderColor: `${activeCert.color}30`,
                    color: "#A5B4C3",
                    background: `${activeCert.color}05`,
                  }}
                >
                  DISMISS_CREDENTIAL.exe
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
