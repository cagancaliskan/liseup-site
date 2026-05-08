import { PageHeader } from "@/components/app/page-header";
import { MOCK_BADGES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function BasarilarPage() {
  const earned = MOCK_BADGES.filter((b) => b.earned);
  const locked = MOCK_BADGES.filter((b) => !b.earned);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Panom", href: "/app" }, { label: "Rozetler" }]}
        title="Rozetler ve başarılar"
        description="Her tamamladığın proje, her aldığın referans burada birikir."
      />

      <div className="px-4 py-8 md:px-8 md:py-10">
        {/* Streak + Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-primary/30 bg-primary/[0.04] p-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
              Streak
            </p>
            <p className="mt-2 font-display text-[32px] font-black text-foreground tabular-nums">
              🔥 7 gün
            </p>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Son 7 gün aktifsin. Baskı yok, yarın da burada ol.
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card p-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Kazanılan
            </p>
            <p className="mt-2 font-display text-[32px] font-black text-foreground tabular-nums">
              {earned.length}/{MOCK_BADGES.length}
            </p>
            <p className="mt-1 text-[12px] text-muted-foreground">Rozet toplam</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card p-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Sıradaki
            </p>
            <p className="mt-2 font-display text-[20px] font-black text-foreground">
              Ekip Oyuncusu
            </p>
            <p className="mt-1 text-[12px] text-muted-foreground">
              2 farklı projede daha yer al
            </p>
          </div>
        </div>

        {/* Earned */}
        <section className="mt-10">
          <h2 className="font-display text-[14px] font-bold uppercase tracking-[0.12em] text-foreground">
            Kazandığın rozetler
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {earned.map((b) => (
              <BadgeCard key={b.id} badge={b} />
            ))}
          </div>
        </section>

        {/* Locked */}
        <section className="mt-10">
          <h2 className="font-display text-[14px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Henüz kazanmadıkların
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {locked.map((b) => (
              <BadgeCard key={b.id} badge={b} locked />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function BadgeCard({
  badge,
  locked,
}: {
  badge: (typeof MOCK_BADGES)[number];
  locked?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-5 text-center transition-colors",
        locked
          ? "border-border/50 opacity-60"
          : "border-border/80 hover:border-primary/30",
      )}
    >
      <div
        className={cn(
          "mx-auto flex size-14 items-center justify-center rounded-2xl text-[26px]",
          locked ? "bg-muted grayscale" : "bg-primary/10",
        )}
      >
        {badge.emoji}
      </div>
      <h3 className="mt-3 font-display text-[13px] font-black text-foreground">
        {badge.title}
      </h3>
      <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
        {badge.description}
      </p>
      {badge.earnedAt && (
        <p className="mt-2 font-mono text-[10px] text-success">
          {badge.earnedAt}
        </p>
      )}
    </div>
  );
}
