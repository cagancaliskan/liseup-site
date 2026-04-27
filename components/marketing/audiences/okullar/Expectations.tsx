const FROM_LISEUP = [
  "Haftalık Okul Success Manager check-in",
  "Aylık otomatik rapor (PDF + dashboard)",
  "Dönem sonu etki raporu (PDF + PowerPoint export)",
  "Hassas fırsat flagleme + gizleme talebi akışı",
  "Öğrenci bildirim yönetimi",
  "Pilot Okul → Partner Okul geçiş sertifikası",
];

const FROM_OKUL = [
  "Temsilci ataması (rehberlik / kariyer koordinatörü)",
  "Aylık 1 check-in toplantısı (30 dakika)",
  "Öğrencilerle LiseUP tanıtım oturumu (1 saat)",
  "Dönem sonu raporunu okul yönetimi ile paylaşma",
  "Başarı hikayesi yayını için öğrenci + veli onayı süreci",
];

export function Expectations() {
  return (
    <section
      id="beklentiler"
      aria-labelledby="expectations-heading"
      className="bg-[var(--surface-0)]"
    >
      <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)] py-[var(--space-section-y)]">
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Karşılıklı beklenti
          </span>
          <h2
            id="expectations-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Açık sözleşme. Sürpriz yok.
          </h2>
          <p className="max-w-[44ch] font-sans text-[16px] leading-relaxed text-[var(--ink-2)]">
            Pilot partnerliği iki yönlü bir taahhüt. İki taraftan ne beklediğimizi baştan yazıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[var(--rule)] md:grid-cols-2">
          {/* LiseUP'dan beklentiniz */}
          <div className="flex flex-col gap-5 bg-[var(--surface-0)] p-8 md:p-10">
            <h3 className="font-display text-[18px] font-bold leading-tight tracking-[-0.02em] text-[var(--color-brand-500)]">
              LiseUP&rsquo;dan beklentiniz
            </h3>
            <ul className="flex flex-col gap-3">
              {FROM_LISEUP.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-[11px] font-medium text-[var(--color-brand-500)] shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="font-sans text-[14px] leading-snug text-[var(--ink-2)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sizden beklentimiz */}
          <div className="flex flex-col gap-5 bg-[var(--surface-0)] p-8 md:p-10">
            <h3 className="font-display text-[18px] font-bold leading-tight tracking-[-0.02em] text-[var(--ink)]">
              Sizden beklentimiz
            </h3>
            <ul className="flex flex-col gap-3">
              {FROM_OKUL.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-[11px] font-medium text-[var(--color-brand-500)] shrink-0 mt-0.5">
                    ·
                  </span>
                  <span className="font-sans text-[14px] leading-snug text-[var(--ink-2)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
