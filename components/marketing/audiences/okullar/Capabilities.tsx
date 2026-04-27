const FEATURES = [
  {
    number: "01",
    heading: "Aktivite dashboard'u",
    body: "Doğrulanmış öğrencilerinizin açtığı projeleri, aldıkları kurum tekliflerini, başvurdukları fırsatları tek panelden izleyin.",
  },
  {
    number: "02",
    heading: "Okul temsilcisi sistemi",
    body: "Rehberlik ya da kariyer koordinatörünüzü temsilci atayın. Bildirimleri, raporları ve öğrenci eşleştirmelerini onlar yönetsin.",
  },
  {
    number: "03",
    heading: "Başarı vitrini",
    body: "Öğrenci başarılarınızı sosyal medyaya hazır kart görseli + okul web sitesi embed koduyla paylaşın. Okul markası otomatik büyür.",
  },
];

export function Capabilities() {
  return (
    <section
      id="ozellikler"
      aria-labelledby="capabilities-heading"
      className="border-y border-[var(--rule)] bg-[var(--surface-1)]"
    >
      <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)] py-[var(--space-section-y)]">
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Okulunuza değer
          </span>
          <h2
            id="capabilities-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Üç somut çıktı. Tek hesap.
          </h2>
          <p className="max-w-[44ch] font-sans text-[16px] leading-relaxed text-[var(--ink-2)]">
            Raporlama, temsilci sistemi, başarı vitrini. Her biri veliye ve okul yönetimine somut
            veri sunar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[var(--rule)] md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.number}
              className="flex flex-col gap-6 bg-[var(--surface-1)] p-8 transition-shadow duration-[220ms] ease-[var(--ease-instrumental)] hover:shadow-[var(--shadow-lift)] md:p-10"
            >
              <span
                className="font-display font-black leading-none tracking-[-0.04em] text-[var(--color-brand-500)]"
                style={{ fontSize: "clamp(3rem, 5vw, 4rem)" }}
              >
                {f.number}
              </span>
              <h3 className="font-display text-[20px] font-bold leading-tight tracking-[-0.02em] text-[var(--ink)]">
                {f.heading}
              </h3>
              <p className="font-sans text-[14px] leading-relaxed text-[var(--ink-2)]">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
