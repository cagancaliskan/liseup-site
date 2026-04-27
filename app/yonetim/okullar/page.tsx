import { PageHeader } from "@/components/app/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const SCHOOLS = [
  { name: "Ankara Atatürk Lisesi", city: "Ankara", students: 42, projects: 18, status: "Pilot Okul", since: "Eylül 2026" },
  { name: "Beykent Koleji", city: "İstanbul", students: 0, projects: 0, status: "Görüşme", since: "-" },
  { name: "Kadıköy Anadolu Lisesi", city: "İstanbul", students: 0, projects: 0, status: "Sözleşme aşaması", since: "-" },
];

const STATUS_TINT: Record<string, string> = {
  "Pilot Okul": "bg-primary/10 text-primary",
  "Partner Okul": "bg-success/10 text-success",
  Görüşme: "bg-warning/10 text-warning",
  "Sözleşme aşaması": "bg-info/10 text-info",
};

export default function OkullarPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Pano", href: "/yonetim" }, { label: "Okullar" }]}
        title="Aktif okullar"
        description="Pilot + Partner okul listesi."
      />
      <div className="px-4 py-6 md:px-8 md:py-8">
        <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Okul</TableHead>
                <TableHead>Şehir</TableHead>
                <TableHead>Doğrulanmış öğr.</TableHead>
                <TableHead>Aktif proje</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Başlangıç</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SCHOOLS.map((s) => (
                <TableRow key={s.name}>
                  <TableCell className="font-semibold">{s.name}</TableCell>
                  <TableCell className="text-muted-foreground">{s.city}</TableCell>
                  <TableCell className="font-mono tabular-nums">{s.students}</TableCell>
                  <TableCell className="font-mono tabular-nums">{s.projects}</TableCell>
                  <TableCell>
                    <span className={cn("inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em]", STATUS_TINT[s.status])}>{s.status}</span>
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">{s.since}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
