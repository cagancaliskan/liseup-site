import { CheckCircle2, Calendar, Phone } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { getOkulSession } from "@/lib/session";

export default function PartnerAyricaliklarPage() {
  const session = getOkulSession();
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/okul" },
          { label: "Partner ayrıcalıklar" },
        ]}
        title="Partner ayrıcalıkları"
        description="Partnerlik anlaşmasına dahil olan özellikler ve Success Manager iletişim bilgileri."
      />

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 md:px-8 md:py-10">
        <section className="rounded-xl border border-primary/30 bg-primary/[0.04] p-6">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
            Anlaşma özeti
          </p>
          <h2 className="mt-2 font-display text-[20px] font-black text-foreground">
            {session.partnershipStatus} · {session.partnershipSince}'den beri
          </h2>
          <ul className="mt-4 grid gap-2 text-[13px] text-foreground/90">
            {[
              "Aylık otomatik rapor (PDF + dashboard)",
              "Dönem sonu etki raporu (PDF + PowerPoint export)",
              "Hassas fırsat flag mekanizması",
              "Gizleme talebi akışı (14 gün SLA)",
              "Başarı vitrini + iframe embed",
              "Okul Success Manager haftalık check-in",
              "Partner Okul → Pilot Okul geçiş sertifikası",
            ].map((x) => (
              <li key={x} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-success" />
                {x}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border/70 bg-card p-6">
          <h3 className="font-display text-[15px] font-black text-foreground">
            Success Manager
          </h3>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[14px] font-black text-white">
              ME
            </div>
            <div>
              <p className="font-display text-[14px] font-bold text-foreground">
                Mehmet Efe
              </p>
              <p className="font-mono text-[11px] text-muted-foreground">
                Okul Success · LiseUP Operasyon
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <DemoActionButton size="sm" variant="outline" action="Mehmet Efe ile görüşme başlatılıyor, demo ortamında telefon açılmaz">
              <Phone className="size-3.5" />
              Telefon
            </DemoActionButton>
            <DemoActionButton size="sm" variant="outline" action="Toplantı takvimi gönderildi">
              <Calendar className="size-3.5" />
              Toplantı planla
            </DemoActionButton>
          </div>
        </section>
      </div>
    </>
  );
}
