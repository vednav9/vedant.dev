"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, ExternalLink, Code2 } from "lucide-react";
import { ParticleBackground } from "./particle-background";
import { useEffect, useState } from "react";

const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "Backend Specialist",
  "Problem Solver",
  "Systems Thinker",
];

function TypewriterText() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span className="gradient-text">
      {displayed}
      <span className="cursor-blink not-italic">|</span>
    </span>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex flex-col items-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background dark:from-[#060611] dark:via-[#09090f] dark:to-[#060611]" />

      {/* Radial glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 dark:bg-violet-600/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 dark:bg-blue-600/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Particle canvas */}
      <ParticleBackground />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Navbar height spacer */}
      <div className="h-16 shrink-0" />

      {/* Content — fills remaining height and centers children */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-4 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Open to new opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3"
        >
          Vedant{" "}
          <span className="gradient-text">Navthale</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg sm:text-xl md:text-2xl font-semibold text-muted-foreground mb-3 h-8 md:h-10"
        >
          <TypewriterText />
        </motion.h2>

        {/* Impact statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-5 leading-relaxed"
        >
          Transforming complex problems into scalable, elegant solutions.
          Building systems that perform at scale — from backend APIs to
          full-stack products.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-5"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            <Code2 size={16} />
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/70 bg-background/60 backdrop-blur-sm text-foreground font-medium text-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 hover:-translate-y-0.5"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <a
            href="https://github.com/vednav9"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-border/50 bg-background/40 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200 hover:-translate-y-0.5"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/vedantnavthale"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-border/50 bg-background/40 backdrop-blur-sm text-muted-foreground hover:text-[#0077b5] hover:border-[#0077b5]/40 transition-all duration-200 hover:-translate-y-0.5"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://leetcode.com/vednav9"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-border/50 bg-background/40 backdrop-blur-sm text-muted-foreground hover:text-[#ffa116] hover:border-[#ffa116]/40 transition-all duration-200 hover:-translate-y-0.5"
            aria-label="LeetCode"
          >
            <ExternalLink size={18} />
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="grid grid-cols-3 gap-2 sm:gap-6 max-w-xs mx-auto"
        >
          {[
            { value: "31+", label: "Repositories" },
            { value: "265+", label: "LeetCode Solved" },
            { value: "2+", label: "Years Building" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator — in normal flow, always pinned to bottom */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="relative z-10 mb-6 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors shrink-0"
      >
        <span className="text-xs">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}
