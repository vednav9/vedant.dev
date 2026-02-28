"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { useStats } from "@/hooks/use-stats";
import { Github, ExternalLink, TrendingUp, Code2, Star, Cpu, RefreshCw } from "lucide-react";

function CircleProgress({
  value,
  max,
  color,
  size = 64,
}: {
  value: number;
  max: number;
  color: string;
  size?: number;
}) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = circ * (1 - pct);

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={4} className="text-border/40" />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />
    </svg>
  );
}

export function StatsSection() {
  const { ref, inView } = useInView(0.1);
  const { github, leetcode } = useStats();

  const gh = github.data!;
  const lc = leetcode.data!;
  const totalMax = 500;

  return (
      <section id="stats" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-sm font-mono font-medium mb-2 tracking-widest uppercase">
            05. Stats
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Coding <span className="gradient-text">Activity</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full" />
          {/* Stale indicator */}
          {(github.stale || leetcode.stale) && !github.loading && (
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground/70">
              <RefreshCw size={11} className="animate-spin" />
              Showing last known data — live refresh pending
            </p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* GitHub Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                  <Github size={20} className="text-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">GitHub</h3>
                  <p className="text-xs text-muted-foreground">@{gh.username}</p>
                </div>
              </div>
              <a
                href={gh.profile}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
              {[
                { label: "Repositories", value: gh.repos + "+", icon: Code2, color: "text-violet-400" },
                { label: "Followers", value: gh.followers, icon: TrendingUp, color: "text-blue-400" },
                { label: "Stars", value: gh.stars, icon: Star, color: "text-amber-400" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-2 sm:p-4 rounded-xl bg-secondary/50 border border-border/30">
                  <stat.icon size={14} className={`${stat.color} mx-auto mb-1.5`} />
                  <div className="text-base sm:text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* GitHub contribution graph embed */}
            <div className="rounded-xl overflow-hidden border border-border/30 bg-[#0d1117] p-3">
              <p className="text-xs text-muted-foreground mb-2 font-mono">Contribution Activity</p>
              <img
                src={`https://ghchart.rshah.org/7c3aed/${gh.username}`}
                alt="GitHub contribution graph"
                className="w-full rounded opacity-90"
                loading="lazy"
              />
            </div>

            {/* GitHub streak */}
            <div className="mt-4 rounded-xl overflow-hidden border border-border/30">
              <img
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${gh.username}&theme=dark&background=0d111700&border=30363d&stroke=30363d&ring=7c3aed&fire=3b82f6&currStreakLabel=7c3aed&hide_border=false`}
                alt="GitHub streak stats"
                className="w-full"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
          </motion.div>

          {/* LeetCode Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffa116]/15 flex items-center justify-center">
                  <Cpu size={20} className="text-[#ffa116]" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">LeetCode</h3>
                  <p className="text-xs text-muted-foreground">@{lc.username}</p>
                </div>
              </div>
              <a
                href={lc.profile}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Total solved + visual */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative shrink-0">
                {inView && (
                  <CircleProgress
                    value={lc.total}
                    max={totalMax}
                    color="#ffa116"
                    size={88}
                  />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-foreground">{lc.total}</span>
                  <span className="text-[10px] text-muted-foreground">solved</span>
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="text-xs text-muted-foreground">
                  Global Rank: <span className="text-foreground font-mono">#{lc.rank.toLocaleString()}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Acceptance Rate: <span className="text-foreground font-mono">~{Math.round((lc.total / (lc.total + 60)) * 100)}%</span>
                </div>
              </div>
            </div>

            {/* Difficulty breakdown */}
            <div className="space-y-4">
              <h4 className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Difficulty Breakdown</h4>

              {[
                { label: "Easy", count: lc.easy, max: 200, color: "#22c55e", bg: "bg-emerald-500/20", text: "text-emerald-400" },
                { label: "Medium", count: lc.medium, max: 300, color: "#f59e0b", bg: "bg-amber-500/20", text: "text-amber-400" },
                { label: "Hard", count: lc.hard, max: 100, color: "#ef4444", bg: "bg-red-500/20", text: "text-red-400" },
              ].map((d) => (
                <div key={d.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded ${d.bg} ${d.text}`}>
                        {d.label}
                      </span>
                    </div>
                    <span className="text-sm font-mono font-semibold text-foreground">
                      {d.count}
                      <span className="text-xs text-muted-foreground font-normal"> / {d.max}</span>
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: d.color }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(d.count / d.max) * 100}%` } : { width: 0 }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* LeetCode card embed */}
            <div className="mt-6 rounded-xl overflow-hidden border border-border/30">
              <img
                src={`https://leetcard.jacoblin.cool/${lc.username}?theme=dark&font=Geist+Mono&ext=heatmap`}
                alt="LeetCode stats card"
                className="w-full"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* GitHub stats cards row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8 grid sm:grid-cols-2 gap-4"
        >
          <div className="rounded-xl overflow-hidden border border-border/30">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${gh.username}&show_icons=true&theme=dark&bg_color=0d111700&title_color=7c3aed&icon_color=3b82f6&text_color=8b949e&border_color=30363d`}
              alt="GitHub stats"
              className="w-full"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
          <div className="rounded-xl overflow-hidden border border-border/30">
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${gh.username}&layout=compact&theme=dark&bg_color=0d111700&title_color=7c3aed&text_color=8b949e&border_color=30363d`}
              alt="Top languages"
              className="w-full"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
