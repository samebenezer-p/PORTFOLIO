# NEXUS OS // SAM EBENEZER P
> **Clearance Level: ALPHA** — Interactive, high-tech, and AI-integrated developer portfolio ecosystem designed with a futuristic HUD / Stark-inspired theme.

---

## 🌌 Project Overview

**NEXUS OS** is a premium, multi-layered developer portfolio built to showcase the technical profile, achievements, and credentials of **Sam Ebenezer P** (Final Year Computer Science & Engineering Student, Java Developer, and AI Enthusiast). 

The repository features a dual-architectural design:
1. **Static Entry/Landing Portal (Root)**: A light-speed, pure HTML/CSS/JS gateway implementing a complete Stark Industries-style booting sequence (`index.html`), scanline overlay, and radar terminal animations.
2. **Next.js Dashboard Application (`/next-app`)**: A state-of-the-art interactive dashboard utilizing **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and heavy micro-animations (powered by **Framer Motion** and **GSAP**).

---

## 🛠️ Technology Stack

### Static Landing Portal (Root)
*   **Structure**: HTML5 Semantic Elements.
*   **Styling**: Pure CSS3 (`css/` variables, keyframe animations, glitch filters, glassmorphic panels, and responsive grids).
*   **Interactions**: Native ES6 Javascript (`js/` for custom particle canvases, boot terminal log simulation, and custom pointer trackers).

### Next.js Dashboard (`/next-app`)
*   **Framework**: Next.js 16.2 (App Router) & React 19.2
*   **Animation**: Framer Motion 12 & GSAP 3.15 (smooth easing and spring transitions)
*   **Scroll System**: Lenis (Smooth scroll optimization)
*   **Icons**: Lucide React
*   **Styling**: Tailwind CSS v4 + PostCSS
*   **Analytics & SEO**: JSON-LD Structured Data & automated metadata generation

---

## 🚀 Key Features

*   **⚡ Quantum Boot Loader**: An immersive system initialization simulation featuring an animated **Arc Reactor Core** (SVG/CSS), active terminal logging, particle configurations, and authorization prompts.
*   **🤖 Integrated AI Assistant (`AIAssistant.tsx`)**: An interactive AI chat console designed to answer queries regarding Sam's credentials, experience, and project clearances.
*   **💻 Secure CLI Terminal (`FuturisticTerminal.tsx`)**: A fully interactive terminal supporting custom keyboard commands (e.g., `help`, `skills`, `clear`, `contact`) mimicking an OS shell.
*   **📊 Holographic Stats Dashboards**:
    *   **GitHub Dashboard** (`GitHubDashboard.tsx`): Integrates visual profile metrics and contribution heatmaps.
    *   **LeetCode HQ** (`LeetCodeDashboard.tsx`): Real-time/mock problem-solving telemetry (Easy/Medium/Hard splits).
    *   **HackerRank Ops** (`HackerRankDashboard.tsx`): Badge validation and skill certifications.
*   **🛡️ Hall of Armor**: A premium visual cards deck showcasing key projects, development tech stacks, and source links.
*   **🎓 Chronological timelines**: Highly polished vertical pathways displaying Education and Experience logs using intersection observers for scroll trigger events.
*   **🎧 Custom Ambient Audio**: Ambient sound systems providing audio feedback on click/hover states.

---

## 📂 Project Structure

```directory
OG-PORTFOLIO/
├── index.html                   # Static Landing Entry File (Boot Sequence)
├── SAM_EBENEZER_P_Resume_.pdf   # Official Developer Resume
├── css/                         # Static Stylesheet Directory
│   ├── base.css                 # Base resets and typography (Orbitron, Inter, JetBrains Mono)
│   ├── variables.css            # System CSS Custom Variables (Neon Blues, Cyans, Reds)
│   ├── animations.css           # Glitch effects, reactor pulses, and radar sweeps
│   ├── components.css           # Glass panels, custom HUD controls
│   └── sections/                # Component styles (boot, hero, nav, about)
├── js/                          # Static Interactivity Modules
│   ├── boot.js                  # Boot sequence simulation script
│   ├── main.js                  # Central script coordinator
│   ├── particles.js             # Canvas particle field simulation
│   └── cursor.js                # Dual-ring cursor tracker
└── next-app/                    # Next.js Application Root
    ├── src/
    │   ├── app/                 # Routing, Global Layout, and CSS
    │   │   ├── globals.css      # Core Tailwind styling & customizations
    │   │   ├── layout.tsx       # Root layout context
    │   │   └── page.tsx         # Main Dashboard interface
    │   └── components/          # High-fidelity dashboard modules
    │       ├── ArcReactorCore   # SVG animated pulsing core
    │       ├── AIAssistant      # Chatbot interface
    │       ├── FuturisticTerminal # Keyboard-reactive terminal component
    │       ├── SkillMatrix      # Visual tech stack grid
    │       └── ...              # Other UI dashboards & diagnostics
    └── .github/workflows/       # GitHub Action pipelines
        └── deploy.yml           # CI validation (Lint, Type Check, Build)
```

