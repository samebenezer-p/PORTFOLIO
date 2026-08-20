import { NextRequest, NextResponse } from "next/server";

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

function getStaticReply(input: string): string {
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
  return "I am JARVIS — Sam's portfolio AI system. Ask me about his Skills, Projects, Experience, Education, Certifications, Resume, or Contact details.";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message || "";
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `System Context: You are JARVIS, an AI assistant for Sam Ebenezer P (Final Year CSE student at Karunya University, Java/Python Developer, AI Enthusiast). Answer questions professionally in a tech/Stark theme. Answer this user prompt: ${message}`,
                  },
                ],
              },
            ],
          }),
        }
      );
      if (response.ok) {
        const geminiData = await response.json();
        const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return NextResponse.json({ reply: text, source: "gemini-api" });
        }
      }
    }

    const reply = getStaticReply(message);
    return NextResponse.json({ reply, source: "system-synthesis" });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Error processing request";
    return NextResponse.json(
      { reply: "JARVIS communication glitch detected. Utilizing fallback synthesis matrix.", error: errorMsg },
      { status: 200 }
    );
  }
}
