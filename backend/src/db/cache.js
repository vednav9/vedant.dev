/**
 * cache.js — thin wrapper around stats_cache table.
 *
 * get(source)             → { data, fetchedAt } | null
 * set(source, data)       → void
 * isStale(fetchedAt, ttl) → boolean
 */

import pool from "./pool.js";

/**
 * Retrieve cached row for `source`.
 * @param {"github"|"leetcode"} source
 * @returns {{ data: object, fetchedAt: Date } | null}
 */
export async function get(source) {
  const result = await pool.query(
    "SELECT data, fetched_at FROM stats_cache WHERE source = $1",
    [source]
  );
  if (result.rowCount === 0) return null;
  const { data, fetched_at } = result.rows[0];
  return { data, fetchedAt: new Date(fetched_at) };
}

/**
 * Upsert cached data for `source`.
 * @param {"github"|"leetcode"} source
 * @param {object} data
 */
export async function set(source, data) {
  await pool.query(
    `INSERT INTO stats_cache (source, data, fetched_at)
     VALUES ($1, $2, NOW())
     ON CONFLICT (source) DO UPDATE
       SET data = EXCLUDED.data,
           fetched_at = EXCLUDED.fetched_at`,
    [source, JSON.stringify(data)]
  );
}

/**
 * Returns true if `fetchedAt` is older than `ttlSeconds`.
 * @param {Date} fetchedAt
 * @param {number} ttlSeconds
 */
export function isStale(fetchedAt, ttlSeconds) {
  return Date.now() - fetchedAt.getTime() > ttlSeconds * 1000;
}
