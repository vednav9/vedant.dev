"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { useStats } from "@/hooks/use-stats";
import {
  Github, ExternalLink, Star, ArrowUpRight,
  Brain, MapPin, Sparkles, Globe, Smartphone, MessageCircle,
  type LucideIcon,
} from "lucide-react";

type Project = {
  name: string;
  description: string;
  tech: string[];
  github: string;
  live: string | null;
  stars: number;
  badge: string;
  icon: LucideIcon;
  gradFrom: string;
  gradTo: string;
  glowColor: string;
  badgeColor: string;
  techColor: string;
};

const projects: Project[] = [
  {
    name: "Cortexa",
    description:
      "Full-stack AI knowledge platform with RAG-powered document chat, automatic MCQ generation, and semantic search. Built with LangChain, FastAPI, Node.js, and Cloudflare R2.",
    tech: ["React.js", "Node.js", "FastAPI", "LangChain", "MongoDB"],
    github: "https://github.com/vednav9/cortexa",
    live: "https://cortexa-beta.vercel.app",
    stars: 0,
    badge: "Featured",
    icon: Brain,
    gradFrom: "#7c3aed",
    gradTo: "#4f46e5",
    glowColor: "rgba(124,58,237,0.45)",
    badgeColor: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    techColor: "bg-violet-500/10 text-violet-300 border-violet-500/25",
  },
  {
    name: "GeoAttend",
    description:
      "GPS-based attendance management system with real-time geolocation tracking, admin controls, and a student mobile sub-app for seamless check-ins.",
    tech: ["Node.js", "React.js", "JavaScript", "MongoDB", "GPS"],
    github: "https://github.com/vednav9/GeoAttend",
    live: null,
    stars: 0,
    badge: "Full-Stack",
    icon: MapPin,
    gradFrom: "#059669",
    gradTo: "#0d9488",
    glowColor: "rgba(5,150,105,0.45)",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    techColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
  },
  {
    name: "Intellio",
    description:
      "Intelligent full-stack web application with AI-powered features, Google OAuth authentication, and a clean React + Node.js architecture. Live on Vercel.",
    tech: ["React.js", "Node.js", "JavaScript", "Google OAuth"],
    github: "https://github.com/vednav9/Intellio",
    live: "https://intellio-project.vercel.app",
    stars: 0,
    badge: "AI",
    icon: Sparkles,
    gradFrom: "#2563eb",
    gradTo: "#0891b2",
    glowColor: "rgba(37,99,235,0.45)",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    techColor: "bg-blue-500/10 text-blue-300 border-blue-500/25",
  },
  {
    name: "FindEasy",
    description:
      "Cross-platform Flutter app connecting customers with local service providers. Features Google Maps integration, Firebase auth, and real-time booking management.",
    tech: ["Flutter", "Dart", "Firebase", "Google Maps"],
    github: "https://github.com/vednav9/FindEasy",
    live: null,
    stars: 1,
    badge: "Mobile",
    icon: Smartphone,
    gradFrom: "#d97706",
    gradTo: "#ea580c",
    glowColor: "rgba(217,119,6,0.45)",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    techColor: "bg-amber-500/10 text-amber-300 border-amber-500/25",
  },
  {
    name: "Portfolio (This Site)",
    description:
      "Personal portfolio built with Next.js 15, Framer Motion, and Tailwind CSS v4. Dark-first design with live GitHub & LeetCode stats from a custom Node.js backend.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/vednav9/vedant.dev",
    live: null,
    stars: 0,
    badge: "Portfolio",
    icon: Globe,
    gradFrom: "#0891b2",
    gradTo: "#2563eb",
    glowColor: "rgba(8,145,178,0.45)",
    badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    techColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/25",
  },
  {
    name: "Chattr",
    description:
      "Real-time chat application with a full-stack JavaScript architecture, WebSocket-based instant messaging, user rooms, and a clean modern UI.",
    tech: ["Node.js", "React.js", "WebSockets", "JavaScript"],
    github: "https://github.com/vednav9/Chattr",
    live: null,
    stars: 0,
    badge: "Chat",
    icon: MessageCircle,
    gradFrom: "#db2777",
    gradTo: "#e11d48",
    glowColor: "rgba(219,39,119,0.45)",
    badgeColor: "bg-pink-500/15 text-pink-300 border-pink-500/30",
    techColor: "bg-pink-500/10 text-pink-300 border-pink-500/25",
  },
];

