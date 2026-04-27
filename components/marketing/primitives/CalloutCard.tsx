import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/marketing/primitives/MagneticButton";

interface CalloutCardAction {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "ghost";
}

interface CalloutCardProps {
  eyebrow?: string;
  heading: string;
  body?: string;
  actions: CalloutCardAction[];
  cornerMark?: string;
  marginaliaNumber?: number;
  marginaliaLabel?: string;
  footnote?: string;
  className?: string;
}

export function CalloutCard({
  eyebrow,
  heading,
  body,
  actions,
  marginaliaNumber,
  marginaliaLabel,
  cornerMark,
  footnote,
  className,
}: CalloutCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "px-8 py-16 md:px-16 md:py-24 xl:py-28",
        className
      )}
      style={{
        background: `linear-gradient(135deg, var(--color-brand-700) 0%, var(--color-brand-800) 100%)`,
        backgroundImage: [
          "radial-gradient(ellipse at top right, color-mix(in srgb, var(--color-brand-500) 30%, transparent) 0%, transparent 60%)",
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.025'/></svg>\")",
          "linear-gradient(135deg, var(--color-brand-700) 0%, var(--color-brand-800) 100%)",
        ].join(", "),
      }}
    >
      {/* Corner marginalia */}
      {marginaliaNumber !== undefined ? (
        <div className="absolute right-8 top-6 md:right-14 md:top-8 flex flex-col items-end gap-0.5">
          <span className="font-mono text-[28px] font-medium tabular-nums leading-none text-[var(--color-brand-400)] opacity-40">
            {String(marginaliaNumber).padStart(2, "0")}
          </span>
          {marginaliaLabel && (
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-brand-400)] opacity-30">
              {marginaliaLabel}
            </span>
          )}
        </div>
      ) : cornerMark ? (
        <span className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-brand-400)] opacity-50">
          {cornerMark}
        </span>
      ) : null}

      <div className="relative flex flex-col gap-10 md:gap-12">
        {/* Heading block */}
        <div className="flex flex-col gap-5">
          {eyebrow && (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-brand-300)] opacity-80">
              {eyebrow}
            </span>
          )}
          <h2
            className="font-display font-black leading-[0.9] tracking-[-0.04em] text-[#FAFAFA] [text-wrap:balance]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            {heading}
          </h2>
          {body && (
            <p className="max-w-[52ch] font-body font-light italic text-[var(--text-md)] leading-[1.5] text-[rgba(250,250,250,0.60)]">
              {body}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {actions.map((action) => (
            <MagneticButton
              key={action.href}
              href={action.href}
              variant={action.variant ?? "primary"}
              className={cn(
                action.variant === "outline"
                  ? "border-[rgba(250,250,250,0.18)] text-[#FAFAFA] hover:border-[rgba(250,250,250,0.5)]"
                  : "bg-[#FAFAFA] text-[var(--ink)] hover:bg-[rgba(250,250,250,0.92)] hover:shadow-[0_0_40px_8px_color-mix(in_srgb,var(--color-brand-300)_40%,transparent)]"
              )}
            >
              {action.label}
            </MagneticButton>
          ))}
        </div>

        {/* Footnote */}
        {footnote && (
          <div className="flex flex-col gap-4 border-t border-[rgba(250,250,250,0.07)] pt-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--color-brand-400)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(250,250,250,0.35)]">
                {footnote}
              </span>
            </div>
            <div aria-hidden className="h-[2px] w-32 bg-[var(--color-brand-300)] opacity-70" />
          </div>
        )}
      </div>
    </div>
  );
}
