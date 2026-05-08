import Link from "next/link";
import { cn } from "@/lib/utils";

interface AudienceData {
  number: string;
  slug: string;
  label: string;
  href: string;
  headline: string;
  body: string;
  bullets: string[];
}

const AUDIENCES: AudienceData[] = [
  {
    number: "01",
    slug: "liseli",
    label: "Liseli",
    href: "/liseliler",
    headline: "Fikrini ekibinle gerçeğe dönüştür.",
    body: "Profilini kur, projeni paylaş, ekibini bul. Velinin onayıyla, sonsuza kadar ücretsiz.",
    bullets: [
      "Dakikalar içinde profil ve veli onayı",
      "Ekip arkadaşı, mentor, proje fonu eşleşmesi",
      "İlk staj, burs ve fırsat bildirimleri",
    ],
  },
  {
    number: "02",
    slug: "kurum",
    label: "Kurum",
    href: "/kurumlar",
    headline: "Yeteneği herkesten önce gör.",
    body: "Türkiye'nin lise yetenek havuzunu filtreleyin, mesaj atın, fırsat yayınlayın. Pilot dönem ücretsiz.",
    bullets: [
      "Şehir, yaş, ilgi alanı ve proje tipiyle filtre",
      "Doğrulanmış öğrenciye tek tıkla mesaj",
      "Fırsat / staj / burs ilanı yayını",
    ],
  },
  {
    number: "03",
    slug: "okul",
    label: "Okul",
    href: "/okullar",
    headline: "Öğrencini sahnede izle.",
    body: "Aktivite raporu, başarı vitrini, partner kurum ayrıcalıkları, okulun için sonsuza kadar ücretsiz.",
    bullets: [
      "Gerçek zamanlı öğrenci aktivite paneli",
      "Aylık + dönem sonu otomatik rapor",
      "Partner kurum eşleştirme ayrıcalığı",
    ],
  },
];

export function Audiences() {
  return (
    <section aria-labelledby="audiences-heading" className="bg-[var(--surface-0)]">
      <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)] py-[var(--space-section-y)]">
        {/* Section header */}
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Kim için
          </span>
          <h2
            id="audiences-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Üç taraf. Tek platform.
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-px bg-[var(--rule)] md:grid-cols-3">
          {AUDIENCES.map((a) => (
            <AudienceCard key={a.slug} data={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceCard({ data }: { data: AudienceData }) {
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-8 bg-[var(--surface-0)] p-8 md:p-10",
        "transition-shadow duration-[220ms] ease-[var(--ease-instrumental)]",
        "hover:shadow-[var(--shadow-lift)]"
      )}
    >
      {/* Top: number + label */}
      <div className="flex items-end justify-between">
        <span
          className="font-display font-black leading-none tracking-[-0.04em] text-[var(--color-brand-500)]"
          style={{ fontSize: "clamp(3rem, 5vw, 4rem)" }}
        >
          {data.number}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
          {data.label}
        </span>
      </div>

      {/* Headline */}
      <h3 className="font-display text-[22px] font-bold leading-tight tracking-[-0.02em] text-[var(--ink)]">
        {data.headline}
      </h3>

      {/* Body */}
      <p className="font-sans text-[14px] leading-relaxed text-[var(--ink-2)]">{data.body}</p>

      {/* Bullets */}
      <ul className="flex flex-col gap-2.5">
        {data.bullets.map((b, i) => (
          <li key={b} className="flex items-start gap-3">
            <span className="font-mono text-[10px] leading-none mt-[3px] tabular-nums text-[var(--color-brand-500)] shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-sans text-[13px] leading-snug text-[var(--ink-2)]">{b}</span>
          </li>
        ))}
      </ul>

      {/* Footer link */}
      <Link
        href={data.href}
        className="mt-auto flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-2)] transition-colors duration-150 hover:text-[var(--ink)] focus-visible:outline-none focus-visible:underline"
      >
        <span>Devamını gör</span>
        <span
          aria-hidden
          className="inline-block transition-transform duration-150 group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </div>
  );
}
