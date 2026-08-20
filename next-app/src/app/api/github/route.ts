import { NextResponse } from "next/server";

const USERNAME = "samebenezer-p";

/** Language → hex color map */
const LANG_COLORS: Record<string, string> = {
  Java: "#F89820",
  Python: "#3776AB",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178c6",
  "C++": "#f34b7d",
  C: "#A8B9CC",
  "C#": "#178600",
  HTML: "#E34F26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Ruby: "#CC342D",
  PHP: "#777BB4",
  Jupyter: "#DA5B0B",
  Dart: "#00B4AB",
  SQL: "#00E5FF",
  default: "#8B949E",
};

function langColor(lang: string | null): string {
  if (!lang) return LANG_COLORS.default;
  return LANG_COLORS[lang] ?? LANG_COLORS.default;
}

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  updated_at: string;
};

type GitHubEvent = {
  type: string;
  repo?: { name: string };
  payload?: {
    commits?: Array<{ message: string; sha: string }>;
  };
  created_at: string;
};

export async function GET() {
  const headers: Record<string, string> = { "User-Agent": "NEXUS-OS-App" };
  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  if (token && token !== "your_github_token_here") {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
        { headers, next: { revalidate: 3600 } }
      ),
      fetch(
        `https://api.github.com/users/${USERNAME}/events/public?per_page=30`,
        { headers, next: { revalidate: 1800 } }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error(`GitHub API error: ${userRes.status}/${reposRes.status}`);
    }

    const userData = await userRes.json();
    const allRepos: Repo[] = await reposRes.json();

    // ── Total stars
    const totalStars = allRepos.reduce(
      (acc, r) => acc + (r.stargazers_count || 0),
      0
    );

    // ── Top repos sorted by stars
    const sortedByStars = [...allRepos].sort(
      (a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)
    );
    const topRepos = sortedByStars.slice(0, 8).map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description || "No description provided",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      language: repo.language || "Unknown",
      langColor: langColor(repo.language),
      updatedAt: repo.updated_at,
    }));

    // ── Language aggregation (count repos per language)
    const langMap: Record<string, number> = {};
    for (const repo of allRepos) {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    }
    const totalLangCount = Object.values(langMap).reduce((a, b) => a + b, 0) || 1;
    const languageStats = Object.entries(langMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, count]) => ({
        name,
        pct: Math.round((count / totalLangCount) * 100),
        color: langColor(name),
      }));

    // ── Recent commits from push events
    const recentCommits: Array<{
      repo: string;
      message: string;
      sha: string;
      time: string;
    }> = [];

    if (eventsRes.ok) {
      const events: GitHubEvent[] = await eventsRes.json();
      for (const evt of events) {
        if (evt.type === "PushEvent" && evt.payload?.commits?.length) {
          for (const commit of evt.payload.commits.slice(0, 2)) {
            recentCommits.push({
              repo: (evt.repo?.name || "").replace(`${USERNAME}/`, ""),
              message: commit.message.split("\n")[0].slice(0, 72),
              sha: commit.sha.slice(0, 7),
              time: evt.created_at,
            });
            if (recentCommits.length >= 6) break;
          }
          if (recentCommits.length >= 6) break;
        }
      }
    }

    // ── GitHub Contributions via public proxy (level 0–4 grid)
    let contributionGrid: number[][] | null = null;
    try {
      const contribRes = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
        { next: { revalidate: 7200 } }
      );
      if (contribRes.ok) {
        const contribData = await contribRes.json();
        const contribs: Array<{ date: string; count: number; level: number }> =
          contribData.contributions || [];
        // Pad or trim to exactly 52 weeks × 7 days
        const grid: number[][] = [];
        for (let w = 0; w < 52; w++) {
          const week: number[] = [];
          for (let d = 0; d < 7; d++) {
            week.push(contribs[w * 7 + d]?.level ?? 0);
          }
          grid.push(week);
        }
        contributionGrid = grid;
      }
    } catch {
      // stay null → client falls back to seeded data
    }

    return NextResponse.json({
      success: true,
      username: userData.login,
      name: userData.name || userData.login,
      bio: userData.bio || null,
      avatarUrl: userData.avatar_url,
      publicRepos: userData.public_repos ?? 0,
      followers: userData.followers ?? 0,
      following: userData.following ?? 0,
      totalStars,
      topRepos,
      languageStats,
      recentCommits,
      contributionGrid,
      updatedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Failed to fetch GitHub telemetry";

    return NextResponse.json(
      {
        success: false,
        fallback: true,
        error: errorMsg,
        username: USERNAME,
        publicRepos: 12,
        followers: 38,
        following: 25,
        totalStars: 33,
        languageStats: [
          { name: "Java", pct: 42, color: "#F89820" },
          { name: "Python", pct: 22, color: "#3776AB" },
          { name: "JavaScript", pct: 16, color: "#F7DF1E" },
          { name: "HTML", pct: 12, color: "#E34F26" },
          { name: "C", pct: 8, color: "#A8B9CC" },
        ],
        topRepos: [
          {
            name: "CareerForge",
            url: `https://github.com/${USERNAME}/CareerForge`,
            description: "AI-powered career planning with resume NLP & skill-gap detection",
            stars: 12, forks: 3, watchers: 48,
            language: "JavaScript", langColor: "#F7DF1E",
            updatedAt: new Date().toISOString(),
          },
          {
            name: "AutoTheftReporter",
            url: `https://github.com/${USERNAME}/AutoTheftReporter`,
            description: "ESP32 + GPS + GSM real-time theft detection & SMS alert IoT system",
            stars: 9, forks: 2, watchers: 36,
            language: "C++", langColor: "#f34b7d",
            updatedAt: new Date().toISOString(),
          },
          {
            name: "OnlineQuizApp",
            url: `https://github.com/${USERNAME}/OnlineQuizApp`,
            description: "Java Servlet + MySQL multi-client competitive quiz application",
            stars: 7, forks: 1, watchers: 28,
            language: "Java", langColor: "#F89820",
            updatedAt: new Date().toISOString(),
          },
          {
            name: "MorseEncoder",
            url: `https://github.com/${USERNAME}/MorseEncoder`,
            description: "Bi-directional Morse code encryption & decryption engine in Java",
            stars: 5, forks: 1, watchers: 20,
            language: "Java", langColor: "#F89820",
            updatedAt: new Date().toISOString(),
          },
          {
            name: "PortfolioOS",
            url: `https://github.com/${USERNAME}/PortfolioOS`,
            description: "NEXUS AI Operating System — personal futuristic portfolio in Next.js",
            stars: 8, forks: 2, watchers: 32,
            language: "TypeScript", langColor: "#3178c6",
            updatedAt: new Date().toISOString(),
          },
          {
            name: "DSA-Mastery",
            url: `https://github.com/${USERNAME}/DSA-Mastery`,
            description: "Java & Python DSA solutions — 300+ LeetCode problems with explanations",
            stars: 4, forks: 0, watchers: 16,
            language: "Java", langColor: "#F89820",
            updatedAt: new Date().toISOString(),
          },
        ],
        recentCommits: [],
        contributionGrid: null,
      },
      { status: 200 }
    );
  }
}
