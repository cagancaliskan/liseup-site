import { Calendar, MessageSquare } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import {
  MOCK_PILOT_APPLICATIONS,
  type PilotApplicationMock,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STATUS_TINT: Record<PilotApplicationMock["status"], string> = {
  Yeni: "bg-primary/10 text-primary",
  "Görüşme planlandı": "bg-warning/10 text-warning",
  "Sözleşme aşaması": "bg-success/10 text-success",
};

export default function PilotBasvurulariPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/yonetim" },
          { label: "Okullar", href: "/yonetim/okullar" },
          { label: "Pilot başvuruları" },
        ]}
        title="Pilot okul başvuruları"
        description="5 iş günü SLA, Okul Success ekibi inceler."
      />
      <div className="mx-auto max-w-4xl space-y-3 px-4 py-6 md:px-8 md:py-8">
        {MOCK_PILOT_APPLICATIONS.map((a) => (
          <article key={a.id} className="rounded-xl border border-border/70 bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-[16px] font-black text-foreground">{a.schoolName}</h3>
                <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                  {a.city} · {a.studentCount} öğrenci · Tercih: {a.preferredStart}
                </p>
              </div>
              <span className={cn("inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em]", STATUS_TINT[a.status])}>
                {a.status}
              </span>
            </div>
            <p className="mt-3 text-[12px] text-muted-foreground">
              <span className="font-semibold text-foreground">Temsilci:</span> {a.contactName}
            </p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">Gönderildi: {a.submittedAt}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
              <DemoActionButton size="sm" action="Görüşme takvimi gönderildi">
                <Calendar className="size-3.5" />
                Görüşme planla
              </DemoActionButton>
              <DemoActionButton size="sm" variant="outline" action="Notlar demo aşamasında, yakında" toastType="info">
                <MessageSquare className="size-3.5" />
                Notlar
              </DemoActionButton>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
