import { Flame, Check, ShieldAlert } from "lucide-react";
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

const OPS = [
  { title: "Turkcell LAB Kod Maratonu 2027", host: "Turkcell LAB", category: "Hackathon", sensitive: false, status: "Onay bekliyor" },
  { title: "Genç Vakıf · Mental Sağlık Atölyesi", host: "Genç Vakıf", category: "Atölye", sensitive: true, status: "Onay bekliyor" },
  { title: "Endeavor Pitch Yarışması", host: "Endeavor Türkiye", category: "Yarışma", sensitive: false, status: "Onaylandı" },
];

export default function YonetimFirsatlarPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/yonetim" },
          { label: "Fırsat moderasyonu" },
        ]}
        title="Fırsat moderasyonu"
        description="Kurum fırsatlarının onayı + hassas flag yönetimi."
      />
      <div className="mx-auto max-w-5xl space-y-4 px-4 py-6 md:px-8 md:py-8">
        <div className="rounded-xl border border-warning/30 bg-warning/[0.04] p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warning" />
            <p className="text-[12px] leading-5 text-foreground/90">
              <strong className="font-semibold">Hassas flag:</strong> Ruh sağlığı, inanç, kimlik temelli programlar. Hassas işaretli fırsatlara yapılan başvurular okul paneline mimari olarak düşmez.
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlık</TableHead>
                <TableHead>Kurum</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Hassas?</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">Aksiyon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {OPS.map((o) => (
                <TableRow key={o.title}>
                  <TableCell className="max-w-xs truncate font-semibold">{o.title}</TableCell>
                  <TableCell className="text-muted-foreground">{o.host}</TableCell>
                  <TableCell className="text-muted-foreground">{o.category}</TableCell>
                  <TableCell>
                    {o.sensitive ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 font-mono text-[10px] font-bold text-destructive">
                        <Flame className="size-3" />
                        Hassas
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">Normal</span>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">{o.status}</TableCell>
                  <TableCell className="text-right">
                    <DemoActionButton size="xs" action="Fırsat onaylandı, listede yayında">
                      <Check className="size-3" />
                      Onayla
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
