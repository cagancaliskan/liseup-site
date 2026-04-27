"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface RotatingEyebrowProps {
  phrases: string[];
  intervalMs?: number;
  className?: string;
  loop?: boolean;
}

export function RotatingEyebrow({
  phrases,
  intervalMs = 3500,
  className,
  loop = true,
}: RotatingEyebrowProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    if (phrases.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((current) => {
        const next = current + 1;
        if (!loop && next >= phrases.length) {
          window.clearInterval(id);
          return current;
        }
        return next % phrases.length;
      });
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [phrases.length, intervalMs, reduce, loop]);

  const current = phrases[index] ?? phrases[0];

  if (reduce) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]",
          className,
        )}
      >
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-brand-500)]"
        />
        {current}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-brand-500)]"
      />
      <span className="relative inline-block min-h-[1.2em]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="inline-block whitespace-nowrap"
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
