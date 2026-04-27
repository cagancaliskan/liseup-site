import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  priceSuffix?: string;
  features: string[];
  highlight?: boolean;
  ctaLabel: string;
  pilotNote?: string;
}

export function PricingTierCard({
  tier,
  className,
}: {
  tier: PricingTier;
  className?: string;
}) {
  const { name, tagline, price, priceSuffix, features, highlight, ctaLabel, pilotNote } = tier;

  return (
    <article
      className={cn(
        "relative flex h-full flex-col gap-5 rounded-2xl border bg-card p-6 transition-all duration-[var(--duration-base)]",
        highlight
          ? "border-primary bg-primary/[0.03] shadow-[var(--shadow-lift)]"
          : "border-border/80 hover:border-primary/40",
        className,
      )}
    >
      {highlight && (
        <div className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground">
          <Sparkles className="size-3" />
          Pilot önerisi
        </div>
      )}

      <div>
        <h3 className="font-display text-[22px] font-black text-foreground">{name}</h3>
        <p className="mt-1 text-[13px] text-muted-foreground">{tagline}</p>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="font-display text-[36px] font-black text-foreground tabular-nums">
          {price}
        </span>
        {priceSuffix && (
          <span className="text-[14px] text-muted-foreground">{priceSuffix}</span>
        )}
      </div>

      {pilotNote && (
        <div className="rounded-md border border-primary/30 bg-primary/[0.06] px-3 py-2 text-[12px] leading-5 text-foreground/90">
          <span className="font-semibold text-primary">Pilot dönemi:</span>{" "}
          {pilotNote}
        </div>
      )}

      <ul className="flex-1 space-y-2.5 border-t border-border/70 pt-5 text-[14px] text-foreground/90">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.2} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={cn(
          "inline-flex h-11 items-center justify-center rounded-lg px-5 text-[14px] font-semibold transition-colors",
          highlight
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-border bg-background text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground",
        )}
      >
        {ctaLabel}
      </button>
    </article>
  );
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Discover",
    tagline: "Keşfet ve dene.",
    price: "₺0",
    priceSuffix: "/ sonsuza dek",
    features: [
      "Yetenek ve proje keşfi",
      "Ayda 20 mesaj hakkı",
      "1 fırsat yayını / ay",
      "Temel analitik",
    ],
    ctaLabel: "Ücretsiz başla",
  },
  {
    name: "Engage",
    tagline: "Aktif yetenek edinimi.",
    price: "-",
    priceSuffix: "aylık · pilot sonrası",
    features: [
      "Sınırsız mesaj",
      "10 fırsat yayını / ay",
      "Kaydedilen profil CRM",
      "Detaylı analitik + ekip raporu",
      "Öncelikli destek",
    ],
    highlight: true,
    pilotNote: "Eylül 2026 – Ocak 2027 arası tüm kurumlara ücretsiz.",
    ctaLabel: "Demo talep et",
  },
  {
    name: "Partner",
    tagline: "Branded program + API.",
    price: "Sözleşmeli",
    features: [
      "Branded yarışma / program",
      "Öne çıkarılmış fırsatlar",
      "Özel aday listesi",
      "API erişimi + entegrasyon",
      "Yıllık performans raporu",
    ],
    ctaLabel: "İletişime geç",
  },
];