function ProjectCard({ project, i, inView }: { project: Project; i: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.05 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl cursor-default"
      style={{ transform: hovered ? "translateY(-4px)" : "translateY(0)", transition: "transform 0.3s ease" }}
    >
      {/* Gradient border layer */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-400"
        style={{
          background: `linear-gradient(135deg, ${project.gradFrom}, ${project.gradTo})`,
          opacity: hovered ? 0.7 : 0.25,
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Card body */}
      <div className="relative rounded-2xl bg-[#080c14] border border-transparent flex flex-col h-full p-6 overflow-hidden">

        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(350px circle at ${mouse.x}px ${mouse.y}px, ${project.glowColor.replace("0.45", "0.12")}, transparent 70%)`,
          }}
        />

        {/* Top gradient band */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.gradFrom}80, transparent)`,
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.3s",
          }}
        />

        {/* Background watermark number */}
        <span
          className="absolute -top-3 right-3 text-[80px] font-black select-none pointer-events-none leading-none"
          style={{ color: project.gradFrom, opacity: hovered ? 0.1 : 0.05, transition: "opacity 0.3s" }}
        >
          {String(i + 1).padStart(2, "0")}
        </span>

        {/* Icon + badge */}
        <div className="flex items-start justify-between mb-5 relative z-10">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              background: `${project.gradFrom}1a`,
              boxShadow: hovered ? `0 0 24px -4px ${project.glowColor}` : "none",
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          >
            <project.icon size={22} style={{ color: project.gradFrom }} />
          </div>

          <div className="flex flex-col items-end gap-1.5 mt-0.5">
            <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${project.badgeColor}`}>
              {project.badge}
            </span>
            {project.live && (
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-base font-bold mb-2 relative z-10 transition-colors duration-200"
          style={{ color: hovered ? "#fff" : "hsl(var(--foreground))" }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-4 relative z-10">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
          {project.tech.map((t) => (
            <span
              key={t}
              className={`px-2 py-0.5 text-[11px] font-mono rounded-md border transition-colors duration-200 ${project.techColor}`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/5 relative z-10">
          {project.stars > 0 && (
            <span className="flex items-center gap-1 text-xs text-amber-400 mr-1">
              <Star size={11} fill="currentColor" />
              {project.stars}
            </span>
          )}

          <div className="ml-auto flex items-center gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all border border-white/8"
            >
              <Github size={12} />
              Code
            </a>
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 hover:brightness-110"
                style={{
                  background: `${project.gradFrom}22`,
                  borderColor: `${project.gradFrom}55`,
                  color: project.gradFrom,
                }}
              >
                <ArrowUpRight size={12} />
                Demo
              </a>
            ) : (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 hover:brightness-110"
                style={{
                  background: `${project.gradFrom}18`,
                  borderColor: `${project.gradFrom}40`,
                  color: project.gradFrom,
                }}
              >
                <ExternalLink size={12} />
                View
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const { ref, inView } = useInView(0.1);
  const { github } = useStats();
  const ghRepos = github.data?.repos ?? 31;

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-sm font-mono font-medium mb-2 tracking-widest uppercase">
            03. Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Things I&apos;ve{" "}
            <span className="gradient-text">Built</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
          <p className="text-muted-foreground text-sm mt-4 max-w-lg">
            {ghRepos}+ repositories on GitHub. Here are some highlights — from production apps to open-source tools.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} i={i} inView={inView} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="text-center"
        >
          <a
            href="https://github.com/vednav9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-border/60 bg-card/60 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
          >
            <Github size={16} />
            View all {ghRepos}+ repositories on GitHub
            <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
