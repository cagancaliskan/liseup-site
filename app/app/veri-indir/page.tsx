import { Download, FileText, Database, FileCode2 } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";

export default function VeriIndirPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Panom", href: "/app" },
          { label: "Veri indir" },
        ]}
        title="Verimi indir"
        description="KVKK veri portabilitesi, tüm profilin, projen, başvuruların JSON + PDF formatında."
      />

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 md:px-8 md:py-10">
        <section className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-6">
          <h2 className="font-display text-[15px] font-black text-foreground">
            Hangi veriler indirilir?
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              "Profil bilgilerin",
              "Açtığın + katıldığın projeler",
              "Başvuru geçmişin",
              "Mesajlaşma geçmişin (2 yıllık)",
              "Kazandığın rozetler",
              "Bildirim geçmişin",
            ].map((x) => (
              <li
                key={x}
                className="flex items-start gap-2 text-[13px] leading-5 text-foreground/90"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {x}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <FormatCard
            icon={FileCode2}
            title="JSON"
            description="Yapılandırılmış veri · programatik kullanım için ideal"
          />
          <FormatCard
            icon={FileText}
            title="PDF"
            description="İnsan-okunabilir özet · CV / portfolyo için uygun"
          />
        </section>

        <section className="rounded-xl border border-border/70 bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <Database className="size-4" />
            </div>
            <div className="flex-1">
              <p className="font-display text-[13px] font-bold text-foreground">
                Ayda 1 indirme hakkı
              </p>
              <p className="font-mono text-[11px] text-muted-foreground">
                Son indirme: hiç yapılmadı
              </p>
            </div>
            <DemoActionButton action="Rapor indirildi">
              <Download className="size-3.5" />
              Verimi indir
            </DemoActionButton>
          </div>
        </section>
      </div>
    </>
  );
}

function FormatCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Download;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-card p-5">
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" strokeWidth={2.1} />
      </div>
      <div>
        <h3 className="font-display text-[14px] font-black text-foreground">
          {title}
        </h3>
        <p className="mt-1 text-[12px] leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
