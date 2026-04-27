import { Check, Sparkles } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { getKurumSession } from "@/lib/session";

const TIERS = [
  {
    name: "Discover",
    tagline: "Keşfet ve dene.",
    price: "₺0",
    priceSuffix: "/ sonsuza dek",
    features: [
      "Yetenek + proje keşfi",
      "Ayda 20 mesaj hakkı",
      "1 fırsat yayını / ay",
      "Temel analitik",
    ],
  },
  {
    name: "Engage",
    tagline: "Aktif yetenek edinimi.",
    price: "-",
    priceSuffix: "aylık · pilot sonrası belirlenir",
    pilotNote: "Pilot dönemi (Eyl 2026 – Oca 2027) tüm kurumlara ücretsiz.",
    features: [
      "Sınırsız mesaj",
      "10 fırsat yayını / ay",
      "Kaydedilen profil CRM",
      "Detaylı analitik + ekip raporu",
      "Öncelikli destek",
    ],
    highlight: true,
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
  },
];

export default function KurumAbonelikPage() {
  const session = getKurumSession();
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/kurum" },
          { label: "Abonelik" },
        ]}
        title="Abonelik katmanı"
        description={`Mevcut katmanın: ${session.tier}. Pilot dönemi tüm Engage özellikleri ücretsiz.`}
      />
      <div className="grid gap-6 px-4 py-8 md:grid-cols-3 md:px-8 md:py-10">
        {TIERS.map((t) => (
          <article
            key={t.name}
            className={
              t.highlight
                ? "relative flex flex-col gap-4 rounded-2xl border-2 border-primary bg-primary/[0.03] p-6 shadow-[var(--shadow-lift)]"
                : "flex flex-col gap-4 rounded-2xl border border-border/80 bg-card p-6"
            }
          >
            {t.highlight && (
              <div className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground">
                <Sparkles className="size-3" />
                Pilot önerisi
              </div>
            )}
            <div>
              <h3 className="font-display text-[20px] font-black text-foreground">
                {t.name}
              </h3>
              <p className="mt-1 text-[12px] text-muted-foreground">{t.tagline}</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-[32px] font-black text-foreground tabular-nums">
                {t.price}
              </span>
              <span className="text-[12px] text-muted-foreground">
                {t.priceSuffix}
              </span>
            </div>
            {t.pilotNote && (
              <div className="rounded-md border border-primary/30 bg-primary/[0.06] px-3 py-2 text-[12px] leading-5">
                <span className="font-semibold text-primary">Pilot:</span>{" "}
                {t.pilotNote}
              </div>
            )}
            <ul className="flex-1 space-y-2 border-t border-border/70 pt-4 text-[13px] text-foreground/90">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.2} />
                  {f}
                </li>
              ))}
            </ul>
            <DemoActionButton
              variant={t.highlight ? "default" : "outline"}
              size="default"
              className="mt-2"
              action={t.name === session.tier ? "Bu zaten mevcut katmanın" : `${t.name} katmanına geçiş talebi alındı`}
            >
              {t.name === session.tier ? "Mevcut katman" : `${t.name}'e geç`}
            </DemoActionButton>
          </article>
        ))}
      </div>
    </>
  );
}
