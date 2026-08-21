"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, GitBranch, Link2, Share2, Code2, Shield, Send, CheckCircle, Loader, FileText } from "lucide-react";

const CONTACTS = [
  { label: "Email", value: "samebenezer718@gmail.com", icon: <Mail className="w-4 h-4" />, href: "mailto:samebenezer718@gmail.com", color: "#00E5FF" },
  { label: "Phone", value: "+91 9789XXXXXX", icon: <Phone className="w-4 h-4" />, href: "tel:+919789000000", color: "#00FF88" },
  { label: "Location", value: "Coimbatore, Tamil Nadu, India", icon: <MapPin className="w-4 h-4" />, href: "#", color: "#FFC107" },
  { label: "GitHub", value: "github.com/samebenezer-p", icon: <GitBranch className="w-4 h-4" />, href: "https://github.com/samebenezer-p", color: "#A855F7" },
  { label: "LinkedIn", value: "linkedin.com/in/samebenezer", icon: <Link2 className="w-4 h-4" />, href: "https://linkedin.com/in/samebenezer", color: "#0A66C2" },
  { label: "Instagram", value: "@_.z_a_m_._", icon: <Share2 className="w-4 h-4" />, href: "https://www.instagram.com/_.z_a_m_._/", color: "#E1306C" },
  { label: "LeetCode", value: "leetcode.com/samebenezer", icon: <Code2 className="w-4 h-4" />, href: "https://leetcode.com/u/samebenezer/", color: "#FFC107" },
  { label: "HackerRank", value: "hackerrank.com/samebenezer2005", icon: <Shield className="w-4 h-4" />, href: "https://hackerrank.com/samebenezer2005", color: "#00FF88" },
  { label: "Resume Download", value: "Sam_Ebenezer_P_Resume.sys", icon: <FileText className="w-4 h-4" />, href: "#", color: "#FF3366" },
];

type Status = "idle" | "sending" | "success" | "error";

