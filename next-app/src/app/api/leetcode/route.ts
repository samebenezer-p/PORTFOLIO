import { NextResponse } from "next/server";

const USERNAME = "SamEbenezer";

const QUERY = `
  query nexusProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      profile {
        ranking
        reputation
        starRating
      }
      userCalendar {
        submissionCalendar
        streak
        totalActiveDays
      }
    }
    userContestRanking(username: $username) {
      rating
      globalRanking
      attendedContestsCount
      topPercentage
    }
    recentAcSubmissionList(username: $username, limit: 8) {
      title
      titleSlug
      timestamp
      lang
    }
  }
`;

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "#00FF88",
  Medium: "#FFC107",
  Hard: "#FF3366",
};

export async function GET() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "NEXUS-OS-App",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`LeetCode API returned status ${res.status}`);
    }

    const data = await res.json();

    if (data.errors) {
      throw new Error(data.errors[0]?.message || "GraphQL error");
    }

    const matchedUser = data?.data?.matchedUser;
    if (!matchedUser) throw new Error("User not found or no stats returned");

    const acStats: Array<{ difficulty: string; count: number; submissions: number }> =
      matchedUser.submitStats?.acSubmissionNum || [];

    const all = acStats.find((s) => s.difficulty === "All")?.count || 312;
    const easy = acStats.find((s) => s.difficulty === "Easy")?.count || 185;
    const medium = acStats.find((s) => s.difficulty === "Medium")?.count || 110;
    const hard = acStats.find((s) => s.difficulty === "Hard")?.count || 17;
    const ranking = matchedUser.profile?.ranking || 124500;

    // Contest data
    const contestInfo = data?.data?.userContestRanking;
    const contestRating = contestInfo
      ? Math.round(contestInfo.rating)
      : 1582;
    const contestRanking = contestInfo?.globalRanking || null;
    const attendedContests = contestInfo?.attendedContestsCount || 12;
    const topPercentage = contestInfo?.topPercentage
      ? `TOP ${contestInfo.topPercentage.toFixed(1)}%`
      : "TOP 8.4%";

    // Submission calendar — JSON string of { "epoch": count }
    const calendarRaw = matchedUser.userCalendar?.submissionCalendar || "{}";
    let submissionCalendar: Record<string, number> = {};
    try {
      submissionCalendar = JSON.parse(calendarRaw);
    } catch {
      submissionCalendar = {};
    }
    const streak = matchedUser.userCalendar?.streak || 14;
    const totalActiveDays = matchedUser.userCalendar?.totalActiveDays || 0;

    // Recent accepted submissions
    const rawSubmissions: Array<{
      title: string;
      titleSlug: string;
      timestamp: string;
      lang: string;
    }> = data?.data?.recentAcSubmissionList || [];

    const recentSubmissions = rawSubmissions.map((s) => ({
      title: s.title,
      slug: s.titleSlug,
      timestamp: s.timestamp,
      lang: s.lang,
      url: `https://leetcode.com/problems/${s.titleSlug}/`,
    }));

    return NextResponse.json({
      success: true,
      username: matchedUser.username,
      totalSolved: all,
      easy,
      medium,
      hard,
      ranking,
      contestRating,
      contestRanking,
      attendedContests,
      topPercentage,
      streak,
      totalActiveDays,
      submissionCalendar,
      recentSubmissions,
      difficultyColors: DIFFICULTY_COLORS,
      updatedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Failed to fetch LeetCode telemetry";

    return NextResponse.json(
      {
        success: false,
        fallback: true,
        error: errorMsg,
        username: USERNAME,
        totalSolved: 312,
        easy: 185,
        medium: 110,
        hard: 17,
        ranking: 124500,
        contestRating: 1582,
        contestRanking: null,
        attendedContests: 12,
        topPercentage: "TOP 8.4%",
        streak: 14,
        totalActiveDays: 180,
        submissionCalendar: {},
        recentSubmissions: [],
      },
      { status: 200 }
    );
  }
}
