const TRUST_ITEMS = [
  {
    number: "01",
    heading: "KVKK Uyumlu",
    body: "18 yaş altı verisi için veli onayı zorunlu. Platforma gönderilen her veri işleme faaliyeti KVKK md. 5–6 kapsamında belgelenir.",
  },
  {
    number: "02",
    heading: "Moderasyon SLA",
    body: "Şüpheli içerik ve mesajlar 24 saat içinde incelenir. Lise güvenliği için insan + otomatik denetim katmanları çalışır.",
  },
  {
    number: "03",
    heading: "Veli Onayı",
    body: "Liseli profili veli onayı olmadan yayınlanamaz. Kurum bir liseliyle ancak liseli mesajı kabul ettikten sonra iletişim kurabilir.",
  },
  {
    number: "04",
    heading: "Dernek Tüzüğü",
    body: "LiseUP Derneği kar amacı gütmez. Tüm ticari işlemler şeffaf iktisadi işletme üzerinden gerçekleşir, denetlenebilir, kayıt altında.",
  },
];

export function Trust() {
  return (
    <section
      id="guven"
      aria-labelledby="trust-heading"
      className="bg-[var(--surface-0)]"
    >
      <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)] py-[var(--space-section-y)]">
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Gizlilik & Güven
          </span>
          <h2
            id="trust-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            18 yaş altı güvenliği
            <br />
            mimarinin ilk kararı.
          </h2>
          <p className="max-w-[44ch] font-sans text-[16px] leading-relaxed text-[var(--ink-2)]">
            Ne görebilirsiniz, ne göremezsiniz, her kural liselinin korunması için var. Sizi
            güçlendiren özellikler ile onları koruyan kısıtlamalar aynı anda tasarlandı.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[var(--rule)] sm:grid-cols-2">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.number}
              className="flex flex-col gap-5 bg-[var(--surface-0)] p-8 transition-shadow duration-[220ms] ease-[var(--ease-instrumental)] hover:shadow-[var(--shadow-lift)] md:p-10"
            >
              <span
                className="font-display font-black leading-none tracking-[-0.04em] text-[var(--color-brand-500)]"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
              >
                {item.number}
              </span>
              <h3 className="font-display text-[18px] font-bold leading-tight tracking-[-0.02em] text-[var(--ink)]">
                {item.heading}
              </h3>
              <p className="font-sans text-[14px] leading-relaxed text-[var(--ink-2)]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
