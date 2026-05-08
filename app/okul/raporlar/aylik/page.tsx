import {
  Download,
  FileText,
  Users,
  FolderKanban,
  Send,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";

export default function AylikRaporPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/okul" },
          { label: "Raporlar", href: "/okul/raporlar" },
          { label: "Nisan 2027" },
        ]}
        title="Aylık rapor, Nisan 2027"
        description="Otomatik üretildi, ayın 1'inde mail kutuna gelen rapor."
        actions={
          <>
            <DemoActionButton variant="outline" size="sm" action="PowerPoint dosyası hazırlanıyor">
              <FileText className="size-3.5" />
              PowerPoint
            </DemoActionButton>
            <DemoActionButton size="sm" action="Rapor indirildi">
              <Download className="size-3.5" />
              PDF indir
            </DemoActionButton>
          </>
        }
      />

      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-10">
        {/* Header */}
        <div
          className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 px-6 py-8 text-white md:px-10 md:py-10"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.35), transparent 40%)",
            }}
          />
          <div className="relative">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">
              LiseUP Aylık Rapor · Nisan 2027
            </p>
            <h1 className="mt-3 font-display text-[28px] font-black leading-tight md:text-[36px]">
              Ankara Atatürk Lisesi
            </h1>
            <p className="mt-2 max-w-md text-[14px] leading-6 text-white/85">
              42 doğrulanmış öğrenci · 18 görünür proje · 3 başarı hikayesi adayı
            </p>
          </div>
        </div>

        {/* KPIs */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <StatCard icon={Users} label="Aktif öğrenci" value={42} delta="+12" />
          <StatCard icon={FolderKanban} label="Açık proje" value={18} delta="+4" />
          <StatCard icon={Send} label="Kurum teklifi" value={7} delta="+3" />
          <StatCard icon={CheckCircle2} label="Tamamlanan" value={3} delta="+2" />
        </div>

        {/* Top 3 highlights */}
        <section className="mt-10">
          <h2 className="font-display text-[14px] font-black uppercase tracking-[0.12em] text-foreground">
            Ayın 3 öne çıkanı
          </h2>
          <ul className="mt-4 space-y-3">
            {[
              {
                tone: "success",
                title: "Deniz K. (11. sınıf), SesliKitap projesi tamamlandı",
                body: "3 kişilik ekiple 6 hafta sürdü. LiseUP sertifikası üretildi, okul logosu eklendi.",
              },
              {
                tone: "primary",
                title: "Ela B. (12. sınıf), TEB Girişim Evi Junior kabulü",
                body: "Mahalle Haberleri projesi ile programa kabul edildi. 4 haftalık mentörlük başladı.",
              },
              {
                tone: "warning",
                title: "Bora M. (12. sınıf), Endeavor Pitch yarı finalist",
                body: "Pitch yarışmasında ekibimle yarı finallere kaldık.",
              },
            ].map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border/70 bg-card p-4"
              >
                <span
                  className={`mt-2 size-1.5 shrink-0 rounded-full ${
                    h.tone === "success"
                      ? "bg-success"
                      : h.tone === "primary"
                        ? "bg-primary"
                        : "bg-warning"
                  }`}
                />
                <div>
                  <p className="font-display text-[14px] font-bold text-foreground">
                    {h.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
                    {h.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Trend */}
        <section className="mt-10 rounded-xl border border-border/70 bg-card p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-primary" />
            <h2 className="font-display text-[15px] font-black text-foreground">
              30 gün aktivite trendi
            </h2>
          </div>
          <div className="mt-4 h-32 rounded-md bg-muted/40" />
          <p className="mt-3 text-[12px] text-muted-foreground">
            Geçen aya göre öğrenci aktivitesi %38 arttı.
          </p>
        </section>

        {/* Privacy footer */}
        <div className="mt-10 rounded-lg border border-border/70 bg-muted/30 p-4 text-[11px] leading-5 text-muted-foreground">
          <p>
            Bu rapor yalnızca <strong className="font-semibold text-foreground">doğrulanmış öğrencilerin görünür projelerini</strong>{" "}
            içerir. Hassas fırsat başvuruları (ruh sağlığı, inanç, kimlik
            temelli programlar) rapora hiç düşmez. Mesaj içeriği hiçbir zaman
            okulla paylaşılmaz.
          </p>
        </div>
      </div>
    </>
  );
}
