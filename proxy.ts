import { NextResponse, type NextRequest } from "next/server";

/**
 * Pass 2 / Pass 3 stub auth. Protects authenticated panel route groups
 * (/app, /okul, /kurum) — redirects unauthenticated visitors to
 * /giris?redirectTo=<path>. Cookie "liseup_session" is the fake session token.
 *
 * Public auth flows (sign-in, sign-up, school-invite, parent-consent) bypass
 * the protection so their parent route groups can handle their own logic.
 *
 * In dev, proxy auto-seeds the cookie so local development never blocks.
 * Pass 5 replaces this with real Better Auth.
 */

const PROTECTED_PREFIXES = ["/app", "/okul", "/kurum", "/yonetim"];
const PUBLIC_PATHS = [
  "/giris",
  "/kayit",
  "/sifremi-unuttum",
  "/veli-onay",
  "/davet",
];
const SESSION_COOKIE = "liseup_session";

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Public auth flows always pass through.
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (!isProtected) return NextResponse.next();

  const session = req.cookies.get(SESSION_COOKIE);
  if (session?.value) return NextResponse.next();

  // Dev convenience: auto-seed the cookie so no manual login loop.
  if (process.env.NODE_ENV !== "production") {
    const res = NextResponse.next();
    res.cookies.set(SESSION_COOKIE, "dev-session", {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }

  const url = req.nextUrl.clone();
  url.pathname = "/giris";
  url.search = `?redirectTo=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/app/:path*", "/okul/:path*", "/kurum/:path*", "/yonetim/:path*"],
};
