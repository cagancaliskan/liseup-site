const USE_CASES = [
  {
    number: "01",
    heading: "VC / Fon",
    tagline: "Erken yaşta dikkat çekici fikirleri yakala.",
    body: "478 aktif Türk fonu aynı pitch listesine bakıyor. Lise çağında bir kurucuyu bulup doğru anda desteklemek, 3 yıl sonra aradığın deal akışı demek.",
  },
  {
    number: "02",
    heading: "Teknoloji Şirketi",
    tagline: "Geleceğin çalışanıyla bugün tanış.",
    body: "Yaz staj programı yapıyorsan 22 yaş yerine 17 yaşa açmak, markanı 5 yıl erken tanıtmak demek. Uzun vadeli yetenek pipeline'ı.",
  },
  {
    number: "03",
    heading: "STK / Vakıf",
    tagline: "Hedef kitleye doğrudan ulaş.",
    body: "Gençlik programlarınıza ulaşabilen kanal azalıyor. LiseUP, sosyal amaçlı kuruluşlara tek filtreleme ile KVKK uyumlu, etik erişim sunar.",
  },
];

export function UseCases() {
  return (
    <section
      id="kimler-kullanir"
      aria-labelledby="usecases-heading"
      className="border-y border-[var(--rule)] bg-[var(--surface-1)]"
    >
      <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)] py-[var(--space-section-y)]">
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Kullanım senaryoları
          </span>
          <h2
            id="usecases-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Üç farklı kurum tipi.
            <br />
            Aynı platform.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[var(--rule)] md:grid-cols-3">
          {USE_CASES.map((uc) => (
            <div
              key={uc.number}
              className="flex flex-col gap-6 bg-[var(--surface-1)] p-8 transition-shadow duration-[220ms] ease-[var(--ease-instrumental)] hover:shadow-[var(--shadow-lift)] md:p-10"
            >
              <span
                className="font-display font-black leading-none tracking-[-0.04em] text-[var(--color-brand-500)]"
                style={{ fontSize: "clamp(3rem, 5vw, 4rem)" }}
              >
                {uc.number}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-[20px] font-bold leading-tight tracking-[-0.02em] text-[var(--ink)]">
                  {uc.heading}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-brand-500)]">
                  {uc.tagline}
                </p>
              </div>
              <p className="font-sans text-[14px] leading-relaxed text-[var(--ink-2)]">{uc.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
