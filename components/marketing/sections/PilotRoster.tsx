import { cn } from "@/lib/utils";

interface PilotCity {
  name: string;
  schoolCount: number;
  district?: string;
}

interface PilotRosterProps {
  cities?: PilotCity[];
  className?: string;
}

const DEFAULT_CITIES: PilotCity[] = [
  { name: "İstanbul", schoolCount: 2, district: "Kadıköy · Sarıyer" },
  { name: "Ankara", schoolCount: 2, district: "Çankaya · Yenimahalle" },
  { name: "İzmir", schoolCount: 2, district: "Karşıyaka · Bornova" },
];

export function PilotRoster({ cities = DEFAULT_CITIES, className }: PilotRosterProps) {
  const totalSchools = cities.reduce((sum, c) => sum + c.schoolCount, 0);
  const [primary, ...secondary] = cities;

  return (
    <div className={cn("flex flex-col gap-10 md:gap-14", className)}>
      {/* Section header */}
      <div className="flex flex-col gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
          Eylül 2026 · Pilot Kadro
        </span>
        <h3 className="font-display text-[var(--text-3xl)] font-black leading-[1.0] tracking-[-0.035em] text-[var(--ink)] md:text-[var(--text-4xl)]">
          {cities.length} şehir. {totalSchools} okul.<br />
          <span className="text-[var(--ink-3)]">Gerçek taahhüt.</span>
        </h3>
        <p className="max-w-[48ch] font-body font-light italic text-[var(--text-base)] leading-[1.55] text-[var(--ink-2)]">
          Pilot, kurumsal cila değil, bir taahhüt. Eylül 2026&rsquo;da kapı açılıyor.
        </p>
      </div>

      {/* Asymmetric city grid */}
      <div className="grid grid-cols-1 gap-px bg-[var(--rule)] md:grid-cols-[55%_1fr_1fr]">
        {/* Primary city, dominant */}
        {primary && (
          <CityPanel
            city={primary}
            index={0}
            total={cities.length}
            size="large"
          />
        )}
        {/* Secondary cities */}
        <div className="contents">
          {secondary.map((city, i) => (
            <CityPanel
              key={city.name}
              city={city}
              index={i + 1}
              total={cities.length}
              size="small"
            />
          ))}
        </div>
      </div>

      {/* Pilot note */}
      <div className="flex items-center gap-4 border-t border-[var(--rule)] pt-6">
        <span
          aria-hidden
          className="inline-flex h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand-500)]"
          style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
        />
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
          Pilot programına başvurmak için{" "}
          <a
            href="/pilot-basvuru"
            className="text-[var(--ink-2)] underline underline-offset-2 hover:text-[var(--ink)] transition-colors"
          >
            form doldurun
          </a>{" "}
         , ücretsiz.
        </p>
      </div>
    </div>
  );
}

function CityPanel({
  city,
  index,
  total,
  size,
}: {
  city: PilotCity;
  index: number;
  total: number;
  size: "large" | "small";
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between gap-10 bg-[var(--surface-1)]",
        size === "large" ? "p-10 md:p-14 min-h-[320px]" : "p-8 md:p-10 min-h-[240px]"
      )}
    >
      {/* Brand-left accent strip */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[2px] bg-[var(--color-brand-500)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Index / total */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <svg
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
          className="h-3.5 w-3.5 text-[var(--color-brand-500)] opacity-60"
        >
          <path
            d="M7 1C4.79 1 3 2.79 3 5C3 7.5 7 13 7 13C7 13 11 7.5 11 5C11 2.79 9.21 1 7 1Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <circle cx="7" cy="5" r="1.4" fill="currentColor" />
        </svg>
      </div>

      {/* City name, protagonist */}
      <div className="flex flex-col gap-2">
        <h4
          className="font-display font-black leading-[0.88] tracking-[-0.045em] text-[var(--ink)]"
          style={{
            fontSize:
              size === "large" ? "clamp(3rem, 7vw, 5.5rem)" : "clamp(2.2rem, 4vw, 3.5rem)",
          }}
        >
          {city.name}
        </h4>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-3)]">
            {city.schoolCount} pilot okul
          </span>
          {city.district && (
            <>
              <span aria-hidden className="h-px w-3 bg-[var(--rule)]" />
              <span className="font-sans text-[12px] text-[var(--ink-3)]">
                {city.district}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Pilot pill */}
      <div className="self-start inline-flex items-center gap-2 border border-[var(--accent-warm-strong)] bg-[var(--accent-warm)] px-3 py-1.5 rounded-full">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-500)]" />
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--accent-warm-ink)]">
          Pilot · Eylül 2026
        </span>
      </div>
    </div>
  );
}
