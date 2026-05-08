import Link from "next/link";
import { footerNav } from "@/lib/nav";

const currentYear = new Date().getFullYear();

const NAV_COLUMNS = [
  { heading: "Platform", links: footerNav.platform },
  { heading: "Keşfet", links: footerNav.kesfet },
  { heading: "Hakkında", links: footerNav.sirket },
  { heading: "Yasal", links: footerNav.yasal },
];

export function MarketingFooter() {
  return (
    <footer className="relative bg-[var(--paper)] border-t border-[color-mix(in_srgb,var(--paper-ink)_12%,transparent)]">
      {/* Brand accent at top edge */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-[var(--color-brand-500)]" />

      <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)]">
        {/* Masthead row */}
        <div className="flex flex-col gap-6 border-b border-[color-mix(in_srgb,var(--paper-ink)_10%,transparent)] py-12 md:flex-row md:items-end md:justify-between md:py-16">
          {/* Large wordmark */}
          <div className="flex flex-col gap-2">
            <span className="font-display text-[clamp(3rem,8vw,6rem)] font-black leading-[0.85] tracking-[-0.05em] text-[var(--paper-ink)]">
              Lise<span className="text-[var(--color-brand-500)]">UP</span>
            </span>
            <p className="max-w-[36ch] font-body font-light italic text-[15px] leading-snug text-[var(--paper-ink)] opacity-55">
              Liselinin ekibini, kurumun yeteneğini bulduğu platform. Türkiye&rsquo;de lise öğrencilerine sonsuza kadar ücretsiz.
            </p>
          </div>

          {/* Status mark */}
          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="inline-flex items-center gap-3 border border-[color-mix(in_srgb,var(--paper-ink)_15%,transparent)] bg-[color-mix(in_srgb,var(--paper-ink)_4%,transparent)] px-4 py-2">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--shock)]"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--paper-ink)] opacity-70">
                Pilot · Eylül 2026 · İstanbul · Ankara · İzmir
              </span>
            </div>
            <a
              href="mailto:info@liseup.org"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--paper-ink)] opacity-45 hover:opacity-80 transition-opacity duration-200"
            >
              info@liseup.org
            </a>
          </div>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 md:grid-cols-4 md:py-16">
          {NAV_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--paper-ink)] opacity-40">
                {col.heading}
              </span>
              <ul className="flex flex-col gap-3" role="list">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-[13px] text-[var(--paper-ink)] opacity-60 hover:opacity-100 transition-opacity duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-[color-mix(in_srgb,var(--paper-ink)_10%,transparent)] py-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--paper-ink)] opacity-35">
            © {currentYear} LiseUP Derneği · Tüm hakları saklıdır
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--paper-ink)] opacity-35">
              Dernek tüzel kişiliği · İstanbul
            </span>
            <Link
              href="/kvkk"
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--paper-ink)] opacity-35 hover:opacity-70 transition-opacity duration-200"
            >
              KVKK
            </Link>
            <Link
              href="/gizlilik-politikasi"
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--paper-ink)] opacity-35 hover:opacity-70 transition-opacity duration-200"
            >
              Gizlilik
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
