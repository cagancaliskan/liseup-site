import { cn } from "@/lib/utils";

interface SectionRuleProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionRule({
  children,
  className,
  align = "center",
}: SectionRuleProps) {
  return (
    <div
      className={cn(
        "relative w-full border-y border-[var(--rule)] bg-[var(--paper)]",
        className,
      )}
    >
      {/* Shock-orange left accent strip */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[3px] bg-[var(--color-brand-500)]"
      />

      <div
        className={cn(
          "mx-auto flex max-w-[var(--max-content)] items-center gap-5 px-[var(--space-gutter)] py-5 md:py-6",
          align === "center" && "justify-center text-center",
          align === "left" && "justify-start text-left",
        )}
      >
        <span
          aria-hidden
          className="hidden h-px w-16 shrink-0 bg-[var(--color-brand-500)] opacity-40 md:block"
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.20em] text-[var(--ink-3)]">
          {children}
        </p>
        <span
          aria-hidden
          className="hidden h-px w-16 shrink-0 bg-[var(--color-brand-500)] opacity-40 md:block"
        />
      </div>
    </div>
  );
}
