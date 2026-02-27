/**
 * Run this ONCE to create the stats_cache table.
 * Usage:  npm run db:init
 */

import pool from "./pool.js";

const SQL = `
CREATE TABLE IF NOT EXISTS stats_cache (
  source       VARCHAR(50)  PRIMARY KEY,   -- 'github' | 'leetcode'
  data         JSONB        NOT NULL,
  fetched_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
`;

try {
  await pool.query(SQL);
  console.log("✅  stats_cache table ready");
} catch (err) {
  console.error("❌  Migration failed:", err.message);
  process.exit(1);
} finally {
  await pool.end();
}
