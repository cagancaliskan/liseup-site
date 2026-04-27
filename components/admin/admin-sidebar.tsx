"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Terminal } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ADMIN_NAV_GROUPS } from "@/lib/admin-nav";
import type { AppNavItem } from "@/lib/app-nav";
import { getAdminSession } from "@/lib/session";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const session = getAdminSession();

  return (
    <aside className="hidden h-screen w-[240px] shrink-0 flex-col border-r border-border/70 bg-slate-950 text-slate-100 lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-5">
        <Logo showWordmark={false} />
        <div>
          <span className="font-display text-[15px] font-black leading-none text-slate-50">
            LiseUP
          </span>
          <span className="ml-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-brand-300">
            Yönetim
          </span>
        </div>
      </div>

      {/* Role badge */}
      <div className="border-b border-slate-800 px-4 py-3">
        <div className="rounded-md border border-brand-400/40 bg-brand-500/10 p-2.5">
          <div className="flex items-center gap-1.5">
            <Terminal className="size-3 text-brand-300" />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-300">
              {session.role}
            </p>
          </div>
          <p className="mt-1 truncate text-[12px] font-semibold text-slate-100">
            {session.firstName} {session.lastName}
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {ADMIN_NAV_GROUPS.map((g, i) => (
          <div key={g.label} className={cn(i > 0 && "mt-5")}>
            <p className="px-3 pb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">
              {g.label}
            </p>
            <ul className="space-y-0.5">
              {g.items.map((item) => (
                <NavRow key={item.href} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-3">
        <div className="flex items-center gap-3 rounded-md bg-slate-900 p-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[11px] font-black text-white">
            {session.avatarInitials}
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="truncate text-[12px] font-semibold text-slate-100">
              {session.firstName}
            </p>
            <p className="truncate font-mono text-[10px] text-slate-500">
              {session.email}
            </p>
          </div>
          <button
            type="button"
            aria-label="Çıkış"
            className="inline-flex size-6 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
          >
            <LogOut className="size-3" />
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
    (item.href !== "/yonetim" && pathname.startsWith(item.href));

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "group flex items-center gap-2.5 rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors",
          isActive
            ? "bg-slate-800 text-slate-50"
            : "text-slate-400 hover:bg-slate-900 hover:text-slate-100",
        )}
      >
        <item.icon
          className={cn(
            "size-3.5 shrink-0",
            isActive ? "text-brand-300" : "text-slate-500",
          )}
          strokeWidth={2.1}
        />
        <span className="flex-1 truncate">{item.label}</span>
        {item.badge ? (
          <span
            className={cn(
              "inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-mono text-[9px] font-bold",
              isActive
                ? "bg-brand-500 text-white"
                : "bg-slate-800 text-slate-300",
            )}
          >
            {item.badge}
          </span>
        ) : null}
      </Link>
    </li>
  );
}
