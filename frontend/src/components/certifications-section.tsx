"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import {
  BadgeCheck,
  Maximize2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Sparkles } from "@/components/effects/sparkles";
import {
  certifications,
  type Certification,
} from "@/data/certifications";

/** Certificate thumbnail with a branded fallback if the image is missing/broken. */
function CertThumb({ cert }: { cert: Certification }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-5"
        style={{
          background: `linear-gradient(135deg, ${cert.accent}1f, ${cert.accent}08)`,
        }}
      >
        <BadgeCheck size={30} style={{ color: cert.accent }} className="mb-2" />
        <span className="text-sm font-semibold text-foreground leading-snug">
          {cert.title}
        </span>
        <span className="text-xs text-muted-foreground mt-1">{cert.issuer}</span>
      </div>
    );
  }

  return (
    <img
      src={cert.image}
      alt={`${cert.title} certificate`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
  );
}

export function CertificationsSection() {
  const { ref, inView } = useInView(0.1);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-16 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <Sparkles count={14} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-primary text-sm font-mono font-medium mb-2 tracking-widest uppercase">
            05. Certifications
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Verified <span className="gradient-text">Credentials</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-violet-600 to-blue-500 rounded-full" />
          <p className="text-muted-foreground text-sm mt-4 max-w-lg">
            Industry-recognized certifications — click any card to view the full
            certificate and verify it.
          </p>
        </motion.div>

        {/* Card grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <motion.button
              key={cert.title}
              type="button"
              onClick={() => setActive(cert)}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: reduce ? 0 : 0.05 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="card-shine group text-left cursor-pointer rounded-2xl border border-border/60 bg-card/70 overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
              aria-label={`View ${cert.title} certificate`}
            >
              {/* Preview */}
              <div className="relative aspect-[10/7] overflow-hidden bg-secondary/40 border-b border-border/50">
                <CertThumb cert={cert} />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-slate-900 text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow">
                  <Maximize2 size={12} />
                  View certificate
                </span>
              </div>

              {/* Meta */}
              <div className="p-4">
                <div className="flex items-start gap-2">
                  <BadgeCheck
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: cert.accent }}
                  />
                  <h3 className="text-sm font-semibold text-foreground leading-snug">
                    {cert.title}
                  </h3>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="truncate">{cert.issuer}</span>
                  <span className="shrink-0 font-mono ml-2">{cert.date}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Fullscreen lightbox */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent
          showCloseButton
          className="max-w-5xl w-[calc(100%-1.5rem)] p-0 overflow-hidden gap-0 [&_[data-slot=dialog-close]]:text-red-500 [&_[data-slot=dialog-close]]:hover:text-red-600 [&_[data-slot=dialog-close]]:opacity-100"
        >
          {active && (
            <>
              <DialogTitle className="sr-only">{active.title}</DialogTitle>
              <DialogDescription className="sr-only">
                {active.title} issued by {active.issuer} in {active.date}
              </DialogDescription>

              {/* Certificate image */}
              <div className="bg-secondary/40 max-h-[70vh] overflow-auto flex items-center justify-center p-2 sm:p-4">
                <img
                  src={active.image}
                  alt={`${active.title} certificate, issued by ${active.issuer}`}
                  className="w-full h-auto rounded-md"
                />
              </div>

              {/* Footer meta + actions */}
              <div className="border-t border-border/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <BadgeCheck size={16} style={{ color: active.accent }} />
                    <span className="truncate">{active.title}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {active.issuer} · {active.date}
                    {active.credentialId && (
                      <>
                        {" "}
                        · <span className="font-mono">{active.credentialId}</span>
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {active.verifyUrl && (
                    <a
                      href={active.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-200"
                    >
                      <ShieldCheck size={14} />
                      Verify credential
                      <ExternalLink size={12} className="opacity-70" />
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
