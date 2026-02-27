# vedant.dev — Backend

Node.js + Express + PostgreSQL API providing live GitHub and LeetCode stats with a PostgreSQL-backed cache (fallback to last-fetched when upstream APIs are down).

## Stack

| Layer     | Tech                  |
|-----------|-----------------------|
| Runtime   | Node.js ≥ 20          |
| Framework | Express 4             |
| Database  | PostgreSQL 14+        |
| ORM       | raw `pg` pool         |
| Hosting   | any Node host / Vercel|

---

## Quick start

### 1. Install deps
```bash
cd backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Fill in DATABASE_URL, GITHUB_TOKEN, and the usernames
```

### 3. Initialise the DB table (run once)
```bash
npm run db:init
```

### 4. Start dev server
```bash
npm run dev
```

---

## API Endpoints

| Method | Path                    | Description                          |
|--------|-------------------------|--------------------------------------|
| GET    | `/health`               | Health check                         |
| GET    | `/api/stats/github`     | Live GitHub stats (cached 30 min)    |
| GET    | `/api/stats/leetcode`   | Live LeetCode stats (cached 30 min)  |
| GET    | `/api/stats/all`        | Both stats in one request            |

### Response shape

```json
{
  "data": { /* stats object */ },
  "stale": false,
  "source": "live"   // "live" | "cache"
}
```

- `stale: true` means the live fetch failed and the last known value was returned.
- `source: "cache"` means data was returned from DB without a new upstream request.

### GitHub stats shape
```json
{
  "repos": 31,
  "followers": 6,
  "stars": 2,
  "username": "vednav9",
  "profile": "https://github.com/vednav9",
  "fetchedAt": "2026-02-27T10:00:00.000Z"
}
```

### LeetCode stats shape
```json
{
  "total": 265,
  "easy": 83,
  "medium": 140,
  "hard": 42,
  "rank": 525037,
  "username": "vednav9",
  "profile": "https://leetcode.com/vednav9",
  "fetchedAt": "2026-02-27T10:00:00.000Z"
}
```

---

## Cache behaviour

1. On each request, the DB is checked first.
2. If the cache is older than `CACHE_TTL_SECONDS` (default 1800 s = 30 min), a live fetch is attempted.
3. If the live fetch succeeds → DB is updated → fresh data returned.
4. If the live fetch fails → last DB value is returned with `stale: true`.
5. If there is no DB entry at all → `503` is returned.

---

## Environment variables

| Variable             | Required | Default           | Description                         |
|----------------------|----------|-------------------|-------------------------------------|
| `DATABASE_URL`       | ✅       | —                 | PostgreSQL connection string        |
| `GITHUB_TOKEN`       | ✅       | —                 | GitHub PAT (read:user scope)        |
| `GITHUB_USERNAME`    | —        | `vednav9`         | GitHub username                     |
| `LEETCODE_USERNAME`  | —        | `vednav9`         | LeetCode username                   |
| `PORT`               | —        | `4000`            | HTTP port                           |
| `FRONTEND_URL`       | —        | `http://localhost:3000` | CORS allowed origin           |
| `CACHE_TTL_SECONDS`  | —        | `1800`            | How long before re-fetching (sec)   |
