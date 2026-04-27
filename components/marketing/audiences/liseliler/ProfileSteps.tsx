const STEPS = [
  {
    number: "01",
    heading: "3 dakikada profil aç",
    body: "Ad, sınıf, ilgi alanları ve bir tanıtım cümlesi. Veli onayı tamamlandığında profil hemen canlıya alınır.",
  },
  {
    number: "02",
    heading: "Projeni dünyaya aç",
    body: "Fikrin var mı? Proje sayfasını aç, aradığın rolü yaz. Yazılımcı mı, tasarımcı mı, araştırmacı mı, sistem sana uygun liselileri gösterir.",
  },
  {
    number: "03",
    heading: "Başarılarını biriktir",
    body: "Tamamladığın her proje profilinde kalır. Ekip referansları, proje sertifikaları, rozet sistemi, hepsi gerçek zamanlı güncellenir.",
  },
];

export function ProfileSteps() {
  return (
    <section
      id="nasil-calisir"
      aria-labelledby="profile-steps-heading"
      className="border-y border-[var(--rule)] bg-[var(--surface-1)]"
    >
      <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)] py-[var(--space-section-y)]">
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Profilini kur
          </span>
          <h2
            id="profile-steps-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Var olmak üç adım.
          </h2>
          <p className="max-w-[44ch] font-sans text-[16px] leading-relaxed text-[var(--ink-2)]">
            Kaydolmak 3 dakika. Veli onayı tek tıkla. Profilin yayında, artık seni bulabilirler.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[var(--rule)] md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.number}
              className="flex flex-col gap-6 bg-[var(--surface-1)] p-8 transition-shadow duration-[220ms] ease-[var(--ease-instrumental)] hover:shadow-[var(--shadow-lift)] md:p-10"
            >
              <span
                className="font-display font-black leading-none tracking-[-0.04em] text-[var(--color-brand-500)]"
                style={{ fontSize: "clamp(3rem, 5vw, 4rem)" }}
              >
                {s.number}
              </span>
              <h3 className="font-display text-[20px] font-bold leading-tight tracking-[-0.02em] text-[var(--ink)]">
                {s.heading}
              </h3>
              <p className="font-sans text-[14px] leading-relaxed text-[var(--ink-2)]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
