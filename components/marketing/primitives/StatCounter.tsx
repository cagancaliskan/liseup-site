"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  className?: string;
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  duration = 1400,
  className,
}: StatCounterProps) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) { setDisplay(value); return; }
    if (reduce === null) return; // still resolving
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            setDisplay(Math.round(easeOutQuart(progress) * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, reduce]);

  return (
    <div ref={ref} className={cn("flex flex-col gap-2", className)}>
      <span className="font-display tabular-nums text-[var(--text-4xl)] font-black leading-none tracking-[-0.03em] text-[var(--ink)] md:text-[var(--text-5xl)]">
        {prefix}
        {display.toLocaleString("tr-TR")}
        {suffix}
      </span>
      <span className="font-sans text-[var(--text-sm)] leading-[var(--text-sm--line-height)] text-[var(--ink-2)]">
        {label}
      </span>
    </div>
  );
}
