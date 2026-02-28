import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

// Strip unsupported params (e.g. channel_binding) that pg doesn't understand
const rawUrl = process.env.DATABASE_URL ?? "";
const dbUrl = new URL(rawUrl);
dbUrl.searchParams.delete("channel_binding");
const cleanUrl = dbUrl.toString();

const isLocal = rawUrl.includes("localhost") || rawUrl.includes("127.0.0.1");

const pool = new Pool({
  connectionString: cleanUrl,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

pool.on("error", (err) => {
  console.error("[DB] Unexpected client error:", err.message);
});

export default pool;
