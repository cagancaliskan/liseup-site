"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
  caption: string;
  durationMs: number;
}

const STATS: StatItem[] = [
  {
    value: 4_800_000,
    suffix: "+",
    label: "Türkiye'deki lise öğrencisi",
    caption: "MEB 2024 · büyüyor, görünmüyor",
    durationMs: 1400,
  },
  {
    value: 478,
    suffix: "+",
    label: "Aktif VC fonu",
    caption: "Aynı 50 startup'a bakıyor",
    durationMs: 1600,
  },
  {
    value: 3,
    suffix: " şehir",
    label: "Pilot başlangıç",
    caption: "İstanbul · Ankara · İzmir · Eylül 2026",
    durationMs: 800,
  },
];

const SOURCES = [
  "MEB Eğitim İstatistikleri 2024",
  "Startup Watch Türkiye 2025",
  "TÜBİTAK Genç Yetenek Raporu 2024",
];

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function AnimatedNumber({
  value,
  suffix = "",
  durationMs,
}: {
  value: number;
  suffix?: string;
  durationMs: number;
}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) { setDisplay(value); return; }
    if (reduce === null) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / durationMs, 1);
            setDisplay(Math.round(easeOutQuart(t) * value));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs, reduce]);

  return (
    <span ref={ref}>
      {display.toLocaleString("tr-TR")}
      {suffix}
    </span>
  );
}

export function WhyNowStats() {
  return (
    <div className="relative">
      {/* Section header */}
      <div className="mb-16 flex flex-col gap-3 md:mb-20">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
          Neden şimdi
        </span>
        <h2 className="font-display text-[var(--text-3xl)] font-black leading-[1.0] tracking-[-0.035em] text-[var(--ink)] md:text-[var(--text-4xl)]">
          Türkiye&rsquo;nin yetenek<br />havuzu büyüyor.
        </h2>
        <p className="max-w-[44ch] font-body text-[var(--text-base)] font-light italic leading-[1.55] text-[var(--ink-2)]">
          Erken görmek isteyene de, görünmek isteyene de ortak bir alan kuruyoruz.
        </p>
      </div>

      {/* Monumental stat rows, Operator: Scale Switch */}
      <div className="flex flex-col border-t border-[var(--rule)]">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="group relative grid grid-cols-1 gap-4 border-b border-[var(--rule)] py-10 md:grid-cols-[1fr_auto] md:items-end md:gap-16 md:py-12"
          >
            {/* Hover accent strip */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -inset-x-[var(--space-gutter)] bg-[var(--color-brand-500)] opacity-0 transition-opacity duration-300 group-hover:opacity-[0.03]"
            />

            {/* Stat, monumentally scaled */}
            <div className="flex items-end gap-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)] opacity-60 mb-1 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="font-display tabular-nums font-black leading-[0.88] tracking-[-0.04em] text-[var(--ink)]"
                style={{
                  fontSize: "clamp(3.5rem, 9vw, 8rem)",
                  lineHeight: 0.88,
                }}
              >
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  durationMs={stat.durationMs}
                />
              </span>
            </div>

            {/* Label + caption, right-aligned on desktop */}
            <div className="flex flex-col gap-1 pl-10 md:pl-0 md:text-right">
              <span className="font-sans text-[var(--text-base)] font-medium text-[var(--ink)]">
                {stat.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
                {stat.caption}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pull-quote + sources */}
      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <blockquote className="border-l-[3px] border-[var(--color-brand-500)] py-2 pl-6">
          <p className="font-body text-[var(--text-lg)] font-light italic leading-snug tracking-[-0.01em] text-[var(--ink)]">
            &ldquo;Yetenek havuzu görünür değil, biz ona ışık tutuyoruz.&rdquo;
          </p>
        </blockquote>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Veri kaynakları
          </span>
          <ul className="flex flex-col gap-2">
            {SOURCES.map((src, i) => (
              <li key={src} className="flex items-start gap-3">
                <span className="font-mono text-[10px] tabular-nums text-[var(--ink-3)] mt-[1px] shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[11px] leading-snug text-[var(--ink-2)]">
                  {src}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
