import Link from "next/link";

interface PricingTier {
  id: string;
  heading: string;
  tagline: string;
  price: string;
  priceSuffix?: string;
  pilotNote?: string;
  featured: boolean;
  features: { included: boolean; label: string }[];
  cta: { label: string; href: string };
}

const TIERS: PricingTier[] = [
  {
    id: "discover",
    heading: "Discover",
    tagline: "Keşfet ve dene.",
    price: "₺0",
    priceSuffix: "/ sonsuza dek",
    featured: false,
    features: [
      { included: true, label: "Yetenek ve proje keşfi" },
      { included: true, label: "Ayda 20 mesaj hakkı" },
      { included: true, label: "1 fırsat yayını / ay" },
      { included: true, label: "Temel analitik" },
      { included: false, label: "Sınırsız mesaj" },
      { included: false, label: "Kaydedilen profil CRM" },
      { included: false, label: "API erişimi" },
    ],
    cta: { label: "Ücretsiz başla", href: "/kayit/kurum" },
  },
  {
    id: "engage",
    heading: "Engage",
    tagline: "Aktif yetenek edinimi.",
    price: "-",
    priceSuffix: "aylık · pilot sonrası",
    pilotNote: "Eylül 2026 – Ocak 2027 arası tüm kurumlara ücretsiz.",
    featured: true,
    features: [
      { included: true, label: "Yetenek ve proje keşfi" },
      { included: true, label: "Sınırsız mesaj" },
      { included: true, label: "10 fırsat yayını / ay" },
      { included: true, label: "Kaydedilen profil CRM" },
      { included: true, label: "Detaylı analitik + ekip raporu" },
      { included: true, label: "Öncelikli destek" },
      { included: false, label: "API erişimi" },
    ],
    cta: { label: "Demo talep et", href: "/iletisim" },
  },
  {
    id: "partner",
    heading: "Partner",
    tagline: "Branded program + API.",
    price: "Sözleşmeli",
    featured: false,
    features: [
      { included: true, label: "Yetenek ve proje keşfi" },
      { included: true, label: "Sınırsız mesaj" },
      { included: true, label: "Branded yarışma / program" },
      { included: true, label: "Öne çıkarılmış fırsatlar" },
      { included: true, label: "Özel aday listesi" },
      { included: true, label: "API erişimi + entegrasyon" },
      { included: true, label: "Yıllık performans raporu" },
    ],
    cta: { label: "İletişime geç", href: "/iletisim" },
  },
];

export function Pricing() {
  return (
    <section
      id="fiyatlar"
      aria-labelledby="pricing-heading"
      className="border-y border-[var(--rule)] bg-[var(--surface-1)]"
    >
      <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)] py-[var(--space-section-y)]">
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-brand-500)]">
            · Katmanlar
          </span>
          <h2
            id="pricing-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Üç katman.
            <br />
            Pilot sonrası tarife belirlenir.
          </h2>
          <p className="max-w-[44ch] font-sans text-[16px] leading-relaxed text-[var(--ink-2)]">
            Pilot döneminde (Eylül 2026 – Ocak 2027) tüm kurumlar Discover + Engage&rsquo;e
            ücretsiz erişir. Aylık ücret pilot verisiyle Ocak 2027&rsquo;de belirlenir.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[var(--rule)] md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col gap-6 p-8 md:p-10 ${
                tier.featured
                  ? "bg-[var(--ink)] text-white"
                  : "bg-[var(--surface-1)]"
              }`}
            >
              {/* Header */}
              <div className="flex flex-col gap-2">
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                    tier.featured ? "text-[var(--color-brand-300)]" : "text-[var(--ink-3)]"
                  }`}
                >
                  {tier.heading}
                </span>
                <p
                  className={`font-sans text-[13px] ${
                    tier.featured ? "text-white/70" : "text-[var(--ink-2)]"
                  }`}
                >
                  {tier.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1">
                <span
                  className={`font-display font-black leading-none tracking-[-0.04em] tabular-nums ${
                    tier.featured ? "text-white" : "text-[var(--color-brand-500)]"
                  }`}
                  style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)" }}
                >
                  {tier.price}
                </span>
                {tier.priceSuffix && (
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.1em] ${
                      tier.featured ? "text-white/50" : "text-[var(--ink-3)]"
                    }`}
                  >
                    {tier.priceSuffix}
                  </span>
                )}
              </div>

              {/* Pilot note */}
              {tier.pilotNote && (
                <p className="rounded border border-[var(--color-brand-300)]/30 bg-[var(--color-brand-300)]/10 px-3 py-2 font-mono text-[10px] leading-snug text-[var(--color-brand-300)]">
                  {tier.pilotNote}
                </p>
              )}

              {/* Features */}
              <ul className="flex flex-col gap-2.5">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 shrink-0 font-mono text-[11px] ${
                        f.included
                          ? tier.featured
                            ? "text-[var(--color-brand-300)]"
                            : "text-[var(--color-brand-500)]"
                          : tier.featured
                          ? "text-white/20"
                          : "text-[var(--ink-3)] opacity-30"
                      }`}
                    >
                      {f.included ? "✓" : "✗"}
                    </span>
                    <span
                      className={`font-sans text-[13px] leading-snug ${
                        f.included
                          ? tier.featured
                            ? "text-white/90"
                            : "text-[var(--ink-2)]"
                          : tier.featured
                          ? "text-white/25"
                          : "text-[var(--ink-3)] opacity-40"
                      }`}
                    >
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={tier.cta.href}
                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-[14px] font-medium transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  tier.featured
                    ? "bg-white text-[var(--color-brand-700)] hover:shadow-[0_0_0_3px_rgba(255,255,255,0.2)] focus-visible:ring-white focus-visible:ring-offset-[var(--ink)]"
                    : "border border-[var(--rule)] bg-[var(--surface-0)] text-[var(--ink)] hover:shadow-[var(--shadow-lift)] focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-[var(--surface-1)]"
                }`}
              >
                {tier.cta.label}
                <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
