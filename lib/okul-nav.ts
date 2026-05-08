import type { LucideIcon } from "lucide-react";
import {
  Home,
  Users,
  FolderKanban,
  EyeOff,
  Sparkles,
  Award,
  FileText,
  ShieldCheck,
  UserCog,
  Settings,
  School,
} from "lucide-react";
import type { AppNavItem } from "@/lib/app-nav";

export type { AppNavItem };

export const OKUL_NAV_PRIMARY: AppNavItem[] = [
  { href: "/okul", label: "Pano", icon: Home },
  { href: "/okul/ogrenciler", label: "Öğrenciler", icon: Users, badge: 42 },
  { href: "/okul/projeler", label: "Projeler", icon: FolderKanban },
  {
    href: "/okul/projeler/gizleme-talepleri",
    label: "Gizleme talepleri",
    icon: EyeOff,
    badge: 2,
  },
  { href: "/okul/firsat-merkezi", label: "Fırsat Merkezi", icon: Sparkles },
  { href: "/okul/basari-vitrini", label: "Başarı Vitrini", icon: Award },
  { href: "/okul/raporlar", label: "Raporlar", icon: FileText },
];

export const OKUL_NAV_SECONDARY: AppNavItem[] = [
  {
    href: "/okul/partner-ayricaliklar",
    label: "Partner Ayrıcalıklar",
    icon: ShieldCheck,
  },
  { href: "/okul/temsilci-yonetimi", label: "Temsilciler", icon: UserCog },
  { href: "/okul/ayarlar", label: "Ayarlar", icon: Settings },
];

export const OKUL_NAV_MOBILE: AppNavItem[] = [
  { href: "/okul", label: "Pano", icon: Home },
  { href: "/okul/ogrenciler", label: "Öğrenci", icon: Users },
  { href: "/okul/raporlar", label: "Rapor", icon: FileText },
  { href: "/okul/basari-vitrini", label: "Vitrin", icon: Award },
  { href: "/okul/ayarlar", label: "Ayar", icon: Settings },
];

export const OKUL_BRAND = {
  label: "LiseUP",
  sublabel: "Okul",
  ctaLabel: "Aylık raporu indir",
  ctaHref: "/okul/raporlar/aylik",
  ctaIcon: FileText,
  homeIcon: School,
};
