"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { FileText, Download, Maximize2, ExternalLink, FileDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { site } from "@/data/site";

const RAW_URL = site.resumeUrl ?? "/resume.pdf";

function isGoogleDrive(url: string) {
  return url.includes("drive.google.com");
}

function extractDriveId(url: string): string | null {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

// Google Drive URLs need different formats for embed vs download vs view
const driveId = isGoogleDrive(RAW_URL) ? extractDriveId(RAW_URL) : null;
const EMBED_URL = driveId
  ? `https://drive.google.com/file/d/${driveId}/preview`
  : `${RAW_URL}#toolbar=0&navpanes=0&view=FitH`;
const VIEW_URL = driveId
  ? `https://drive.google.com/file/d/${driveId}/view`
  : RAW_URL;
const DOWNLOAD_URL = driveId
  ? `https://drive.google.com/uc?export=download&id=${driveId}`
  : RAW_URL;

export function ResumeSection() {
  const { ref, inView } = useInView(0.1);
  const [open, setOpen] = useState(false);

  return (
    <section id="resume" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-primary text-sm font-mono font-medium mb-2 tracking-widest uppercase">
            08. Resume
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            One Page, <span className="gradient-text">Full Story</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left: copy + actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <FileText size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {site.name} — Resume
                </h3>
                <p className="text-xs text-muted-foreground">PDF · always up-to-date</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Prefer the classic one-pager? Preview it right here, open it
              fullscreen, or download a copy for your records. Always the latest
              version — no stale links.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={DOWNLOAD_URL}
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all duration-200 shadow-lg shadow-primary/20 hover:-translate-y-0.5"
              >
                <Download size={16} />
                Download resume
              </a>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border/70 bg-card/70 text-foreground font-medium text-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 hover:-translate-y-0.5">
                    <Maximize2 size={16} />
                    Open fullscreen
                  </button>
                </DialogTrigger>
                <DialogContent
                  showCloseButton
                  className="max-w-5xl w-[calc(100%-1.5rem)] h-[90vh] p-0 overflow-hidden gap-0"
                >
                  <DialogTitle className="sr-only">
                    {site.name} resume preview
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Fullscreen PDF preview of the resume.
                  </DialogDescription>
                  <iframe
                    src={EMBED_URL}
                    title={`${site.name} resume`}
                    className="w-full h-full border-0 bg-secondary/30"
                    allow="autoplay"
                  />
                </DialogContent>
              </Dialog>

              <a
                href={VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-muted-foreground font-medium text-sm hover:text-foreground transition-colors duration-200"
              >
                <ExternalLink size={16} />
                New tab
              </a>
            </div>

            <p className="text-xs text-muted-foreground/70 flex items-start gap-1.5">
              <FileDown size={13} className="mt-0.5 shrink-0" />
              If the preview looks blank, your browser may block inline PDFs —
              use &quot;Download&quot; or &quot;New tab&quot;.
            </p>
          </motion.div>

          {/* Right: inline preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="group relative rounded-2xl border border-border/60 bg-card/70 overflow-hidden shadow-sm">
              {/* Toolbar strip */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-secondary/40">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-3 text-xs font-mono text-muted-foreground">
                    resume.pdf
                  </span>
                </div>
                <button
                  onClick={() => setOpen(true)}
                  aria-label="Open resume fullscreen"
                  className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Maximize2 size={15} />
                </button>
              </div>
              {/* Preview */}
              <div className="bg-secondary/20 aspect-[1/1.05] sm:aspect-[1/1.25]">
                <iframe
                  src={EMBED_URL}
                  title={`${site.name} resume preview`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allow="autoplay"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
