import { cn } from "@/lib/utils";

interface MarginaliaNumberProps {
  n: number;
  label?: string;
  tone?: "brand" | "ink";
  className?: string;
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export function MarginaliaNumber({
  n,
  label,
  tone = "brand",
  className,
}: MarginaliaNumberProps) {
  const toneClass =
    tone === "brand" ? "text-[var(--color-brand-500)]" : "text-[var(--ink-3)]";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]",
        toneClass,
        className
      )}
    >
      <span aria-hidden>№</span>
      <span>{pad(n)}</span>
      {label && (
        <>
          <span aria-hidden className="opacity-50">·</span>
          <span>{label}</span>
        </>
      )}
    </span>
  );
}
