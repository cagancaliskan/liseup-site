import { CheckCircle2, ShieldCheck, School } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { getSession } from "@/lib/session";

export default function OkulBaglantiPage() {
  const session = getSession();
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Panom", href: "/app" },
          { label: "Okul bağlantım" },
        ]}
        title="Okul bağlantım"
        description="Okulunla platform arasındaki bağlantı durumu."
      />

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 md:px-8 md:py-10">
        {/* Current state */}
        <section className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" strokeWidth={2.1} />
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
                Durum
              </p>
              <h2 className="font-display text-[20px] font-black text-foreground">
                Doğrulanmış öğrenci
              </h2>
            </div>
          </div>
          <p className="mt-4 text-[14px] leading-6 text-foreground/90">
            <span className="font-semibold">{session.schoolName}</span>{" "}
            öğrencisi olarak doğrulandın. Okul panelinde görünür projelerin +
            hassas olmayan başvurularının istatistikleri paylaşılıyor.
          </p>
        </section>

        {/* What's shared / not shared */}
        <section className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-border/70 bg-card p-5">
            <h3 className="font-display text-[13px] font-black uppercase tracking-[0.1em] text-success">
              Okulun görüyor
            </h3>
            <ul className="mt-3 space-y-2 text-[12px] leading-5 text-foreground/90">
              {[
                "Görünür projelerin",
                "Hassas olmayan fırsat başvuruların (agrega)",
                "Aktivite düzeyin (mesaj var/yok)",
                "Kazandığın rozetler",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-success" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border/70 bg-card p-5">
            <h3 className="font-display text-[13px] font-black uppercase tracking-[0.1em] text-muted-foreground">
              Görmüyor
            </h3>
            <ul className="mt-3 space-y-2 text-[12px] leading-5 text-foreground/90">
              {[
                "Gizli projelerin",
                "Hassas fırsat başvuruların (ruh sağlığı, kimlik, inanç)",
                "Mesaj içeriklerin",
                "Kişisel profilin iç ayarları",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-0.5 size-3 shrink-0 rounded-full border border-muted-foreground/30" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Actions */}
        <section className="rounded-xl border border-border/70 bg-card p-6">
          <h3 className="font-display text-[15px] font-black text-foreground">
            Yönet
          </h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <DemoActionButton variant="outline" action="Okul değiştirme talebi gönderildi" toastType="info">
              <School className="size-4" />
              Okulumu değiştir
            </DemoActionButton>
            <DemoActionButton variant="outline" action="Bağlantı kaldırma talebi alındı, veriler korunur" toastType="info">
              Bağlantıyı kaldır
            </DemoActionButton>
          </div>
          <p className="mt-3 text-[11px] leading-4 text-muted-foreground">
            Bağlantıyı kaldırırsan bağımsız liseli olursun; okul paneli artık
            verilerini görmez. Projelerin ve fırsat başvuruların aynen kalır.
          </p>
        </section>
      </div>
    </>
  );
}
