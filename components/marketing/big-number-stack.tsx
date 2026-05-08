import type { LucideIcon } from "lucide-react";
import { CountUp } from "@/components/marketing/count-up";
import { cn } from "@/lib/utils";

export interface StackedStat {
  icon: LucideIcon;
  kicker: string;
  to: number;
  suffix?: string;
  label: string;
}

interface BigNumberStackProps {
  stats: StackedStat[];
  className?: string;
}

export function BigNumberStack({ stats, className }: BigNumberStackProps) {
  return (
    <ul className={cn("divide-y divide-border/70", className)}>
      {stats.map((s, i) => (
        <li key={s.kicker} className={cn("flex items-start gap-5 py-6", i === 0 && "pt-0")}>
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <s.icon className="size-5" strokeWidth={2.1} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {s.kicker}
            </p>
            <div className="mt-1 flex items-baseline gap-2 font-display text-[clamp(48px,6vw,68px)] font-black leading-[0.95] text-foreground tabular-nums">
              <CountUp to={s.to} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-[14px] leading-5 text-muted-foreground">{s.label}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
