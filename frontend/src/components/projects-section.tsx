"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { useStats } from "@/hooks/use-stats";
import { Sparkles as SparklesBg } from "@/components/effects/sparkles";
import {
  Github, ExternalLink, Star, ArrowUpRight,
  Brain, MapPin, Sparkles, Layers,
  type LucideIcon,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────── */

type Project = {
  name: string;
  description: string;
  tech: string[];
  github: string;
  live: string | null;
  stars: number;
  badge: string;
  icon: LucideIcon;
  accent: string;
  accentTo: string;
  preview?: string;
  featured?: boolean;
};

/* ─── Data ───────────────────────────────────────────────────────────── */

const projects: Project[] = [
  {
    name: "Cortexa",
    description:
      "SaaS document-intelligence platform with RAG-powered chat-based search and document analysis. 10+ REST APIs with JWT auth & RBAC for secure multi-user workflows (−25% query latency), backed by MongoDB + Cloudflare R2 across 100+ documents.",
    tech: ["React.js", "Node.js", "FastAPI", "MongoDB", "Cloudflare R2", "RAG"],
    github: "https://github.com/vednav9/cortexa",
    live: "https://cortexa-beta.vercel.app",
    preview: "/projects/cortexa.png",
    stars: 0,
    badge: "Featured",
    icon: Brain,
    accent: "#7c3aed",
    accentTo: "#4f46e5",
    featured: true,
  },
  {
    name: "OneStack",
    description:
      "SaaS platform aggregating 100+ engineering blogs via automated RSS ingestion & metadata indexing. Dynamic rendering with Redis caching cut fetch latency by 60%; PostgreSQL full-text search + Gemini-API summarization power discovery.",
    tech: ["Node.js", "Express.js", "PostgreSQL", "Redis", "React.js", "Gemini API"],
    github: "https://github.com/vednav9/OneStack",
    live: "https://onestack-project.vercel.app",
    preview: "/projects/onestack.png",
    stars: 0,
    badge: "Featured",
    icon: Layers,
    accent: "#4f46e5",
    accentTo: "#0ea5e9",
    featured: true,
  },
  {
    name: "ZONO",
    description:
      "QR-based attendance platform with real-time, geo-fenced check-ins — cutting manual/proxy errors by 60%. MongoDB + REST real-time data sync and a Flutter student sub-app.",
    tech: ["Node.js", "Express.js", "MongoDB", "React.js", "Flutter", "Geo-fencing"],
    github: "https://github.com/vednav9/ZONO",
    live: "https://zono-system.vercel.app/",
    preview: "/projects/zono.png",
    stars: 0,
    badge: "Full-Stack",
    icon: MapPin,
    accent: "#0891b2",
    accentTo: "#0d9488",
  },
  {
    name: "Intellio",
    description:
      "Intelligent full-stack web application with AI-powered features, Google OAuth authentication, and a clean React + Node.js architecture.",
    tech: ["React.js", "Node.js", "JavaScript", "Google OAuth"],
    github: "https://github.com/vednav9/Intellio",
    live: "https://intellio-project.vercel.app",
    preview: "/projects/intellio.png",
    stars: 0,
    badge: "AI",
    icon: Sparkles,
    accent: "#2563eb",
    accentTo: "#0891b2",
  },
];


/* ─── Shared card wrapper with spotlight + gradient border ───────────── */

function CardShell({
  project,
  children,
  className = "",
}: {
  project: Project;
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current || reduce) return;
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-2xl cursor-default h-full ${className}`}
      style={{
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease",
        boxShadow: hovered
          ? `0 24px 48px -12px ${project.accent}25, 0 0 0 1px ${project.accent}18`
          : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${project.accent}, ${project.accentTo})`,
          opacity: hovered ? 0.7 : 0.2,
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Card body */}
      <div className="card-shine relative rounded-2xl bg-white dark:bg-[#0a0e1a] border border-transparent h-full overflow-hidden">
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-500 z-[1]"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, ${project.accent}10, transparent 60%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
}

