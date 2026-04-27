import { ArrowRight, Bookmark, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OpportunityMock } from "@/lib/mock-data";

const CATEGORY_TINT: Record<string, string> = {
  hackathon: "bg-brand-100 text-brand-700 dark:bg-brand-800/40 dark:text-brand-200",
  burs: "bg-success/10 text-success dark:bg-success/20",
  "yaz-programi": "bg-warning/10 text-warning dark:bg-warning/20",
  yarisma: "bg-brand-500/10 text-brand-600 dark:bg-brand-400/15 dark:text-brand-200",
  staj: "bg-info/10 text-info dark:bg-info/20",
  program: "bg-accent text-accent-foreground",
};

interface OpportunityCardProps {
  opportunity: OpportunityMock;
  interactive?: boolean;
  className?: string;
}

export function OpportunityCard({
  opportunity,
  interactive = false,
  className,
}: OpportunityCardProps) {
  const { category, categoryLabel, title, host, reward, daysLeft, applications, cityLabel, hot } =
    opportunity;

  return (
    <article
      className={cn(
        "group/card relative flex h-full flex-col gap-5 rounded-2xl border border-border/80 bg-card p-6 transition-all duration-[var(--duration-base)]",
        interactive &&
          "hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-dramatic)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em]",
            CATEGORY_TINT[category] ?? "bg-muted text-muted-foreground",
          )}
        >
          {hot && (
            <span className="relative inline-flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-50" />
              <span className="relative inline-flex size-1.5 rounded-full bg-current" />
            </span>
          )}
          {categoryLabel}
        </div>
        <button
          type="button"
          aria-label="Kaydet"
          className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Bookmark className="size-3.5" />
        </button>
      </div>

      <div>
        <h3 className="font-display text-[20px] font-black leading-[1.2] tracking-[-0.01em] text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-[13px] font-medium text-muted-foreground">{host}</p>
      </div>

      <dl className="grid grid-cols-2 gap-3 text-[12px]">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            Ödül
          </dt>
          <dd className="mt-1 font-medium leading-5 text-foreground">{reward}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            Konum
          </dt>
          <dd className="mt-1 font-medium leading-5 text-foreground">{cityLabel}</dd>
        </div>
      </dl>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-3 text-[12px]">
        <div className="flex items-center gap-3 text-muted-foreground tabular-nums">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" />
            Son {daysLeft} gün
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="size-3" />
            {applications}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 font-medium text-primary">
          Başvur
          <ArrowRight className="size-3 transition-transform group-hover/card:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