---

## ⚙️ Getting Started

### 1. Running the Static Portal
Simply open the root [index.html](file:///e:/OG-PORTFOLIO/index.html) file directly in any modern web browser, or run a local static server:
```bash
# Using Python's built-in server at root
python -m http.server 8000
```
Visit `http://localhost:8000` to inspect the full Stark OS bootloader.

### 2. Setting Up the Next.js Dashboard
Navigate to the `next-app` directory and install the necessary dependencies:

```bash
cd next-app
npm install
```

Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to experience the full operational dashboard.

### 3. Production Build
To verify type safety and generate optimized static outputs:
```bash
npm run build
```

---

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for continuous quality integration (configured in [.github/workflows/deploy.yml](file:///e:/OG-PORTFOLIO/next-app/.github/workflows/deploy.yml)). On pushing to `main` or `master` branches, the runner:
1. Provisions a clean **Node.js 20** container.
2. Installs workspace dependencies securely (`npm ci`).
3. Executes ESLint rules check (`npm run lint`).
4. Validates TypeScript types (`npx tsc --noEmit`).
5. Performs production Next.js build compilation (`npm run build`).

---

## 👤 Author
*   **Name**: Sam Ebenezer P
*   **Clearance**: Final Year CSE Student / Developer
*   **Email**: [samebenezer718@gmail.com](mailto:samebenezer718@gmail.com)
*   **Status**: Active System Architect

---

## 🔖 Badges

![CI Quality Gate](https://img.shields.io/github/actions/workflow/status/samebenezer-p/OG-PORTFOLIO/ci.yml?label=CI%20Quality%20Gate&style=flat-square&color=00E5FF)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=flat-square&logo=tailwindcss)

---

## 🔗 Links

> **Note:** Some inline links in earlier sections of this README use `file://` prefixes (e.g., `file:///e:/OG-PORTFOLIO/index.html`). These were editor-generated and only work locally. The correct relative path is simply [`index.html`](index.html). Consider those older inline links **deprecated in favor of this section**.

| Resource | Path / URL |
|---|---|
| Static Landing Portal | [`index.html`](index.html) |
| Next.js App Root | [`next-app/`](next-app/) |
| Resume PDF | [`SAM_EBENEZER_P_Resume_.pdf`](SAM_EBENEZER_P_Resume_.pdf) |
| CI Workflow (new) | [`.github/workflows/ci.yml`](next-app/.github/workflows/ci.yml) |
| CI Workflow (original) | [`.github/workflows/deploy.yml`](next-app/.github/workflows/deploy.yml) |

---

## 🚀 Live Demo

> **Placeholder** — Live URL will be added once deployed to Vercel/custom domain.

| Environment | URL |
|---|---|
| Production | *(pending deployment — update this link once live)* |
| Local Dev | `http://localhost:3000` |

---

## 📡 Data Sources

This section accurately describes what data is **live-fetched vs. hardcoded** in each dashboard panel.
The `## 🚀 Key Features` section above describes the intended design; this section reflects the current implementation state.

| Dashboard | Live Data | Hardcoded / Static |
|---|---|---|
| **GitHub Dashboard** | `publicRepos`, `followers`, `totalStars` (fetched via `/api/github` → GitHub REST API, with fallback) | Repo cards, pinned repos, language bars, activity feed, coding stats — all static arrays |
| **LeetCode Dashboard** | `totalSolved`, `easy`, `medium`, `hard`, `ranking` (fetched via `/api/leetcode` → LeetCode GraphQL, with fallback) | Badges, contest history, language breakdown, heatmap — all static / illustrative |
| **HackerRank Dashboard** | *(none)* | 100% hardcoded — all stats, badges, star ratings, certifications, and skill levels are static display data |

> HackerRank does not provide a public API. All HackerRank values are illustrative and based on actual profile data entered manually.

---

## 📄 License

This project is licensed under the **MIT License** — see the [`LICENSE`](LICENSE) file at the repository root for full terms.

Copyright © 2026 Sam Ebenezer P
