const FEATURES = [
  {
    number: "01",
    heading: "Ekip ara, projeye başvur",
    body: '"Tasarımcı aranıyor", "yazılımcı aranıyor" filtresiyle sana uyan projeyi bul. Kabul edilirsen ekip sohbeti otomatik açılır.',
  },
  {
    number: "02",
    heading: "Güvenli iletişim",
    body: "Mesajlaşma kademeli, ortak projeden önce DM yok. Kurumun sana mesaj atabilmesi için önce senden onay alması gerekiyor.",
  },
  {
    number: "03",
    heading: "Fırsatları kaçırma",
    body: "Hackathon, yaz programı, burs, staj, Türkiye'de lise seviyesinde açılan fırsatlar tek yerde. Filtrele, başvur, takip et.",
  },
];

export function TeamPlay() {
  return (
    <section
      id="ekibini-bul"
      aria-labelledby="team-heading"
      className="bg-[var(--surface-0)]"
    >
      <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)] py-[var(--space-section-y)]">
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Ekibini bul
          </span>
          <h2
            id="team-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Tek başına yapmak
            <br />
            zorunda değilsin.
          </h2>
          <p className="max-w-[44ch] font-sans text-[16px] leading-relaxed text-[var(--ink-2)]">
            Projeye katıl, ekip ara, fırsatlara başvur. Her etkileşim sertifikanla birikir.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[var(--rule)] md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.number}
              className="flex flex-col gap-6 bg-[var(--surface-0)] p-8 transition-shadow duration-[220ms] ease-[var(--ease-instrumental)] hover:shadow-[var(--shadow-lift)] md:p-10"
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
