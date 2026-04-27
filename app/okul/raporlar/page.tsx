import Link from "next/link";
import { Download, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";

const REPORTS = [
  { period: "Nisan 2027", href: "/okul/raporlar/aylik", type: "Aylık" },
  { period: "Mart 2027", href: "/okul/raporlar/aylik", type: "Aylık" },
  { period: "Şubat 2027", href: "/okul/raporlar/aylik", type: "Aylık" },
  { period: "Ocak 2027", href: "/okul/raporlar/aylik", type: "Aylık" },
  { period: "1. Dönem 2026-27", href: "/okul/raporlar/donem-sonu", type: "Dönem Sonu" },
];

export default function RaporlarPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Pano", href: "/okul" }, { label: "Raporlar" }]}
        title="Raporlar"
        description="Aylık ve dönem sonu raporlar arşivi. Veli sunumu için PDF/PPTX export."
      />

      <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-10">
        <ul className="divide-y divide-border/70 overflow-hidden rounded-xl border border-border/70 bg-card">
          {REPORTS.map((r) => (
            <li key={r.period} className="flex items-center gap-4 px-5 py-4">
              <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                {r.type === "Aylık" ? (
                  <Calendar className="size-4" />
                ) : (
                  <FileText className="size-4" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[14px] font-black text-foreground">
                  {r.period}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  {r.type}
                </p>
              </div>
              <Button asChild size="sm" variant="ghost">
                <Link href={r.href}>İncele</Link>
              </Button>
              <DemoActionButton size="sm" variant="outline" action="Rapor indirildi">
                <Download className="size-3.5" />
                PDF
              </DemoActionButton>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
