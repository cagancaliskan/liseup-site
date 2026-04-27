interface Metric {
  figure: string;
  label: string;
  source?: string;
}

const METRICS: Metric[] = [
  {
    figure: "%88",
    label: "Gen Z'nin kendi işini kurmayı hayal ediyor",
    source: "Deloitte Gen Z Survey · 2024",
  },
  {
    figure: "#1",
    label: "İstanbul, Avrupa'nın en büyük girişim ekosistemlerinden biri",
    source: "Startup Ecosystem Index · 2024",
  },
  {
    figure: "478",
    label: "Türkiye'de yatırım yapan aktif fon",
    source: "Startups.watch · 2025",
  },
];

export function MetricsRow() {
  return (
    <dl className="grid gap-x-12 gap-y-8 md:grid-cols-3">
      {METRICS.map((m) => (
        <div
          key={m.label}
          className="border-l-2 border-primary/70 pl-5 md:border-l md:pl-6"
        >
          <dt className="font-display text-[44px] font-black leading-none text-foreground tabular-nums md:text-[56px]">
            {m.figure}
          </dt>
          <dd className="mt-3 text-[15px] leading-6 text-foreground/90">
            {m.label}
          </dd>
          {m.source && (
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              {m.source}
            </p>
          )}
        </div>
      ))}
    </dl>
  );
}
