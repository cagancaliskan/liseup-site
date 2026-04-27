"use client";

import Link from "next/link";
import { LogOut, Settings, KeyRound, BarChart3 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAdminSession } from "@/lib/session";

export function AdminUserMenu() {
  const session = getAdminSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Admin menüsü"
            className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[12px] font-black text-white outline-none transition-transform hover:scale-105"
          >
            {session.avatarInitials}
          </button>
        }
      />
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="px-2 py-2">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[13px] font-black text-white">
              {session.avatarInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-foreground">
                {session.firstName} {session.lastName}
              </p>
              <p className="truncate font-mono text-[10px] text-muted-foreground">
                {session.role} · {session.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/yonetim/roller" />}>
          <KeyRound className="size-4" />
          Roller + yetki
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/yonetim/raporlar" />}>
          <BarChart3 className="size-4" />
          Sistem raporları
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/yonetim/sistem" />}>
          <Settings className="size-4" />
          Sistem ayarları
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <LogOut className="size-4" />
          Çıkış yap
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
