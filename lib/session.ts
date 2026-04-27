/**
 * Pass 2 / Pass 3 stub session readers. Each role gets its own mock user
 * object so role-specific shells can render consistent UI. Pass 5 replaces
 * this with real Better Auth.
 */

// ==================== LİSELİ ====================

export interface Session {
  userId: string;
  firstName: string;
  lastInitial: string;
  age: number;
  classYear: string;
  city: string;
  schoolName: string;
  schoolVerified: boolean;
  email: string;
  avatarInitials: string;
  joinedAt: string;
}

export const DEV_SESSION: Session = {
  userId: "dev-user",
  firstName: "Deniz",
  lastInitial: "K.",
  age: 16,
  classYear: "11. Sınıf",
  city: "Ankara",
  schoolName: "Ankara Atatürk Lisesi",
  schoolVerified: true,
  email: "deniz@example.com",
  avatarInitials: "DK",
  joinedAt: "2026-03-15",
};

export function getSession(): Session {
  return DEV_SESSION;
}

// ==================== OKUL ====================

export interface OkulSession {
  userId: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  schoolName: string;
  schoolCity: string;
  schoolType: "Devlet" | "Özel";
  partnershipStatus: "Pilot Okul" | "Partner Okul";
  partnershipSince: string;
  avatarInitials: string;
}

export const DEV_OKUL_SESSION: OkulSession = {
  userId: "okul-user",
  firstName: "Serkan",
  lastName: "Yılmaz",
  title: "Müdür Yrd. · Rehberlik",
  email: "serkan@atalisesi.k12.tr",
  schoolName: "Ankara Atatürk Lisesi",
  schoolCity: "Ankara",
  schoolType: "Özel",
  partnershipStatus: "Pilot Okul",
  partnershipSince: "Eylül 2026",
  avatarInitials: "SY",
};

export function getOkulSession(): OkulSession {
  return DEV_OKUL_SESSION;
}

// ==================== KURUM ====================

export type KurumTier = "Discover" | "Engage" | "Partner";

export interface KurumSession {
  userId: string;
  contactFirstName: string;
  contactLastName: string;
  contactTitle: string;
  email: string;
  companyName: string;
  industry: string;
  city: string;
  tier: KurumTier;
  tierActiveSince: string;
  avatarInitials: string;
}

export const DEV_KURUM_SESSION: KurumSession = {
  userId: "kurum-user",
  contactFirstName: "Ayşe",
  contactLastName: "Demir",
  contactTitle: "Ekosistem İlişkileri",
  email: "ayse@turkcellab.com",
  companyName: "Turkcell LAB",
  industry: "Teknoloji",
  city: "İstanbul",
  tier: "Engage",
  tierActiveSince: "Ekim 2026",
  avatarInitials: "AD",
};

export function getKurumSession(): KurumSession {
  return DEV_KURUM_SESSION;
}

// ==================== ADMIN ====================

export type AdminRole =
  | "Super Admin"
  | "Teknik Admin"
  | "İçerik Moderatör"
  | "Okul Success"
  | "Kurum Success"
  | "İçerik Editör"
  | "Destek"
  | "Analist";

export interface AdminSession {
  userId: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  email: string;
  avatarInitials: string;
  joinedAt: string;
}

export const DEV_ADMIN_SESSION: AdminSession = {
  userId: "admin-user",
  firstName: "Çağan",
  lastName: "Çalışkan",
  role: "Super Admin",
  email: "cagan@liseup.org",
  avatarInitials: "ÇÇ",
  joinedAt: "2026-04-01",
};

export function getAdminSession(): AdminSession {
  return DEV_ADMIN_SESSION;
}
