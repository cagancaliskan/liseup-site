import {
  Eye,
  Send,
  Inbox,
  TrendingUp,
  Bookmark,
  MessageSquare,
} from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";

export default function KurumAnalitikPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/kurum" },
          { label: "Analitik" },
        ]}
        title="Analitik"
        description="Profil görüntüleme, başvuru huni, mesaj yanıt oranları."
      />

      <div className="space-y-10 px-4 py-8 md:px-8 md:py-10">
        {/* KPI strip */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            icon={Eye}
            label="Profil görüntüleme (30g)"
            value={1840}
            delta="+24%"
          />
          <StatCard icon={Send} label="Mesaj atılan" value={64} delta="+12" />
          <StatCard icon={Inbox} label="Başvuru aldı" value={203} delta="+38" />
          <StatCard
            icon={MessageSquare}
            label="Yanıt oranı"
            value="73%"
            delta="+5%"
          />
        </div>

        {/* Funnel */}
        <section className="rounded-xl border border-border/70 bg-card p-6">
          <h2 className="font-display text-[16px] font-black text-foreground">
            Başvuru hunisi · Son 30 gün
          </h2>
          <ul className="mt-5 space-y-4">
            {[
              { label: "Profil görüntülemesi", value: 1840, pct: 100 },
              { label: "Profil kaydedildi", value: 412, pct: 22 },
              { label: "Başvuru yapıldı", value: 203, pct: 11 },
              { label: "Mülakata çağrıldı", value: 47, pct: 2.5 },
              { label: "Kabul edildi", value: 12, pct: 0.7 },
            ].map((f) => (
              <li key={f.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[13px] font-semibold text-foreground">
                    {f.label}
                  </p>
                  <p className="font-mono text-[12px] text-muted-foreground">
                    <span className="font-semibold text-foreground tabular-nums">
                      {f.value.toLocaleString("tr-TR")}
                    </span>{" "}
                    · {f.pct}%
                  </p>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${f.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Trend grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border border-border/70 bg-card p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-primary" />
              <h3 className="font-display text-[14px] font-black text-foreground">
                Profil görüntüleme trendi
              </h3>
            </div>
            <div className="mt-4 h-32 rounded-md bg-muted/40" />
            <p className="mt-3 font-mono text-[10px] text-muted-foreground">
              Son 30 gün, günlük ortalama 61 görüntüleme
            </p>
          </section>

          <section className="rounded-xl border border-border/70 bg-card p-6">
            <div className="flex items-center gap-2">
              <Bookmark className="size-4 text-primary" />
              <h3 className="font-display text-[14px] font-black text-foreground">
                Kaydedilen profil heatmap
              </h3>
            </div>
            <div className="mt-4 grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => {
                const opacity = (Math.sin(i * 0.7) + 1) / 2;
                return (
                  <div
                    key={i}
                    className="aspect-square rounded-sm"
                    style={{
                      backgroundColor: `rgba(56, 113, 223, ${0.15 + opacity * 0.65})`,
                    }}
                  />
                );
              })}
            </div>
            <p className="mt-3 font-mono text-[10px] text-muted-foreground">
              Son 5 hafta · pazartesi yoğun
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
