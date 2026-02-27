"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Keyboard, Server, Layout, Database, Wrench, Lightbulb, type LucideIcon } from "lucide-react";

const skillGroups: { label: string; icon: LucideIcon; color: string; skills: { name: string; level: number }[] }[] = [
  {
    label: "Languages",
    icon: Keyboard,
    color: "text-amber-400",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Python", level: 80 },
      { name: "Dart", level: 75 },
      { name: "C++", level: 70 },
      { name: "HTML/CSS", level: 90 },
    ],
  },
  {
    label: "Backend",
    icon: Server,
    color: "text-violet-400",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 65 },
      { name: "JWT / Auth", level: 80 },
      { name: "WebSockets", level: 70 },
    ],
  },
  {
    label: "Frontend",
    icon: Layout,
    color: "text-blue-400",
    skills: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 82 },
      { name: "Flutter", level: 78 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Framer Motion", level: 75 },
      { name: "Responsive Design", level: 90 },
    ],
  },
  {
    label: "Databases",
    icon: Database,
    color: "text-emerald-400",
    skills: [
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL", level: 78 },
      { name: "MySQL", level: 75 },
      { name: "Redis", level: 65 },
      { name: "Prisma ORM", level: 72 },
      { name: "Firebase", level: 70 },
    ],
  },
  {
    label: "DevOps & Tools",
    icon: Wrench,
    color: "text-cyan-400",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 70 },
      { name: "Vercel / Netlify", level: 85 },
      { name: "Linux / Bash", level: 72 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 88 },
    ],
  },
  {
    label: "Concepts",
    icon: Lightbulb,
    color: "text-pink-400",
    skills: [
      { name: "DSA", level: 85 },
      { name: "System Design", level: 72 },
      { name: "Clean Architecture", level: 78 },
      { name: "OOP", level: 85 },
      { name: "Microservices", level: 65 },
      { name: "Agile / Scrum", level: 75 },
    ],
  },
];

function SkillBar({ name, level, inView, delay }: { name: string; level: number; inView: boolean; delay: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground/80">{name}</span>
        <span className="text-xs font-mono text-muted-foreground">{level}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-sm font-mono font-medium mb-2 tracking-widest uppercase">
            04. Skills
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-violet-600 to-pink-500 rounded-full" />
          <p className="text-muted-foreground text-sm mt-4">
            Proficiency across the full stack — from algorithms to cloud deployments.
          </p>
        </motion.div>

        {/* Skill groups grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
              className="p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <group.icon size={18} className={group.color} />
                <h3 className="font-semibold text-foreground text-sm">{group.label}</h3>
              </div>
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    inView={inView}
                    delay={gi * 0.08 + si * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech tag cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl border border-border/40 bg-card/30"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Also familiar with</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Zustand", "React Query", "Socket.io", "Multer", "Cloudinary",
              "Mongoose", "Sequelize", "Jest", "Mocha", "ESLint", "Prettier",
              "GitHub Actions", "Nginx", "PM2", "dotenv", "Zod", "Joi",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono rounded-lg bg-secondary/70 text-muted-foreground border border-border/40 hover:border-primary/30 hover:text-foreground transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
