"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { useStats } from "@/hooks/use-stats";
import { Github, ExternalLink, Star, Code, Brain, MapPin, Sparkles, Globe, Smartphone, MessageCircle, type LucideIcon } from "lucide-react";

const projects: {
  name: string; description: string; tech: string[]; github: string;
  live: string | null; stars: number; featured: boolean; color: string;
  accent: string; badge: string; badgeColor: string;
  icon: LucideIcon; iconColor: string; iconBg: string;
}[] = [
  {
    name: "Cortexa",
    description:
      "Full-stack AI knowledge platform with RAG-powered document chat, automatic MCQ generation, and semantic search. Built with LangChain, FastAPI, Node.js, and Cloudflare R2.",
    tech: ["React.js", "Node.js", "FastAPI", "LangChain", "MongoDB", "Cloudflare R2"],
    github: "https://github.com/vednav9/cortexa",
    live: "https://cortexa-beta.vercel.app",
    stars: 0,
    featured: true,
    color: "from-violet-600/20 to-purple-600/10",
    accent: "border-violet-500/30",
    badge: "Featured",
    badgeColor: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    icon: Brain,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/15",
  },
  {
    name: "GeoAttend",
    description:
      "GPS-based attendance management system with real-time geolocation tracking, admin controls, and a student mobile sub-app for seamless check-ins.",
    tech: ["Node.js", "React.js", "JavaScript", "MongoDB", "GPS"],
    github: "https://github.com/vednav9/GeoAttend",
    live: null,
    stars: 0,
    featured: true,
    color: "from-emerald-600/20 to-teal-600/10",
    accent: "border-emerald-500/30",
    badge: "Full-Stack",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    icon: MapPin,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/15",
  },
  {
    name: "Intellio",
    description:
      "Intelligent full-stack web application with AI-powered features, Google OAuth authentication, and a clean React + Node.js architecture. Live on Vercel.",
    tech: ["React.js", "Node.js", "JavaScript", "Google OAuth"],
    github: "https://github.com/vednav9/Intellio",
    live: "https://intellio-project.vercel.app",
    stars: 0,
    featured: true,
    color: "from-blue-600/20 to-cyan-600/10",
    accent: "border-blue-500/30",
    badge: "AI",
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    icon: Sparkles,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/15",
  },
  {
    name: "FindEasy",
    description:
      "Cross-platform Flutter app connecting customers with local service providers. Features Google Maps integration, Firebase auth, real-time booking management.",
    tech: ["Flutter", "Dart", "Firebase", "Google Maps"],
    github: "https://github.com/vednav9/FindEasy",
    live: null,
    stars: 1,
    featured: false,
    color: "from-amber-600/20 to-orange-600/10",
    accent: "border-amber-500/30",
    badge: "Mobile",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    icon: Smartphone,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/15",
  },
  {
    name: "Portfolio (This Site)",
    description:
      "Personal portfolio built with Next.js 15, Framer Motion, and Tailwind CSS v4. Dark-first design with live GitHub & LeetCode stats fetched from a custom Node.js backend.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/vednav9/vedant.dev",
    live: null,
    stars: 0,
    featured: false,
    color: "from-cyan-600/20 to-blue-600/10",
    accent: "border-cyan-500/30",
    badge: "Portfolio",
    badgeColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    icon: Globe,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/15",
  },
  {
    name: "Chattr",
    description:
      "Real-time chat application with a full-stack JavaScript architecture, WebSocket-based instant messaging, user rooms, and a clean modern UI.",
    tech: ["Node.js", "React.js", "WebSockets", "JavaScript"],
    github: "https://github.com/vednav9/Chattr",
    live: null,
    stars: 0,
    featured: false,
    color: "from-pink-600/20 to-rose-600/10",
    accent: "border-pink-500/30",
    badge: "Chat",
    badgeColor: "bg-pink-500/15 text-pink-400 border-pink-500/30",
    icon: MessageCircle,
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/15",
  },
];

export function ProjectsSection() {
  const { ref, inView } = useInView(0.1);
  const { github } = useStats();
  const ghRepos = github.data?.repos ?? 31;

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl" />

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

        {/* Featured projects (larger cards) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.08 }}
              className={`group relative flex flex-col p-6 rounded-2xl border bg-gradient-to-br ${project.color} ${project.accent} hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${project.iconBg} flex items-center justify-center`}>
                    <project.icon size={16} className={project.iconColor} />
                  </div>
                  <span className={`px-2 py-0.5 text-[11px] font-medium rounded-full border ${project.badgeColor}`}>
                    {project.badge}
                  </span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-background/60 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Live demo"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-background/60 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={14} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <h3 className="font-bold text-base text-foreground mb-2">{project.name}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-4">
                {project.description}
              </p>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[11px] font-mono rounded bg-background/60 text-muted-foreground border border-border/40"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 pt-3 border-t border-border/30">
                {project.stars > 0 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star size={11} className="text-amber-400" />
                    {project.stars}
                  </div>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors ml-auto"
                >
                  <Code size={11} />
                  View Source
                </a>
                {project.live && (
                  <>
                    <span className="text-border">·</span>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={11} />
                      Live Demo
                    </a>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="https://github.com/vednav9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/60 bg-card/60 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
          >
            <Github size={16} />
            View all {ghRepos}+ repositories on GitHub
            <ExternalLink size={13} className="opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
