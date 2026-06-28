"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Sparkles } from "@/components/effects/sparkles";
import {
  MapPin, ExternalLink, Calendar, Briefcase,
  TrendingUp, ArrowUpRight, Linkedin, ChevronRight,
} from "lucide-react";
import { site } from "@/data/site";

const experiences = [
  {
    company: "Fyregig",
    role: "Software Engineer Intern",
    duration: "June 2025 — Feb 2026",
    durationShort: "9 mos",
    location: "Remote",
    type: "Internship",
    url: "https://fyregig.com",
    logo: "F",
    description:
      "Building production full-stack features at Fyregig — a platform connecting freelancers and clients. Owning both backend services and frontend UI end-to-end.",
    achievements: [
      "Architected end-to-end backend microservices with Node.js & Express.js, plus React.js frontend workflows — improving API response time by **30%**",
      "Designed backend data & media pipeline using Cloudflare R2/Stream and automated CI/CD — reducing deployment time by **40%**",
      "Implemented structured error handling, logging, and input validation for production observability",
    ],
    impact: [
      { value: "60+", label: "Rest APIs" },
      { value: "3", label: "Projects" },
    ],
    tech: ["Node.js", "Express.js", "React.js", "REST APIs", "Cloudflare R2", "CI/CD"],
    accent: "#3b82f6",
    accentLight: "#dbeafe",
  },
  {
    company: "Nibodh Technologies",
    role: "Software Engineering Intern",
    duration: "Jul 2022 — Aug 2022",
    durationShort: "2 mos",
    location: "India",
    type: "Internship",
    url: "https://www.linkedin.com/company/nibodh",
    logo: "N",
    description:
      "Completed a software engineering internship building multiple real-world projects across web development, backend APIs, and full-stack applications.",
    achievements: [
      "Built **8** production-ready projects covering Node.js, REST APIs, and full-stack development",
      "Implemented URL encode/decode service, portfolio site, and interactive web components from scratch",
      "Applied clean code principles and separation of concerns across all delivered projects",
    ],
    impact: [
      { value: "8", label: "Projects Shipped" },
    ],
    tech: ["Node.js", "JavaScript", "HTML/CSS", "REST APIs", "Git"],
    accent: "#7c3aed",
    accentLight: "#ede9fe",
  },
];

function HighlightText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <span key={i} className="text-foreground font-semibold">
            {part.slice(2, -2)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function ExperienceCard({
  exp,
  index,
  inView,
  reduce,
}: {
  exp: (typeof experiences)[0];
  index: number;
  inView: boolean;
  reduce: boolean | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current || reduce) return;
    const r = cardRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative sm:pl-20"
    >
      {/* Timeline dot */}
      <div className="absolute left-3 sm:left-[22px] top-10 hidden sm:flex items-center justify-center z-10">
        <span
          className="absolute w-5 h-5 rounded-full opacity-25 animate-ping"
          style={{ backgroundColor: exp.accent, animationDuration: "2.5s" }}
        />
        <span
          className="relative w-3.5 h-3.5 rounded-full ring-[3px] ring-background shadow-lg"
          style={{ backgroundColor: exp.accent }}
        />
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="card-shine group relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-all duration-500"
        style={{
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 20px 40px -12px ${exp.accent}20, 0 0 0 1px ${exp.accent}15`
            : "0 1px 3px rgba(0,0,0,0.04)",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease",
        }}
      >
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, ${exp.accent}12, transparent 60%)`,
          }}
        />

        {/* Top accent gradient */}
        <div
          className="h-1 w-full opacity-80 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(90deg, ${exp.accent}, ${exp.accent}88, transparent 80%)` }}
        />

        <div className="p-6 sm:p-7 relative z-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            {/* Logo */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-base font-bold text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              style={{
                background: `linear-gradient(135deg, ${exp.accent}, ${exp.accent}bb)`,
                boxShadow: hovered ? `0 8px 24px -4px ${exp.accent}50` : undefined,
              }}
            >
              {exp.logo}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span
                  className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full text-white shadow-sm"
                  style={{ backgroundColor: exp.accent }}
                >
                  {exp.type}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar size={11} />
                  {exp.duration}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin size={11} />
                  {exp.location}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                {exp.role}
              </h3>

              <a
                href={exp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-1 text-sm font-medium hover:underline cursor-pointer"
                style={{ color: exp.accent }}
              >
                {exp.company}
                <ExternalLink size={12} className="opacity-70" />
              </a>
            </div>

            {/* Duration pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60 border border-border/50 text-xs text-muted-foreground shrink-0">
              <Briefcase size={11} />
              {exp.durationShort}
            </div>
          </div>

          {/* Description — glass panel */}
          <div className="glass-card rounded-xl p-4 mb-5">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {exp.description}
            </p>
          </div>

          {/* Impact metrics */}
          <div className="flex flex-wrap gap-3 mb-5">
            {exp.impact.map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border bg-secondary/30 group-hover:border-opacity-60 transition-colors duration-300"
                style={{ borderColor: `${exp.accent}35` }}
              >
                <TrendingUp size={14} style={{ color: exp.accent }} />
                <span className="text-base font-bold text-foreground">{m.value}</span>
                <span className="text-xs text-muted-foreground">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <ul className="space-y-2.5 mb-5">
            {exp.achievements.map((ach, j) => (
              <motion.li
                key={j}
                initial={reduce ? false : { opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.2 + j * 0.07 }}
                className="flex items-start gap-2.5 text-sm"
              >
                <ChevronRight
                  size={14}
                  className="mt-1 shrink-0"
                  style={{ color: exp.accent }}
                />
                <span className="text-foreground/80 leading-relaxed">
                  <HighlightText text={ach} />
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[11px] font-mono rounded-lg border cursor-default hover:brightness-110 transition-all duration-200"
                style={{
                  background: `${exp.accent}0c`,
                  borderColor: `${exp.accent}22`,
                  color: exp.accent,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  const { ref, inView } = useInView(0.1);
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl" />
      <Sparkles count={10} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-primary text-sm font-mono font-medium mb-2 tracking-widest uppercase">
            02. Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-[22px] sm:left-[30px] top-0 bottom-0 w-[2px] hidden sm:block overflow-hidden rounded-full">
            <motion.div
              initial={reduce ? false : { height: 0 }}
              animate={inView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              className="w-full bg-gradient-to-b from-blue-500 via-violet-500 to-cyan-400 opacity-60"
            />
          </div>

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <ExperienceCard
                key={exp.company}
                exp={exp}
                index={i}
                inView={inView}
                reduce={reduce}
              />
            ))}
          </div>
        </div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm text-sm font-medium text-foreground hover:border-[#0077b5]/50 hover:bg-[#0077b5]/5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            <Linkedin size={16} className="text-[#0077b5]" />
            View full profile on LinkedIn
            <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
