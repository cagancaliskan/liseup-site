import { headers } from "next/headers";

// ─── Shared UserPayload type (mirrors backend's UserPayload) ──────────────────

export type UserPayload = {
  userId: string;
  sessionId: string;
  userName: string;
  userEmail: string;
  role: number;
  rolePayload: Record<string, unknown>;
  devices: Array<{
    deviceId: string;
    deviceName: string;
    ipAddress: string;
    lastActivatedAt: string;
    current: boolean;
  }>;
  iat?: number;
  exp?: number;
};

export const Role = {
  User:        0,
  Mentor:      1,
  Vendor:      2,
  Admin:       3,
  SchoolAdmin: 4,
} as const;

// ─── Server-side payload reader ───────────────────────────────────────────────

export async function getPayload(): Promise<UserPayload | null> {
  try {
    const headersList = await headers();
    const raw = headersList.get("x-user-payload");
    if (!raw) return null;
    return JSON.parse(raw) as UserPayload;
  } catch {
    return null;
  }
}

// ─── Typed session interfaces ─────────────────────────────────────────────────

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

// ─── Async server-side session getters ───────────────────────────────────────

function initials(email: string): string {
  return email.slice(0, 2).toUpperCase();
}

export async function getSession(): Promise<Session> {
  const p = await getPayload();
  return {
    userId:         p?.userId        ?? "",
    email:          p?.userEmail     ?? "",
    avatarInitials: p ? initials(p.userEmail) : "UK",
    firstName:      "",
    lastInitial:    "",
    age:            0,
    classYear:      "",
    city:           "",
    schoolName:     "",
    schoolVerified: false,
    joinedAt:       "",
  };
}

export async function getOkulSession(): Promise<OkulSession> {
  const p = await getPayload();
  return {
    userId:            p?.userId    ?? "",
    email:             p?.userEmail ?? "",
    avatarInitials:    p ? initials(p.userEmail) : "UK",
    firstName:         "",
    lastName:          "",
    title:             "",
    schoolName:        "",
    schoolCity:        "",
    schoolType:        "Devlet",
    partnershipStatus: "Pilot Okul",
    partnershipSince:  "",
  };
}

export async function getKurumSession(): Promise<KurumSession> {
  const p = await getPayload();
  return {
    userId:           p?.userId    ?? "",
    email:            p?.userEmail ?? "",
    avatarInitials:   p ? initials(p.userEmail) : "UK",
    contactFirstName: "",
    contactLastName:  "",
    contactTitle:     "",
    companyName:      "",
    industry:         "",
    city:             "",
    tier:             "Discover",
    tierActiveSince:  "",
  };
}

export async function getAdminSession(): Promise<AdminSession> {
  const p = await getPayload();
  return {
    userId:         p?.userId    ?? "",
    email:          p?.userEmail ?? "",
    avatarInitials: p ? initials(p.userEmail) : "UK",
    firstName:      "",
    lastName:       "",
    role:           "Super Admin",
    joinedAt:       "",
  };
}
