import Link from "next/link";
import { Megaphone, Plus } from "lucide-react";
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
import {
  MOCK_PUBLISHED_OPPORTUNITIES,
  type PublishedOpportunityMock,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STATUS_TINT: Record<PublishedOpportunityMock["status"], string> = {
  Yayında: "bg-success/10 text-success",
  Taslak: "bg-warning/10 text-warning",
  Kapalı: "bg-muted text-muted-foreground",
};

export default function FirsatlarimPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/kurum" },
          { label: "Fırsatlarım" },
        ]}
        title="Fırsatlarım"
        description="Yayınladığın + taslak halindeki fırsatların."
        actions={
          <Button asChild>
            <Link href="/kurum/firsat-yayinla">
              <Plus className="size-4" />
              Yeni fırsat
            </Link>
          </Button>
        }
      />
      <div className="px-4 py-8 md:px-8 md:py-10">
        <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlık</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Başvuru</TableHead>
                <TableHead>Açık gün</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">Aksiyon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_PUBLISHED_OPPORTUNITIES.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Megaphone className="size-3.5" />
                      </div>
                      <p className="font-semibold text-foreground">{p.title}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {p.category}
                  </TableCell>
                  <TableCell className="font-mono tabular-nums">
                    {p.applications}
                  </TableCell>
                  <TableCell className="font-mono text-muted-foreground tabular-nums">
                    {p.daysOpen > 0 ? `${p.daysOpen} gün` : "-"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em]",
                        STATUS_TINT[p.status],
                      )}
                    >
                      {p.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DemoActionButton
                      variant="link"
                      size="sm"
                      action="Fırsat yönetim sayfası demo aşamasında, yakında"
                      className="h-auto p-0 text-[12px]"
                    >
                      Yönet
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
