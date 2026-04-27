import { cn } from "@/lib/utils";

/**
 * Subtle UI-window chrome wrapper. Wraps mock product previews so they read
 * as interface artifacts, not just cards. Used behind hero profile, opportunity
 * feed previews, etc.
 */
export function MockBrowserFrame({
  children,
  label,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  label?: string;
  className?: string;
  tone?: "light" | "brand";
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/80 bg-background shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b border-border/70 px-4 py-2.5",
          tone === "brand" ? "bg-primary/5" : "bg-muted/40",
        )}
      >
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-destructive/50" />
          <span className="size-2.5 rounded-full bg-warning/60" />
          <span className="size-2.5 rounded-full bg-success/60" />
        </div>
        {label && (
          <span className="ml-3 inline-flex items-center gap-2 truncate font-mono text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            {label}
          </span>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
