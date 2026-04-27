"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface Step {
  number: string;
  audience: string;
  heading: string;
  body: string;
  illustration: React.ReactNode;
}

const STEPS: Step[] = [
  {
    number: "01",
    audience: "Liseli",
    heading: "Profilini kur, projeni paylaş",
    body: "Dakikalar içinde profilini oluştur, projesini ya da fikrini yayınla. Veli onayı otomatik akışla tamamlanır. Bariyersiz başlangıç.",
    illustration: <ProfileIllustration />,
  },
  {
    number: "02",
    audience: "Kurum",
    heading: "Filtrele, keşfet, bağlan",
    body: "VC fonları, şirketler ve STK'lar; şehir, yaş, ilgi alanı ve proje tipine göre lise yeteneklerini filtreler, ilk mesaj tek tıkla.",
    illustration: <DiscoveryIllustration />,
  },
  {
    number: "03",
    audience: "Okul",
    heading: "İzle, raporla, paylaş",
    body: "Okul yöneticisi, öğrencilerinin platform aktivitesini gerçek zamanlı görür; başarı vitrinini partner kurumlarla paylaşabilir.",
    illustration: <ImpactIllustration />,
  },
];

const AUDIENCE_COLORS: Record<string, string> = {
  Liseli: "var(--color-brand-500)",
  Kurum: "var(--color-brand-700)",
  Okul: "var(--ink-2)",
};

