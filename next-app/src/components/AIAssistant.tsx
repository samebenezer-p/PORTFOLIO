"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Minimize2, ChevronRight, Cpu } from "lucide-react";

interface Message {
  role: "user" | "ai";
  text: string;
}

const KNOWLEDGE: Record<string, string> = {
  hello: "Greetings! I am JARVIS — Sam's virtual portfolio assistant. I can decrypt and summarize intelligence logs on his skills, projects, experience, education, certifications, resume, GitHub profile, or provide secure channels of contact. What files would you like to access?",
  hi: "Hello there! JARVIS online. Ask me anything about Sam's software engineering profile, certifications, or projects.",
  about: "Sam Ebenezer P is an elite final-year Computer Science and Engineering student at Karunya Institute of Technology and Sciences, Coimbatore. Aspiring to be a Software Engineer, he has built systems across Java backend development, AI pipelines, and IoT microcontrollers.",
  skills: "Sam's capability matrix features:\n\n⚡ Languages: Java (90% - primary), SQL (85%), Python (80%), JavaScript (75%), HTML/CSS (90%), C (70%)\n🧠 Computer Science: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP\n🛠️ Tools: Git, GitHub, VS Code, Arduino IDE, Cisco Packet Tracer\n☁️ Technologies: Artificial Intelligence, IoT, Azure & Oracle Cloud",
  projects: "Sam's research laboratory features 4 major classified experiments:\n\n🔬 [EXP-004] CareerForge (Flagship) — AI Career Planning platform using NLP and GenAI.\n🔬 [EXP-001] Automated Theft Reporter — ESP32, GPS & GSM-based real-time vehicle anti-theft system.\n🔬 [EXP-002] Online Quiz App — Client-server Java Servlet and MySQL competitive application.\n🔬 [EXP-003] Morse Code Engine — High-performance Java bi-directional encryption translator.\n\nAsk me about any specific project for details!",
  careerforge: "CareerForge is Sam's flagship project:\n• Analyzes resumes using Natural Language Processing (NLP)\n• Detects skill gaps relative to real-time market demand\n• Automatically maps out personalized career paths using Generative AI APIs\n• Provides structured learning trackers.",
  experience: "Sam's operational logs contain two main missions:\n\n🛡️ Cisco AICTE Virtual Internship (2025)\n   Cyber Security Architect — threat analysis, SHA-256 validation, firewall configurations.\n\n📡 Cisco Networking Academy (2024–2025)\n   Networking Specialist — OSPF/RIP routing, packet flow simulation via Cisco Packet Tracer.",
  education: "Sam is pursuing B.Tech in Computer Science and Engineering (2023–2027) at Karunya Institute of Technology and Sciences, Coimbatore.\nKey coursework: Advanced Programming, Database Management, Cloud Infrastructures, and Intelligent Automation.",
  certifications: "Sam has successfully decrypted 5 verified credentials:\n\n🏆 Oracle Certified Foundations Associate — Data Platform (2025)\n☁️ Microsoft Certified: Azure Data Fundamentals (DP-900)\n🔐 Cisco Cybersecurity Virtual Internship Certificate\n🌐 Cisco Networking Essentials Certificate\n📡 Cisco Packet Tracer Professional",
  github: "Sam's GitHub repository contains 12 active archives with 847 commits this year. Pinned highlights include CareerForge, AutoTheftReporter, and OnlineQuizApp.\nGitHub Profile: github.com/samebenezer-p",
  leetcode: "Sam is highly active on LeetCode under the alias @SamEbenezer:\n📈 312 Problems Solved (185 Easy, 110 Medium, 17 Hard)\n🔥 Max Streak: 14 Days\n⭐ Global Rank: Top 8.4%\n🏆 Contest Rating: 1582",
  hackerrank: "Sam holds an elite rank of Top 5% on HackerRank:\n🏅 Gold Badges: Java, SQL, Problem Solving\n📜 Verified Certifications: Software Engineer (Basic), SQL (Advanced), Java (Basic)",
  contact: "You can establish communication with Sam via:\n\n📧 Email: samebenezer718@gmail.com\n💼 LinkedIn: linkedin.com/in/samebenezer\n🐙 GitHub: github.com/samebenezer-p\n📍 Location: Coimbatore, Tamil Nadu, India\n\nOr submit a payload via the secure contact form below!",
  resume: "Sam's resume is prepared for download in the Hero section. It covers B.Tech CSE (KITS), core skills in Java/Python/SQL, and verified projects (CareerForge, Automated Theft Reporter). If you need a copy emailed, type your request here or email samebenezer718@gmail.com."
};

