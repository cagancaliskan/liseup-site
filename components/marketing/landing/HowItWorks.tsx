import { cn } from "@/lib/utils";

interface Step {
  number: string;
  audience: string;
  headline: string;
  body: string;
  illustration: React.ReactNode;
}

function ProfileMock() {
  return (
    <svg viewBox="0 0 320 200" fill="none" className="h-full w-full" aria-hidden="true">
      {/* Card shell */}
      <rect x="20" y="16" width="280" height="168" rx="4" stroke="var(--ink-3)" strokeWidth="1" fill="var(--surface-0)" strokeOpacity="0.5" />
      {/* Avatar */}
      <circle cx="60" cy="56" r="20" stroke="var(--color-brand-500)" strokeWidth="1.5" fill="color-mix(in srgb, var(--color-brand-500) 10%, var(--surface-0))" />
      <text x="60" y="61" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="var(--color-brand-500)">AK</text>
      {/* Name + city */}
      <rect x="92" y="42" width="80" height="6" rx="3" fill="var(--ink)" opacity="0.7" />
      <rect x="92" y="54" width="54" height="5" rx="2.5" fill="var(--ink-3)" opacity="0.4" />
      {/* Project card */}
      <rect x="20" y="92" width="280" height="52" rx="3" fill="var(--surface-1)" stroke="var(--rule)" strokeWidth="1" />
      <rect x="32" y="104" width="6" height="6" rx="1" fill="var(--color-brand-500)" opacity="0.7" />
      <rect x="44" y="104" width="100" height="5" rx="2.5" fill="var(--ink-2)" opacity="0.6" />
      <rect x="44" y="115" width="72" height="4" rx="2" fill="var(--ink-3)" opacity="0.35" />
      {/* Veli onayı pill */}
      <rect x="20" y="160" width="100" height="18" rx="9" fill="color-mix(in srgb, var(--color-brand-500) 12%, var(--surface-0))" stroke="color-mix(in srgb, var(--color-brand-500) 30%, transparent)" strokeWidth="1" />
      <circle cx="35" cy="169" r="3" fill="var(--color-brand-500)" />
      <rect x="44" y="165" width="66" height="8" rx="4" fill="var(--color-brand-500)" opacity="0.25" />
    </svg>
  );
}

function DiscoveryMock() {
  return (
    <svg viewBox="0 0 320 200" fill="none" className="h-full w-full" aria-hidden="true">
      {/* Filter chips row */}
      <rect x="20" y="18" width="54" height="18" rx="9" fill="var(--color-brand-500)" />
      <rect x="20" y="18" width="54" height="18" rx="9" fill="none" stroke="var(--color-brand-500)" strokeWidth="1" />
      <rect x="80" y="18" width="54" height="18" rx="9" fill="none" stroke="var(--rule)" strokeWidth="1" />
      <rect x="140" y="18" width="54" height="18" rx="9" fill="none" stroke="var(--rule)" strokeWidth="1" />
      <rect x="200" y="18" width="54" height="18" rx="9" fill="none" stroke="var(--rule)" strokeWidth="1" />
      {/* Active chip label */}
      <rect x="30" y="24" width="34" height="6" rx="3" fill="white" opacity="0.9" />
      {/* 4 cards, 2 highlighted, 2 faded */}
      {[0, 1, 2, 3].map((i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 20 + col * 152;
        const y = 50 + row * 74;
        const highlighted = i < 2;
        return (
          <g key={i}>
            <rect x={x} y={y} width="140" height="62" rx="3"
              fill={highlighted ? "var(--surface-0)" : "var(--surface-1)"}
              stroke={highlighted ? "var(--color-brand-500)" : "var(--rule)"}
              strokeWidth={highlighted ? "1.2" : "1"}
              opacity={highlighted ? 1 : 0.45}
            />
            <circle cx={x + 16} cy={y + 18} r={8}
              fill="color-mix(in srgb, var(--color-brand-500) 15%, var(--surface-0))"
              stroke="var(--color-brand-500)" strokeWidth="1" opacity={highlighted ? 0.8 : 0.4}
            />
            <rect x={x + 30} y={y + 11} width={highlighted ? 70 : 55} height="5" rx="2.5"
              fill="var(--ink-2)" opacity={highlighted ? 0.65 : 0.3} />
            <rect x={x + 30} y={y + 22} width={highlighted ? 46 : 36} height="4" rx="2"
              fill="var(--ink-3)" opacity={highlighted ? 0.4 : 0.2} />
            <rect x={x + 10} y={y + 40} width={highlighted ? 60 : 44} height="12" rx="6"
              fill={highlighted ? "color-mix(in srgb, var(--color-brand-500) 12%, var(--surface-0))" : "var(--surface-2)"}
              stroke={highlighted ? "color-mix(in srgb, var(--color-brand-500) 30%, transparent)" : "var(--rule)"}
              strokeWidth="1" opacity={highlighted ? 1 : 0.35}
            />
          </g>
        );
      })}
    </svg>
  );
}

