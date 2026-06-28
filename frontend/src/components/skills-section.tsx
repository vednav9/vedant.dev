"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "@/components/effects/sparkles";
import {
  Keyboard, Server, Layout, Database, Wrench, Lightbulb,
  type LucideIcon,
} from "lucide-react";

function useSectionInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

type SkillGroup = {
  label: string;
  icon: LucideIcon;
  accent: string;
  skills: string[];
};

const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    icon: Keyboard,
    accent: "#f59e0b",
    skills: ["JavaScript", "TypeScript", "SQL", "Python", "Java", "C++", "HTML/CSS"],
  },
  {
    label: "Backend",
    icon: Server,
    accent: "#6366f1",
    skills: ["Node.js", "Express.js", "Spring Boot", "REST APIs", "GraphQL", "JWT / Auth", "WebSockets"],
  },
  {
    label: "Frontend",
    icon: Layout,
    accent: "#3b82f6",
    skills: ["React", "Next.js", "Redux", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Databases & Cloud",
    icon: Database,
    accent: "#10b981",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase", "AWS (EC2, S3, Lambda)", "Cloudflare R2"],
  },
  {
    label: "DevOps & Tools",
    icon: Wrench,
    accent: "#0891b2",
    skills: ["Git / GitHub", "Docker", "Vercel", "Linux / Bash", "CI/CD", "Postman", "VS Code"],
  },
  {
    label: "CS Fundamentals",
    icon: Lightbulb,
    accent: "#ec4899",
    skills: ["DSA", "System Design", "OOP", "DBMS", "OS", "Computer Networks", "Microservices"],
  },
];

const alsoFamiliar = [
  "Zustand", "Redux", "Socket.io", "Multer", "Cloudinary",
  "Mongoose", "Sequelize", "Jest", "ESLint", "GitHub Actions",
  "Nginx", "PM2", "dotenv", "Zod", "Joi", "EC2", "S3", "Lambda",
];

function SkillCard({
  group,
  index,
  inView,
}: {
  group: SkillGroup;
  index: number;
  inView: boolean;
}) {
  const reduce = useReducedMotion();
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
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.08 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="card-shine group relative rounded-2xl border border-border/60 bg-card/80 overflow-hidden h-full cursor-default"
        style={{
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 16px 32px -8px ${group.accent}20, 0 0 0 1px ${group.accent}15`
            : "0 1px 3px rgba(0,0,0,0.04)",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease",
        }}
      >
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, ${group.accent}10, transparent 60%)`,
          }}
        />

        {/* Top accent bar */}
        <div
          className="h-[3px] w-full opacity-70 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(90deg, ${group.accent}, ${group.accent}88, transparent 80%)` }}
        />

        <div className="p-5 sm:p-6 relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
              style={{
                background: `${group.accent}15`,
                border: `1px solid ${group.accent}28`,
                boxShadow: hovered ? `0 4px 16px -4px ${group.accent}40` : "none",
              }}
            >
              <group.icon size={18} style={{ color: group.accent }} />
            </div>
            <h3 className="font-semibold text-foreground text-sm">{group.label}</h3>
          </div>

          {/* Skill pills */}
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill, si) => (
              <motion.span
                key={skill}
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.3,
                  delay: 0.1 + index * 0.08 + si * 0.04,
                }}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border cursor-default hover:brightness-110 transition-all duration-200"
                style={{
                  background: `${group.accent}08`,
                  borderColor: `${group.accent}22`,
                  color: group.accent,
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const { ref, inView } = useSectionInView(0.1);
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="py-16 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
      <Sparkles count={10} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-primary text-sm font-mono font-medium mb-2 tracking-widest uppercase">
            04. Skills
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-pink-500 rounded-full" />
          <p className="text-muted-foreground text-sm mt-4">
            Proficiency across the full stack — from algorithms to cloud deployments.
          </p>
        </motion.div>

        {/* Skill cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.label} group={group} index={i} inView={inView} />
          ))}
        </div>

        {/* Also familiar with — marquee */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 p-5 rounded-2xl border border-border/50 bg-card/40"
        >
          <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-gradient-to-r from-primary to-transparent" />
            Also Familiar With
          </h3>
          <div className="marquee-mask overflow-hidden">
            <div className="flex gap-2 w-max animate-marquee hover:[animation-play-state:paused]">
              {[...alsoFamiliar, ...alsoFamiliar].map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  className="shrink-0 px-3 py-1.5 text-xs font-mono rounded-lg bg-secondary/70 text-muted-foreground border border-border/40 hover:border-primary/30 hover:text-foreground transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
