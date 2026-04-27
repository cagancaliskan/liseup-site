import Link from "next/link";

const SCHOOLS = [
  { city: "İstanbul", name: "Kadıköy pilot okulu", district: "Kadıköy" },
  { city: "İstanbul", name: "Sarıyer pilot okulu", district: "Sarıyer" },
  { city: "Ankara", name: "Çankaya pilot okulu", district: "Çankaya" },
  { city: "Ankara", name: "Yenimahalle pilot okulu", district: "Yenimahalle" },
  { city: "İzmir", name: "Karşıyaka pilot okulu", district: "Karşıyaka" },
  { city: "İzmir", name: "Bornova pilot okulu", district: "Bornova" },
];

export function Pilot() {
  return (
    <section
      aria-labelledby="pilot-heading"
      className="bg-[var(--surface-1)] border-y border-[var(--rule)]"
    >
      <div className="mx-auto grid max-w-[var(--max-content)] grid-cols-1 gap-12 px-[var(--space-gutter)] py-20 md:grid-cols-2 md:gap-16 md:py-24">
        {/* Left, headline + body + CTA */}
        <div className="flex flex-col gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Eylül 2026 · Pilot
          </span>

          <h2
            id="pilot-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            İstanbul.
            <br />
            Ankara.
            <br />
            İzmir.
          </h2>

          <p className="max-w-[42ch] font-sans text-[16px] leading-relaxed text-[var(--ink-2)]">
            Pilot 2026, sınırlı sayıda okul ve kurumla başlıyoruz. Öncelikli erişim için pilot
            başvurusunu doldurun.
          </p>

          <Link
            href="/pilot-basvuru"
            className="self-start inline-flex items-center gap-2 rounded-full border border-[var(--rule)] bg-[var(--surface-0)] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink)] transition-shadow duration-200 hover:shadow-[var(--shadow-lift)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2"
          >
            Pilot başvurusu yap
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Right, school grid */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            6 pilot okul · 3 şehir
          </span>
          <div className="grid grid-cols-2 gap-2">
            {SCHOOLS.map((s) => (
              <div
                key={`${s.city}-${s.district}`}
                className="flex items-start gap-2.5 border border-[var(--rule)] bg-[var(--surface-0)] p-3"
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-500)]"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="font-sans text-[13px] font-medium leading-tight text-[var(--ink)]">
                    {s.district}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-3)]">
                    {s.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
