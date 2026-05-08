import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  className?: string;
}

/**
 * Designed empty state, first-run onboarding adjacent.
 * NOT a generic "no data" screen. Every hero empty state uses this.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  primary,
  secondary,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-border/80 bg-muted/20 px-6 py-14 text-center md:py-20",
        className,
      )}
    >
      {Icon && (
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="size-6" strokeWidth={2} />
        </div>
      )}
      <div className="max-w-md">
        <h3 className="font-display text-[20px] font-black leading-tight text-foreground md:text-[24px]">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-[14px] leading-6 text-muted-foreground md:text-[15px]">
            {description}
          </p>
        )}
      </div>
      {(primary || secondary) && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {primary && (
            <Button asChild size="default">
              <Link href={primary.href}>
                {primary.label}
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          )}
          {secondary && (
            <Button asChild size="default" variant="ghost">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
