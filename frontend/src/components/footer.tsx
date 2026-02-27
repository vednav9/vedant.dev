"use client";

import { Github, Linkedin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-10 mt-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="font-mono gradient-text font-semibold">Vedant Navthale</span>
            <span>·</span>
            <span>Built with</span>
            {/* <size={12} className="text-red-500 fill-red-500 mx-0.5" /> */}
            <span>using Next.js & Framer Motion</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/vednav9"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com/in/vedantnavthale"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-[#0077b5] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://leetcode.com/vednav9"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-[#ffa116] transition-colors"
              aria-label="LeetCode"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-muted-foreground/50">
          © {new Date().getFullYear()} Vedant Navthale · Open to opportunities
        </div>
      </div>
    </footer>
  );
}
