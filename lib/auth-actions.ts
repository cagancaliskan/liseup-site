"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Pass 4.5 stub auth actions. Real Better Auth comes in Pass 5.
 *
 * For the pilot okul demo:
 * - signIn() sets liseup_session cookie + redirects (role-aware)
 * - signOut() clears cookie + sends to home
 * - quickLoginAs(role) is the "demo switcher" used on /giris page
 */

export type DemoRole = "liseli" | "okul" | "kurum" | "yonetim";

const SESSION_COOKIE = "liseup_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const ROLE_REDIRECT: Record<DemoRole, string> = {
  liseli: "/app",
  okul: "/okul",
  kurum: "/kurum",
  yonetim: "/yonetim",
};

export async function signIn(formData: FormData) {
  // Pass 5: validate password against database. For now stub accepts anything.
  const email = String(formData.get("email") ?? "demo");
  const redirectTo = String(formData.get("redirectTo") ?? "/app");

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, `demo:${email}`, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
  });

  redirect(redirectTo);
}

export async function quickLoginAs(role: DemoRole) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, `demo:${role}`, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
  });

  redirect(ROLE_REDIRECT[role]);
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/");
}
