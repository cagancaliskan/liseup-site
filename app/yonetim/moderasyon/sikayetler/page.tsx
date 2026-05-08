import { Flag, Clock } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { MOCK_REPORTS, type ReportMock } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const PRIORITY_TINT: Record<ReportMock["priority"], string> = {
  Yüksek: "bg-destructive/10 text-destructive",
  Düşük: "bg-muted text-muted-foreground",
};

export default function SikayetlerPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/yonetim" },
          { label: "Moderasyon", href: "/yonetim/moderasyon" },
          { label: "Şikayetler" },
        ]}
        title="Şikayetler"
        description="Yüksek öncelik: 4 sa SLA. Diğerler: 24 sa."
      />
      <div className="mx-auto max-w-4xl space-y-3 px-4 py-6 md:px-8 md:py-8">
        {MOCK_REPORTS.map((r) => (
          <article key={r.id} className="rounded-xl border border-border/70 bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex size-9 items-center justify-center rounded-md bg-destructive/10 text-destructive">
                  <Flag className="size-4" />
                </div>
                <div>
                  <p className="font-display text-[14px] font-black text-foreground">
                    {r.category}
                  </p>
                  <p className="mt-0.5 text-[12px] text-foreground/90">
                    Hedef: <span className="font-mono text-muted-foreground">{r.target}</span>
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                    Şikayet: {r.reportedBy} · {r.submittedAt}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em]", PRIORITY_TINT[r.priority])}>
                  <Clock className="size-3" />
                  {r.priority}
                </span>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
              <DemoActionButton size="sm" action="İçerik incelemeye açıldı">İçeriği aç</DemoActionButton>
              <DemoActionButton size="sm" variant="outline" action="Uyarı gönderildi">Hesabı uyar</DemoActionButton>
              <DemoActionButton size="sm" variant="ghost" action="Şikayet reddedildi">Reddet (asılsız)</DemoActionButton>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
