const CAPABILITIES = [
  {
    number: "01",
    heading: "Yetenek Keşfi",
    tagline: "14–18 yaşa filtrelenmiş erişim.",
    body: "Yetenek, ilgi alanı, şehir, sınıf seviyesi, doğrulama durumu, çoklu filtrelerle havuzu daralt. Aradığın profil, zaten burada.",
  },
  {
    number: "02",
    heading: "Fırsat Yayını",
    tagline: "Hackathon, program, staj, burs.",
    body: "Dahili başvuru formu veya dış link. Otomatik takip, başvuru sayaçı, hassas flag yönetimi.",
  },
  {
    number: "03",
    heading: "Doğru Mesaj",
    tagline: "İlk mesajı liseli kabul ederse konuşma açılır.",
    body: "Bekleyen istek klasörü + template detection + rate limiting. Spam imkansız, her mesaj kasıtlı.",
  },
  {
    number: "04",
    heading: "Analitik",
    tagline: "Kim baktı, kim kaydetti, kim başvurdu.",
    body: "Profil görüntüleme, fırsat başvuru oranları, mesaj yanıt oranları, kaydedilen profil heatmap.",
  },
];

export function Capabilities() {
  return (
    <section
      id="ne-yapabilirsiniz"
      aria-labelledby="capabilities-heading"
      className="bg-[var(--surface-0)]"
    >
      <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)] py-[var(--space-section-y)]">
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Yetenekler
          </span>
          <h2
            id="capabilities-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Dört hareket. Tek panel.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[var(--rule)] sm:grid-cols-2">
          {CAPABILITIES.map((c) => (
            <div
              key={c.number}
              className="flex flex-col gap-5 bg-[var(--surface-0)] p-8 transition-shadow duration-[220ms] ease-[var(--ease-instrumental)] hover:shadow-[var(--shadow-lift)] md:p-10"
            >
              <span
                className="font-display font-black leading-none tracking-[-0.04em] text-[var(--color-brand-500)]"
                style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
              >
                {c.number}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-[20px] font-bold leading-tight tracking-[-0.02em] text-[var(--ink)]">
                  {c.heading}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-brand-500)]">
                  {c.tagline}
                </p>
              </div>
              <p className="font-sans text-[14px] leading-relaxed text-[var(--ink-2)]">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
