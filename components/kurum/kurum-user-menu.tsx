"use client";

import Link from "next/link";
import {
  LogOut,
  Settings,
  Building2,
  CreditCard,
  BarChart3,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getKurumSession } from "@/lib/session";

export function KurumUserMenu() {
  const session = getKurumSession();

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
                {session.contactFirstName} {session.contactLastName}
              </p>
              <p className="truncate font-mono text-[10px] text-muted-foreground">
                {session.companyName}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/kurum/profil" />}>
          <Building2 className="size-4" />
          Kurum profili
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/kurum/analitik" />}>
          <BarChart3 className="size-4" />
          Analitik
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/kurum/abonelik" />}>
          <CreditCard className="size-4" />
          Abonelik · {session.tier}
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/kurum/ayarlar" />}>
          <Settings className="size-4" />
          Ayarlar
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