/* ─── Preview thumbnail ─────────────────────────────────────────────── */

function ProjectThumb({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const src = project.preview
    ? project.preview
    : project.live
    ? `https://image.thum.io/get/width/720/crop/450/noanimate/${project.live}`
    : null;
  const showImg = src && !failed;

  return (
    <div className="relative overflow-hidden bg-secondary/30 h-full">
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${project.name} preview`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center min-h-[180px]"
          style={{ background: `linear-gradient(135deg, ${project.accent}18, ${project.accentTo}18)` }}
        >
          <project.icon size={48} style={{ color: project.accent }} className="opacity-40" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      {project.live && (
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-emerald-300 border border-emerald-400/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      )}
    </div>
  );
}

/* ─── Project meta (shared between featured + compact) ───────────────── */

function ProjectMeta({ project }: { project: Project }) {
  return (
    <>
      {/* Icon + title + badge */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: `${project.accent}15` }}
          >
            <project.icon size={18} style={{ color: project.accent }} />
          </div>
          <h3 className="text-base font-bold text-foreground">{project.name}</h3>
        </div>
        <span
          className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full border shrink-0"
          style={{
            color: project.accent,
            borderColor: `${project.accent}30`,
            background: `${project.accent}10`,
          }}
        >
          {project.badge}
        </span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-xs leading-relaxed mb-3">
        {project.description}
      </p>

      {/* Tech */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 text-[10px] font-mono rounded-md border cursor-default"
            style={{
              background: `${project.accent}08`,
              borderColor: `${project.accent}20`,
              color: project.accent,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-2 pt-2.5 border-t border-border/50">
        {project.stars > 0 && (
          <span className="flex items-center gap-1 text-xs text-amber-500 mr-1">
            <Star size={11} fill="currentColor" />
            {project.stars}
          </span>
        )}
        <div className="ml-auto flex items-center gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all border border-border/50 cursor-pointer"
          >
            <Github size={12} />
            Code
          </a>
          <a
            href={project.live || project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer hover:brightness-110 transition-all"
            style={{
              background: `${project.accent}15`,
              borderColor: `${project.accent}35`,
              color: project.accent,
            }}
          >
            <ArrowUpRight size={12} />
            {project.live ? "Demo" : "View"}
          </a>
        </div>
      </div>
    </>
  );
}

/* ─── Project card: vertical layout (image top, text bottom) ─────────── */

function CompactCard({ project, index, inView }: {
  project: Project;
  index: number;
  inView: boolean;
}) {
  const reduce = useReducedMotion();
  const target = project.live || project.github;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <CardShell project={project}>
        <div className="flex flex-col h-full">
          {/* Image */}
          <a href={target} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name}`} className="relative block">
            <ProjectThumb project={project} />
          </a>

          {/* Content */}
          <div className="relative z-10 p-4 flex flex-col flex-1">
            <ProjectMeta project={project} />
          </div>
        </div>
      </CardShell>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */

export function ProjectsSection() {
  const { ref, inView } = useInView(0.1);
  const reduce = useReducedMotion();
  const { github } = useStats();
  const ghRepos = github.data?.repos ?? 40;

  return (
    <section id="projects" className="py-16 relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
      <SparklesBg count={12} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-primary text-sm font-mono font-medium mb-2 tracking-widest uppercase">
            03. Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Things I&apos;ve{" "}
            <span className="gradient-text">Built</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
          <p className="text-muted-foreground text-sm mt-4 max-w-lg">
            {ghRepos}+ repositories on GitHub. Here are some highlights — from production SaaS apps to open-source tools.
          </p>
        </motion.div>

        {/* 2x2 project grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {projects.map((project, i) => (
            <CompactCard key={project.name} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex justify-center"
        >
          <a
            href="https://github.com/vednav9"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm text-sm font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            <Github size={16} />
            View all {ghRepos}+ repositories on GitHub
            <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
