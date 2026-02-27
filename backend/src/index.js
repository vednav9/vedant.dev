import "dotenv/config";
import express from "express";
import cors from "cors";
import statsRouter from "./routes/stats.js";

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:3000", "http://localhost:3001"],
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
