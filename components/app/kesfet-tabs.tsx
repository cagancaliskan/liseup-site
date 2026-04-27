"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/app/kesfet/projeler", label: "Projeler", count: 6 },
  { href: "/app/kesfet/liseliler", label: "Liseliler", count: 5 },
];

export function KesfetTabs() {
  const pathname = usePathname();
  return (
    <div
      role="tablist"
      className="flex items-center gap-1 border-b border-border/70"
    >
      {TABS.map((t) => {
        const isActive = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "relative -mb-px inline-flex items-center gap-2 px-3 py-2.5 text-[13px] font-semibold transition-colors",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
            <span
              className={cn(
                "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[10px] font-bold",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {t.count}
            </span>
            {isActive && (
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 rounded-t-full bg-primary"
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
