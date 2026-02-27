/**
 * stats.js — /api/stats routes
 *
 * GET /api/stats/github   — returns GitHub stats (live or cached)
 * GET /api/stats/leetcode — returns LeetCode stats (live or cached)
 * GET /api/stats/all      — returns both in one request
 */

import { Router } from "express";
import * as cache from "../db/cache.js";
import { fetchGitHubStats } from "../services/github.js";
import { fetchLeetCodeStats } from "../services/leetcode.js";

const router = Router();
const TTL = Number(process.env.CACHE_TTL_SECONDS) || 1800; // 30 min default

/**
 * Generic handler: try live fetch, fall back to last-cached on error.
 *
 * @param {"github"|"leetcode"} source
 * @param {Function} fetcher  - async function () => stats object
 * @param {import("express").Response} res
 */
async function respondWithStats(source, fetcher, res) {
  // 1. Try DB cache
  const cached = await cache.get(source).catch(() => null);

  // 2. Decide if we need a fresh fetch
  const needsFresh = !cached || cache.isStale(cached.fetchedAt, TTL);

  if (needsFresh) {
    try {
      const fresh = await fetcher();
      await cache.set(source, fresh);
      return res.json({ data: fresh, stale: false, source: "live" });
    } catch (err) {
      console.error(`[stats] Live fetch failed for ${source}:`, err.message);

      // Fall back to cached even if stale
      if (cached) {
        return res.json({
          data: cached.data,
          stale: true,
          source: "cache",
          cachedAt: cached.fetchedAt.toISOString(),
          error: err.message,
        });
      }

      // Nothing at all — return 503 with hardcoded fallback values
      return res.status(503).json({
        error: "Live fetch failed and no cache available",
        message: err.message,
      });
    }
  }

  // Cache is fresh — return it
  return res.json({ data: cached.data, stale: false, source: "cache" });
}

router.get("/github", async (_req, res) => {
  await respondWithStats("github", fetchGitHubStats, res);
});

router.get("/leetcode", async (_req, res) => {
  await respondWithStats("leetcode", fetchLeetCodeStats, res);
});

router.get("/all", async (_req, res) => {
  const [github, leetcode] = await Promise.allSettled([
    (async () => {
      const cached = await cache.get("github").catch(() => null);
      if (cached && !cache.isStale(cached.fetchedAt, TTL)) return { data: cached.data, stale: false, source: "cache" };
      const fresh = await fetchGitHubStats();
      await cache.set("github", fresh);
      return { data: fresh, stale: false, source: "live" };
    })(),
    (async () => {
      const cached = await cache.get("leetcode").catch(() => null);
      if (cached && !cache.isStale(cached.fetchedAt, TTL)) return { data: cached.data, stale: false, source: "cache" };
      const fresh = await fetchLeetCodeStats();
      await cache.set("leetcode", fresh);
      return { data: fresh, stale: false, source: "live" };
    })(),
  ]);

  res.json({
    github: github.status === "fulfilled" ? github.value : { error: github.reason?.message },
    leetcode: leetcode.status === "fulfilled" ? leetcode.value : { error: leetcode.reason?.message },
  });
});

export default router;
