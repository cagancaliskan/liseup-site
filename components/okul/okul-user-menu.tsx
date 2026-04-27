"use client";

import Link from "next/link";
import { LogOut, Settings, ShieldCheck, UserCog } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getOkulSession } from "@/lib/session";

export function OkulUserMenu() {
  const session = getOkulSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Hesap menüsü"
            className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display text-[12px] font-black text-white outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {session.avatarInitials}
          </button>
        }
      />
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="px-2 py-2">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display text-[13px] font-black text-white">
              {session.avatarInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-foreground">
                {session.firstName} {session.lastName}
              </p>
              <p className="truncate font-mono text-[10px] text-muted-foreground">
                {session.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/okul/temsilci-yonetimi" />}>
          <UserCog className="size-4" />
          Temsilci yönetimi
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/okul/partner-ayricaliklar" />}>
          <ShieldCheck className="size-4" />
          Partner ayrıcalıklar
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/okul/ayarlar" />}>
          <Settings className="size-4" />
          Okul ayarları
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
