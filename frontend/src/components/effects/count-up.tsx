"use client";

import { useEffect, useRef, useState } from "react";

/** Counts from 0 → value when scrolled into view (eased). Skips animation under reduced-motion. */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1500,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const started = useRef(false);
  const hasDecimal = value % 1 !== 0;
  const decimals = hasDecimal ? (String(value).split(".")[1]?.length ?? 1) : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(hasDecimal ? value.toFixed(decimals) : value.toLocaleString("en-US"));
      return;
    }

    // Reset so animation re-runs when value changes (e.g. live stats arriving after fallback)
    started.current = false;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const current = value * eased;
            setDisplay(
              hasDecimal
                ? current.toFixed(decimals)
                : Math.round(current).toLocaleString("en-US")
            );
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration, hasDecimal, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
