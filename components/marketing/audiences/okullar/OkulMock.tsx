"use client";

export function OkulMock() {
  return (
    <div className="flex flex-col overflow-hidden border border-[var(--rule)] bg-[var(--surface-0)] shadow-[var(--shadow-card)]">
      {/* Mock browser bar */}
      <div className="flex items-center gap-3 border-b border-[var(--rule)] bg-[var(--surface-1)] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-3)] opacity-25" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-3)] opacity-25" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-3)] opacity-25" />
        </div>
        <div className="flex-1 rounded bg-[var(--surface-2)] px-3 py-1">
          <span className="font-mono text-[10px] text-[var(--ink-3)]">
            liseup.org/okul/dashboard
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 sm:p-5">
        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: "Aktif öğrenci", value: "24" },
            { label: "Açılmış proje", value: "11" },
            { label: "Kurum teklifi", value: "7" },
            { label: "Aylık başvuru", value: "19" },
          ].map((kpi) => (
            <div key={kpi.label} className="flex flex-col gap-1 border border-[var(--rule)] p-3">
              <span
                className="font-display font-black leading-none tracking-[-0.04em] tabular-nums text-[var(--color-brand-500)]"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
              >
                {kpi.value}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ink-3)]">
                {kpi.label}
              </span>
            </div>
          ))}
        </div>

        {/* Sparkline */}
        <div className="border border-[var(--rule)] p-3">
          <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ink-3)]">
            Aylık başvuru trendi
          </span>
          <svg
            viewBox="0 0 280 56"
            className="w-full"
            aria-hidden
            preserveAspectRatio="none"
            height="56"
          >
            <polyline
              points="0,48 40,40 80,32 120,28 160,20 200,14 240,8 280,4"
              fill="none"
              stroke="var(--color-brand-500)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <polyline
              points="0,48 40,40 80,32 120,28 160,20 200,14 240,8 280,4 280,56 0,56"
              fill="color-mix(in srgb, var(--color-brand-500) 8%, transparent)"
              stroke="none"
            />
          </svg>
        </div>

        {/* Activity list */}
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ink-3)]">
            Son aktivite
          </span>
          {[
            { initials: "AK", action: "Mühendislik Kulübü projesine başvurdu" },
            { initials: "DK", action: "Yazılım stajı teklifini kabul etti" },
          ].map((row) => (
            <div key={row.initials} className="flex items-center gap-2.5 border border-[var(--rule)] p-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-brand-500)_12%,transparent)] font-mono text-[8px] font-medium text-[var(--color-brand-500)]">
                {row.initials}
              </span>
              <span className="font-sans text-[11px] text-[var(--ink-2)]">{row.action}</span>
            </div>
          ))}
        </div>

        {/* Hint */}
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ink-3)]">
          gerçek zamanlı panel · aylık rapor · pilot eylül 2026
        </p>
      </div>
    </div>
  );
}
