"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import {
  HeroAccentRule,
  HeroCta,
  HeroDisplay,
  HeroEyebrow,
  HeroLede,
} from "@/components/marketing/hero/HeroChoreographer";
import { MagneticButton } from "@/components/marketing/primitives/MagneticButton";
import { RotatingEyebrow } from "@/components/marketing/primitives/RotatingEyebrow";
import { MarginaliaNumber } from "@/components/marketing/primitives/MarginaliaNumber";

const KICKER_PHRASES = [
  "LiseUP · Eylül 2026'da başlıyor",
  "İstanbul · Ankara · İzmir",
  "3 şehir · 6 pilot okul · binlerce liseli",
];

const PROOF_BAR_ITEMS = [
  "Pilot Eylül 2026",
  "İstanbul · Ankara · İzmir",
  "3 şehir / 6 pilot okul",
  "Liseli sonsuza kadar ücretsiz",
  "Okul sonsuza kadar ücretsiz",
  "Veli onaylı kayıt",
  "KVKK uyumlu",
];

export function HomeHero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const typeY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -120]);
  const proofOpacity = useTransform(scrollYProgress, [0, 0.4], reduce ? [1, 1] : [1, 0]);

  const proofDoubled = [...PROOF_BAR_ITEMS, ...PROOF_BAR_ITEMS];

  return (
    <section
      ref={heroRef}
      style={{ position: "relative" }}
      className="bg-[var(--surface-0)] isolate min-h-[92vh] overflow-hidden"
    >
      {/* Subtle baseline-grid wash behind the type */}
      <div
        aria-hidden
        className="surface-baseline pointer-events-none absolute inset-0 opacity-50"
      />

      {/* MAIN COMPOSITION */}
      <div className="relative z-10 mx-auto flex max-w-[var(--max-content)] flex-col gap-12 px-[var(--space-gutter)] pt-12 pb-10 md:gap-16 md:pt-16 md:pb-12">
        <motion.div
          style={{ y: typeY }}
          className="flex flex-col gap-12 md:gap-16"
        >
          {/* Eyebrow */}
          <HeroEyebrow>
            <div className="flex items-center gap-4">
              <MarginaliaNumber n={1} label="Açılış" tone="ink" />
              <span aria-hidden className="h-px w-8 bg-[var(--ink)] opacity-30" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink)] opacity-70">
                <RotatingEyebrow phrases={KICKER_PHRASES} intervalMs={3500} loop />
              </span>
            </div>
          </HeroEyebrow>

          {/* MONUMENTAL TYPE */}
          <HeroDisplay
            splitWords={false}
            splitLines
            className="font-display text-[var(--text-5xl)] font-black leading-[0.88] tracking-[-0.04em] text-[var(--ink)] md:text-[8rem] md:leading-[0.84] xl:text-[12rem] xl:leading-[0.82] [text-wrap:balance]"
          >
            <span className="block">Yetenek</span>
            <span className="block">erken</span>
            <span className="block">
              gelir.
              <sup
                aria-hidden
                className="ml-2 align-super font-mono text-[0.18em] font-semibold text-[var(--color-brand-500)]"
              >
                01
              </sup>
            </span>
          </HeroDisplay>

          {/* INFO ROW */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,360px)] md:items-end md:gap-12">
            <HeroLede>
              <p className="max-w-[44ch] font-body text-[18px] font-light italic leading-[1.5] tracking-[-0.005em] text-[var(--ink)] md:text-[20px]">
                Türkiye&rsquo;nin lise öğrencilerini, projelerinden tanıyın. Liseliyi ekibiyle, kurumu yeteneğiyle, okulu öğrencisinin gerçek aktivitesiyle buluşturan platform.
              </p>
            </HeroLede>

            <HeroAccentRule className="hidden md:block" />

            {/* Stat tile */}
            <aside className="border border-[color-mix(in_srgb,var(--ink)_22%,transparent)] bg-[color-mix(in_srgb,var(--ink)_4%,transparent)] p-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink)] opacity-70">
                  Türkiye Hacmi
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-brand-500)]">
                  MEB &lsquo;24
                </span>
              </div>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-display tabular-nums text-[40px] font-black leading-none tracking-[-0.04em] text-[var(--ink)]">
                  4.800.000
                </span>
                <span className="font-display text-[28px] font-black leading-none text-[var(--color-brand-500)]">
                  +
                </span>
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink)] opacity-60">
                Türkiye&rsquo;deki lise öğrencisi
              </div>
            </aside>
          </div>

          {/* CTA ROW */}
          <HeroCta>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton href="/kayit/liseli" variant="primary">
                  Liseli olarak başla
                </MagneticButton>
                <MagneticButton href="/kurumlar" variant="outline">
                  Kurum için
                </MagneticButton>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink)] opacity-55">
                <span className="text-[var(--color-brand-500)]">01.</span> Pilot Eylül 2026&rsquo;da başlıyor
              </span>
            </div>
          </HeroCta>
        </motion.div>

        {/* Proof-bar marquee */}
        <motion.div
          aria-label="Pilot programı detayları"
          style={{ opacity: proofOpacity }}
          className="relative -mx-[var(--space-gutter)] overflow-hidden border-y border-[color-mix(in_srgb,var(--ink)_18%,transparent)] bg-[color-mix(in_srgb,var(--ink)_5%,transparent)] py-3"
        >
          <div
            className="flex shrink-0 items-center gap-10"
            style={
              reduce
                ? { width: "max-content" }
                : { width: "max-content", animation: "marquee-slow 50s linear infinite", willChange: "transform" }
            }
          >
            {(reduce ? PROOF_BAR_ITEMS : proofDoubled).map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex shrink-0 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.20em] text-[var(--ink)] opacity-80"
              >
                <span aria-hidden className="h-1 w-1 bg-[var(--ink-2)]" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
