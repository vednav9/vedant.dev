"use client";

import { Github, Linkedin, ExternalLink, Download, Mail } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10 mt-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="font-mono gradient-text font-semibold">
              {site.name}
            </span>
            <span>·</span>
            <span>Built with Next.js &amp; Framer Motion</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <Download size={13} />
              Resume
            </a>
            <a
              href={`mailto:${site.email}`}
              className="p-2 rounded-lg text-muted-foreground hover:text-red-500 transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-[#0077b5] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={site.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-[#ffa116] transition-colors"
              aria-label="LeetCode"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} {site.name} · Open to opportunities
        </div>
      </div>
    </footer>
  );
}
