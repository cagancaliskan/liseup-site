import { Filter, MessageSquare, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  MOCK_KURUM_APPLICATIONS,
  type KurumApplicationMock,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STATUS_TINT: Record<KurumApplicationMock["status"], string> = {
  Yeni: "bg-primary/10 text-primary",
  İncelendi: "bg-muted text-muted-foreground",
  Mülakat: "bg-warning/10 text-warning",
  Kabul: "bg-success/10 text-success",
  Reddedildi: "bg-destructive/10 text-destructive",
};

export default function KurumBasvurularPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/kurum" },
          { label: "Başvurular" },
        ]}
        title="Başvurular"
        description="Yayındaki fırsatlarına gelen başvurular. Eşleşme skoru profilinin yetenek setine göre hesaplanır."
        actions={
          <DemoActionButton variant="outline" size="sm" action="Filtre paneli açıldı">
            <Filter className="size-3.5" />
            Filtreler
          </DemoActionButton>
        }
      />

      <div className="px-4 py-6 md:px-8 md:py-8">
        {/* Tabs as filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {["Tümü (17)", "Yeni (2)", "İncelendi (1)", "Mülakat (1)", "Kabul (1)", "Reddedildi (1)"].map(
            (f, i) => (
              <button
                key={f}
                type="button"
                className={
                  i === 0
                    ? "inline-flex h-8 items-center rounded-full bg-foreground px-3 text-[12px] font-semibold text-background"
                    : "inline-flex h-8 items-center rounded-full border border-border bg-background px-3 text-[12px] font-medium text-muted-foreground hover:text-foreground"
                }
              >
                {f}
              </button>
            ),
          )}
        </div>

        {/* Bulk actions bar */}
        <div className="mb-3 flex items-center gap-3 rounded-md border border-border/70 bg-muted/30 px-4 py-2 text-[12px]">
          <Checkbox aria-label="Tümünü seç" />
          <span className="text-muted-foreground">2 seçili</span>
          <span className="ml-auto flex gap-2">
            <DemoActionButton size="xs" variant="ghost" action="Mesaj gönderildi">
              <MessageSquare className="size-3" />
              Mesaj at
            </DemoActionButton>
            <DemoActionButton size="xs" variant="ghost" action="Aday kaydedildi">
              <Bookmark className="size-3" />
              Kaydet
            </DemoActionButton>
            <DemoActionButton size="xs" variant="ghost" action="Mülakat planlandı">
              Mülakat planla
            </DemoActionButton>
          </span>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Aday</TableHead>
                <TableHead>Fırsat</TableHead>
                <TableHead>Eşleşme</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">Aksiyon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_KURUM_APPLICATIONS.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <Checkbox aria-label="Seç" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[11px] font-black text-white">
                        {a.studentInitials}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {a.studentFirstName}
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground">
                          {a.classYear} · {a.city}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-foreground/80">
                    {a.opportunity}
                  </TableCell>
                  <TableCell>
                    <div className="inline-flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${a.matchScore}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-foreground tabular-nums">
                        {a.matchScore}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">
                    {a.submittedAt}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em]",
                        STATUS_TINT[a.status],
                      )}
                    >
                      {a.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DemoActionButton
                      variant="link"
                      size="sm"
                      action="Detay sayfası demo aşamasında, yakında"
                      className="h-auto p-0 text-[12px]"
                    >
                      Detay
                    </DemoActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
