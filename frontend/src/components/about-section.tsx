"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { useStats } from "@/hooks/use-stats";
import { Zap, Target, BookOpen, Rocket } from "lucide-react";

export function AboutSection() {
  const { ref, inView } = useInView(0.15);
  const { github, leetcode } = useStats();

  const lcTotal = leetcode.data?.total ?? 265;
  const ghRepos = github.data?.repos ?? 31;
  const lcRank  = leetcode.data?.rank  ?? 525037;

  const traits = [
    {
      icon: Zap,
      title: "Problem-First Thinking",
      desc: "I break down complex problems before writing a single line of code. Clean solutions start with clear thinking.",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      icon: Target,
      title: "Engineering Precision",
      desc: "From database schema design to API contracts — every detail is intentional, every abstraction earns its place.",
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      icon: BookOpen,
      title: "Continuous Growth",
      desc: `${lcTotal}+ LeetCode problems solved, ${ghRepos}+ GitHub repos shipped. Learning is not a phase — it's the habit.`,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Rocket,
      title: "Ownership Mindset",
      desc: "I ship features end-to-end. From ideation to deployment, I take full responsibility for what I build.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-sm font-mono font-medium mb-2 tracking-widest uppercase">
            01. About
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Behind the <span className="gradient-text">Code</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-violet-600 to-blue-500 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Story */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <p className="text-foreground/90 leading-relaxed text-[15px]">
                I&apos;m <strong className="text-foreground">Vedant Navthale</strong>, a
                software engineer based in{" "}
                <span className="text-primary">India</span>. I build systems
                that scale — full-stack products, backend APIs, and everything
                in between.
              </p>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                My journey started with curiosity about how things work under the
                hood. That curiosity turned into {ghRepos}+ shipped projects, {lcTotal}+
                algorithmic challenges solved, and a relentless drive to build
                software that actually <em>matters</em>.
              </p>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                I thrive at the intersection of product thinking and engineering
                rigor — designing systems that are not just functional, but
                maintainable, performant, and built to last.
              </p>
            </motion.div>

            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 p-5 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm space-y-3"
            >
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider mb-4">
                Quick Facts
              </h3>
              {[
                { label: "Location", value: "India" },
                { label: "Focus", value: "Full-Stack & Backend Engineering" },
                { label: "Status", value: "Open to Opportunities ✦" },
                { label: "GitHub", value: `@vednav9 · ${ghRepos}+ repos` },
                { label: "LeetCode", value: `@vednav9 · Rank #${lcRank.toLocaleString()}` },
              ].map((fact) => (
                <div key={fact.label} className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground w-20 shrink-0">{fact.label}</span>
                  <span className="text-border/60">—</span>
                  <span className="text-foreground/80">{fact.value}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Trait cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {traits.map((trait, i) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="group p-5 rounded-xl border border-border/50 bg-card/60 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default"
              >
                <div className={`w-9 h-9 rounded-lg ${trait.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <trait.icon size={18} className={trait.color} />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1.5">
                  {trait.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {trait.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