export function HowItWorks() {
  const reduce = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div>
      {/* Section header */}
      <div className="mb-14 flex flex-col gap-3 md:mb-20">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
          Nasıl çalışır
        </span>
        <h2 className="font-display text-[var(--text-3xl)] font-black leading-[1.0] tracking-[-0.035em] text-[var(--ink)] md:text-[var(--text-4xl)]">
          Üç adım.<br />Her taraf için.
        </h2>
        <p className="max-w-[44ch] font-body font-light italic text-[var(--text-base)] leading-[1.55] text-[var(--ink-2)]">
          Liseli profil açar, kurum keşfeder, okul izler, velisini onaylatmak dışında tek bariyer yok.
        </p>
      </div>

      {/* Mobile, simple stack */}
      <div className="flex flex-col gap-8 md:hidden">
        {STEPS.map((step, i) => (
          <StepCard key={step.number} step={step} active idx={i} />
        ))}
      </div>

      {/* Desktop, sticky left + scrolling right */}
      <div className="hidden md:grid md:grid-cols-[40%_60%] md:gap-20 lg:gap-24">
        {/* Left, sticky progress */}
        <aside className="sticky top-28 flex h-fit flex-col gap-8 self-start">
          {/* Step progress indicator */}
          <div className="flex flex-col gap-0 border border-[var(--rule)] overflow-hidden">
            {STEPS.map((step, i) => {
              const isActive = i === activeIdx;
              const color = AUDIENCE_COLORS[step.audience];
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(`how-step-${i}`);
                    el?.scrollIntoView({
                      behavior: reduce ? "auto" : "smooth",
                      block: "center",
                    });
                  }}
                  className={cn(
                    "group relative flex items-center gap-5 px-6 py-5 text-left transition-colors duration-300",
                    isActive ? "bg-[var(--surface-0)]" : "bg-[var(--surface-1)] hover:bg-[var(--surface-0)]",
                    i > 0 && "border-t border-[var(--rule)]"
                  )}
                >
                  {/* Active strip */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] transition-opacity duration-300"
                    style={{
                      backgroundColor: color,
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                  <span
                    className="font-mono text-[20px] font-medium tabular-nums leading-none transition-colors duration-300"
                    style={{ color: isActive ? color : "var(--ink-3)" }}
                  >
                    {step.number}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={cn(
                        "font-display text-[14px] font-black leading-none tracking-[-0.02em] transition-colors duration-300",
                        isActive ? "text-[var(--ink)]" : "text-[var(--ink-3)] group-hover:text-[var(--ink-2)]"
                      )}
                    >
                      {step.audience}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-3)] opacity-50">
                      {step.heading}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right, scrolling steps */}
        <div className="flex flex-col gap-28">
          {STEPS.map((step, i) => (
            <StepObserver
              key={step.number}
              id={`how-step-${i}`}
              onActive={() => setActiveIdx(i)}
            >
              <StepCard step={step} active idx={i} />
            </StepObserver>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepObserver({
  id,
  onActive,
  children,
}: {
  id: string;
  onActive: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-35% 0px -35% 0px", once: false });

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <div id={id} ref={ref} className="min-h-[55vh]">
      {children}
    </div>
  );
}

function StepCard({ step, idx }: { step: Step; active: boolean; idx: number }) {
  const color = AUDIENCE_COLORS[step.audience];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: [0.2, 0, 0, 1] }}
      className="relative flex flex-col gap-7 border border-[var(--rule)] bg-[var(--surface-1)]"
    >
      {/* Accent strip left */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{ backgroundColor: color }}
      />

      <div className="p-8 md:p-10 flex flex-col gap-7">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-[22px] font-medium tabular-nums leading-none"
              style={{ color }}
            >
              {step.number}
            </span>
            <div className="flex flex-col gap-0">
              <span
                className="font-mono text-[9px] uppercase tracking-[0.16em] opacity-50"
                style={{ color }}
              >
                {step.audience}
              </span>
              <span className="font-display text-[14px] font-black tracking-[-0.01em] text-[var(--ink)]">
                {step.heading}
              </span>
            </div>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
            {String(idx + 1).padStart(2, "0")} / {String(3).padStart(2, "0")}
          </span>
        </div>

        {/* Illustration */}
        <div
          className="relative h-40 overflow-hidden bg-[var(--surface-2)] p-6"
          style={{
            background: `linear-gradient(135deg, var(--surface-2) 0%, color-mix(in srgb, ${color} 5%, var(--surface-2)) 100%)`,
          }}
        >
          {step.illustration}
        </div>

        {/* Body */}
        <p className="font-body font-light italic text-[var(--text-base)] leading-[1.6] text-[var(--ink-2)]">
          {step.body}
        </p>
      </div>
    </motion.div>
  );
}

/* ───────────── Inline SVG illustrations ───────────── */

function ProfileIllustration() {
  return (
    <svg viewBox="0 0 240 96" fill="none" className="h-full w-full" aria-hidden="true">
      <rect x="14" y="16" width="120" height="64" rx="4" stroke="var(--ink-2)" strokeWidth="1.2" fill="var(--surface-1)" />
      <circle cx="38" cy="38" r="10" stroke="var(--color-brand-500)" strokeWidth="1.2" />
      <rect x="56" y="30" width="56" height="4" rx="2" fill="var(--ink-2)" opacity="0.55" />
      <rect x="56" y="39" width="36" height="3" rx="1.5" fill="var(--ink-3)" opacity="0.40" />
      <rect x="20" y="56" width="22" height="14" rx="2" fill="var(--color-brand-500)" opacity="0.14" />
      <rect x="46" y="56" width="22" height="14" rx="2" fill="var(--color-brand-500)" opacity="0.09" />
      <rect x="72" y="56" width="22" height="14" rx="2" fill="var(--color-brand-500)" opacity="0.06" />
      <rect x="152" y="24" width="76" height="48" rx="4" stroke="var(--color-brand-500)" strokeWidth="1.2" fill="var(--surface-1)" />
      <rect x="162" y="34" width="44" height="4" rx="2" fill="var(--color-brand-500)" opacity="0.8" />
      <rect x="162" y="44" width="56" height="3" rx="1.5" fill="var(--ink-2)" opacity="0.50" />
      <rect x="162" y="52" width="32" height="3" rx="1.5" fill="var(--ink-3)" opacity="0.35" />
      <path d="M134 48 L152 48" stroke="var(--color-brand-500)" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.7" />
    </svg>
  );
}

function DiscoveryIllustration() {
  return (
    <svg viewBox="0 0 240 96" fill="none" className="h-full w-full" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => {
          const cx = 18 + col * 24;
          const cy = 14 + row * 16;
          const highlight = (row === 2 && col === 4) || (row === 1 && col === 5);
          return (
            <circle
              key={`${row}-${col}`}
              cx={cx} cy={cy} r={highlight ? 3.5 : 2.5}
              fill={highlight ? "var(--color-brand-500)" : "var(--ink-3)"}
              opacity={highlight ? 1 : 0.25}
            />
          );
        })
      )}
      <circle cx="152" cy="48" r="26" stroke="var(--color-brand-500)" strokeWidth="1.5" fill="rgba(56,113,223,0.06)" />
      <line x1="172" y1="68" x2="188" y2="84" stroke="var(--color-brand-500)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ImpactIllustration() {
  return (
    <svg viewBox="0 0 240 96" fill="none" className="h-full w-full" aria-hidden="true">
      <line x1="20" y1="80" x2="222" y2="80" stroke="var(--ink-2)" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="80" x2="20" y2="14" stroke="var(--ink-2)" strokeWidth="1" opacity="0.4" />
      <rect x="38" y="64" width="24" height="16" fill="var(--ink-2)" opacity="0.3" />
      <rect x="72" y="52" width="24" height="28" fill="var(--ink-2)" opacity="0.4" />
      <rect x="106" y="40" width="24" height="40" fill="var(--ink-2)" opacity="0.5" />
      <rect x="140" y="26" width="24" height="54" fill="var(--color-brand-500)" opacity="0.75" />
      <rect x="174" y="14" width="24" height="66" fill="var(--color-brand-500)" />
      <path d="M38 62 L72 50 L106 38 L140 24 L174 12" stroke="var(--color-brand-500)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
      <circle cx="174" cy="12" r="3" fill="var(--color-brand-500)" />
    </svg>
  );
}
