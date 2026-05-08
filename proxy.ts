import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const ACCESS_SECRET = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET ?? ""
);

const PROTECTED_PREFIXES = ["/app", "/okul", "/kurum", "/yonetim"];
const PUBLIC_PATHS = [
  "/giris",
  "/kayit",
  "/sifremi-unuttum",
  "/veli-onay",
  "/davet",
];

const PREFIX_ROLE: Record<string, number> = {
  "/app": 0,
  "/okul": 4,
  "/kurum": 2,
  "/yonetim": 3,
};

export function canAccessPrefix(userRole: number, requiredRole: number): boolean {
  if (userRole === 3) return true; // Admin can access all panels
  return userRole === requiredRole;
}

function redirectToLogin(req: NextRequest, pathname: string): NextResponse {
  const url = req.nextUrl.clone();
  url.pathname = "/giris";
  url.search = `?redirectTo=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}

export async function proxy(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  if (
    PUBLIC_PATHS.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`)
    )
  ) {
    return NextResponse.next();
  }

  const prefix = PROTECTED_PREFIXES.find(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (!prefix) return NextResponse.next();

  const accessToken = req.cookies.get("liseup_at")?.value;
  const refreshToken = req.cookies.get("liseup_rt")?.value;

  if (!accessToken && !refreshToken) {
    return redirectToLogin(req, pathname);
  }

  // Try to verify the access token
  if (accessToken) {
    try {
      const { payload } = await jwtVerify(accessToken, ACCESS_SECRET);
      const userRole = payload.role as number;
      const requiredRole = PREFIX_ROLE[prefix];
      if (!canAccessPrefix(userRole, requiredRole)) {
        return redirectToLogin(req, pathname);
      }
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-payload", JSON.stringify(payload));
      return NextResponse.next({ request: { headers: requestHeaders } });
    } catch {
      // Expired or invalid — fall through to refresh
    }
  }

  // Access token missing or expired — try refresh
  if (refreshToken) {
    try {
      const backendUrl =
        process.env.BACKEND_INTERNAL_URL ?? "http://localhost:3001";
      const refreshRes = await fetch(
        `${backendUrl}/api/auth/refresh?rt=${encodeURIComponent(refreshToken)}`,
        { method: "POST" }
      );
      if (!refreshRes.ok) return redirectToLogin(req, pathname);

      const { accessToken: newAt, refreshToken: newRt, user } =
        await refreshRes.json();

      const userRole = user.role as number;
      const requiredRole = PREFIX_ROLE[prefix];
      if (!canAccessPrefix(userRole, requiredRole)) {
        return redirectToLogin(req, pathname);
      }

      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-payload", JSON.stringify(user));
      const res = NextResponse.next({ request: { headers: requestHeaders } });

      res.cookies.set("liseup_at", newAt, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 900,
        path: "/",
      });
      res.cookies.set("liseup_rt", newRt, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 604800,
        path: "/",
      });
      return res;
    } catch {
      return redirectToLogin(req, pathname);
    }
  }

  return redirectToLogin(req, pathname);
}

export const config = {
  matcher: [
    "/app/:path*",
    "/okul/:path*",
    "/kurum/:path*",
    "/yonetim/:path*",
  ],
};
