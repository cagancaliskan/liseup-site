import { TrendingUp, Users, FolderKanban, Send, Download } from "lucide-react";
import { MockBrowserFrame } from "./mock-browser-frame";

/**
 * School panel dashboard mock, preview of what school representatives see.
 */
export function OkulDashboardMock() {
  return (
    <MockBrowserFrame label="liseup.org/okul" tone="brand">
      <div className="p-5">
        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-3">
          <Kpi icon={Users} label="Aktif öğrenci" value="42" trend="+12" tone="primary" />
          <Kpi icon={FolderKanban} label="Açık proje" value="18" trend="+4" tone="success" />
          <Kpi icon={Send} label="Kurum teklifi" value="7" trend="+3" tone="warning" />
          <Kpi icon={TrendingUp} label="Bu ay aktivite" value="%+38" trend="" tone="info" />
        </div>

        {/* Sparkline chart */}
        <div className="mt-5 rounded-lg border border-border/70 bg-background p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                Son 30 gün
              </div>
              <div className="mt-0.5 font-display text-[16px] font-bold text-foreground">
                Öğrenci aktivitesi
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Download className="size-3" />
              Aylık rapor
            </button>
          </div>
          <Sparkline />
        </div>

        {/* Student activity preview */}
        <div className="mt-4 rounded-lg border border-border/70 bg-background">
          <div className="flex items-center justify-between border-b border-border/70 px-3 py-2.5">
            <div className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              Bu hafta
            </div>
            <span className="text-[11px] text-muted-foreground">9 olay</span>
          </div>
          <ul className="divide-y divide-border/70">
            <ActivityRow
              name="Deniz K."
              meta="11. Sınıf · Ankara"
              event="SesliKitap projesinde tasarımcı rolü aldı"
              tone="success"
            />
            <ActivityRow
              name="Ece Y."
              meta="10. Sınıf · İstanbul"
              event="TEB Girişim Evi programına başvurdu"
              tone="primary"
            />
            <ActivityRow
              name="Bora M."
              meta="12. Sınıf · İzmir"
              event="Ortak Sesi Duyur projesini tamamladı"
              tone="warning"
            />
          </ul>
        </div>
      </div>
    </MockBrowserFrame>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  trend,
  tone,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  trend: string;
  tone: "primary" | "success" | "warning" | "info";
}) {
  const iconBg: Record<typeof tone, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    info: "bg-info/10 text-info",
  };

  return (
    <div className="rounded-lg border border-border/70 bg-background p-4">
      <div className="flex items-start justify-between">
        <div
          className={
            "flex size-8 items-center justify-center rounded-md " + iconBg[tone]
          }
        >
          <Icon className="size-4" strokeWidth={2.2} />
        </div>
        {trend && (
          <span className="font-mono text-[11px] font-semibold text-success">
            {trend}
          </span>
        )}
      </div>
      <div className="mt-3 font-display text-[28px] font-black text-foreground tabular-nums">
        {value}
      </div>
      <div className="mt-1 text-[12px] text-muted-foreground">{label}</div>
    </div>
  );
}

function ActivityRow({
  name,
  meta,
  event,
  tone,
}: {
  name: string;
  meta: string;
  event: string;
  tone: "success" | "primary" | "warning";
}) {
  const dotClass: Record<typeof tone, string> = {
    success: "bg-success",
    primary: "bg-primary",
    warning: "bg-warning",
  };

  return (
    <li className="flex items-start gap-3 px-3 py-2.5">
      <span className={"mt-1 size-1.5 shrink-0 rounded-full " + dotClass[tone]} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[12px] font-semibold text-foreground">{name}</span>
          <span className="text-[10px] text-muted-foreground">{meta}</span>
        </div>
        <div className="mt-0.5 text-[11px] leading-4 text-muted-foreground">{event}</div>
      </div>
    </li>
  );
}

function Sparkline() {
  // 30-day sparkline, hand-crafted to look like aktivite artışı
  const values = [
    3, 4, 3, 5, 6, 5, 7, 6, 8, 9, 8, 10, 11, 10, 13, 12, 14, 16, 14, 17, 18, 17,
    20, 21, 19, 22, 24, 26, 25, 28,
  ];
  const max = Math.max(...values);
  const width = 100;
  const height = 32;
  const stepX = width / (values.length - 1);

  const points = values
    .map((v, i) => `${i * stepX},${height - (v / max) * height}`)
    .join(" ");
  const area = `0,${height} ${points} ${width},${height}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="mt-4 h-16 w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3871DF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3871DF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#spark-fill)" />
      <polyline
        points={points}
        fill="none"
        stroke="#3871DF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
