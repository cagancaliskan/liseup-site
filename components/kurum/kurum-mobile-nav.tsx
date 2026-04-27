"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { KURUM_NAV_MOBILE } from "@/lib/kurum-nav";
import { cn } from "@/lib/utils";

export function KurumMobileNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Kurum gezinmesi (mobil)"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex h-16 items-stretch justify-around">
        {KURUM_NAV_MOBILE.map((item, i) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/kurum" && pathname.startsWith(item.href));
          const isPrimary = i === 2;

          if (isPrimary) {
            return (
              <li key={item.href} className="relative flex-1">
                <Link
                  href={item.href}
                  className="absolute left-1/2 -top-4 flex size-12 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-lift)]"
                >
                  <item.icon className="size-5" strokeWidth={2.2} />
                  <span className="sr-only">{item.label}</span>
                </Link>
                <span className="mt-9 block text-center font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
                  {item.label}
                </span>
              </li>
            );
          }

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "relative flex h-full flex-col items-center justify-center gap-1 transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <item.icon
                  className={cn(
                    "size-5",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                  strokeWidth={2.1}
                />
                <span className="text-[10px] font-semibold">{item.label}</span>
                {item.badge ? (
                  <span className="absolute right-[calc(50%-16px)] top-2 inline-flex size-4 items-center justify-center rounded-full bg-destructive font-mono text-[9px] font-bold text-destructive-foreground">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
