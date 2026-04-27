import {
  Home,
  Compass,
  FolderKanban,
  Bookmark,
  Megaphone,
  ListTodo,
  Inbox,
  MessageSquare,
  Building2,
  BarChart3,
  CreditCard,
  Settings,
} from "lucide-react";
import type { AppNavItem } from "@/lib/app-nav";

export const KURUM_NAV_PRIMARY: AppNavItem[] = [
  { href: "/kurum", label: "Pano", icon: Home },
  {
    href: "/kurum/kesfet/liseliler",
    label: "Yetenek keşfet",
    icon: Compass,
  },
  { href: "/kurum/kesfet/projeler", label: "Proje keşfet", icon: FolderKanban },
  {
    href: "/kurum/kaydedilenler",
    label: "Kaydedilenler",
    icon: Bookmark,
    badge: 12,
  },
  { href: "/kurum/firsat-yayinla", label: "Fırsat yayınla", icon: Megaphone },
  { href: "/kurum/firsatlarim", label: "Fırsatlarım", icon: ListTodo },
  { href: "/kurum/basvurular", label: "Başvurular", icon: Inbox, badge: 17 },
  { href: "/kurum/mesajlar", label: "Mesajlar", icon: MessageSquare, badge: 4 },
];

export const KURUM_NAV_SECONDARY: AppNavItem[] = [
  { href: "/kurum/profil", label: "Kurum profili", icon: Building2 },
  { href: "/kurum/analitik", label: "Analitik", icon: BarChart3 },
  { href: "/kurum/abonelik", label: "Abonelik", icon: CreditCard },
  { href: "/kurum/ayarlar", label: "Ayarlar", icon: Settings },
];

export const KURUM_NAV_MOBILE: AppNavItem[] = [
  { href: "/kurum", label: "Pano", icon: Home },
  { href: "/kurum/kesfet/liseliler", label: "Keşfet", icon: Compass },
  { href: "/kurum/firsat-yayinla", label: "Yayınla", icon: Megaphone },
  { href: "/kurum/basvurular", label: "Başvuru", icon: Inbox, badge: 17 },
  { href: "/kurum/profil", label: "Profil", icon: Building2 },
];

export const KURUM_BRAND = {
  ctaLabel: "Fırsat yayınla",
  ctaHref: "/kurum/firsat-yayinla",
  ctaIcon: Megaphone,
};
