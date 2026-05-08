export function Pain() {
  return (
    <section
      id="neden"
      aria-labelledby="pain-heading"
      className="border-y border-[var(--rule)] bg-[var(--surface-1)]"
    >
      <div className="mx-auto grid max-w-[var(--max-content)] grid-cols-1 gap-12 px-[var(--space-gutter)] py-20 md:grid-cols-2 md:gap-16 md:py-24">
        {/* Left */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Sorun
          </span>
          <h2
            id="pain-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            Lise yeteneği görünmez,
            <br />
            siz geç kalıyorsunuz.
          </h2>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-5">
          <p className="font-sans text-[16px] leading-relaxed text-[var(--ink-2)]">
            Türkiye&rsquo;de 4,8 milyon lise öğrencisi var. Bunların büyük çoğunluğu üniversiteye
            girene kadar herhangi bir kuruma görünmez, çünkü onları bulabileceğiniz yapısal bir
            kanal yoktu.
          </p>
          <p className="font-sans text-[16px] leading-relaxed text-[var(--ink-3)]">
            LinkedIn 16 yaş altını kabul etmiyor. Sosyal medya sinyal değil gürültü üretiyor. Okul
            kanalları kapalı, yönlendirme eksik. Sonuç: en parlak lise yeteneği, 18 yaşına gelene
            kadar sizi bulamıyor.
          </p>
        </div>
      </div>
    </section>
  );
}
