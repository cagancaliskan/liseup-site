import { Download, FileText, TrendingUp } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";

export default function YonetimRaporlarPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/yonetim" },
          { label: "Raporlar" },
        ]}
        title="Sistem raporları"
        description="Ekosistem büyüklüğü, moderasyon performansı, kullanıcı katılımı."
        actions={
          <DemoActionButton variant="outline" size="sm" action="Rapor indirildi">
            <Download className="size-3.5" />
            Rapor indir
          </DemoActionButton>
        }
      />
      <div className="space-y-8 px-4 py-6 md:px-8 md:py-8">
        <div className="grid gap-3 md:grid-cols-4">
          <StatCard icon={TrendingUp} label="Aktif kullanıcı (DAU)" value={420} delta="+12%" />
          <StatCard icon={TrendingUp} label="Aylık aktif (MAU)" value={1340} delta="+18%" />
          <StatCard icon={TrendingUp} label="Liseli-Kurum bağlantısı" value={47} delta="+9" />
          <StatCard icon={TrendingUp} label="Moderasyon SLA uyumu" value="%96" delta="+2%" />
        </div>
        <section className="rounded-xl border border-border/70 bg-card p-6">
          <h2 className="font-display text-[14px] font-black uppercase tracking-[0.1em] text-foreground">
            Aylık özet · Nisan 2027
          </h2>
          <div className="mt-4 h-32 rounded-md bg-muted/40" />
          <p className="mt-3 font-mono text-[10px] text-muted-foreground">Pass 5'te gerçek charts entegre olacak</p>
        </section>
        <section className="rounded-xl border border-border/70 bg-card p-6">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-primary" />
            <h2 className="font-display text-[14px] font-black uppercase tracking-[0.1em] text-foreground">
              İndirilebilir raporlar
            </h2>
          </div>
          <ul className="mt-3 space-y-2 text-[13px]">
            {["Aylık ekosistem raporu (Mart 2027)", "Moderasyon performans (Q1 2027)", "Şehir bazlı kullanıcı dağılımı", "Pilot okul etki raporu"].map((r) => (
              <li key={r} className="flex items-center justify-between gap-3 rounded-md border border-border/60 bg-background px-3 py-2">
                <span className="font-medium text-foreground">{r}</span>
                <DemoActionButton size="xs" variant="ghost" action="Rapor indirildi"><Download className="size-3" /> PDF</DemoActionButton>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
