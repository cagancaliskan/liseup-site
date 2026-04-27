import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  School,
  Briefcase,
  Building2,
  Inbox,
  ShieldAlert,
  AlertTriangle,
  Flag,
  Megaphone,
  GitMerge,
  BarChart3,
  Settings,
  KeyRound,
} from "lucide-react";
import type { AppNavItem } from "@/lib/app-nav";

export interface AdminNavGroup {
  label: string;
  items: AppNavItem[];
}

export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    label: "Genel",
    items: [
      { href: "/yonetim", label: "Pano", icon: LayoutDashboard },
    ],
  },
  {
    label: "Kullanıcılar",
    items: [
      { href: "/yonetim/kullanicilar", label: "Tüm kullanıcılar", icon: Users },
      {
        href: "/yonetim/liseliler/veli-onayi-bekleyen",
        label: "Veli onayı bekleyen",
        icon: UserCheck,
        badge: 3,
      },
    ],
  },
  {
    label: "Okul",
    items: [
      { href: "/yonetim/okullar", label: "Aktif okullar", icon: School },
      {
        href: "/yonetim/okullar/pilot-basvurulari",
        label: "Pilot başvuruları",
        icon: Briefcase,
        badge: 2,
      },
      {
        href: "/yonetim/eslestirme",
        label: "Eşleştirme",
        icon: GitMerge,
        badge: 5,
      },
    ],
  },
  {
    label: "Kurum",
    items: [
      { href: "/yonetim/kurumlar", label: "Aktif kurumlar", icon: Building2 },
      {
        href: "/yonetim/kurumlar/onay-kuyrugu",
        label: "Onay kuyruğu",
        icon: Inbox,
        badge: 4,
      },
    ],
  },
  {
    label: "Moderasyon",
    items: [
      {
        href: "/yonetim/moderasyon",
        label: "Moderasyon panosu",
        icon: ShieldAlert,
      },
      {
        href: "/yonetim/moderasyon/yuksek-risk",
        label: "Yüksek risk",
        icon: AlertTriangle,
        badge: 7,
      },
      {
        href: "/yonetim/moderasyon/sikayetler",
        label: "Şikayetler",
        icon: Flag,
        badge: 2,
      },
      {
        href: "/yonetim/firsatlar",
        label: "Fırsat moderasyonu",
        icon: Megaphone,
      },
    ],
  },
  {
    label: "Sistem",
    items: [
      { href: "/yonetim/raporlar", label: "Raporlar", icon: BarChart3 },
      { href: "/yonetim/roller", label: "Roller + yetki", icon: KeyRound },
      { href: "/yonetim/sistem", label: "Feature flag + bakım", icon: Settings },
    ],
  },
];

export const ADMIN_NAV_MOBILE: AppNavItem[] = [
  { href: "/yonetim", label: "Pano", icon: LayoutDashboard },
  { href: "/yonetim/moderasyon", label: "Moderasyon", icon: ShieldAlert, badge: 9 },
  {
    href: "/yonetim/kurumlar/onay-kuyrugu",
    label: "Onay",
    icon: Inbox,
    badge: 4,
  },
  { href: "/yonetim/eslestirme", label: "Eşleş", icon: GitMerge, badge: 5 },
  { href: "/yonetim/sistem", label: "Sistem", icon: Settings },
];