function DashboardMock() {
  const tiles = [
    { label: "Öğrenci", val: "124" },
    { label: "Aktif proje", val: "38" },
    { label: "Bağlantı", val: "17" },
    { label: "Bu ay", val: "+12" },
  ];
  return (
    <svg viewBox="0 0 320 200" fill="none" className="h-full w-full" aria-hidden="true">
      {/* 4 stat tiles */}
      {tiles.map((t, i) => {
        const x = 20 + (i % 2) * 148;
        const y = 16 + Math.floor(i / 2) * 56;
        return (
          <g key={t.label}>
            <rect x={x} y={y} width="136" height="44" rx="3" fill="var(--surface-1)" stroke="var(--rule)" strokeWidth="1" />
            <rect x={x + 10} y={y + 9} width={30} height="5" rx="2.5" fill="var(--ink-3)" opacity="0.4" />
            <text x={x + 10} y={y + 35} fontFamily="inherit" fontSize="13" fontWeight="700" fill="var(--color-brand-500)" opacity="0.9">{t.val}</text>
          </g>
        );
      })}
      {/* Sparkline */}
      <rect x="20" y="132" width="280" height="52" rx="3" fill="var(--surface-1)" stroke="var(--rule)" strokeWidth="1" />
      <polyline points="32,172 68,158 104,163 140,148 176,152 212,138 248,142 284,128"
        stroke="var(--color-brand-500)" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <circle cx="284" cy="128" r="3" fill="var(--color-brand-500)" />
    </svg>
  );
}

const STEPS: Step[] = [
  {
    number: "01",
    audience: "Liseli",
    headline: "Profilini kur, projeni paylaş.",
    body: "3 dakikada profil aç, projeni yayınla. 18 yaş altıysan veli onayı tek e-postayla tamamlanır. Ekip arkadaşı, kurum ve mentorlar aynı keşfet sayfasında.",
    illustration: <ProfileMock />,
  },
  {
    number: "02",
    audience: "Kurum",
    headline: "Filtrele, keşfet, bağlan.",
    body: "VC fonları, şirketler ve STK'lar; şehir, yaş, ilgi alanı ve proje tipine göre lise yeteneklerini filtreler. Doğrulanmış öğrenciye tek tıkla mesaj gönderilir.",
    illustration: <DiscoveryMock />,
  },
  {
    number: "03",
    audience: "Okul",
    headline: "İzle, raporla, paylaş.",
    body: "Okul yöneticisi öğrencilerinin platform aktivitesini gerçek zamanlı görür. Aylık raporlar otomatik oluşur; başarı vitrini partner kurumlarla paylaşılabilir.",
    illustration: <DashboardMock />,
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="bg-[var(--surface-0)]">
      <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)] py-[var(--space-section-y)]">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Nasıl çalışır
          </span>
          <h2
            id="how-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Üç adım. Her taraf için.
          </h2>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-0">
          {STEPS.map((step, i) => {
            const isOdd = i % 2 !== 0;
            return (
              <div
                key={step.number}
                className={cn(
                  "grid grid-cols-1 border-t border-[var(--rule)] py-14 md:grid-cols-2 md:gap-16 md:py-20",
                  isOdd ? "md:[direction:rtl]" : ""
                )}
              >
                {/* Text col, reset direction inside so text stays LTR */}
                <div
                  className={cn(
                    "flex flex-col gap-6 [direction:ltr]",
                    isOdd ? "md:pr-0" : ""
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[13px] font-medium tabular-nums text-[var(--color-brand-500)]">
                      {step.number}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
                      {step.audience}
                    </span>
                  </div>
                  <h3 className="font-display text-[24px] font-bold leading-tight tracking-[-0.025em] text-[var(--ink)]">
                    {step.headline}
                  </h3>
                  <p className="max-w-[44ch] font-sans text-[15px] leading-relaxed text-[var(--ink-2)]">
                    {step.body}
                  </p>
                </div>

                {/* Illustration col */}
                <div className="mt-8 h-48 [direction:ltr] md:mt-0 md:h-auto">
                  {step.illustration}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
