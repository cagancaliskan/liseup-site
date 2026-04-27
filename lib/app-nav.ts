import type { LucideIcon } from "lucide-react";
import {
  Home,
  FolderKanban,
  Compass,
  Sparkles,
  Send,
  MessageSquare,
  Award,
  Bell,
  School,
  Download,
  Settings,
  Plus,
  User,
} from "lucide-react";

export interface AppNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

export const APP_NAV_PRIMARY: AppNavItem[] = [
  { href: "/app", label: "Panom", icon: Home },
  { href: "/app/projeler", label: "Projelerim", icon: FolderKanban, badge: 2 },
  { href: "/app/kesfet/projeler", label: "Keşfet", icon: Compass },
  { href: "/app/firsatlar", label: "Fırsatlar", icon: Sparkles, badge: 6 },
  { href: "/app/basvurularim", label: "Başvurularım", icon: Send },
  { href: "/app/mesajlar", label: "Mesajlar", icon: MessageSquare, badge: 3 },
  { href: "/app/basarilar", label: "Rozetler", icon: Award },
];

export const APP_NAV_SECONDARY: AppNavItem[] = [
  { href: "/app/bildirimler", label: "Bildirimler", icon: Bell },
  { href: "/app/okul-baglanti", label: "Okul Bağlantım", icon: School },
  { href: "/app/veri-indir", label: "Veri İndir", icon: Download },
  { href: "/app/ayarlar", label: "Ayarlar", icon: Settings },
];

export const APP_NAV_MOBILE: AppNavItem[] = [
  { href: "/app", label: "Pano", icon: Home },
  { href: "/app/kesfet/projeler", label: "Keşfet", icon: Compass },
  { href: "/app/projeler/yeni", label: "Aç", icon: Plus },
  { href: "/app/mesajlar", label: "Mesaj", icon: MessageSquare, badge: 3 },
  { href: "/app/profil", label: "Profil", icon: User },
];
