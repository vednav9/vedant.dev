import "dotenv/config";
import express from "express";
import cors from "cors";
import statsRouter from "./routes/stats.js";

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
      // allow requests with no origin (curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ["GET"],
    credentials: false,
  })
);
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────────────
app.use("/api/stats", statsRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// ── Start ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  vedant.dev backend running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Stats:  http://localhost:${PORT}/api/stats/all\n`);
});
