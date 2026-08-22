"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GitHubStats {
  repos: number;
  followers: number;
  stars: number;
  username: string;
  profile: string;
  fetchedAt: string;
}

export interface LeetCodeStats {
  total: number;
  easy: number;
  medium: number;
  hard: number;
  rank: number;
  username: string;
  profile: string;
  fetchedAt: string;
}

export interface LinkedInStats {
  followers: number;
}

export interface StatResult<T> {
  data: T | null;
  loading: boolean;
  stale: boolean;
  error: string | null;
}

// ─── Fallbacks ───────────────────────────────────────────────────────────────

export const GITHUB_FALLBACK: GitHubStats = {
  repos: 40,
  followers: 9,
  stars: 4,
  username: "vednav9",
  profile: "https://github.com/vednav9",
  fetchedAt: "",
};

export const LEETCODE_FALLBACK: LeetCodeStats = {
  total: 447,
  easy: 130,
  medium: 238,
  hard: 79,
  rank: 246416,
  username: "vednav9",
  profile: "https://leetcode.com/vednav9",
  fetchedAt: "",
};

export const LINKEDIN_FALLBACK: LinkedInStats = { followers: 2.6 };

// ─── API URL ─────────────────────────────────────────────────────────────────

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  (process.env.NODE_ENV === "development" ? "http://localhost:4000" : "");

const STATS_URL = API_BASE ? `${API_BASE}/api/stats/all` : "/api/stats/all";

// ─── Context ─────────────────────────────────────────────────────────────────

interface StatsContextValue {
  github: StatResult<GitHubStats>;
  leetcode: StatResult<LeetCodeStats>;
  linkedin: StatResult<LinkedInStats>;
}

const StatsContext = createContext<StatsContextValue>({
  github: { data: GITHUB_FALLBACK, loading: true, stale: true, error: null },
  leetcode: { data: LEETCODE_FALLBACK, loading: true, stale: true, error: null },
  linkedin: { data: LINKEDIN_FALLBACK, loading: false, stale: false, error: null },
});

// ─── Provider ────────────────────────────────────────────────────────────────

export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [github, setGithub] = useState<StatResult<GitHubStats>>({
    data: GITHUB_FALLBACK,
    loading: true,
    stale: true,
    error: null,
  });
  const [leetcode, setLeetcode] = useState<StatResult<LeetCodeStats>>({
    data: LEETCODE_FALLBACK,
    loading: true,
    stale: true,
    error: null,
  });
  const [linkedin, setLinkedin] = useState<StatResult<LinkedInStats>>({
    data: LINKEDIN_FALLBACK,
    loading: false,
    stale: false,
    error: null,
  });

  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    async function fetchAll() {
      try {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 10_000);

        const res = await fetch(STATS_URL, { signal: controller.signal });
        window.clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        if (cancelledRef.current) return;

        if (json.github?.data) {
          setGithub({ data: json.github.data, loading: false, stale: json.github.stale ?? false, error: null });
        } else {
          setGithub({ data: GITHUB_FALLBACK, loading: false, stale: true, error: json.github?.error ?? "No data" });
        }

        if (json.leetcode?.data) {
          setLeetcode({ data: json.leetcode.data, loading: false, stale: json.leetcode.stale ?? false, error: null });
        } else {
          setLeetcode({ data: LEETCODE_FALLBACK, loading: false, stale: true, error: json.leetcode?.error ?? "No data" });
        }

        if (json.linkedin?.data) {
          setLinkedin({ data: json.linkedin.data, loading: false, stale: false, error: null });
        }
      } catch (err) {
        if (cancelledRef.current) return;
        const msg = err instanceof Error ? err.message : "Unknown error";
        setGithub((prev) => ({ ...prev, loading: false, stale: true, error: msg }));
        setLeetcode((prev) => ({ ...prev, loading: false, stale: true, error: msg }));
      }
    }

    fetchAll();

    // Refresh every 60 seconds
    const intervalId = window.setInterval(fetchAll, 60_000);

    // Also refresh when the tab becomes visible again
    const handleVisibility = () => {
      if (document.visibilityState === "visible") fetchAll();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelledRef.current = true;
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <StatsContext.Provider value={{ github, leetcode, linkedin }}>
      {children}
    </StatsContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useStats() {
  return useContext(StatsContext);
}
