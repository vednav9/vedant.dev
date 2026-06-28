// ─────────────────────────────────────────────────────────────────────────────
// Central site/profile data — single source of truth.
// EDIT ME: update your details, social links, and resume path here.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Vedant Navthale",
  role: "Software Engineer",
  location: "India",
  email: process.env.NEXT_PUBLIC_EMAIL,
  phone: process.env.NEXT_PUBLIC_PHONE,

  // Drop your real resume at frontend/public/resume.pdf (keep this path/name,
  // or change it here if you rename the file).
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || "/resume.pdf",

  socials: {
    github: "https://github.com/vednav9",
    linkedin: "https://linkedin.com/in/vedantnavthale",
    leetcode: "https://leetcode.com/vednav9",
  },
} as const;

export type Site = typeof site;
