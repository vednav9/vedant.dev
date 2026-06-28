import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import statsRouter from "./routes/stats.js";
import contactRouter from "./routes/contact.js";

// ── Startup validation ────────────────────────────────────────────────────
const required = ["DATABASE_URL"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`[startup] Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://vedantnavdev.vercel.app",
  FRONTEND_URL,
].filter(Boolean);

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: false,
  })
);
app.use(express.json());

// Rate limiters
const statsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, try again in a minute." },
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages sent. Please try again later." },
});

// ── Routes ─────────────────────────────────────────────────────────────────
app.use("/api/stats", statsLimiter, statsRouter);
app.use("/api/contact", contactLimiter, contactRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Global error handler — catches unhandled async errors
app.use((err, _req, res, _next) => {
  console.error("[error]", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// ── Start ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  vedant.dev backend running on http://localhost:${PORT}`);
  console.log(`  Health: http://localhost:${PORT}/health`);
  console.log(`  Stats:  http://localhost:${PORT}/api/stats/all\n`);
});
