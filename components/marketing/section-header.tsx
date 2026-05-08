import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  tone?: "light" | "dark";
}

export function SectionHeader({
  kicker,
  title,
  description,
  align = "left",
  className,
  tone = "light",
}: SectionHeaderProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker && (
        <p
          className={cn(
            "font-mono text-[12px] font-semibold uppercase tracking-[0.14em] md:text-[13px]",
            isDark ? "text-brand-300" : "text-primary",
          )}
        >
          {kicker}
        </p>
      )}
      <h2
        className={cn(
          "mt-4 font-display font-black leading-[1.02] tracking-[-0.02em]",
          isDark ? "text-slate-50" : "text-foreground",
          "text-[clamp(36px,6vw,68px)]",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[17px] leading-7 md:text-[19px]",
            align === "center" && "mx-auto",
            isDark ? "text-slate-400" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
