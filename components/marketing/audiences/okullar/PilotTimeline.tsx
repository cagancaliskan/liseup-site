const PHASES = [
  {
    date: "Eylül 2026",
    title: "Pilot başlar",
    body: "Okul hesabı açılır, temsilci eğitim alır, öğrenci eşleştirme tamamlanır. İlk projeler sisteme düşer.",
    accent: false,
  },
  {
    date: "Ekim – Aralık 2026",
    title: "Üç ay içinde",
    body: "Aylık otomatik raporlar, kurum etkileşimleri, başarı hikayesi adayları. Okul Success Manager haftalık check-in yapar.",
    accent: false,
  },
  {
    date: "Ocak 2027",
    title: "Değerlendirme",
    body: "Pilot sonucu birlikte gözden geçirilir. Dönem sonu etki raporu (PDF + PowerPoint) teslim edilir.",
    accent: false,
  },
  {
    date: "Şubat 2027+",
    title: "Partner Okul",
    body: "Pilot Okul → Partner Okul. Yeni dönem planlanır, özel kurum eşleştirmeleri ve öne çıkarma ayrıcalıkları aktif olur.",
    accent: true,
  },
];

export function PilotTimeline() {
  return (
    <section
      id="program"
      aria-labelledby="timeline-heading"
      className="bg-[var(--surface-0)]"
    >
      <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)] py-[var(--space-section-y)]">
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-brand-500)]">
            · Pilot programı
          </span>
          <h2
            id="timeline-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Dört aylık deneyim.
            <br />
            Kalıcı ortaklık.
          </h2>
          <p className="max-w-[44ch] font-sans text-[16px] leading-relaxed text-[var(--ink-2)]">
            Pilot süresince LiseUP ekibi sizinle haftalık check-in yapar, raporları birlikte
            gözden geçirir. Ocak 2027&rsquo;de sonuçları değerlendiririz, Şubat&rsquo;ta Partner
            Okul olursunuz.
          </p>
        </div>

        <div className="flex flex-col">
          {PHASES.map((phase, i) => (
            <div
              key={phase.date}
              className={`grid grid-cols-1 border-t border-[var(--rule)] py-10 md:grid-cols-[220px_1fr] md:gap-12 md:py-12 ${
                phase.accent ? "border-l-4 border-l-[var(--color-brand-500)] pl-6 md:pl-6" : ""
              }`}
            >
              {/* Date */}
              <div className="mb-4 md:mb-0">
                <span
                  className="font-mono text-[12px] font-medium tabular-nums text-[var(--color-brand-500)]"
                >
                  {String(i + 1).padStart(2, "0")}, {phase.date}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-[20px] font-bold leading-tight tracking-[-0.02em] text-[var(--ink)]">
                  {phase.title}
                </h3>
                <p className="max-w-[52ch] font-sans text-[15px] leading-relaxed text-[var(--ink-2)]">
                  {phase.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
