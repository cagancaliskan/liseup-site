import Link from "next/link";
import { Search, Filter, Download } from "lucide-react";
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
  MOCK_OKUL_STUDENTS,
  type OkulStudentMock,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STATUS_TINT: Record<OkulStudentMock["status"], string> = {
  Doğrulanmış: "bg-success/10 text-success",
  "Bağlantı Bekleyen": "bg-warning/10 text-warning",
};

export default function OgrencilerPage() {
  const verified = MOCK_OKUL_STUDENTS.filter(
    (s) => s.status === "Doğrulanmış",
  );
  const pending = MOCK_OKUL_STUDENTS.filter(
    (s) => s.status === "Bağlantı Bekleyen",
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/okul" },
          { label: "Öğrenciler" },
        ]}
        title="Öğrenciler"
        description="Doğrulanmış öğrencilerin aktivite özeti. Bağlantı bekleyen öğrenciler ayrı sekmede."
        actions={
          <DemoActionButton variant="outline" size="sm" action="Rapor indirildi">
            <Download className="size-3.5" />
            CSV indir
          </DemoActionButton>
        }
      />

      <div className="px-4 py-8 md:px-8 md:py-10">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-[13px] md:w-72">
            <Search className="size-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Öğrenci ara...</span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-[12px] font-semibold"
          >
            <Filter className="size-3.5" />
            Filtreler
            <span className="font-mono text-[10px] text-primary">2</span>
          </button>
          <span className="ml-auto font-mono text-[11px] text-muted-foreground">
            {verified.length} doğrulanmış · {pending.length} bekleyen
          </span>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-border/70 bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Öğrenci</TableHead>
                <TableHead>Sınıf</TableHead>
                <TableHead>Aktif proje</TableHead>
                <TableHead>Başvuru</TableHead>
                <TableHead>Son aktivite</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">Aksiyon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_OKUL_STUDENTS.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[11px] font-black text-white">
                        {s.firstName[0]}
                        {s.lastInitial[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground">
                          {s.firstName} {s.lastInitial}
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground">
                          {s.topSkill}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {s.classYear}
                  </TableCell>
                  <TableCell className="font-mono tabular-nums">
                    {s.activeProjects}
                  </TableCell>
                  <TableCell className="font-mono tabular-nums">
                    {s.applications}
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">
                    {s.lastActivity}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em]",
                        STATUS_TINT[s.status],
                      )}
                    >
                      {s.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/okul/ogrenciler/${s.id}`}
                      className="text-[12px] font-semibold text-primary hover:underline"
                    >
                      Detay
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="mt-4 text-[11px] text-muted-foreground">
          Bu liste yalnızca okul partnerlik anlaşmasında doğrulanmış öğrencileri
          gösterir. Hassas fırsat başvuruları + gizlenmiş projeler buraya
          düşmez, mimari olarak.
        </p>
      </div>
    </>
  );
}
