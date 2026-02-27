"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={scrollTop}
          aria-label="Scroll to top"
          className="
            fixed bottom-6 right-6 z-50
            w-10 h-10 rounded-xl
            bg-primary/90 hover:bg-primary
            text-primary-foreground
            flex items-center justify-center
            shadow-lg shadow-primary/30
            backdrop-blur-sm
            transition-colors duration-150
            hover:shadow-xl hover:shadow-primary/40
            hover:-translate-y-0.5
          "
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
