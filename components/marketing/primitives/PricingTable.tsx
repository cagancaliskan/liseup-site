import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/marketing/primitives/ScrollReveal";
import { EyebrowLabel } from "@/components/marketing/primitives/EyebrowLabel";

interface PricingFeature {
  label: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  priceSuffix?: string;
  pilotNote?: string;
  features: PricingFeature[];
  cta: { label: string; href: string };
  featured?: boolean;
}

interface PricingTableProps {
  tiers: PricingTier[];
  className?: string;
}

export function PricingTable({ tiers, className }: PricingTableProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[var(--rule)] md:grid-cols-3",
        className
      )}
    >
      {tiers.map((tier, i) => (
        <ScrollReveal key={tier.name} delay={i * 0.08} distance={20}>
          <div
            className={cn(
              "relative flex h-full flex-col gap-8 p-8 md:p-10",
              tier.featured
                ? "bg-[var(--ink)] text-[#FAFAFA]"
                : "bg-[var(--surface-1)]"
            )}
          >
            {tier.featured && (
              <div className="absolute right-6 top-0 -translate-y-1/2">
                <EyebrowLabel tone="brand" withDot>
                  Pilot önerisi
                </EyebrowLabel>
              </div>
            )}

            {/* Name + tagline */}
            <div className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "font-display text-[var(--text-xl)] font-black tracking-[-0.02em]",
                  tier.featured ? "text-[#FAFAFA]" : "text-[var(--ink)]"
                )}
              >
                {tier.name}
              </span>
              <span
                className={cn(
                  "font-sans text-[var(--text-sm)]",
                  tier.featured ? "text-[rgba(250,250,250,0.65)]" : "text-[var(--ink-2)]"
                )}
              >
                {tier.tagline}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1">
              <span
                className={cn(
                  "font-display tabular-nums text-[var(--text-3xl)] font-black leading-none tracking-[-0.03em]",
                  tier.featured ? "text-[#FAFAFA]" : "text-[var(--ink)]"
                )}
              >
                {tier.price}
              </span>
              {tier.priceSuffix && (
                <span
                  className={cn(
                    "font-sans text-[var(--text-sm)]",
                    tier.featured ? "text-[rgba(250,250,250,0.5)]" : "text-[var(--ink-3)]"
                  )}
                >
                  {tier.priceSuffix}
                </span>
              )}
            </div>

            {/* Pilot note */}
            {tier.pilotNote && (
              <div
                className={cn(
                  "rounded-lg border px-4 py-3 font-sans text-[var(--text-sm)] leading-[var(--text-sm--line-height)]",
                  tier.featured
                    ? "border-[rgba(250,250,250,0.15)] bg-[rgba(250,250,250,0.08)] text-[rgba(250,250,250,0.75)]"
                    : "border-[var(--color-brand-200,#BDD0F8)] bg-[var(--color-brand-50,#EEF4FF)] text-[var(--color-brand-700,#1E4DBF)]"
                )}
              >
                {tier.pilotNote}
              </div>
            )}

            {/* Feature list */}
            <ul className="flex flex-1 flex-col gap-3">
              {tier.features.map((f) => (
                <li key={f.label} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 shrink-0 text-[13px]",
                      !f.included && "opacity-30"
                    )}
                  >
                    {f.included ? "✓" : "–"}
                  </span>
                  <span
                    className={cn(
                      "font-sans text-[var(--text-sm)] leading-snug",
                      tier.featured
                        ? f.included
                          ? "text-[rgba(250,250,250,0.9)]"
                          : "text-[rgba(250,250,250,0.35)]"
                        : f.included
                        ? "text-[var(--ink-2)]"
                        : "text-[var(--ink-3)]"
                    )}
                  >
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href={tier.cta.href}
              className={cn(
                "inline-flex h-12 items-center justify-center rounded-full px-6 font-sans text-[15px] font-medium tracking-[-0.005em] transition-colors duration-[var(--duration-fast)]",
                tier.featured
                  ? "bg-[#FAFAFA] text-[var(--ink)] hover:bg-[rgba(250,250,250,0.88)]"
                  : "border border-[var(--rule)] bg-[var(--surface-2)] text-[var(--ink)] hover:border-[var(--ink)] hover:bg-[var(--surface-3)]"
              )}
            >
              {tier.cta.label}
            </Link>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
