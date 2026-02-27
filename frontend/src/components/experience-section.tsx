"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { MapPin, ExternalLink, Calendar } from "lucide-react";

export function ExperienceSection() {
  const { ref, inView } = useInView(0.1);

  const experiences = [
    {
      company: "Fyregig",
      role: "Software Engineer Intern",
      duration: "June 2025 — Present",
      location: "Remote",
      type: "Internship",
      url: "https://fyregig.com",
      description:
        "Building production full-stack features at Fyregig — a platform connecting freelancers and clients. Owning both backend services and frontend UI end-to-end in a fast-paced remote environment.",
      achievements: [
        "Built full-stack features by developing backend services with Node.js and Express.js and implementing React.js components to consume APIs and render dynamic application data",
        "Designed and integrated REST APIs with frontend views, implementing data flows, media handling with Cloudflare R2 and Stream, and state updates across the full stack",
        "Improved end-to-end reliability by handling frontend error states, validations, and backend error handling to ensure a stable user experience in production",
      ],
      tech: ["Node.js", "Express.js", "React.js", "REST APIs", "Cloudflare R2", "Cloudflare Stream", "JavaScript"],
      color: "from-emerald-500 to-cyan-500",
      dotColor: "bg-emerald-500",
    },
    {
      company: "Nibodh Technologies",
      role: "Software Engineering Intern",
      duration: "2022",
      location: "India",
      type: "Internship",
      url: "https://github.com/vednav9",
      description:
        "Completed a software engineering internship building multiple real-world projects across web development, backend APIs, and full-stack applications.",
      achievements: [
        "Built 8+ production-ready projects covering Node.js, HTML/CSS, REST APIs, and full-stack development",
        "Implemented URL encode/decode service, portfolio site, and interactive web components from scratch",
        "Gained hands-on experience in project lifecycle — from architecture to deployment",
        "Applied clean code principles and separation of concerns across all delivered projects",
      ],
      tech: ["Node.js", "JavaScript", "HTML", "CSS", "REST APIs", "Git"],
      color: "from-violet-600 to-blue-500",
      dotColor: "bg-violet-500",
    },
  ];

  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-sm font-mono font-medium mb-2 tracking-widest uppercase">
            02. Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-600/50 via-blue-500/30 to-transparent hidden sm:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative sm:pl-20"
              >
                {/* Timeline dot */}
                <div className={`absolute left-4 md:left-5 top-6 w-4 h-4 rounded-full ${exp.dotColor} ring-4 ring-background hidden sm:block`} />

                <div className="group p-6 sm:p-8 rounded-2xl border border-border/50 bg-card/60 hover:border-primary/20 hover:bg-primary/[0.02] transition-all duration-300">
                  {/* Header row */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r ${exp.color} text-white`}>
                          {exp.type}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar size={11} />
                          {exp.duration}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin size={11} />
                          {exp.location}
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">
                        {exp.role}
                      </h3>
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1 mt-0.5"
                      >
                        {exp.company}
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <ul className="space-y-2 mb-6">
                    {exp.achievements.map((ach, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                        <span className="text-foreground/75">{ach}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg bg-secondary text-secondary-foreground border border-border/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a
            href="https://linkedin.com/in/vedantnavthale"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View full profile on LinkedIn
            <ExternalLink size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
