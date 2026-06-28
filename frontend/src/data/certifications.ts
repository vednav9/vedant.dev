// ─────────────────────────────────────────────────────────────────────────────
// Certifications shown in the Certifications section.
//
// HOW TO SWAP IN YOUR REAL CERTIFICATE IMAGES:
//   1. Drop the certificate image (PNG/JPG, landscape works best) into
//      frontend/public/certificates/  — e.g. ibm-databases-sql.png
//   2. Point `image` at it, e.g. image: "/certificates/ibm-databases-sql.png".
//      (Right now each `image` points at a generated SVG placeholder.)
//   3. `verifyUrl` already holds your public credential link.
//   4. `category` must be one of CATEGORIES below so the filter works.
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  "All",
  "Software Engineering",
  "Programming",
  "Data & SQL",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Certification {
  title: string;
  issuer: string;
  date: string; // human-readable, e.g. "2025"
  category: Exclude<Category, "All">;
  /** Path under /public, or any image URL. Replace the SVG placeholder with your real image. */
  image: string;
  /** Public link to verify the credential. */
  verifyUrl?: string;
  /** Credential / license ID shown in the lightbox. Optional. */
  credentialId?: string;
  /** Accent color (hex) used for the category chip + glow. */
  accent: string;
}

export const certifications: Certification[] = [
  {
    title: "Databases & SQL for Data Science",
    issuer: "IBM · Coursera",
    date: "2025",
    category: "Data & SQL",
    image: "/certificates/ibm-databases-sql.jpg",
    verifyUrl: "https://coursera.org/share/e1bf30307514059cf6e996eebb60ccd1",
    accent: "#0F62FE",
  },
  {
    title: "Object-Oriented Programming in Java",
    issuer: "IBM · Coursera",
    date: "2025",
    category: "Programming",
    image: "/certificates/ibm-oop-java.jpg",
    verifyUrl: "https://coursera.org/share/1eb2500e06c1498624c12a01b7948dec",
    accent: "#E76F00",
  },
  {
    title: "Software Engineering Job Simulation",
    issuer: "J.P. Morgan · Forage",
    date: "2025",
    category: "Software Engineering",
    image: "/certificates/jpmorgan-forage.jpg",
    verifyUrl:
      "https://drive.google.com/file/d/1sz8_Z1UcmL7hUubfsodiVeInnr7qqMz6/view?usp=sharing",
    accent: "#2E5C8A",
  },
];
