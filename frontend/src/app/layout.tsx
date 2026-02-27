import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { VisualEditsMessenger } from "orchids-visual-edits";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vedant Navthale — Software Engineer",
  description:
    "Software Engineer specializing in Full-Stack and Backend development. Building scalable systems, crafting elegant solutions. Open to opportunities at high-growth startups and FAANG.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
