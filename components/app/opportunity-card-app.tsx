"use client";

import Link from "next/link";
import { Bookmark, Clock, Users } from "lucide-react";
import { toast } from "sonner";
import type { OpportunityMock } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const CATEGORY_TINT: Record<string, string> = {
  hackathon: "bg-brand-100 text-brand-700 dark:bg-brand-800/40 dark:text-brand-200",
  burs: "bg-success/10 text-success",
  "yaz-programi": "bg-warning/10 text-warning",
  yarisma: "bg-primary/10 text-primary",
  staj: "bg-info/10 text-info",
  program: "bg-muted text-muted-foreground",
};

export function OpportunityCardApp({
  opportunity,
  className,
}: {
  opportunity: OpportunityMock;
  className?: string;
}) {
  const { id, category, categoryLabel, title, host, reward, daysLeft, applications, hot } =
    opportunity;

  return (
    <Link
      href={`/app/firsatlar/${id}`}
      className={cn(
        "group relative flex h-full flex-col gap-3 rounded-xl border border-border/80 bg-card p-4 transition-all duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em]",
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
        </span>
        <button
          type="button"
          aria-label="Kaydet"
          onClick={(e) => { e.preventDefault(); toast.success("Fırsat kaydedildi"); }}
          className="inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bookmark className="size-3" />
        </button>
      </div>

      <div>
        <h3 className="font-display text-[15px] font-black leading-[1.2] text-foreground line-clamp-2">
          {title}
        </h3>
        <p className="mt-1 font-mono text-[11px] text-muted-foreground">
          {host}
        </p>
      </div>

      <div className="text-[12px]">
        <p className="font-semibold text-foreground">{reward}</p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-2.5 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1 tabular-nums">
          <Clock className="size-3" />
          Son {daysLeft} gün
        </span>
        <span className="inline-flex items-center gap-1 tabular-nums">
          <Users className="size-3" />
          {applications}
        </span>
      </div>
    </Link>
  );
}