export default function ContactPanel() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "3243e93d-f930-4085-9d5f-aee655cb7461",
          name: form.name,
          email: form.email,
          subject: form.subject ? `[NEXUS OS] ${form.subject}` : `[NEXUS OS] New message from ${form.name}`,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setForm({ name: "", email: "", subject: "", message: "" });
        }, 3000);
      } else {
        setErrorMessage(data.message || "Transmission failed");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (err: unknown) {
      setErrorMessage("Network error occurred");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 w-full">
      {/* Contact channels */}
      <div className="lg:col-span-2 space-y-3">
        <div className="font-mono text-[10px] text-[#00E5FF]/60 tracking-widest mb-4">
          // SECURE_COMMUNICATION_CHANNELS:
        </div>
        {CONTACTS.map((c, i) => (
          <motion.a
            key={i}
            href={c.href}
            onClick={c.label === "Resume Download" ? (e) => { e.preventDefault(); alert("Initializing Resume download..."); } : undefined}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ x: 4, scale: 1.01 }}
            className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group block"
            style={{
              borderColor: `${c.color}20`,
              background: `${c.color}05`,
            }}
          >
            {/* Icon */}
            <motion.div
              className="p-2.5 rounded-lg border flex-shrink-0"
              style={{ borderColor: `${c.color}30`, background: `${c.color}12`, color: c.color }}
              whileHover={{ rotate: 10 }}
            >
              {c.icon}
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="font-mono text-[9px] text-[#A5B4C3]/50 tracking-widest uppercase">{c.label}</div>
              <div className="font-mono text-xs text-white group-hover:text-white/80 truncate mt-0.5" style={{ color: c.color }}>
                {c.value}
              </div>
            </div>

            {/* Glow dot */}
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"
              style={{ background: c.color }}
            />
          </motion.a>
        ))}
      </div>

      {/* Contact form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-3"
      >
        <div
          className="relative rounded-2xl overflow-hidden p-6 md:p-8"
          style={{
            background: "linear-gradient(135deg, rgba(8,18,30,0.95), rgba(5,8,22,0.98))",
            border: "1px solid rgba(0,229,255,0.2)",
            boxShadow: "0 0 40px rgba(0,229,255,0.05)",
          }}
        >
          {/* Corner brackets */}
          {["top-0 left-0 border-t-2 border-l-2","top-0 right-0 border-t-2 border-r-2","bottom-0 left-0 border-b-2 border-l-2","bottom-0 right-0 border-b-2 border-r-2"].map((cls, i) => (
            <div key={i} className={`absolute w-5 h-5 border-[#00E5FF] ${cls}`} />
          ))}

          {/* Scan animation on idle */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent, #00E5FF50, transparent)" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          <div className="font-mono text-[10px] text-[#00E5FF]/60 tracking-widest mb-1">// SECURE_TRANSMISSION_FORM</div>
          <h3 className="text-lg font-black text-white mb-6">INITIALIZE CONTACT PROTOCOL</h3>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-16 h-16 rounded-full border-2 border-[#00FF88] flex items-center justify-center"
                  style={{ boxShadow: "0 0 25px #00FF8860" }}
                >
                  <CheckCircle className="w-8 h-8 text-[#00FF88]" />
                </motion.div>
                <div className="text-center font-mono">
                  <div className="text-[#00FF88] font-bold text-sm">TRANSMISSION SUCCESSFUL</div>
                  <div className="text-[#A5B4C3]/60 text-xs mt-1">Message delivered to secure channel</div>
                </div>
              </motion.div>
            ) : status === "error" ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-16 h-16 rounded-full border-2 border-[#FF3366] flex items-center justify-center"
                  style={{ boxShadow: "0 0 25px #FF336660" }}
                >
                  <div className="text-[#FF3366] font-bold text-2xl">!</div>
                </motion.div>
                <div className="text-center font-mono">
                  <div className="text-[#FF3366] font-bold text-sm">TRANSMISSION FAILED</div>
                  <div className="text-[#A5B4C3]/60 text-xs mt-1">{errorMessage}</div>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "name", label: "AGENT_NAME", placeholder: "Your name", type: "text" },
                    { id: "email", label: "COMM_CHANNEL", placeholder: "your@email.com", type: "email" },
                  ].map((field) => (
                    <div key={field.id} className="space-y-1">
                      <label className="font-mono text-[9px] tracking-widest text-[#00E5FF]/60">{field.label}</label>
                      <motion.input
                        type={field.type}
                        value={form[field.id as keyof typeof form]}
                        onChange={e => setForm(p => ({ ...p, [field.id]: e.target.value }))}
                        onFocus={() => setFocused(field.id)}
                        onBlur={() => setFocused(null)}
                        placeholder={field.placeholder}
                        required
                        animate={{ borderColor: focused === field.id ? "#00E5FF" : "rgba(0,229,255,0.2)" }}
                        className="w-full px-3 py-2.5 rounded-lg bg-[#050816] font-mono text-xs text-white placeholder:text-[#A5B4C3]/30 outline-none border transition-all duration-200"
                        style={{ borderColor: "rgba(0,229,255,0.2)" }}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[9px] tracking-widest text-[#00E5FF]/60">SUBJECT_HEADER</label>
                  <motion.input
                    type="text"
                    value={form.subject}
                    onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    placeholder="Message subject..."
                    required
                    animate={{ borderColor: focused === "subject" ? "#00E5FF" : "rgba(0,229,255,0.2)" }}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#050816] font-mono text-xs text-white placeholder:text-[#A5B4C3]/30 outline-none border transition-all duration-200"
                    style={{ borderColor: "rgba(0,229,255,0.2)" }}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[9px] tracking-widest text-[#00E5FF]/60">MESSAGE_PAYLOAD</label>
                  <motion.textarea
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Your message..."
                    required
                    rows={4}
                    animate={{ borderColor: focused === "message" ? "#00E5FF" : "rgba(0,229,255,0.2)" }}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#050816] font-mono text-xs text-white placeholder:text-[#A5B4C3]/30 outline-none border transition-all duration-200 resize-none"
                    style={{ borderColor: "rgba(0,229,255,0.2)" }}
                  />
                </div>

                {/* Send button */}
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl font-mono text-sm font-bold flex items-center justify-center gap-3 cursor-pointer transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,229,255,0.2), rgba(24,255,255,0.15))",
                    border: "1px solid #00E5FF",
                    color: "white",
                    boxShadow: "0 0 20px rgba(0,229,255,0.3)",
                  }}
                >
                  {/* Shimmer */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)" }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  {status === "sending" ? (
                    <><Loader className="w-4 h-4 animate-spin" /> TRANSMITTING...</>
                  ) : (
                    <><Send className="w-4 h-4" /> TRANSMIT_MESSAGE.exe</>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
