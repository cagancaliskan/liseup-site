"use client";

import Link from "next/link";
import { LogOut, Settings, User, FileDown, ShieldCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession } from "@/lib/session";

export function UserMenu() {
  const session = getSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Kullanıcı menüsü"
            className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[12px] font-black text-white outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {session.avatarInitials}
          </button>
        }
      />
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="px-2 py-2">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[13px] font-black text-white">
              {session.avatarInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-foreground">
                {session.firstName} {session.lastInitial}
              </p>
              <p className="truncate font-mono text-[10px] text-muted-foreground">
                {session.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/app/profil" />}>
          <User className="size-4" />
          Profilim
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/app/ayarlar" />}>
          <Settings className="size-4" />
          Ayarlar
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/app/okul-baglanti" />}>
          <ShieldCheck className="size-4" />
          Okul bağlantısı
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/app/veri-indir" />}>
          <FileDown className="size-4" />
          Veri indir (KVKK)
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
