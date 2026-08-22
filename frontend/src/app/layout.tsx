import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StatsProvider } from "@/contexts/stats-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display font for headings — gives the redesign a distinct, modern voice
// while staying professional and technical.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vedant Navthale — Software Engineer",
  description:
    "Software Engineer specializing in Full-Stack and Backend development. Building scalable systems, crafting elegant solutions. Open to opportunities at high-growth startups and FAANG.",
  icons: {
    icon: "/icon.png?v=2",
    shortcut: "/icon.png?v=2",
    apple: "/icon.png?v=2",
  },
  keywords: [
    "Vedant Navthale",
    "Software Engineer",
    "Full Stack Developer",
    "Backend Developer",
    "React",
    "Node.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Vedant Navthale" }],
  openGraph: {
    title: "Vedant Navthale — Software Engineer",
    description:
      "Building scalable systems and impactful products. Full-Stack & Backend specialist.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedant Navthale — Software Engineer",
    description:
      "Building scalable systems and impactful products. Full-Stack & Backend specialist.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafbfc" },
    { media: "(prefers-color-scheme: dark)", color: "#09090f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <StatsProvider>
            {children}
          </StatsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
