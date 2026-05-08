import Link from "next/link";

const NOISE_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.025 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--color-brand-700) 0%, var(--color-brand-800) 100%)",
      }}
    >
      {/* Static noise texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: `url("${NOISE_SVG}")`, opacity: 0.025 }}
      />

      <div className="relative mx-auto flex max-w-[var(--max-content)] flex-col items-center gap-8 px-[var(--space-gutter)] py-24 text-center md:py-32">
        {/* Eyebrow */}
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-brand-300)]">
          Pilot · Eylül 2026
        </span>

        {/* Headline */}
        <h2
          id="final-cta-heading"
          className="font-display font-black leading-[0.95] tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
        >
          Yeteneği erken görenler
          <br />
          önce kazanır.
        </h2>

        {/* Subhead */}
        <p
          className="max-w-[46ch] font-sans text-[17px] leading-relaxed"
          style={{ color: "color-mix(in srgb, var(--color-brand-100) 85%, white)" }}
        >
          Pilot dönem boyunca kurum hesabı ücretsiz. Liseli ve okul için sonsuza kadar ücretsiz.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/kurumlar"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-sans text-[15px] font-medium text-[var(--color-brand-700)] transition-shadow duration-200 hover:shadow-[0_0_0_3px_rgba(255,255,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-700)]"
          >
            Kurum hesabı oluştur
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/kayit/liseli"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.22)] px-7 py-3.5 font-sans text-[15px] font-medium text-white transition-colors duration-200 hover:border-[rgba(255,255,255,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-700)]"
          >
            Liseli olarak başla
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
