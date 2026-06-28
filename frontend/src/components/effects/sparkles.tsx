"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Spark = {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
  color: string;
};

const COLORS = ["#a78bfa", "#60a5fa", "#38bdf8", "#f0abfc", "#ffffff"];

/**
 * Twinkling sparkle field — stars that grow big then small. Decorative only;
 * renders nothing when the user prefers reduced motion (generated client-side
 * after mount to avoid hydration mismatch).
 */
export function Sparkles({
  count = 18,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setSparks(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 10 + 6,
        delay: Math.random() * 4,
        duration: Math.random() * 2 + 2.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    );
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {sparks.map((s) => (
        <svg
          key={s.id}
          className="sparkle absolute"
          viewBox="0 0 24 24"
          fill="none"
          style={
            {
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              "--sparkle-opacity": "0.9",
              animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            } as CSSProperties
          }
        >
          <path
            d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
            fill={s.color}
          />
        </svg>
      ))}
    </div>
  );
}
