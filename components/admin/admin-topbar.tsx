"use client";

import { Search, Activity } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { AdminUserMenu } from "@/components/admin/admin-user-menu";

export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/70 bg-background/95 px-4 backdrop-blur md:px-6">
      <div className="lg:hidden">
        <Logo showWordmark={false} />
      </div>

      <div className="flex flex-1 justify-center lg:justify-start">
        <div className="inline-flex h-8 w-full max-w-xs items-center gap-2 rounded-md border border-border bg-background px-3 text-[12px] text-muted-foreground">
          <Search className="size-3.5" />
          <span className="flex-1 text-left">Kullanıcı, kurum, içerik ara...</span>
          <kbd className="hidden font-mono text-[9px] font-semibold text-muted-foreground md:inline">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-success md:inline-flex">
          <Activity className="size-3" />
          Sistem aktif
        </span>
        <ThemeToggle />
        <AdminUserMenu />
      </div>
    </header>
  );
}
