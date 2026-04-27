const STORIES = [
  {
    number: "01",
    name: "Deniz K.",
    classYear: "11. sınıf",
    tags: "Proje Kurucusu · Yazılım",
    quote:
      "SesliKitap projesini burada açtım. 3 haftada ekibi kurdum, 2 ayda ürünü bitirdik. Şimdi bir STK bizimle iletişime geçmek istiyor.",
    school: "Ankara Atatürk Lisesi",
  },
  {
    number: "02",
    name: "Mira S.",
    classYear: "10. sınıf",
    tags: "Tasarımcı · Fırsat",
    quote:
      "Grafik tasarımcı arıyorum diye bir proje açmıştım. Profilimi gören bir kurum hackathonlarına davet etti. Hâlâ inanamıyorum.",
    school: "İstanbul Kadıköy Anadolu Lisesi",
  },
  {
    number: "03",
    name: "Bora T.",
    classYear: "12. sınıf",
    tags: "Ekip Üyesi · Sertifika",
    quote:
      "Üniversite başvurusunda 'ekip çalışması' diyecek bir şeyim yoktu. Şimdi üç tamamlanmış projem var ve sertifikaları profilimde duruyor.",
    school: "İzmir Bornova Anadolu Lisesi",
  },
];

export function Stories() {
  return (
    <section id="hikayeler" aria-labelledby="stories-heading" className="bg-[var(--surface-0)]">
      <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)] py-[var(--space-section-y)]">
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Gerçek hikayeler
          </span>
          <h2
            id="stories-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Liseliler ne yaptı?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[var(--rule)] md:grid-cols-3">
          {STORIES.map((s) => (
            <div
              key={s.number}
              className="group flex flex-col gap-6 bg-[var(--surface-0)] p-8 transition-shadow duration-[220ms] ease-[var(--ease-instrumental)] hover:shadow-[var(--shadow-lift)] md:p-10"
            >
              {/* Number + tags */}
              <div className="flex items-end justify-between">
                <span
                  className="font-display font-black leading-none tracking-[-0.04em] text-[var(--color-brand-500)]"
                  style={{ fontSize: "clamp(3rem, 5vw, 4rem)" }}
                >
                  {s.number}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
                  {s.tags}
                </span>
              </div>

              {/* Name + class */}
              <h3 className="font-display text-[20px] font-bold leading-tight tracking-[-0.02em] text-[var(--ink)]">
                {s.name}{" "}
                <span className="font-mono text-[12px] font-normal text-[var(--ink-3)]">
                  {s.classYear}
                </span>
              </h3>

              {/* Quote */}
              <p className="font-sans text-[14px] italic leading-relaxed text-[var(--ink-2)]">
                &ldquo;{s.quote}&rdquo;
              </p>

              {/* School */}
              <p className="mt-auto font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
                {s.school}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
