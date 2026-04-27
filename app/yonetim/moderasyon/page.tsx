import Link from "next/link";
import { ArrowRight, ShieldAlert, AlertTriangle, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MOCK_MODERATION_QUEUE } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function ModerasyonPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/yonetim" },
          { label: "Moderasyon" },
        ]}
        title="Moderasyon panosu"
        description="Risk skoru dağılımı + bekleyen kuyruk + son aksiyonlar."
      />

      <div className="space-y-8 px-4 py-6 md:px-8 md:py-8">
        {/* KPI strip */}
        <div className="grid gap-3 md:grid-cols-4">
          <StatCard
            icon={ShieldAlert}
            label="Bekleyen toplam"
            value={9}
            delta="+2"
          />
          <StatCard
            icon={AlertTriangle}
            label="Yüksek risk (61+)"
            value={7}
          />
          <StatCard icon={Flag} label="Şikayet (yüksek)" value={2} />
          <StatCard
            icon={ShieldAlert}
            label="Bu hafta otomatik flag"
            value={42}
            delta="+18"
          />
        </div>

        {/* Risk distribution */}
        <section className="rounded-xl border border-border/70 bg-card p-5">
          <h2 className="font-display text-[14px] font-black uppercase tracking-[0.1em] text-foreground">
            Risk dağılımı (son 30 gün)
          </h2>
          <ul className="mt-4 space-y-3">
            {[
              { label: "Düşük (0–30)", count: 287, pct: 78, tone: "success" },
              { label: "Orta (31–60)", count: 56, pct: 15, tone: "warning" },
              { label: "Yüksek (61–100)", count: 24, pct: 7, tone: "destructive" },
            ].map((r) => (
              <li key={r.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[12px] font-semibold text-foreground">
                    {r.label}
                  </p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    <span className="font-semibold text-foreground tabular-nums">
                      {r.count}
                    </span>{" "}
                    · {r.pct}%
                  </p>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      r.tone === "success"
                        ? "bg-success"
                        : r.tone === "warning"
                          ? "bg-warning"
                          : "bg-destructive",
                    )}
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[10px] text-muted-foreground">
            Faz 2 (Kasım–Aralık 2026): kalibrasyon hedefi %95 otomatik-insan uyumu.
          </p>
        </section>

        {/* Queue */}
        <section>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-[15px] font-black uppercase tracking-[0.1em] text-foreground">
                Bekleyen kuyruk
              </h2>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                Risk skoru sıralı, en kritik üstte.
              </p>
            </div>
            <Button asChild size="sm" variant="ghost">
              <Link href="/yonetim/moderasyon/yuksek-risk">
                Yüksek risk
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-border/70 bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>İçerik</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Flag</TableHead>
                  <TableHead>Süre</TableHead>
                  <TableHead className="text-right">Aksiyon</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_MODERATION_QUEUE.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <p className="font-semibold text-foreground">{m.title}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">
                        {m.author}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-foreground">
                        {m.kind}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="inline-flex items-center gap-2">
                        <div className="h-1.5 w-14 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              m.riskScore >= 60
                                ? "bg-destructive"
                                : m.riskScore >= 30
                                  ? "bg-warning"
                                  : "bg-success",
                            )}
                            style={{ width: `${m.riskScore}%` }}
                          />
                        </div>
                        <span
                          className={cn(
                            "font-mono text-[11px] font-bold tabular-nums",
                            m.riskScore >= 60
                              ? "text-destructive"
                              : m.riskScore >= 30
                                ? "text-warning"
                                : "text-success",
                          )}
                        >
                          {m.riskScore}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {m.flags.map((f) => (
                          <span
                            key={f}
                            className="inline-flex rounded bg-destructive/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-destructive"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-[11px] text-muted-foreground">
                      {m.submittedAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="text-[12px] font-semibold text-primary hover:underline">
                        İncele
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </>
  );
}
