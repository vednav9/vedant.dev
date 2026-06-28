// ─────────────────────────────────────────────────────────────────────────────
// Awards & recognition shown in the Awards section.
//
// PHOTOS: drop an image in frontend/public/awards/ and set `image` (e.g.
// "/awards/vibeathon.jpg"). Cards with an image become clickable → fullscreen
// lightbox. Cards without an image show an elegant icon banner instead, so they
// look finished even before you add a photo.
//
// `icon` picks the accent glyph; `accent` is the hex color for icon + glow.
// ─────────────────────────────────────────────────────────────────────────────

export type AwardIcon = "trophy" | "medal" | "star" | "award" | "rocket";

export interface Award {
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: AwardIcon;
  accent: string; // hex
  /** Optional photo. Drop in /public/awards and reference it here. */
  image?: string;
  /** Optional external link (proof, article, certificate). */
  link?: string;
}

export const awards: Award[] = [
  {
    title: "Winner — Vibe-a-Thon Hackathon",
    issuer: "NHITM",
    date: "2026",
    description:
      "Took first place at NHITM's Vibe-a-Thon — designed and shipped a working product under tight time constraints and pitched it to the judging panel.",
    icon: "trophy",
    accent: "#F59E0B",
    image: "/awards/vibeathon.jpg",
  },
  {
    title: "Google Student Ambassador",
    issuer: "NHITM College",
    date: "2025",
    description:
      "Selected as Google's student ambassador at NHITM — representing Google's developer ecosystem and driving campus tech initiatives.",
    icon: "star",
    accent: "#2563EB",
    image: "/awards/google-student-ambassador.jpg",
  },
  {
    title: "3rd Place — National Startup Competition",
    issuer: "APCOER",
    date: "2023",
    description:
      "Secured 3rd place at a national-level startup competition for an innovative product concept, business model, and live pitch.",
    icon: "medal",
    accent: "#7C3AED",
    image: "/awards/startup-competition.jpg",
  },
  {
    title: "Research Publication — CortexaX",
    issuer: "E-Learning Platform",
    date: "2023",
    description:
      "Published a research paper on “CortexaX”, An AI Powered Educational Platform",
    icon: "award",
    accent: "#10B981",
    image: "/awards/research-publication.jpg",
  },
];
