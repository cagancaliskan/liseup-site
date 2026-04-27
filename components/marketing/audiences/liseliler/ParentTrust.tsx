const TRUST_ITEMS = [
  {
    number: "01",
    heading: "Veli e-postasıyla onay",
    body: "Kayıt sırasında velinin e-postasını eklersin. Veline özel onay linki gider, hangi verilerin paylaşılacağını tek tek görür ve dijital imzayla onaylar.",
  },
  {
    number: "02",
    heading: "Soyad ve fotoğraf gizli",
    body: "18 yaş altı profillerde soyad ve fotoğraf kurumlara varsayılan olarak kapalıdır. Sen bir kurumun mesajını kabul edersen yalnızca o kurumla paylaşılır.",
  },
  {
    number: "03",
    heading: "Telefon ve adres bloklu",
    body: "Platform dışı iletişim bilgisi (telefon, adres, sosyal medya) platform içi mesajlarda regex + yapay zeka ile bloklanır.",
  },
  {
    number: "04",
    heading: "18'de otomatik geçiş",
    body: "7 gün önceden hatırlatma. Doğum gününde profil otomatik yetişkin moduna geçer, ayarlarını tekrar gözden geçirmeni sağlarız.",
  },
];

export function ParentTrust() {
  return (
    <section
      id="velin-icin"
      aria-labelledby="parent-trust-heading"
      className="border-y border-[var(--rule)] bg-[var(--surface-1)]"
    >
      <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)] py-[var(--space-section-y)]">
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Velin için
          </span>
          <h2
            id="parent-trust-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            18 yaş altı güvenliği
            <br />
            mimarinin ilk kararı.
          </h2>
          <p className="max-w-[44ch] font-sans text-[16px] leading-relaxed text-[var(--ink-2)]">
            Platforma katılmak için velinin onayı gerekiyor. Hangi verilerin kimlerle paylaşıldığını
            her an görebilirsiniz, ve her an iptal edebilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[var(--rule)] sm:grid-cols-2">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.number}
              className="flex flex-col gap-5 bg-[var(--surface-1)] p-8 transition-shadow duration-[220ms] ease-[var(--ease-instrumental)] hover:shadow-[var(--shadow-lift)] md:p-10"
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
