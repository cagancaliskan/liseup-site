import Link from "next/link";
import { ScrollReveal } from "@/components/marketing/primitives/ScrollReveal";
import { cn } from "@/lib/utils";

interface AudienceCard {
  audience: "liseli" | "kurum" | "okul";
  eyebrow: string;
  heading: string;
  body: string;
  href: string;
  cta: string;
}

interface AudienceTriptychProps {
  cards: AudienceCard[];
  className?: string;
}

function PersonaMark({ audience }: { audience: AudienceCard["audience"] }) {
  const common = "h-7 w-7 stroke-[1.5]";
  if (audience === "liseli") {
    // Mortarboard / graduation cap
    return (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className={common}
      >
        <path d="M2 11L14 5L26 11L14 17L2 11Z" stroke="currentColor" strokeLinejoin="round" />
        <path d="M7 13.5V18C7 19.1 10.1 21 14 21C17.9 21 21 19.1 21 18V13.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 12V18" stroke="currentColor" strokeLinecap="round" />
      </svg>
    );
  }
  if (audience === "kurum") {
    // Building / tower
    return (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className={common}
      >
        <rect x="5" y="6" width="18" height="18" stroke="currentColor" strokeLinejoin="round" />
        <path d="M9 10H11M9 14H11M9 18H11M14 10H16M14 14H16M14 18H16M19 10H21M19 14H21" stroke="currentColor" strokeLinecap="round" />
        <path d="M5 24H23" stroke="currentColor" strokeLinecap="round" />
      </svg>
    );
  }
  // okul: chart trending up
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className={common}
    >
      <path d="M4 23H24" stroke="currentColor" strokeLinecap="round" />
      <rect x="6" y="14" width="3" height="6" stroke="currentColor" strokeLinejoin="round" />
      <rect x="12" y="10" width="3" height="10" stroke="currentColor" strokeLinejoin="round" />
      <rect x="18" y="6" width="3" height="14" stroke="currentColor" strokeLinejoin="round" />
      <path d="M4 8L9 11L14 6L21 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const audienceGradients: Record<AudienceCard["audience"], string> = {
  liseli:
    "radial-gradient(120% 80% at 80% 0%, rgba(95,143,228,0.10), transparent 70%)",
  kurum:
    "radial-gradient(120% 80% at 80% 0%, rgba(31,71,165,0.12), transparent 70%)",
  okul:
    "radial-gradient(120% 80% at 80% 0%, rgba(44,92,200,0.09), transparent 65%)",
};

export function AudienceTriptych({ cards, className }: AudienceTriptychProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[var(--rule)] md:grid-cols-3",
        className
      )}
    >
      {cards.map((card, i) => (
        <ScrollReveal key={card.audience} delay={i * 0.12} distance={32} duration={0.85}>
          <Link
            href={card.href}
            className={cn(
              "group relative flex h-full flex-col justify-between gap-10 overflow-hidden bg-[var(--surface-1)] p-8 md:p-10",
              "transition-all duration-[var(--duration-base)] ease-[var(--ease-cinematic)]",
              "hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            )}
          >
            {/* Per-audience temperature gradient, appears on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-instrumental)] group-hover:opacity-100"
              style={{ background: audienceGradients[card.audience] }}
            />

            {/* Persona corner mark */}
            <span
              aria-hidden="true"
              className="absolute right-7 top-7 text-[var(--color-brand-500)] opacity-30 transition-opacity duration-[var(--duration-base)] ease-[var(--ease-instrumental)] group-hover:opacity-100 md:right-9 md:top-9"
            >
              <PersonaMark audience={card.audience} />
            </span>

            <div className="relative flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-brand-500)]">
                {card.eyebrow}
              </span>
              <h3 className="max-w-[16ch] font-display text-[var(--text-lg)] font-bold leading-[var(--text-lg--line-height)] tracking-[-0.015em] text-[var(--ink)] md:text-[var(--text-xl)] md:leading-[var(--text-xl--line-height)]">
                {card.heading}
              </h3>
              <p className="font-sans text-[var(--text-base)] leading-[var(--text-base--line-height)] text-[var(--ink-2)]">
                {card.body}
              </p>
            </div>

            <div className="relative flex items-center justify-between">
              <span className="font-sans text-[14px] font-medium tracking-[-0.005em] text-[var(--ink)]">
                {card.cta}
              </span>
              <span
                aria-hidden="true"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--ink-2)] transition-all duration-[var(--duration-base)] ease-[var(--ease-instrumental)] group-hover:translate-x-1 group-hover:bg-[var(--color-brand-500)] group-hover:text-white"
              >
                →
              </span>
            </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  );
}
