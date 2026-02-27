/**
 * leetcode.js — fetches live stats from LeetCode's public GraphQL API.
 *
 * Returns:
 * {
 *   total:     number,
 *   easy:      number,
 *   medium:    number,
 *   hard:      number,
 *   rank:      number,
 *   username:  string,
 *   profile:   string,
 *   fetchedAt: string (ISO)
 * }
 *
 * Uses the unofficial but stable LeetCode GraphQL endpoint.
 * No auth required for public profile stats.
 */

import fetch from "node-fetch";

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";
const USERNAME = process.env.LEETCODE_USERNAME || "vednav9";

const QUERY = `
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    profile {
      ranking
    }
    submitStats {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }
}
`;

export async function fetchLeetCodeStats() {
  const res = await fetch(LEETCODE_GRAPHQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "vedant.dev-backend/1.0",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
  });

  if (!res.ok) throw new Error(`LeetCode API → ${res.status}`);

  const json = await res.json();
  const user = json?.data?.matchedUser;

  if (!user) throw new Error(`LeetCode user '${USERNAME}' not found`);

  const counts = {};
  for (const entry of user.submitStats.acSubmissionNum) {
    counts[entry.difficulty] = entry.count;
  }

  return {
    total: counts["All"] ?? 0,
    easy: counts["Easy"] ?? 0,
    medium: counts["Medium"] ?? 0,
    hard: counts["Hard"] ?? 0,
    rank: user.profile.ranking ?? 0,
    username: USERNAME,
    profile: `https://leetcode.com/${USERNAME}`,
    fetchedAt: new Date().toISOString(),
  };
}
