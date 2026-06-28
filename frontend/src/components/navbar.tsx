"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X, Download } from "lucide-react";
import { site } from "@/data/site";

const rawUrl = site.resumeUrl ?? "";
const driveMatch = rawUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
const downloadUrl = driveMatch
  ? `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`
  : rawUrl;

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#awards", label: "Awards" },
  { href: "#stats", label: "Stats" },
  { href: "#contact", label: "Contact" },
];

const sectionIds = navLinks.map((l) => l.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const detectActive = useCallback(() => {
    setScrolled(window.scrollY > 40);

    // Find the section closest to the top of the viewport (with offset for navbar)
    let current: string | null = null;
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= 120) current = id;
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", detectActive, { passive: true });
    detectActive();
    return () => window.removeEventListener("scroll", detectActive);
  }, [detectActive]);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          {/* Logo — bigger name */}
          <Link
            href="#hero"
            className="text-xl sm:text-2xl font-bold gradient-text hover:opacity-80 transition-opacity tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Vedant Navthale
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = activeSection === id;
              const showLine = isActive || hoveredLink === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(id)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {/* Blue line dropping from top of screen down to just above the text.
                      The line container spans from the top edge of the viewport (negative
                      offset = navbar top) to 4px above the link text. */}
                  <span
                    className="absolute left-1/2 -translate-x-1/2 w-[2px] pointer-events-none overflow-hidden"
                    style={{ top: "-24px", bottom: "calc(100% + 2px)" }}
                  >
                    <motion.span
                      className="block w-full bg-primary rounded-b-full absolute bottom-0"
                      initial={{ height: 0 }}
                      animate={{ height: showLine ? "100%" : 0 }}
                      transition={{
                        duration: 0.3,
                        ease: showLine
                          ? [0.22, 1, 0.36, 1]
                          : [0.36, 0, 0.66, -0.56],
                      }}
                      style={{ transformOrigin: "top" }}
                    />
                  </span>
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <a
              href={downloadUrl}
              download
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity shadow-sm shadow-primary/20"
            >
              <Download size={14} />
              Resume
            </a>
            <button
              className="lg:hidden p-1.5 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/60 py-4 px-6 flex flex-col gap-2 lg:hidden"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm py-2 border-b border-border/30 last:border-0 transition-colors ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                  )}
                  {link.label}
                </a>
              );
            })}
            <a
              href={downloadUrl}
              download
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <Download size={15} />
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