function getResponse(input: string): string {
  const q = input.toLowerCase().trim();
  
  if (q.includes("about") || q.includes("who is") || q.includes("profile")) return KNOWLEDGE.about;
  if (q.includes("skill") || q.includes("lang") || q.includes("core")) return KNOWLEDGE.skills;
  if (q.includes("project") || q.includes("experiment") || q.includes("quiz") || q.includes("morse") || q.includes("theft")) {
    if (q.includes("careerforge")) return KNOWLEDGE.careerforge;
    return KNOWLEDGE.projects;
  }
  if (q.includes("experi") || q.includes("intern") || q.includes("cisco") || q.includes("job")) return KNOWLEDGE.experience;
  if (q.includes("edu") || q.includes("college") || q.includes("kits") || q.includes("university")) return KNOWLEDGE.education;
  if (q.includes("cert") || q.includes("credentials") || q.includes("oracle") || q.includes("azure")) return KNOWLEDGE.certifications;
  if (q.includes("resume") || q.includes("cv") || q.includes("download")) return KNOWLEDGE.resume;
  if (q.includes("github") || q.includes("git")) return KNOWLEDGE.github;
  if (q.includes("leetcode") || q.includes("solved")) return KNOWLEDGE.leetcode;
  if (q.includes("hackerrank") || q.includes("badge")) return KNOWLEDGE.hackerrank;
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("social")) return KNOWLEDGE.contact;
  
  for (const [key, val] of Object.entries(KNOWLEDGE)) {
    if (q.includes(key)) return val;
  }
  
  return "I am JARVIS. Access is restricted. Please query one of the following archives:\n\n• About Sam\n• Skill Modules\n• Research Projects\n• Experience logs\n• Education chronology\n• Certifications\n• Resume access\n• GitHub statistics\n• Secure channels of Contact";
}

