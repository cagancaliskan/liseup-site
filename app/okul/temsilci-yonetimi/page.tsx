import { UserPlus, Shield, Eye } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const REPS = [
  {
    name: "Serkan Yılmaz",
    role: "Müdür Yrd. · Rehberlik",
    permission: "Yönetici",
    isMain: true,
  },
  {
    name: "Ayşe Korkmaz",
    role: "Rehber Öğretmen",
    permission: "Yönetici",
    isMain: false,
  },
  {
    name: "Cem Demir",
    role: "Müdür",
    permission: "Görüntüleyen",
    isMain: false,
  },
];

export default function TemsilciYonetimiPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/okul" },
          { label: "Temsilciler" },
        ]}
        title="Temsilci yönetimi"
        description="Ana temsilci + ek kullanıcılar. Yönetici (tüm yetki) veya Görüntüleyen (sadece okuma)."
        actions={
          <DemoActionButton size="sm" action="Davet gönderildi">
            <UserPlus className="size-3.5" />
            Temsilci ekle
          </DemoActionButton>
        }
      />

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 md:px-8 md:py-10">
        <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İsim</TableHead>
                <TableHead>Ünvan</TableHead>
                <TableHead>Yetki</TableHead>
                <TableHead className="text-right">Aksiyon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {REPS.map((r, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{r.name}</span>
                      {r.isMain && (
                        <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-primary">
                          Ana
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{r.role}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                      {r.permission === "Yönetici" ? (
                        <Shield className="size-3 text-primary" />
                      ) : (
                        <Eye className="size-3 text-muted-foreground" />
                      )}
                      {r.permission}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DemoActionButton
                      variant="link"
                      size="sm"
                      toastType={r.isMain ? "success" : "info"}
                      action={r.isMain ? "Yetki devri talebi gönderildi" : "Temsilci kaldırıldı"}
                      className="h-auto p-0 text-[12px] text-muted-foreground hover:text-destructive"
                    >
                      {r.isMain ? "Yetkiyi devret" : "Kaldır"}
                    </DemoActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="rounded-xl border border-border/70 bg-muted/30 p-5">
          <h3 className="font-display text-[14px] font-black text-foreground">
            Offboarding akışı
          </h3>
          <p className="mt-1 text-[12px] leading-5 text-muted-foreground">
            Öğretmen ayrıldığında ana temsilci yetkisini çeker, hesap arşive
            alınır. Belge için "sorumluluk devri" tutanağı PDF üretilir.
          </p>
        </div>
      </div>
    </>
  );
}
