import { Check, X, Clock, EyeOff } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { MOCK_HIDE_REQUESTS } from "@/lib/mock-data";

export default function GizlemeTalepleriPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/okul" },
          { label: "Projeler", href: "/okul/projeler" },
          { label: "Gizleme talepleri" },
        ]}
        title="Gizleme talepleri"
        description="Öğrencinin 'okulumdan gizle' talebi. 14 gün içinde yanıtlamazsan sistem otomatik onay verir (öğrenci lehine default)."
      />

      <div className="mx-auto max-w-3xl space-y-4 px-4 py-8 md:px-8 md:py-10">
        {/* Policy callout */}
        <div className="rounded-xl border border-warning/30 bg-warning/[0.04] p-5">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-warning/15 text-warning">
              <EyeOff className="size-4" strokeWidth={2.1} />
            </div>
            <div>
              <h2 className="font-display text-[14px] font-black text-foreground">
                Politika notu
              </h2>
              <p className="mt-1 text-[12px] leading-5 text-muted-foreground">
                3 kez ardışık reddetme sonrasında LiseUP admin uyarılır ve
                politika incelemesi açılır. Öğrenci gerekçesi gizli, siz
                sadece "talep var" etiketi görürsünüz, metni göremezsiniz.
              </p>
            </div>
          </div>
        </div>

        {MOCK_HIDE_REQUESTS.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 py-14 text-center">
            <p className="font-display text-[18px] font-black text-foreground">
              Bekleyen talep yok.
            </p>
            <p className="mt-2 text-[13px] text-muted-foreground">
              Yeni talepler buraya düşer.
            </p>
          </div>
        ) : (
          MOCK_HIDE_REQUESTS.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-border/70 bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    {r.studentName}
                  </p>
                  <h3 className="mt-1 font-display text-[16px] font-black text-foreground">
                    {r.projectTitle}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    Gönderildi: {r.submittedAt}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-warning/15 px-2.5 py-1 font-mono text-[10px] font-semibold text-warning">
                  <Clock className="size-3" />
                  {r.daysLeft} gün kaldı
                </div>
              </div>

              {r.reason && (
                <div className="mt-3 rounded-md bg-muted/50 p-3 text-[12px] leading-5 text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Gerekçe (gizli):
                  </span>{" "}
                  Görünmez, sadece öğrenci ve LiseUP içerik moderatörü görür.
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <DemoActionButton size="sm" action="Proje gizlendi">
                  <Check className="size-3.5" />
                  Onayla, projeyi gizle
                </DemoActionButton>
                <DemoActionButton size="sm" variant="outline" action="Gizleme talebi reddedildi, talep sahibine bildirildi">
                  <X className="size-3.5" />
                  Reddet
                </DemoActionButton>
                <DemoActionButton size="sm" variant="ghost" action="Detay sayfası demo aşamasında, yakında">
                  Detayı incele
                </DemoActionButton>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
