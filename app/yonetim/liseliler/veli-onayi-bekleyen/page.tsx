import { Mail, Clock, AlertTriangle } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";

const PENDING = [
  { name: "Yiğit T.", age: 15, parentEmail: "v***@example.com", remaining: "12 sa", submitted: "60 sa önce" },
  { name: "Ada R.", age: 16, parentEmail: "v***@example.com", remaining: "36 sa", submitted: "36 sa önce" },
  { name: "Cem B.", age: 14, parentEmail: "v***@example.com", remaining: "68 sa", submitted: "4 sa önce" },
];

export default function VeliOnayBekleyenPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/yonetim" },
          { label: "Veli onayı bekleyen" },
        ]}
        title="Veli onayı bekleyen kayıtlar"
        description="Veri escrow tablosu, 72 saat içinde onay gelmezse otomatik silinir."
      />
      <div className="mx-auto max-w-3xl space-y-3 px-4 py-6 md:px-8 md:py-8">
        <div className="rounded-xl border border-warning/30 bg-warning/[0.04] p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
            <p className="text-[12px] leading-5 text-foreground/90">
              Bu sayfada PII minimumda, veli e-postası maskelenmiştir. Detay için <strong>Süper Admin</strong> yetkisi gerekir.
            </p>
          </div>
        </div>
        {PENDING.map((p) => (
          <div key={p.name} className="rounded-xl border border-border/70 bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-[14px] font-black text-foreground">{p.name}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{p.age} yaş · veli: {p.parentEmail}</p>
                <p className="mt-1 font-mono text-[10px] text-muted-foreground">Gönderildi: {p.submitted}</p>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-warning/15 px-2.5 py-1 font-mono text-[10px] font-semibold text-warning">
                <Clock className="size-3" />
                {p.remaining} kaldı
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 border-t border-border/70 pt-3">
              <DemoActionButton size="xs" variant="outline" action="Hatırlatma gönderildi">
                <Mail className="size-3" />
                Veliye yeniden mail at
              </DemoActionButton>
              <DemoActionButton size="xs" variant="ghost" action="Hesap silme talebi gönderildi" toastType="info">Hesabı manuel sil</DemoActionButton>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
