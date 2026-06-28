"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { useStats } from "@/hooks/use-stats";
import { CountUp } from "@/components/effects/count-up";
import { Sparkles } from "@/components/effects/sparkles";
import {
  Zap, Target, BookOpen, Rocket,
  MapPin, GraduationCap, Briefcase, Github,
  Code2, Trophy, Linkedin,
} from "lucide-react";

export function AboutSection() {
  const { ref, inView } = useInView(0.1);
  const reduce = useReducedMotion();
  const { github, leetcode } = useStats();

  const lcTotal = leetcode.data?.total ?? 447;
  const ghRepos = github.data?.repos ?? 40;
  const lcRank  = leetcode.data?.rank ?? 246416;

  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.6, delay },
        };

  const traits = [
    {
      icon: Zap,
      title: "Problem-First Thinking",
      desc: "I break down complex problems before writing a single line of code. Clean solutions start with clear thinking.",
      accent: "#f59e0b",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Target,
      title: "Engineering Precision",
      desc: "From database schema design to API contracts — every detail is intentional, every abstraction earns its place.",
      accent: "#7c3aed",
      gradient: "from-violet-500 to-indigo-500",
    },
    {
      icon: BookOpen,
      title: "Continuous Growth",
      desc: `${lcTotal}+ LeetCode problems solved, ${ghRepos}+ GitHub repos shipped. Learning is not a phase — it's the habit.`,
      accent: "#3b82f6",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Rocket,
      title: "Ownership Mindset",
      desc: "I ship features end-to-end. From ideation to deployment, I take full responsibility for what I build.",
      accent: "#10b981",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const quickFacts = [
    { icon: MapPin,        label: "Location",  value: "Thane, India" },
    { icon: GraduationCap, label: "Education",  value: "B.E. Computer Engineering · NHITM (2026)" },
    { icon: Briefcase,     label: "Focus",      value: "Full-Stack & Backend Engineering" },
    { icon: Github,        label: "GitHub",     value: `@vednav9 · ${ghRepos}+ repos` },
  ];

  const metrics = [
    { icon: Code2,    value: ghRepos, suffix: "+", label: "Repos",      color: "text-violet-500",  bg: "bg-violet-500/10" },
    { icon: Trophy,   value: lcTotal, suffix: "+", label: "LC Solved",  color: "text-blue-500",    bg: "bg-blue-500/10" },
    { icon: Target,   value: lcRank,  suffix: "",  label: "LC Rank",    color: "text-emerald-500", bg: "bg-emerald-500/10", prefix: "#" },
    { icon: Linkedin, value: 2.6,     suffix: "k", label: "LinkedIn",   color: "text-[#0077b5]",   bg: "bg-[#0077b5]/10" },
  ];

  return (
    <section id="about" className="py-16 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl" />
      <Sparkles count={12} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div {...rise(0)} className="mb-14">
          <p className="text-primary text-sm font-mono font-medium mb-2 tracking-widest uppercase">
            01. About
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Behind the <span className="gradient-text">Code</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-blue-500 rounded-full" />
        </motion.div>

        {/* ─── Row 1: Story + Quick Facts ─── */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Story — spans 3 cols */}
          <motion.div {...rise(0.1)} className="lg:col-span-3 space-y-5">
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
              <p className="text-foreground/90 leading-relaxed text-[15px]">
                I&apos;m <strong className="text-foreground">Vedant Navthale</strong>, a
                software engineer based in{" "}
                <span className="text-primary font-medium">India</span>. I build systems
                that scale — full-stack products, backend APIs, and everything
                in between.
              </p>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                My journey started with curiosity about how things work under the
                hood. That curiosity turned into{" "}
                <span className="text-foreground font-medium">{ghRepos}+ shipped projects</span>,{" "}
                <span className="text-foreground font-medium">{lcTotal}+ algorithmic challenges</span> solved,
                and a relentless drive to build software that actually <em>matters</em>.
              </p>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                I thrive at the intersection of product thinking and engineering
                rigor — designing systems that are not just functional, but
                maintainable, performant, and built to last.
              </p>
            </div>
          </motion.div>

          {/* Quick facts — spans 2 cols */}
          <motion.div {...rise(0.2)} className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6 h-full">
              <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-primary to-transparent" />
                Quick Facts
              </h3>
              <div className="space-y-4">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                      <fact.icon size={14} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] uppercase tracking-wider text-muted-foreground/70 block">{fact.label}</span>
                      <span className="text-sm text-foreground/85 break-words">{fact.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status badges */}
              <div className="mt-5 flex flex-wrap gap-2.5">
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Open to new opportunities
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5">
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                    GSSoC Contributor
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Row 2: Live metrics ─── */}
        <motion.div {...rise(0.25)} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="card-shine group relative rounded-2xl border border-border/60 bg-card/70 p-5 text-center hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <m.icon size={18} className={m.color} />
              </div>
              <div className="text-2xl font-bold text-foreground">
                <CountUp value={m.value} suffix={m.suffix} prefix={m.prefix} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ─── Row 3: Trait cards — gradient borders + shine ─── */}
        <motion.div {...rise(0.3)}>
          <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-6 h-px bg-gradient-to-r from-primary to-transparent" />
            What I Bring
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {traits.map((trait, i) => (
              <motion.div
                key={trait.title}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                className="card-shine group relative rounded-2xl border border-border/60 bg-card/70 p-5 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-4 right-4 h-[2px] rounded-b-full opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${trait.accent}, transparent)` }}
                />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${trait.accent}18`, border: `1px solid ${trait.accent}30` }}
                >
                  <trait.icon size={20} style={{ color: trait.accent }} />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-2">
                  {trait.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {trait.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
