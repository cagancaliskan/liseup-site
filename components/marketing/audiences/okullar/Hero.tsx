import { MagneticButton } from "@/components/marketing/primitives/MagneticButton";
import { OkulMock } from "./OkulMock";

const CHIPS = ["Pilot Eylül 2026 – Ocak 2027", "Okul ücretsiz", "4 ay"];

export function Hero() {
  return (
    <section
      aria-labelledby="okul-hero-heading"
      className="relative bg-[var(--surface-0)] pt-28 pb-16 md:pt-32 md:pb-24"
    >
      {/* Spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
        style={{ background: "var(--gradient-spotlight)" }}
      />

      <div className="relative mx-auto grid max-w-[var(--max-content)] grid-cols-1 items-start gap-12 px-[var(--space-gutter)] lg:grid-cols-[1fr_52%] lg:gap-16">
        {/* Left column */}
        <div className="flex flex-col gap-8">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-[var(--color-brand-500)]"
              style={{ animation: "live-pulse 1.6s ease-in-out infinite" }}
            />
            <style>{`
              @keyframes live-pulse {
                0%, 100% { opacity: 1; }
                50%       { opacity: 0.35; }
              }
            `}</style>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-2)]">
              LiseUP · Okullar için · Pilot başvurusu açık
            </span>
          </div>

          {/* Display headline */}
          <h1
            id="okul-hero-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.045em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2.5rem, 5.6vw, 4.75rem)" }}
          >
            Öğrencin
            <br />
            ne yapıyor?
            <br />
            <strong className="font-black text-[var(--color-brand-500)]">Şimdi gör.</strong>
          </h1>

          {/* Lede */}
          <p className="max-w-[44ch] font-sans text-[17px] leading-relaxed text-[var(--ink-2)]">
            Aktivite raporu, başarı vitrini, partner kurum ayrıcalıkları, okulun için sonsuza
            kadar ücretsiz. Pilot Eylül 2026.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton href="/pilot-basvuru" variant="primary">
              Pilot başvurusu yap
            </MagneticButton>
            <MagneticButton href="#program" variant="outline">
              Programı gör
            </MagneticButton>
          </div>

          {/* Chip strip */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {CHIPS.map((chip, i) => (
              <span key={chip} className="flex items-center gap-2">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-500)] opacity-60"
                  />
                )}
                <span className="font-mono text-[12px] text-[var(--ink-3)]">{chip}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right column, mock */}
        <div className="w-full min-h-[480px]">
          <OkulMock />
        </div>
      </div>
    </section>
  );
}
