import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ href = "/", className, showWordmark = true }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="LiseUP anasayfa"
      className={cn(
        "group inline-flex items-center gap-2 font-display font-bold tracking-tight",
        className,
      )}
    >
      <span
        aria-hidden
        className="relative inline-flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform duration-[var(--duration-base)] ease-[var(--ease-instrumental)] group-hover:scale-[1.04]"
      >
        <span className="text-[13px] font-black leading-none">L</span>
        <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-background ring-2 ring-primary" />
      </span>
      {showWordmark && (
        <span className="text-[17px] leading-none">
          LiseUP
          <span className="text-primary">.</span>
        </span>
      )}
    </Link>
  );
}
