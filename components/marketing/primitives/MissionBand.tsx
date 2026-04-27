import { cn } from "@/lib/utils";

interface ManifestoPillar {
  label: string;
  body: string;
}

interface MissionBandProps {
  className?: string;
  variant?: "default" | "manifesto";
  quote?: string;
  attribution?: string;
  pillars?: ManifestoPillar[];
}

const defaultPillars: ManifestoPillar[] = [
  {
    label: "Şeffaflık",
    body: "Her gelir kaleminin nereye gittiğini yıllık raporda görebilirsin.",
  },
  {
    label: "Ücretsizlik",
    body: "Liseli ve okul üyeliği sonsuza kadar ücretsiz kalır. Söz.",
  },
  {
    label: "Topluluk",
    body: "Platformu yönetenlerin yarısı liseli. Karar masasında onlar var.",
  },
];

export function MissionBand({
  className,
  variant = "default",
  quote = "Yetenek bir piyasa malı değil. Bir ortak iyilik.",
  attribution = "LiseUP Derneği",
  pillars = defaultPillars,
}: MissionBandProps) {
  if (variant === "manifesto") {
    return (
      <div
        className={cn(
          "relative -mx-[var(--space-gutter)] overflow-hidden",
          "bg-[var(--accent-warm)]",
          "px-[var(--space-gutter)]",
          "py-24 md:py-36 xl:py-44",
          className
        )}
      >
        {/* Oversized decorative opener, editorial typographic ornament */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -left-4 -top-10 font-display font-black leading-none text-[var(--color-brand-500)]"
          style={{
            fontSize: "clamp(160px, 28vw, 400px)",
            opacity: 0.08,
            lineHeight: 1,
          }}
        >
          &ldquo;
        </span>

        <div className="relative mx-auto max-w-[var(--max-content)] flex flex-col gap-20 md:gap-28">
          {/* Quote block */}
          <div className="flex flex-col gap-8 md:gap-10">
            <div className="flex items-center gap-4">
              <span className="h-[2px] w-10 bg-[var(--color-brand-500)]" aria-hidden />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-warm-ink)] opacity-60">
                Misyon
              </span>
            </div>

            <blockquote
              className="font-display font-black leading-[0.92] tracking-[-0.04em] text-[var(--ink)] [text-wrap:balance]"
              style={{ fontSize: "clamp(2.2rem, 6vw, 6rem)" }}
            >
              {quote}
            </blockquote>

            {attribution && (
              <span className="font-body font-light italic text-[var(--text-md)] tracking-[-0.005em] text-[var(--accent-warm-ink)] opacity-65">
               , {attribution}
              </span>
            )}
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 gap-10 border-t border-[var(--accent-warm-strong)] pt-12 md:grid-cols-3 md:gap-16">
            {pillars.map((pillar, i) => (
              <div key={pillar.label} className="flex flex-col gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tabular-nums text-[var(--accent-warm-ink)] opacity-40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[15px] font-black tracking-[-0.02em] text-[var(--ink)]">
                    {pillar.label}
                  </span>
                </div>
                <p className="font-sans text-[var(--text-sm)] leading-[1.6] text-[var(--ink-2)]">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-10 border-y border-[var(--rule)] py-16 md:flex-row md:items-start md:gap-20 md:py-20",
        className
      )}
    >
      <div className="flex flex-col gap-4 md:flex-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-brand-500)]">
          Dernek
        </span>
        <p className="font-display text-[var(--text-lg)] font-bold leading-snug tracking-[-0.015em] text-[var(--ink)]">
          LiseUP Derneği
        </p>
        <p className="font-sans text-[var(--text-base)] leading-[1.6] text-[var(--ink-2)]">
          Platform, kar amacı gütmeyen LiseUP Derneği çatısı altında yürütülüyor. Liseli ve okul üyeliği sonsuza kadar ücretsiz; ticari sürdürülebilirlik kurum tarafından sağlanıyor.
        </p>
      </div>

      <div className="h-px w-full bg-[var(--rule)] md:hidden" />

      <div className="flex flex-col gap-4 md:flex-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
          İktisadi İşletme
        </span>
        <p className="font-display text-[var(--text-lg)] font-bold leading-snug tracking-[-0.015em] text-[var(--ink)]">
          Şeffaf Gelir Modeli
        </p>
        <p className="font-sans text-[var(--text-base)] leading-[1.6] text-[var(--ink-2)]">
          Kurum erişim ücretleri derneğin iktisadi işletmesi üzerinden tahsil edilir. Tüm gelir platformun geliştirilmesine ve lise ekosisteminin büyütülmesine aktarılır. KVKK uyumlu, denetlenebilir.
        </p>
      </div>
    </div>
  );
}
