"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Github,
  Linkedin,
  Code2,
  Download,
  Mail,
  CodeXml,
} from "lucide-react";
import { ParticleBackground } from "./particle-background";
import { Sparkles } from "./effects/sparkles";
import { CountUp } from "./effects/count-up";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { useStats } from "@/hooks/use-stats";

const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "Backend Specialist",
  "Problem Solver",
  "Systems Designer",
];

function TypewriterText() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80,
      );
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

function HeroAvatar() {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <div className="relative inline-block">
      <div
        className="absolute -inset-4 rounded-full opacity-50 blur-lg animate-spin-slow"
        style={{
          background:
            "conic-gradient(from 0deg, #7c3aed, #3b82f6, #06b6d4, #ec4899, #7c3aed)",
        }}
        aria-hidden
      />
      <div
        className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-violet-500 via-blue-500 to-cyan-400 opacity-70 blur-[4px]"
        aria-hidden
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${site.socials.github}.png`}
        alt={site.name}
        width={360}
        height={360}
        onError={() => setFailed(true)}
        className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full object-cover border-[4px] border-background shadow-2xl"
      />
    </div>
  );
}

type Phase = "measuring" | "centered" | "revealed";

export function HeroSection() {
  const reduce = useReducedMotion();
  const avatarRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const [phase, setPhase] = useState<Phase>(reduce ? "revealed" : "measuring");
  const { github, leetcode } = useStats();
  const ghRepos = github.data?.repos ?? 40;
  const InFollowers = 2.6;
  const lcTotal = leetcode.data?.total ?? 447;

  useEffect(() => {
    if (reduce) return;

    const frame = setTimeout(() => {
      const el = avatarRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        offsetRef.current =
          window.innerWidth / 2 - (rect.left + rect.width / 2);
      }
      setPhase("centered");
      setTimeout(() => setPhase("revealed"), 1300);
    }, 50);

    return () => clearTimeout(frame);
  }, [reduce]);

  const rise = (y = 20, delay = 0, duration = 0.6) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay },
        };

  const textVisible = phase === "revealed";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-50/60 via-background to-background dark:from-[#060611] dark:via-[#09090f] dark:to-[#060611]" />

      {/* Aurora blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/15 dark:bg-violet-600/15 rounded-full blur-3xl animate-aurora" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/15 dark:bg-blue-600/12 rounded-full blur-3xl animate-aurora-slow" />
      <div
        className="absolute top-1/3 right-1/3 w-72 h-72 bg-cyan-400/12 dark:bg-cyan-500/12 rounded-full blur-3xl animate-aurora"
        style={{ animationDelay: "3s" }}
      />

      <ParticleBackground />
      <Sparkles count={24} className="z-[1]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="h-[72px] shrink-0" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">

          {/* LEFT — text */}
          <motion.div
            initial={false}
            animate={{
              opacity: textVisible ? 1 : 0,
              x: textVisible ? 0 : -30,
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="order-2 lg:order-1 text-center lg:text-left"
            style={{ pointerEvents: textVisible ? "auto" : "none" }}
          >
            {/* Badges */}
            <motion.div
              {...rise(20, 0.1)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4 mt-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Open to new opportunities
              </span>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium backdrop-blur-sm">
                GSSoC Contributor
              </span>
            </motion.div>

            <motion.h1
              {...rise(30, 0.2, 0.7)}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-3"
            >
              Vedant <span className="gradient-text">Navthale</span>
            </motion.h1>

            <motion.h2
              {...rise(20, 0.35)}
              className="text-lg sm:text-xl lg:text-2xl font-semibold text-muted-foreground mb-4 h-8 lg:h-10"
            >
              <TypewriterText />
            </motion.h2>

            <motion.p
              {...rise(20, 0.5)}
              className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-6 leading-relaxed"
            >
              Transforming complex problems into scalable, elegant solutions.
              Building systems that perform at scale — from backend APIs to
              full-stack SaaS products.
            </motion.p>

            <motion.div
              {...rise(20, 0.65)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 animate-glow"
              >
                <Code2 size={16} />
                View Projects
              </a>
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/70 bg-background/60 backdrop-blur-sm text-foreground font-medium text-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Download size={16} />
                Download Resume
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              {...rise(0, 0.8)}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <a
                href={`mailto:${site.email}`}
                className="p-2.5 rounded-xl border border-border/50 bg-background/40 backdrop-blur-sm text-muted-foreground hover:text-red-500 hover:border-red-500/40 transition-all duration-200 hover:-translate-y-0.5"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-border/50 bg-background/40 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200 hover:-translate-y-0.5"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-border/50 bg-background/40 backdrop-blur-sm text-muted-foreground hover:text-[#0077b5] hover:border-[#0077b5]/40 transition-all duration-200 hover:-translate-y-0.5"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={site.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-border/50 bg-background/40 backdrop-blur-sm text-muted-foreground hover:text-[#ffa116] hover:border-[#ffa116]/40 transition-all duration-200 hover:-translate-y-0.5"
                aria-label="LeetCode"
              >
                <CodeXml size={18} />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              {...rise(20, 1.0)}
              className="grid grid-cols-3 gap-3 sm:gap-6 max-w-sm mx-auto lg:mx-0"
            >
              {[
                { value: ghRepos, suffix: "+", label: "Repositories" },
                { value: lcTotal, suffix: "+", label: "LeetCode Solved" },
                { value: InFollowers, suffix: "k", label: "LinkedIn Followers" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-xl font-bold gradient-text">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 whitespace-nowrap">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — avatar */}
          <div
            ref={avatarRef}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <motion.div
              initial={false}
              animate={{
                x: phase === "centered" ? offsetRef.current : 0,
                opacity: phase === "measuring" ? 0 : 1,
                scale: phase === "measuring" ? 0.7 : 1,
              }}
              transition={{
                x: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
                opacity: { duration: 0.4 },
                scale: { duration: 0.5, ease: "easeOut" },
              }}
            >
              <div className="animate-float">
                <HeroAvatar />
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator — absolute pinned to bottom center, always visible */}
      {textVisible && (
        <motion.a
          href="#about"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          aria-label="Scroll down"
        >
          <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
            <div className="w-7 h-11 rounded-full border-2 border-foreground/20 group-hover:border-primary/70 transition-colors duration-200 flex justify-center pt-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-foreground/40 group-hover:bg-primary transition-colors duration-200"
                animate={reduce ? undefined : { y: [0, 16, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <span className="text-xs text-foreground/40 group-hover:text-primary font-medium tracking-wide transition-colors duration-200">
              Scroll
            </span>
          </div>
        </motion.a>
      )}
    </section>
  );
}