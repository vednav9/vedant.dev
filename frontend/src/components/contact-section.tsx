"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { useState } from "react";
import { Github, Linkedin, ExternalLink, Mail, Copy, Check, Send } from "lucide-react";

const email = "vedantnavthale@gmail.com";

const contactLinks = [
  {
    icon: Github,
    label: "GitHub",
    value: "@vednav9",
    href: "https://github.com/vednav9",
    color: "hover:border-foreground/40 hover:text-foreground",
    bg: "hover:bg-foreground/5",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "vedantnavthale",
    href: "https://linkedin.com/in/vedantnavthale",
    color: "hover:border-[#0077b5]/50 hover:text-[#0077b5]",
    bg: "hover:bg-[#0077b5]/5",
  },
  {
    icon: ExternalLink,
    label: "LeetCode",
    value: "@vednav9",
    href: "https://leetcode.com/vednav9",
    color: "hover:border-[#ffa116]/50 hover:text-[#ffa116]",
    bg: "hover:bg-[#ffa116]/5",
  },
];

export function ContactSection() {
  const { ref, inView } = useInView(0.1);
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${email}?subject=Portfolio Inquiry from ${formState.name}&body=${encodeURIComponent(formState.message + "\n\nFrom: " + formState.email)}`;
    window.open(mailtoUrl, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/8 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-mono font-medium mb-2 tracking-widest uppercase">
            06. Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Impactful</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-violet-600 to-blue-500 rounded-full mx-auto mb-6" />
          <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Open to full-time roles, freelance projects, and collaboration. If you&apos;re building something meaningful, I&apos;d love to be part of it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Email card */}
            <div className="p-6 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Mail size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Email</span>
              </div>
              <div className="flex items-center justify-between gap-3 bg-secondary/50 rounded-xl px-4 py-3 border border-border/40">
                <span className="text-sm font-mono text-foreground truncate">{email}</span>
                <button
                  onClick={copyEmail}
                  className="shrink-0 p-1.5 rounded-lg hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Copy email"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {copied ? "✓ Copied to clipboard!" : "Click to copy email address"}
              </p>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50 ${link.color} ${link.bg} transition-all duration-200 group`}
                >
                  <div className="w-9 h-9 rounded-lg bg-secondary/70 flex items-center justify-center shrink-0">
                    <link.icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">{link.label}</div>
                    <div className="text-xs text-muted-foreground font-mono">{link.value}</div>
                  </div>
                  <ExternalLink size={13} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </motion.a>
              ))}
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-sm text-emerald-600 dark:text-emerald-400">
                Available for new opportunities
              </span>
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Jane Recruiter"
                  className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/30 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="jane@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/30 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Hi Vedant, I came across your portfolio and I'd like to discuss..."
                  className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/30 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                {sent ? (
                  <>
                    <Check size={16} />
                    Opening mail client...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
              <p className="text-xs text-center text-muted-foreground">
                Opens your email client with the message pre-filled.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
