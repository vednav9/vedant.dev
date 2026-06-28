"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import {
  Trophy,
  Medal,
  Star,
  Award as AwardIconLucide,
  Rocket,
  ExternalLink,
  Maximize2,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { awards, type Award, type AwardIcon } from "@/data/awards";
import { Sparkles } from "@/components/effects/sparkles";

const ICONS: Record<AwardIcon, LucideIcon> = {
  trophy: Trophy,
  medal: Medal,
  star: Star,
  award: AwardIconLucide,
  rocket: Rocket,
};

function AwardCard({ award, onOpen }: { award: Award; onOpen: () => void }) {
  const [failed, setFailed] = useState(false);
  const Icon = ICONS[award.icon] ?? Trophy;
  const showImg = !!award.image && !failed;

  return (
    <div
      className="card-shine group relative shrink-0 w-[320px] sm:w-[360px] rounded-2xl border border-border/60 bg-card/80 overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300"
      style={{
        boxShadow: `0 4px 20px -6px ${award.accent}20`,
      }}
      onClick={showImg ? onOpen : undefined}
    >
      {/* Top accent bar */}
      <div
        className="h-[3px] w-full"
        style={{ background: `linear-gradient(90deg, ${award.accent}, ${award.accent}88, transparent 80%)` }}
      />

      {/* Image — full display, no crop */}
      {showImg ? (
        <div className="relative bg-secondary/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={award.image}
            alt={award.title}
            loading="lazy"
            onError={() => setFailed(true)}
            className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-slate-900 text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
            <Maximize2 size={12} />
            View photo
          </span>
        </div>
      ) : (
        <div
          className="w-full aspect-video flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${award.accent}15, ${award.accent}08)` }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: `${award.accent}18`, border: `1px solid ${award.accent}25` }}
          >
            <Icon size={28} style={{ color: award.accent }} />
          </div>
        </div>
      )}

      {/* Footer meta */}
      <div className="p-4 flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${award.accent}15`, border: `1px solid ${award.accent}25` }}
        >
          <Icon size={14} style={{ color: award.accent }} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-foreground leading-snug truncate">
            {award.title}
          </h3>
          <span className="text-[11px] text-muted-foreground">
            {award.issuer} · {award.date}
          </span>
        </div>
        {award.link && (
          <a
            href={award.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-primary transition-colors"
            aria-label="View details"
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

export function AwardsSection() {
  const { ref, inView } = useInView(0.1);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Award | null>(null);

  // Duplicate array for seamless infinite scroll
  const doubled = [...awards, ...awards];

  return (
    <section id="awards" className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <Sparkles count={12} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-primary text-sm font-mono font-medium mb-2 tracking-widest uppercase">
            06. Awards
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Awards &amp; <span className="gradient-text-warm">Recognition</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-violet-500 rounded-full" />
        </motion.div>
      </div>

      {/* Infinite carousel — full width, edge-masked */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="marquee-mask overflow-hidden"
      >
        <div className="flex gap-5 w-max animate-marquee hover:[animation-play-state:paused] py-2 px-4">
          {doubled.map((award, i) => (
            <AwardCard
              key={`${award.title}-${i}`}
              award={award}
              onOpen={() => setActive(award)}
            />
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent
          showCloseButton
          className="max-w-4xl w-[calc(100%-1.5rem)] p-0 overflow-hidden gap-0 [&_[data-slot=dialog-close]]:text-red-500 [&_[data-slot=dialog-close]]:hover:text-red-600 [&_[data-slot=dialog-close]]:opacity-100"
        >
          {active && (
            <>
              <DialogTitle className="sr-only">{active.title}</DialogTitle>
              <DialogDescription className="sr-only">
                {active.title} — {active.issuer}, {active.date}
              </DialogDescription>
              <div className="bg-secondary/40 max-h-[80vh] overflow-auto flex items-center justify-center p-2 sm:p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.image}
                  alt={`${active.title} — photo`}
                  className="w-full h-auto rounded-md"
                />
              </div>
              <div className="border-t border-border/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {active.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {active.issuer} · {active.date}
                  </p>
                </div>
                {active.link && (
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    View details
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
