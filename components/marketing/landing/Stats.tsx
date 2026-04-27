"use client";

import { useEffect, useRef } from "react";

interface Stat {
  raw: number;
  display: string;
  caption: string;
}

const STATS: Stat[] = [
  { raw: 4800000, display: "4,8M", caption: "lise öğrencisi (MEB '24)" },
  { raw: 478, display: "478", caption: "aktif Türkiye merkezli fon" },
  { raw: 3, display: "3", caption: "pilot şehir, eylül 2026" },
];

function useCountUp(ref: React.RefObject<HTMLElement | null>, raw: number, display: string) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.textContent = display;
      return;
    }

    let raf = 0;
    let triggered = false;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered) return;
        triggered = true;
        obs.disconnect();

        const start = performance.now();
        const duration = 1100;

        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          const val = Math.round(ease * raw);

          if (raw >= 1_000_000) {
            const m = val / 1_000_000;
            el.textContent = m.toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + "M";
          } else {
            el.textContent = val.toLocaleString("tr-TR");
          }

          if (t < 1) {
            raf = requestAnimationFrame(tick);
          } else {
            el.textContent = display;
          }
        };

        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [raw, display, ref]);
}

function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref, stat.raw, stat.display);

  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center md:py-16">
      <span
        ref={ref}
        className="font-display font-black leading-none tracking-[-0.04em] text-[var(--color-brand-500)] tabular-nums"
        style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
        aria-label={stat.display}
      >
        {stat.display}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-3)]">
        {stat.caption}
      </span>
    </div>
  );
}

export function Stats() {
  return (
    <section
      aria-label="Platform rakamları"
      className="border-y border-[var(--rule)] bg-[var(--surface-0)]"
    >
      <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)]">
        <div className="grid grid-cols-1 divide-y divide-[var(--rule)] md:grid-cols-3 md:divide-x md:divide-y-0">
          {STATS.map((stat) => (
            <StatItem key={stat.display} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