const SUGGESTIONS = [
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Certifications",
  "Resume",
  "GitHub",
  "Contact"
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "JARVIS system activated. Security clearance: ACTIVE. I am ready to assist you in exploring Sam's portfolio OS. Select a parameter or enter your query below." }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setTyping(false);
      setMessages(m => [...m, { role: "ai", text: data.reply || getResponse(text) }]);
    } catch {
      await new Promise(r => setTimeout(r, 600));
      setTyping(false);
      setMessages(m => [...m, { role: "ai", text: getResponse(text) }]);
    }
  };

  return (
    <>
      {/* JARVIS Holographic Orb trigger button */}
      <motion.button
        onClick={() => { setOpen(true); setMinimized(false); }}
        className="fixed bottom-6 right-6 z-[70] w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-2xl overflow-hidden group"
        style={{
          background: "rgba(5, 8, 22, 0.85)",
          border: "1.5px solid #00E5FF",
          boxShadow: "0 0 20px rgba(0, 229, 255, 0.4)",
        }}
        animate={{
          boxShadow: ["0 0 15px rgba(0, 229, 255, 0.3)", "0 0 35px rgba(0, 229, 255, 0.6)", "0 0 15px rgba(0, 229, 255, 0.3)"],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open JARVIS AI Assistant"
      >
        {/* Holographic glowing rings inside the orb */}
        <div className="absolute inset-0 rounded-full border border-dashed border-[#00E5FF]/20 animate-spin duration-3000 pointer-events-none" />
        <div className="absolute inset-1.5 rounded-full border border-dashed border-[#00E5FF]/30 animate-spin duration-5000 reverse pointer-events-none" />
        <motion.div 
          className="absolute inset-3.5 rounded-full border border-[#00E5FF]/40 pointer-events-none" 
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Orb Core */}
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#00E5FF]/60 to-[#18FFFF]/90 flex items-center justify-center shadow-[0_0_12px_#00E5FF]">
          <Cpu className="w-3.5 h-3.5 text-[#050816]" />
        </div>

        {/* Scan Line sweep */}
        <div className="absolute left-0 right-0 h-0.5 bg-[#00E5FF]/30 top-0 group-hover:top-full transition-all duration-1000 ease-linear pointer-events-none" />

        {/* Notification dot */}
        {!open && (
          <motion.div
            className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#00FF88] border border-[#050816]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.35, type: "spring", bounce: 0.25 }}
            className="fixed bottom-24 right-6 z-[70] w-[340px] md:w-[400px] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(8,18,30,0.98), rgba(5,8,22,0.99))",
              border: "1px solid #00E5FF30",
              boxShadow: "0 0 50px #00E5FF20",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: "#00E5FF15" }}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-lg border border-[#00E5FF]/30 flex items-center justify-center bg-[#00E5FF]/10">
                  <div className="absolute inset-0 rounded-lg border border-dashed border-[#00E5FF]/20 animate-spin duration-3000 pointer-events-none" />
                  <Cpu className="w-4 h-4 text-[#00E5FF]" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-white tracking-widest">JARVIS // AI</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                    <span className="font-mono text-[9px] text-[#00FF88]">ONLINE</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMinimized(m => !m)}
                  className="p-1.5 rounded hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Minimize2 className="w-3.5 h-3.5 text-[#A5B4C3]" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 text-[#A5B4C3]" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!minimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  style={{ overflow: "hidden" }}
                >
                  {/* Messages */}
                  <div className="h-72 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        {m.role === "ai" && (
                          <div className="w-6 h-6 rounded-full border border-[#00E5FF]/30 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#00E5FF10" }}>
                            <Cpu className="w-3 h-3 text-[#00E5FF]" />
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] px-3 py-2 rounded-xl font-mono text-[11px] leading-relaxed whitespace-pre-wrap ${
                            m.role === "user"
                              ? "bg-[#00E5FF15] border border-[#00E5FF30] text-white rounded-tr-none"
                              : "bg-[#08121E] border border-[#00E5FF10] text-[#A5B4C3] rounded-tl-none"
                          }`}
                        >
                          {m.text}
                        </div>
                      </motion.div>
                    ))}

                    {typing && (
                      <div className="flex gap-2.5 items-start">
                        <div className="w-6 h-6 rounded-full border border-[#00E5FF]/30 flex items-center justify-center flex-shrink-0" style={{ background: "#00E5FF10" }}>
                          <Cpu className="w-3 h-3 text-[#00E5FF]" />
                        </div>
                        <div className="px-3 py-2.5 rounded-xl bg-[#08121E] border border-[#00E5FF10] flex items-center gap-1">
                          {[0, 1, 2].map(dot => (
                            <motion.div
                              key={dot}
                              className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.15 }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <div ref={bottomRef} />
                  </div>

                  {/* Suggestions */}
                  <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t" style={{ borderColor: "#00E5FF10" }}>
                    {SUGGESTIONS.map(s => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="font-mono text-[9px] px-2 py-1 rounded border cursor-pointer hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors"
                        style={{ borderColor: "#00E5FF20", color: "#A5B4C3" }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="px-4 py-3 border-t flex gap-2" style={{ borderColor: "#00E5FF10" }}>
                    <input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && send(input)}
                      placeholder="Consult JARVIS..."
                      className="flex-1 bg-[#050816] border border-[#00E5FF20] rounded-lg px-3 py-2 font-mono text-xs text-white placeholder:text-[#A5B4C3]/30 outline-none focus:border-[#00E5FF] transition-colors"
                    />
                    <motion.button
                      onClick={() => send(input)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-9 h-9 rounded-lg border border-[#00E5FF] flex items-center justify-center cursor-pointer"
                      style={{ background: "#00E5FF15" }}
                    >
                      <Send className="w-4 h-4 text-[#00E5FF]" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
