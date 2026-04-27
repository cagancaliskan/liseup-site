"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, LogOut } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  APP_NAV_PRIMARY,
  APP_NAV_SECONDARY,
  type AppNavItem,
} from "@/lib/app-nav";
import { getSession } from "@/lib/session";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const session = getSession();

  return (
    <aside className="hidden h-screen w-[240px] shrink-0 flex-col border-r border-border/70 bg-muted/30 lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border/70 px-5">
        <Logo />
      </div>

      {/* Create project CTA */}
      <div className="px-4 pt-4">
        <Button asChild size="default" className="w-full justify-start gap-2">
          <Link href="/app/projeler/yeni">
            <Plus className="size-4" />
            Yeni proje
          </Link>
        </Button>
      </div>

      {/* Primary nav */}
      <nav className="mt-5 flex-1 overflow-y-auto px-2 pb-2">
        <ul className="space-y-0.5">
          {APP_NAV_PRIMARY.map((item) => (
            <NavRow key={item.href} item={item} />
          ))}
        </ul>

        <div className="mt-5 border-t border-border/70 pt-4">
          <p className="px-3 pb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Hesap
          </p>
          <ul className="space-y-0.5">
            {APP_NAV_SECONDARY.map((item) => (
              <NavRow key={item.href} item={item} />
            ))}
          </ul>
        </div>
      </nav>

      {/* User mini-card */}
      <div className="border-t border-border/70 p-3">
        <div className="flex items-center gap-3 rounded-md bg-background p-2 shadow-[var(--shadow-subtle)]">
          <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[12px] font-black text-white">
            {session.avatarInitials}
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="truncate text-[13px] font-semibold text-foreground">
              {session.firstName} {session.lastInitial}
            </p>
            <p className="truncate font-mono text-[10px] text-muted-foreground">
              {session.classYear}
            </p>
          </div>
          <button
            type="button"
            aria-label="Çıkış"
            className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="size-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavRow({ item }: { item: AppNavItem }) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href ||
    (item.href !== "/app" && pathname.startsWith(item.href));

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "group flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
          isActive
            ? "bg-background text-foreground shadow-[var(--shadow-subtle)]"
            : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
        )}
      >
        <item.icon
          className={cn(
            "size-4 shrink-0",
            isActive ? "text-primary" : "text-muted-foreground",
          )}
          strokeWidth={2.1}
        />
        <span className="flex-1 truncate">{item.label}</span>
        {item.badge ? (
          <span
            className={cn(
              "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[10px] font-bold",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground",
            )}
          >
            {item.badge}
          </span>
        ) : null}
      </Link>
    </li>
  );
}
