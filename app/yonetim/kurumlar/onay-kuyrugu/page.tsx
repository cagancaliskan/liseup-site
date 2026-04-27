import { Check, X, Globe, FileText, ShieldAlert, Briefcase } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { MOCK_PENDING_KURUMS, type PendingKurumMock } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const RISK_TINT: Record<PendingKurumMock["riskLevel"], string> = {
  Düşük: "bg-success/10 text-success",
  Orta: "bg-warning/10 text-warning",
  Yüksek: "bg-destructive/10 text-destructive",
};

const CHECKLIST = [
  { label: "Web sitesi kontrolü", icon: Globe },
  { label: "Vergi levhası / ticari sicil", icon: FileText },
  { label: "Faaliyet alanı uyumluluğu", icon: Briefcase },
  { label: "Risk skoru (geçmiş)", icon: ShieldAlert },
];

export default function KurumOnayKuyruguPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/yonetim" },
          { label: "Kurumlar", href: "/yonetim/kurumlar" },
          { label: "Onay kuyruğu" },
        ]}
        title="Kurum onay kuyruğu"
        description="Yeni kurum kayıtları · 48 saat SLA. Doğrulama sonrası Discover katmanı aktive olur."
      />

      <div className="mx-auto max-w-4xl space-y-4 px-4 py-6 md:px-8 md:py-8">
        {MOCK_PENDING_KURUMS.map((k) => (
          <article
            key={k.id}
            className="rounded-xl border border-border/70 bg-card p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-[16px] font-black text-foreground">
                    {k.name}
                  </h3>
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em]",
                      RISK_TINT[k.riskLevel],
                    )}
                  >
                    Risk: {k.riskLevel}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  {k.industry} · Vergi: {k.vergiNo} · {k.submittedAt}
                </p>
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 rounded-md border border-border/70 bg-muted/30 p-3 text-[12px] sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                  Yetkili
                </dt>
                <dd className="mt-0.5 font-semibold text-foreground">
                  {k.contactName}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                  E-posta
                </dt>
                <dd className="mt-0.5 font-mono text-[11px] text-foreground">
                  {k.email}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                  Sektör
                </dt>
                <dd className="mt-0.5 font-semibold text-foreground">
                  {k.industry}
                </dd>
              </div>
            </dl>

            <div className="mt-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Doğrulama checklist
              </p>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {CHECKLIST.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center gap-2 rounded-md border border-border/60 bg-background px-3 py-2 text-[12px]"
                  >
                    <c.icon className="size-3.5 text-muted-foreground" />
                    <span className="flex-1 text-foreground/90">{c.label}</span>
                    <input
                      type="checkbox"
                      defaultChecked={k.riskLevel === "Düşük"}
                      className="size-3.5 accent-primary"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
              <DemoActionButton size="sm" action="Kurum onaylandı, Discover'da görünür">
                <Check className="size-3.5" />
                Onayla, Discover aktive et
              </DemoActionButton>
              <DemoActionButton size="sm" variant="outline" action="Detay sayfası demo aşamasında, yakında">
                Detaya git
              </DemoActionButton>
              <DemoActionButton size="sm" variant="ghost" action="Başvuru reddedildi">
                <X className="size-3.5" />
                Reddet
              </DemoActionButton>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
