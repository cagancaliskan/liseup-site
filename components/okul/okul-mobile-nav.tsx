"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { OKUL_NAV_MOBILE } from "@/lib/okul-nav";
import { cn } from "@/lib/utils";

export function OkulMobileNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Okul gezinmesi (mobil)"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex h-16 items-stretch justify-around">
        {OKUL_NAV_MOBILE.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/okul" && pathname.startsWith(item.href));
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "flex h-full flex-col items-center justify-center gap-1 transition-colors",
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
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
