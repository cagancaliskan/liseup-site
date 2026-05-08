"use client";

import { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Audience = "liseli" | "kurum" | "okul";

export interface AudienceCard {
  audience: Audience;
  eyebrow: string;
  heading: string;
  body: string;
  bullets: string[];
  href: string;
  cta: string;
}

interface AudienceFeaturedSwitcherProps {
  cards: AudienceCard[];
  className?: string;
}

const AUDIENCE_CONFIG: Record<
  Audience,
  { color: string; bg: string; label: string; numberColor: string }
> = {
  liseli: {
    label: "Liseli",
    color: "var(--color-brand-500)",
    bg: "color-mix(in srgb, var(--color-brand-50) 40%, var(--surface-0))",
    numberColor: "var(--color-brand-500)",
  },
  kurum: {
    label: "Kurum",
    color: "var(--color-brand-700)",
    bg: "color-mix(in srgb, var(--color-brand-50) 80%, var(--surface-0))",
    numberColor: "var(--color-brand-700)",
  },
  okul: {
    label: "Okul",
    color: "var(--ink-2)",
    bg: "var(--surface-2)",
    numberColor: "var(--ink-2)",
  },
};

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

export function AudienceFeaturedSwitcher({
  cards,
  className,
}: AudienceFeaturedSwitcherProps) {
  const reduce = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const id = useId();
  const active = cards[activeIdx];
  const config = AUDIENCE_CONFIG[active.audience];

  return (
    <div className={cn("w-full", className)}>
      {/* ── Desktop layout ── */}
      <div className="hidden md:flex min-h-[540px] border border-[var(--rule)] overflow-hidden">
        {/* Left rail, three large selector bands */}
        <div className="flex flex-col w-[38%] shrink-0 border-r border-[var(--rule)]">
          {cards.map((card, i) => {
            const isActive = i === activeIdx;
            const cfg = AUDIENCE_CONFIG[card.audience];
            return (
              <button
                key={card.audience}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`${id}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIdx(i)}
                className={cn(
                  "group relative flex flex-1 flex-col items-start justify-between gap-4 px-8 py-7 text-left",
                  "transition-colors duration-300 ease-[var(--ease-instrumental)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ink)]/20",
                  isActive
                    ? "bg-[var(--surface-0)]"
                    : "bg-[var(--surface-1)] hover:bg-[var(--surface-0)]"
                )}
                style={{
                  borderBottom:
                    i < cards.length - 1
                      ? "1px solid var(--rule)"
                      : undefined,
                }}
              >
                {/* Active accent strip */}
                <motion.span
                  aria-hidden
                  animate={{ scaleY: isActive ? 1 : 0 }}
                  initial={false}
                  transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
                  className="absolute inset-y-0 left-0 w-[3px] origin-center"
                  style={{ backgroundColor: cfg.color }}
                />

                {/* Number + label */}
                <div className="flex items-center gap-4 pl-2">
                  <span
                    className="font-mono text-[28px] font-medium leading-none tabular-nums transition-colors duration-300"
                    style={{ color: isActive ? cfg.numberColor : "var(--ink-3)" }}
                  >
                    {pad(i + 1)}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={cn(
                        "font-display text-[16px] font-black leading-none tracking-[-0.02em] transition-colors duration-300",
                        isActive ? "text-[var(--ink)]" : "text-[var(--ink-3)] group-hover:text-[var(--ink-2)]"
                      )}
                    >
                      {cfg.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-3)] opacity-60">
                      {card.eyebrow}
                    </span>
                  </div>
                </div>

                {/* One-liner preview, visible when inactive */}
                {!isActive && (
                  <p className="pl-2 font-sans text-[12px] leading-snug text-[var(--ink-3)] line-clamp-2 max-w-[24ch] opacity-70">
                    {card.body}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* Right panel, featured content */}
        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${activeIdx}`}
          className="relative flex-1 overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.audience}
              initial={reduce ? { opacity: 1 } : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.38, ease: [0.2, 0, 0, 1] }}
              className="absolute inset-0 flex flex-col justify-between p-10 lg:p-14"
              style={{ background: config.bg }}
            >
              {/* Top: heading + body */}
              <div className="flex flex-col gap-6">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: config.color }}
                >
                  {active.eyebrow}
                </span>
                <h3
                  className={cn(
                    "font-display font-black leading-[1.0] tracking-[-0.03em]",
                    "text-[clamp(1.6rem,3.2vw,2.6rem)] [text-wrap:balance]",
                    "max-w-[20ch] text-[var(--ink)]"
                  )}
                >
                  {active.heading}
                </h3>
                <p className="max-w-[44ch] font-sans text-[var(--text-sm)] leading-[1.6] text-[var(--ink-2)] md:text-[var(--text-base)]">
                  {active.body}
                </p>
              </div>

              {/* Middle: bullets */}
              <ul className="flex flex-col gap-3 my-6">
                {active.bullets.map((b, i) => (
                  <li
                    key={b}
                    className="flex items-start gap-4"
                  >
                    <span
                      className="font-mono text-[10px] leading-none tabular-nums mt-[3px] shrink-0"
                      style={{ color: config.color }}
                    >
                      {pad(i + 1)}
                    </span>
                    <span className="font-sans text-[14px] leading-snug text-[var(--ink-2)]">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Bottom: CTA + nav hint */}
              <div className="flex items-center justify-between border-t border-[color-mix(in_srgb,var(--paper-ink)_10%,transparent)] pt-6">
                <Link
                  href={active.href}
                  className={cn(
                    "group inline-flex items-center gap-3",
                    "rounded-full px-6 py-3",
                    "font-mono text-[11px] uppercase tracking-[0.14em]",
                    "transition-all duration-[var(--duration-fast)] ease-[var(--ease-instrumental)]",
                    "focus-visible:outline-none",
                    "bg-[var(--ink)] text-[var(--paper)]",
                    "hover:shadow-[0_0_0_3px_color-mix(in_srgb,var(--ink)_20%,transparent)]"
                  )}
                >
                  {active.cta}
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>

                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
                  {pad(activeIdx + 1)} / {pad(cards.length)}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile layout, vertical accordion ── */}
      <div className="flex flex-col gap-2 md:hidden">
        {cards.map((card, i) => {
          const open = i === activeIdx;
          const cfg = AUDIENCE_CONFIG[card.audience];
          return (
            <div
              key={card.audience}
              className="overflow-hidden border border-[var(--rule)] bg-[var(--surface-1)]"
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setActiveIdx(i)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span
                  className="font-mono text-[14px] font-medium tabular-nums leading-none shrink-0"
                  style={{ color: open ? cfg.color : "var(--ink-3)" }}
                >
                  {pad(i + 1)}
                </span>
                <span
                  className={cn(
                    "font-display text-[15px] font-black tracking-[-0.02em]",
                    open ? "text-[var(--ink)]" : "text-[var(--ink-2)]"
                  )}
                >
                  {cfg.label}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "ml-auto font-mono text-[14px] transition-transform duration-300",
                    open ? "rotate-90" : ""
                  )}
                  style={{ color: open ? cfg.color : "var(--ink-3)" }}
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="content"
                    initial={reduce ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={reduce ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className="flex flex-col gap-5 px-5 pb-6 pt-1"
                      style={{ background: cfg.bg }}
                    >
                      <h3 className="font-display text-[var(--text-xl)] font-black leading-tight tracking-[-0.025em] text-[var(--ink)]">
                        {card.heading}
                      </h3>
                      <p className="font-sans text-[14px] leading-snug text-[var(--ink-2)]">
                        {card.body}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {card.bullets.map((b, bi) => (
                          <li key={b} className="flex items-start gap-3">
                            <span
                              className="font-mono text-[10px] mt-[2px] tabular-nums shrink-0"
                              style={{ color: cfg.color }}
                            >
                              {pad(bi + 1)}
                            </span>
                            <span className="font-sans text-[13px] leading-snug text-[var(--ink-2)]">
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={card.href}
                        className="mt-1 inline-flex items-center gap-2 self-start rounded-full bg-[var(--ink)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--paper)]"
                      >
                        {card.cta}
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
