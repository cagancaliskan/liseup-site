import { CountUp } from "@/components/marketing/count-up";
import { cn } from "@/lib/utils";

interface BigNumberHeroProps {
  to: number;
  suffix?: string;
  kicker: string;
  label: string;
  hint?: string;
  className?: string;
}

/**
 * Editorial single giant number. Sits as the hero of a "by the numbers" section.
 * The sparkline beneath suggests trend without leaning on real data.
 */
export function BigNumberHero({
  to,
  suffix,
  kicker,
  label,
  hint,
  className,
}: BigNumberHeroProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 border-l-2 border-primary/80 pl-6 md:pl-10",
        className,
      )}
    >
      <div>
        <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-primary md:text-[13px]">
          {kicker}
        </p>
        <div className="relative mt-4">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -top-4 -z-10 text-[clamp(120px,16vw,240px)] font-black leading-none tracking-[-0.04em] text-primary/[0.05] select-none"
            style={{
              WebkitTextStroke: "1px rgb(56 113 223 / 0.08)",
              color: "transparent",
            }}
          >
            {to.toLocaleString("tr-TR")}
            {suffix ?? ""}
          </div>
          <span className="relative inline-block font-display font-black leading-[0.88] tracking-[-0.04em] text-foreground tabular-nums text-[clamp(96px,14vw,200px)]">
            <CountUp to={to} suffix={suffix} />
          </span>
        </div>
        <p className="mt-5 max-w-lg text-[18px] leading-7 text-foreground/90 md:text-[20px]">
          {label}
        </p>
      </div>

      {/* Decorative sparkline */}
      <div className="mt-2 max-w-md">
        <svg viewBox="0 0 120 28" className="h-10 w-full" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="big-number-spark" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3871DF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3871DF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline
            points="0,24 10,22 20,23 30,20 40,18 50,19 60,15 70,14 80,11 90,9 100,7 110,5 120,3"
            fill="none"
            stroke="#3871DF"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon
            points="0,24 10,22 20,23 30,20 40,18 50,19 60,15 70,14 80,11 90,9 100,7 110,5 120,3 120,28 0,28"
            fill="url(#big-number-spark)"
          />
        </svg>
        {hint && (
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}
