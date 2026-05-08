import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  delta?: string;
  className?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/80 bg-card p-4 transition-colors hover:border-primary/30",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="size-4" strokeWidth={2.2} />
        </div>
        {delta && (
          <span className="font-mono text-[11px] font-semibold text-success">
            {delta}
          </span>
        )}
      </div>
      <div className="mt-3 font-display text-[26px] font-black text-foreground tabular-nums">
        {value}
      </div>
      <p className="mt-1 text-[12px] text-muted-foreground">{label}</p>
    </div>
  );
}
