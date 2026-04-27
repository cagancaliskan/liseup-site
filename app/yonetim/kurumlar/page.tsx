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

const KURUMLAR = [
  { name: "Turkcell LAB", industry: "Teknoloji", city: "İstanbul", tier: "Engage", live: 2, since: "Ekim 2026" },
  { name: "Koç Vakfı", industry: "STK", city: "İstanbul", tier: "Discover", live: 1, since: "Eylül 2026" },
  { name: "Kworks", industry: "Üniversite", city: "İstanbul", tier: "Partner", live: 1, since: "Eylül 2026" },
];

const TIER_TINT: Record<string, string> = {
  Discover: "bg-muted text-muted-foreground",
  Engage: "bg-primary/10 text-primary",
  Partner: "bg-success/10 text-success",
};

export default function YonetimKurumlarPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/yonetim" },
          { label: "Kurumlar" },
        ]}
        title="Aktif kurumlar"
        description="Onaylanmış kurum hesapları + abonelik katmanı."
      />
      <div className="px-4 py-6 md:px-8 md:py-8">
        <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kurum</TableHead>
                <TableHead>Sektör</TableHead>
                <TableHead>Şehir</TableHead>
                <TableHead>Katman</TableHead>
                <TableHead>Yayındaki fırsat</TableHead>
                <TableHead>Aktif</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {KURUMLAR.map((k) => (
                <TableRow key={k.name}>
                  <TableCell className="font-semibold">{k.name}</TableCell>
                  <TableCell className="text-muted-foreground">{k.industry}</TableCell>
                  <TableCell className="text-muted-foreground">{k.city}</TableCell>
                  <TableCell>
                    <span className={cn("inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em]", TIER_TINT[k.tier])}>{k.tier}</span>
                  </TableCell>
                  <TableCell className="font-mono tabular-nums">{k.live}</TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">{k.since}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
