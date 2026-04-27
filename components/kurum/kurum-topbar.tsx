"use client";

import { Search } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { NotificationsMenu } from "@/components/app/notifications-menu";
import { KurumUserMenu } from "@/components/kurum/kurum-user-menu";

export function KurumTopbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/70 bg-background/90 px-4 backdrop-blur md:px-6">
      <div className="lg:hidden">
        <Logo showWordmark={false} />
      </div>

      <div className="flex flex-1 justify-center lg:justify-start">
        <div className="inline-flex h-9 w-full max-w-xs items-center gap-2 rounded-md border border-border bg-background px-3 text-[13px] text-muted-foreground">
          <Search className="size-3.5" />
          <span className="flex-1 text-left">Liseli, proje, fırsat ara...</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <ThemeToggle />
        <NotificationsMenu />
        <KurumUserMenu />
      </div>
    </header>
  );
}
