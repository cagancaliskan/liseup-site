import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleCTACardProps {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  href: string;
  className?: string;
}

export function RoleCTACard({
  icon: Icon,
  label,
  title,
  description,
  href,
  className,
}: RoleCTACardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-border/80 bg-card p-6 shadow-[var(--shadow-subtle)] transition-all duration-[var(--duration-base)] ease-[var(--ease-instrumental)] hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-5" strokeWidth={2.1} />
        </div>
        <span className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <div>
        <div className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </div>
        <h3 className="mt-2 font-display text-xl font-bold leading-tight text-foreground md:text-[22px]">
          {title}
        </h3>
        <p className="mt-2 text-[15px] leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  );
}
