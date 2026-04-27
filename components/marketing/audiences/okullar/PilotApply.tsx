import { MagneticButton } from "@/components/marketing/primitives/MagneticButton";

const NOTES = [
  "Pilot yalnızca İstanbul, Ankara, İzmir'deki okullar için açık.",
  "Her şehirde en fazla 2–3 pilot okul alınıyor.",
  "Okul yönetimi onayı ve temsilci ataması gerekiyor.",
  "Başvuru kabul edilirse 5 iş günü içinde iletişim kuruyoruz.",
];

export function PilotApply() {
  return (
    <section
      id="pilot-basvuru"
      aria-labelledby="apply-heading"
      className="border-y border-[var(--rule)] bg-[var(--surface-1)]"
    >
      <div className="mx-auto grid max-w-[var(--max-content)] grid-cols-1 gap-12 px-[var(--space-gutter)] py-20 md:grid-cols-2 md:gap-16 md:py-24">
        {/* Left, CTA */}
        <div className="flex flex-col gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Başvuru
          </span>
          <h2
            id="apply-heading"
            className="font-display font-black leading-[0.95] tracking-[-0.04em] text-[var(--ink)]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Hızlı bir form.
            <br />
            5 iş günü içinde dönüş.
          </h2>
          <p className="max-w-[42ch] font-sans text-[16px] leading-relaxed text-[var(--ink-2)]">
            Temsilciye görüşme için uygun tarih aralığı, kısa motivasyon metni ve okul bilgilerini
            paylaşın. LiseUP Okul Success ekibi sizi arar.
          </p>
          <div className="flex flex-wrap gap-4">
            <MagneticButton href="/pilot-basvuru" variant="primary">
              Pilot başvurusu yap
            </MagneticButton>
            <MagneticButton href="/iletisim" variant="outline">
              Önce sorum var
            </MagneticButton>
          </div>
        </div>

        {/* Right, notes card */}
        <div className="flex flex-col gap-4 border border-[var(--rule)] bg-[var(--surface-0)] p-6 md:p-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            Başvurudan önce bilinmesi gerekenler
          </span>
          <ul className="flex flex-col gap-3">
            {NOTES.map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="font-mono text-[11px] text-[var(--ink-3)] shrink-0 mt-0.5">·</span>
                <span className="font-sans text-[14px] leading-relaxed text-[var(--ink-2)]">
                  {note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
