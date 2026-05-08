import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/marketing/primitives/ScrollReveal";

interface TrustItem {
  icon: string;
  heading: string;
  body: string;
}

interface TrustPanelProps {
  items?: TrustItem[];
  className?: string;
}

const defaultItems: TrustItem[] = [
  {
    icon: "🔒",
    heading: "KVKK Uyumlu",
    body: "18 yaş altı verisi için veli onayı zorunlu. Platforma gönderilen her veri işleme faaliyeti KVKK md. 5–6 kapsamında belgelenir.",
  },
  {
    icon: "🛡️",
    heading: "Moderasyon SLA",
    body: "Şüpheli içerik ve mesajlar 24 saat içinde incelenir. Lise güvenliği için insan + otomatik denetim katmanları çalışır.",
  },
  {
    icon: "👨‍👩‍👧",
    heading: "Veli Onayı",
    body: "Liseli profili veli onayı olmadan yayınlanamaz. Kurum bir liseliyle ancak liseli mesajı kabul ettikten sonra iletişim kurabilir.",
  },
  {
    icon: "🏛️",
    heading: "Dernek Tüzüğü",
    body: "LiseUP Derneği kar amacı gütmez. Tüm ticari işlemler şeffaf iktisadi işletme üzerinden gerçekleşir, denetlenebilir, kayıt altında.",
  },
];

export function TrustPanel({ items = defaultItems, className }: TrustPanelProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2", className)}>
      {items.map((item, i) => (
        <ScrollReveal key={item.heading} delay={i * 0.08} distance={16}>
          <div className="flex gap-4 rounded-xl border border-[var(--rule)] bg-[var(--surface-1)] p-6">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-2)] text-xl"
            >
              {item.icon}
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-[var(--text-base)] font-bold leading-snug tracking-[-0.01em] text-[var(--ink)]">
                {item.heading}
              </h3>
              <p className="font-sans text-[var(--text-sm)] leading-[var(--text-sm--line-height)] text-[var(--ink-2)]">
                {item.body}
              </p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
