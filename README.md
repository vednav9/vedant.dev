# vedant.dev — Portfolio Website

A **production-grade, full-stack portfolio website** built to showcase my engineering skills, projects, experience, and real-time coding activity using modern web technologies and clean UI/UX principles.

This is not a static portfolio — it is a **live engineering dashboard** powered by real data from GitHub and LeetCode.

🌐 **Live Website**: https://vedant.dev  \
👤 **Author**: Vedant Navthale

---

## 🚀 Why This Project?

Most developer portfolios are:
- Static
- Manually updated
- Filled with fake metrics
- Frontend-only

This project was built to be different.

### ✅ What makes it unique
- **Full-stack architecture**
- **Dynamic, real-time data**
- **Backend + database**
- **Product-quality UI/UX**
- **Engineering-first mindset**

The goal is simple:
> Build a portfolio that **recruiters trust** and **engineers respect**.

---

## 🧠 Features

### 🎨 UI / UX
- Dark mode **by default** (with light mode toggle)
- Modern, minimal, product-inspired design
- Smooth animations and micro-interactions
- Fully responsive (mobile-first)
- Accessible and SEO-optimized

### 📊 Live Engineering Stats (Dynamic)
- **GitHub**
	- Contribution graph
	- Streak
	- Repositories
	- Stars & commits
- **LeetCode**
	- Total problems solved
	- Difficulty-wise breakdown
	- Current streak

> All stats are fetched dynamically via APIs and cached — no hardcoded numbers.

### 🧩 Core Sections
- Hero (clear role & impact)
- About Me (engineering mindset)
- Experience
- Projects (GitHub-powered)
- Skills
- Engineering Activity Dashboard
- Contact

---

## 🏗️ Tech Stack

### Frontend
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **ShadCN / Headless UI**

### Backend
- **Node.js**
- **Next.js API Routes**
- **PostgreSQL**
- **Prisma ORM**

### Database
- PostgreSQL for:
	- Contact form submissions
	- Cached GitHub stats
	- Cached LeetCode stats
	- Visitor analytics

### Other
- API caching & rate-limit handling
- Server-side rendering for SEO
- Skeleton loaders & graceful fallbacks

---

## 🗂️ Architecture Overview

```text
vedant.dev/
|-- frontend/                 # Next.js app (App Router)
|   |-- src/
|   |   |-- app/              # routes, layout, globals
|   |   |-- components/       # section components + UI primitives
|   |   |-- hooks/            # responsive + view helpers
|   |   `-- lib/              # utilities
|   `-- public/               # static assets
`-- backend/                  # Express API (stats + caching)
    |-- src/
    |   |-- index.js          # server entry + CORS
    |   |-- routes/           # /api/stats/*
    |   |-- services/         # GitHub + LeetCode fetchers
    |   `-- db/               # pg pool + cache helpers
    `-- .env.example
```
