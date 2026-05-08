import { AlertTriangle, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { MOCK_FEATURE_FLAGS } from "@/lib/mock-data";

export default function SistemPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/yonetim" },
          { label: "Sistem" },
        ]}
        title="Feature flag + bakım"
        description="Sistem ayarları. Yalnızca Süper Admin + Teknik Admin değiştirebilir."
      />
      <div className="space-y-6 px-4 py-6 md:px-8 md:py-8">
        <section className="rounded-xl border border-warning/30 bg-warning/[0.04] p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
            <div className="flex-1">
              <h2 className="font-display text-[14px] font-black text-foreground">Bakım modu</h2>
              <p className="mt-1 text-[12px] leading-5 text-muted-foreground">
                Bakım modu açıldığında tüm authenticated rotalar maintenance sayfasına yönlenir.
                Public marketing rotaları erişilebilir kalır.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-muted-foreground">Kapalı</span>
              <Switch />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <Settings className="size-4 text-primary" />
            <h2 className="font-display text-[14px] font-black uppercase tracking-[0.1em] text-foreground">Feature flags</h2>
          </div>
          <ul className="divide-y divide-border/70 overflow-hidden rounded-xl border border-border/70 bg-card">
            {MOCK_FEATURE_FLAGS.map((f) => (
              <li key={f.id} className="flex items-start justify-between gap-3 px-5 py-3">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-foreground">
                    {f.name}
                  </p>
                  <p className="mt-1 text-[12px] leading-5 text-muted-foreground">{f.description}</p>
                  {typeof f.rolloutPct === "number" && (
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">Rollout: %{f.rolloutPct}</p>
                  )}
                </div>
                <Switch defaultChecked={f.enabled} />
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border/70 bg-card p-5">
          <h2 className="font-display text-[14px] font-black uppercase tracking-[0.1em] text-foreground">E-posta + bildirim şablonları</h2>
          <p className="mt-1 text-[12px] text-muted-foreground">Pass 5'te aktive olur, şu an PRD'deki şablon gösterimleri.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {["Veli onay e-postası", "Pilot okul davet e-postası", "Kurum onay e-postası", "Hesap silme onay"].map((t) => (
              <div key={t} className="flex items-center justify-between rounded-md border border-border/70 bg-background px-3 py-2 text-[12px]">
                <span className="font-semibold text-foreground">{t}</span>
                <DemoActionButton size="xs" variant="ghost" action="Şablon düzenleme demo aşamasında, yakında" toastType="info">Düzenle</DemoActionButton>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
