interface Step {
  label: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    label: "01 · Kayıt",
    title: "Ücretsiz kaydol.",
    description:
      "Bilgilerini gir, okulunu seç. 18 yaş altı değilsen veli onayı e-postasını yolluyoruz, güvenli, şeffaf.",
  },
  {
    label: "02 · Profil veya proje",
    title: "Ne yapmak istediğini göster.",
    description:
      "Yeteneklerini, ilgi alanlarını ve portfolyonu bir profile bağla ya da fikrini bir projeye dönüştür, ekip ara.",
  },
  {
    label: "03 · Eşleş",
    title: "Ekibini kur, fırsata başvur.",
    description:
      "Projelerde takım arkadaşı bul, kurumların yayımladığı fırsatlara başvur. Mesajlaşma kademeli ve moderasyonlu.",
  },
];

export function HowItWorksSteps() {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {STEPS.map((step) => (
        <li
          key={step.label}
          className="relative rounded-xl border border-border/80 bg-card p-6 transition-all duration-[var(--duration-base)] hover:border-border"
        >
          <div className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
            {step.label}
          </div>
          <h3 className="mt-3 font-display text-[20px] font-bold leading-tight text-foreground">
            {step.title}
          </h3>
          <p className="mt-2 text-[15px] leading-6 text-muted-foreground">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
