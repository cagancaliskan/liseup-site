"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type DemoRole = "liseli" | "okul" | "kurum" | "yonetim";

const BACKEND = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:3001";

const ROLE_REDIRECT: Record<number, string> = {
  0: "/app",
  2: "/kurum",
  3: "/yonetim",
  4: "/okul",
};

const DEMO_CREDENTIALS: Record<DemoRole, { email: string; password: string }> = {
  liseli:   { email: "demo-liseli@liseup.org",   password: "demo123" },
  okul:     { email: "demo-okul@liseup.org",     password: "demo123" },
  kurum:    { email: "demo-kurum@liseup.org",    password: "demo123" },
  yonetim:  { email: "demo-yonetim@liseup.org",  password: "demo123" },
};

async function fetchTokens(
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string; user: { role: number } } | null> {
  try {
    const res = await fetch(`${BACKEND}/api/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function setAuthCookies(
  accessToken: string,
  refreshToken: string
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("liseup_at", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 900,
    path: "/",
  });
  cookieStore.set("liseup_rt", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 604800,
    path: "/",
  });
}

export async function signIn(formData: FormData): Promise<void> {
  const email    = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/app");

  const result = await fetchTokens(email, password);
  if (!result) {
    redirect("/giris?error=invalid");
    return;
  }

  await setAuthCookies(result.accessToken, result.refreshToken);

  const defaultRedirect = ROLE_REDIRECT[result.user.role] ?? "/app";
  const targetPath = redirectTo.startsWith(defaultRedirect)
    ? redirectTo
    : defaultRedirect;

  redirect(targetPath);
}

export async function quickLoginAs(role: DemoRole): Promise<void> {
  const { email, password } = DEMO_CREDENTIALS[role];
  const result = await fetchTokens(email, password);
  if (!result) {
    redirect("/giris?error=invalid");
    return;
  }
  await setAuthCookies(result.accessToken, result.refreshToken);
  redirect(ROLE_REDIRECT[result.user.role] ?? "/app");
}

export async function signOut(): Promise<void> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("liseup_at")?.value;

  if (accessToken) {
    try {
      await fetch(`${BACKEND}/api/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      });
    } catch {
      // Ignore — cookies are cleared regardless
    }
  }

  cookieStore.delete("liseup_at");
  cookieStore.delete("liseup_rt");
  redirect("/");
}
