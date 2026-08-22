// Re-exports from the shared StatsContext so all existing imports remain unchanged.
// Actual fetch logic + 60-second polling lives in src/contexts/stats-context.tsx.
export {
  useStats,
  StatsProvider,
  GITHUB_FALLBACK,
  LEETCODE_FALLBACK,
  LINKEDIN_FALLBACK,
} from "@/contexts/stats-context";

export type {
  GitHubStats,
  LeetCodeStats,
  LinkedInStats,
  StatResult,
} from "@/contexts/stats-context";
