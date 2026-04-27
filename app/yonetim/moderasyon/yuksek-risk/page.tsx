import { Check, X, AlertTriangle } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { MOCK_MODERATION_QUEUE } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function YuksekRiskPage() {
  const high = MOCK_MODERATION_QUEUE.filter((m) => m.riskScore >= 60);
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/yonetim" },
          { label: "Moderasyon", href: "/yonetim/moderasyon" },
          { label: "Yüksek risk" },
        ]}
        title="Yüksek risk kuyruğu"
        description="Risk skoru 61+. SLA: 4 sa gündüz, 09:00'a ötelenir gece."
      />
      <div className="mx-auto max-w-4xl space-y-3 px-4 py-6 md:px-8 md:py-8">
        {high.map((m) => (
          <article key={m.id} className="rounded-xl border border-destructive/30 bg-destructive/[0.03] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-[15px] font-black text-foreground">{m.title}</p>
                <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{m.author} · {m.kind} · {m.submittedAt}</p>
              </div>
              <div className={cn("inline-flex items-center gap-1 rounded-full px-2 py-1 font-mono text-[10px] font-bold", m.riskScore >= 80 ? "bg-destructive text-destructive-foreground" : "bg-destructive/15 text-destructive")}>
                <AlertTriangle className="size-3" />
                Risk {m.riskScore}
              </div>
            </div>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {m.flags.map((f) => (
                <li key={f} className="inline-flex rounded-md bg-destructive/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-destructive">{f}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
              <DemoActionButton size="sm" variant="destructive" action="İçerik reddedildi, kullanıcıya bildirildi">
                <X className="size-3.5" />
                Reddet
              </DemoActionButton>
              <DemoActionButton size="sm" action="Onaylandı, yayına alındı">
                <Check className="size-3.5" />
                Onayla, yayına al
              </DemoActionButton>
              <DemoActionButton size="sm" variant="ghost" action="İçerik incelemeye açıldı">İçeriği oku</DemoActionButton>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
