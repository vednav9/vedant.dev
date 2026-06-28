"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Send } from "lucide-react";
import { site } from "@/data/site";

export function CtaSection() {
  const { ref, inView } = useInView(0.2);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500" />
      <div className="absolute inset-0 bg-black/30" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl animate-aurora" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-aurora-slow" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Let&apos;s build something impactful together.
        </motion.h2>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
        >
          I&apos;m currently open to Software Engineering opportunities, collaborations, and challenging problems worth solving.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#resume"
            className="inline-flex items-center px-7 py-3.5 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
          >
            MY RESUME
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-white/60 text-white font-semibold text-sm hover:bg-white/10 hover:border-white transition-all duration-200 hover:-translate-y-0.5"
          >
            <Send size={16} />
            HIRE ME
          </a>
        </motion.div>
      </div>
    </section>
  );
}
