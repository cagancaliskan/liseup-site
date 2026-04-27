"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  FolderKanban,
  Compass,
  Sparkles,
  Plus,
  User,
  Settings,
  FileDown,
  School,
  LogOut,
  Send,
  MessageSquare,
  Award,
  Bell,
  Search,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface CommandItemDef {
  id: string;
  label: string;
  hint?: string;
  icon: typeof Home;
  action: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const navigate = (href: string) => () => {
    setOpen(false);
    router.push(href);
  };

  const primaryActions: CommandItemDef[] = [
    {
      id: "new-project",
      label: "Yeni proje oluştur",
      hint: "N",
      icon: Plus,
      action: navigate("/app/projeler/yeni"),
    },
    {
      id: "discover",
      label: "Proje keşfet",
      icon: Compass,
      action: navigate("/app/kesfet/projeler"),
    },
    {
      id: "opportunities",
      label: "Fırsatlara göz at",
      icon: Sparkles,
      action: navigate("/app/firsatlar"),
    },
    {
      id: "messages",
      label: "Mesajlarım",
      icon: MessageSquare,
      action: navigate("/app/mesajlar"),
    },
  ];

  const navItems: CommandItemDef[] = [
    { id: "dashboard", label: "Panom", icon: Home, action: navigate("/app") },
    {
      id: "projects",
      label: "Projelerim",
      icon: FolderKanban,
      action: navigate("/app/projeler"),
    },
    {
      id: "applications",
      label: "Başvurularım",
      icon: Send,
      action: navigate("/app/basvurularim"),
    },
    {
      id: "badges",
      label: "Rozetler",
      icon: Award,
      action: navigate("/app/basarilar"),
    },
    {
      id: "notifications",
      label: "Bildirimler",
      icon: Bell,
      action: navigate("/app/bildirimler"),
    },
  ];

  const accountItems: CommandItemDef[] = [
    {
      id: "profile",
      label: "Profilim",
      icon: User,
      action: navigate("/app/profil"),
    },
    {
      id: "school-link",
      label: "Okul bağlantısı",
      icon: School,
      action: navigate("/app/okul-baglanti"),
    },
    {
      id: "data-export",
      label: "Veri indir (KVKK)",
      icon: FileDown,
      action: navigate("/app/veri-indir"),
    },
    {
      id: "settings",
      label: "Ayarlar",
      icon: Settings,
      action: navigate("/app/ayarlar"),
    },
    {
      id: "logout",
      label: "Çıkış yap",
      icon: LogOut,
      action: () => setOpen(false),
    },
  ];

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Komutlar"
      description="Yazarak ara, Enter ile seç"
    >
      <CommandInput placeholder="Komut, rota veya aksiyon ara..." />
      <CommandList>
        <CommandEmpty>Eşleşme yok.</CommandEmpty>

        <CommandGroup heading="Hızlı aksiyonlar">
          {primaryActions.map((a) => (
            <CommandItem key={a.id} onSelect={a.action}>
              <a.icon className="size-4" />
              <span>{a.label}</span>
              {a.hint && (
                <kbd className="ml-auto font-mono text-[10px] text-muted-foreground">
                  {a.hint}
                </kbd>
              )}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Sayfalar">
          {navItems.map((a) => (
            <CommandItem key={a.id} onSelect={a.action}>
              <a.icon className="size-4" />
              <span>{a.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Hesap">
          {accountItems.map((a) => (
            <CommandItem key={a.id} onSelect={a.action}>
              <a.icon className="size-4" />
              <span>{a.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function CommandPaletteTrigger() {
  return (
    <button
      type="button"
      aria-label="Komut paleti · Cmd+K"
      onClick={() => {
        // Dispatch synthetic Cmd+K to toggle
        const ev = new KeyboardEvent("keydown", {
          key: "k",
          metaKey: true,
          bubbles: true,
        });
        document.dispatchEvent(ev);
      }}
      className="inline-flex h-9 w-full max-w-xs items-center gap-2 rounded-md border border-border bg-background px-3 text-[13px] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted"
    >
      <Search className="size-3.5" />
      <span className="flex-1 text-left">Ara veya komut çalıştır...</span>
      <kbd className="hidden shrink-0 items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground md:inline-flex">
        ⌘K
      </kbd>
    </button>
  );
}
