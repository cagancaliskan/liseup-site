import { cn } from "@/lib/utils";

interface DarkFeatureBandProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Full-bleed slate-950 section wrapper that creates light → dark → light rhythm.
 * Spotlight at top, subtle grid overlay, glassy card-ready background.
 */
export function DarkFeatureBand({ children, className }: DarkFeatureBandProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-slate-950 text-slate-50",
        className,
      )}
    >
      {/* Top spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-96"
        style={{ backgroundImage: "var(--gradient-spotlight)" }}
      />

      {/* Subtle diagonal brand gradient behind content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 15% 100%, rgb(31 71 165 / 0.35) 0%, transparent 55%), radial-gradient(ellipse 65% 50% at 85% 10%, rgb(56 113 223 / 0.25) 0%, transparent 55%)",
        }}
      />

      {/* Grid pattern, very faint */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.06] text-slate-500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dark-band-grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dark-band-grid)" />
      </svg>

      {/* Noise grain, reinforces dark surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-5 py-28 md:px-8 md:py-36">
        {children}
      </div>

      {/* Border top/bottom for visual seam */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-slate-800/60" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-slate-800/60" />
    </section>
  );
}

/**
 * Dark-variant card for use inside DarkFeatureBand.
 * Matches the visual weight of light-mode cards but tuned for slate-900 backdrop.
 */
export function DarkBandCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 backdrop-blur-sm transition-colors hover:border-slate-600 hover:bg-slate-900/80",
        className,
      )}
    >
      {children}
    </div>
  );
}
