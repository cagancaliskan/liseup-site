import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  kicker?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  kicker,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-border/70 px-4 py-6 md:px-8 md:py-8",
        className,
      )}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            {breadcrumbs.map((b, i) => (
              <li key={i} className="flex items-center gap-1.5">
                {b.href ? (
                  <Link
                    href={b.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <ChevronRight className="size-3 text-muted-foreground/50" />
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0 flex-1">
          {kicker && (
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
              {kicker}
            </p>
          )}
          <h1 className="mt-1.5 font-display text-[24px] font-black leading-tight tracking-[-0.01em] text-foreground md:text-[28px]">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-2xl text-[14px] leading-6 text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        )}
      </div>
    </div>
  );
}
