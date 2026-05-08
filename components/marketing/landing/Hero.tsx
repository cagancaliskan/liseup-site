import { MagneticButton } from "@/components/marketing/primitives/MagneticButton";
import { LiveDiscoveryPanel } from "./LiveDiscoveryPanel";

const STATS = [
  { value: "4,8M", label: "öğrenci" },
  { value: "478", label: "aktif fon" },
  { value: "3", label: "pilot şehir" },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative bg-[var(--surface-0)] pt-28 pb-16 md:pt-32 md:pb-24"
    >
      {/* Subtle spotlight behind the type, static, GPU-cheap */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
        style={{ background: "var(--gradient-spotlight)" }}
      />

      <div className="relative mx-auto grid max-w-[var(--max-content)] grid-cols-1 items-start gap-12 px-[var(--space-gutter)] lg:grid-cols-[1fr_52%] lg:gap-16">
        {/* ── Left column, value prop ── */}
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
              Türkiye&rsquo;nin lise yetenek platformu
            </span>
          </div>

          {/* Display headline */}
          <h1
            id="hero-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.045em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2.5rem, 5.6vw, 4.75rem)" }}
          >
            Liselinin{" "}
            <strong className="font-black text-[var(--color-brand-500)]">ekibi</strong>.<br />
            Kurumun{" "}
            <strong className="font-black text-[var(--color-brand-500)]">yeteneği</strong>.<br />
            Okulun{" "}
            <strong className="font-black text-[var(--color-brand-500)]">vitrini</strong>.
          </h1>

          {/* Subhead */}
          <p className="max-w-[44ch] font-sans text-[17px] leading-relaxed text-[var(--ink-2)]">
            Lise öğrencisi profilini kurar, projesini paylaşır. Kurum, fon, STK; şehir ve ilgi
            alanına göre yeteneği keşfeder. Okul, öğrencisinin gerçek aktivitesini izler.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton href="/kurumlar" variant="primary">
              Kurum hesabı oluştur
            </MagneticButton>
            <MagneticButton href="/kayit/liseli" variant="outline">
              Liseli olarak başla
            </MagneticButton>
          </div>

          {/* Stat strip */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {STATS.map((s, i) => (
              <span key={s.label} className="flex items-center gap-2">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-500)] opacity-60"
                  />
                )}
                <span className="font-mono text-[12px] text-[var(--ink-3)]">
                  <span className="font-medium text-[var(--ink-2)]">{s.value}</span>{" "}
                  {s.label}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Right column, live discovery panel ── */}
        <div className="w-full min-h-[480px]">
          <LiveDiscoveryPanel />
        </div>
      </div>
    </section>
  );
}
