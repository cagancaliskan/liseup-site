import { MagneticButton } from "@/components/marketing/primitives/MagneticButton";
import { KurumMock } from "./KurumMock";

const CHIPS = ["Pilot Eylül 2026", "Tüm katmanlar ücretsiz", "KVKK Uyumlu"];

export function Hero() {
  return (
    <section
      aria-labelledby="kurum-hero-heading"
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
              LiseUP Kurumlar · B2B
            </span>
          </div>

          {/* Display headline */}
          <h1
            id="kurum-hero-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.045em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2.5rem, 5.6vw, 4.75rem)" }}
          >
            478 fonun aynı
            <br />
            pitch&rsquo;lere baktığı
            <br />
            <strong className="font-black text-[var(--color-brand-500)]">yerde değil.</strong>
          </h1>

          {/* Lede */}
          <p className="max-w-[44ch] font-sans text-[17px] leading-relaxed text-[var(--ink-2)]">
            Türkiye&rsquo;nin 14–18 yaş yetenek havuzuna yapısal erişim. Filtrele, fırsatını
            yayımla, kabul eden liseliyle konuş, KVKK uyumlu ve moderasyonlu.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton href="/kayit/kurum" variant="primary">
              Kurum hesabı oluştur
            </MagneticButton>
            <MagneticButton href="#fiyatlar" variant="outline">
              Katmanları gör
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
          <KurumMock />
        </div>
      </div>
    </section>
  );
}
