/**
 * github.js — fetches live stats from the GitHub REST API v3.
 *
 * Returns:
 * {
 *   repos:     number,   // public repos
 *   followers: number,
 *   stars:     number,   // total stars across all repos
 *   username:  string,
 *   profile:   string,
 *   fetchedAt: string (ISO)
 * }
 */

import fetch from "node-fetch";

const GITHUB_API = "https://api.github.com";
const USERNAME = process.env.GITHUB_USERNAME || "vednav9";
const TOKEN = process.env.GITHUB_TOKEN;

function headers() {
  const h = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "vedant.dev-backend/1.0",
  };
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`;
  return h;
}

async function ghFetch(path) {
  const res = await fetch(`${GITHUB_API}${path}`, { headers: headers() });
  if (!res.ok) throw new Error(`GitHub API ${path} → ${res.status}`);
  return res.json();
}

/**
 * Sum stars across all public repos (handles pagination).
 */
async function fetchTotalStars(username) {
  let page = 1;
  let total = 0;
  while (true) {
    const repos = await ghFetch(
      `/users/${username}/repos?per_page=100&page=${page}`
    );
    if (!repos.length) break;
    total += repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    if (repos.length < 100) break;
    page++;
  }
  return total;
}

export async function fetchGitHubStats() {
  const [user, stars] = await Promise.all([
    ghFetch(`/users/${USERNAME}`),
    fetchTotalStars(USERNAME),
  ]);

  return {
    repos: user.public_repos ?? 0,
    followers: user.followers ?? 0,
    stars,
    username: USERNAME,
    profile: `https://github.com/${USERNAME}`,
    fetchedAt: new Date().toISOString(),
  };
}
