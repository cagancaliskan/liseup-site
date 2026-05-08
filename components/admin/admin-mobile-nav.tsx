"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_MOBILE } from "@/lib/admin-nav";
import { cn } from "@/lib/utils";

export function AdminMobileNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Yönetim gezinmesi (mobil)"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-800 bg-slate-950/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex h-16 items-stretch justify-around">
        {ADMIN_NAV_MOBILE.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/yonetim" && pathname.startsWith(item.href));
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "relative flex h-full flex-col items-center justify-center gap-1 transition-colors",
                  isActive ? "text-slate-50" : "text-slate-500",
                )}
              >
                <item.icon
                  className={cn(
                    "size-5",
                    isActive ? "text-brand-300" : "text-slate-500",
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
