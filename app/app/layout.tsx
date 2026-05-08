import { headers } from "next/headers";
import { AppShell } from "@/components/app/app-shell";
import { SessionProvider } from "@/lib/session-context";
import type { UserPayload } from "@/lib/session";

/**
 * App surface layout, Pass 2.
 *
 * Register discipline: NO Lenis, NO NoiseOverlay, NO aurora, those are
 * marketing-only primitives. The app uses native scroll, clean chrome,
 * 120–220ms transitions, and designed focus rings.
 *
 * The (auth) route group stays separate; (marketing) has its own provider
 * stack. This layout only wires AppShell (sidebar + topbar + mobile nav).
 */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const raw = headersList.get("x-user-payload");
  const payload: UserPayload | null = raw ? JSON.parse(raw) : null;
  return (
    <SessionProvider payload={payload}>
      <AppShell>{children}</AppShell>
    </SessionProvider>
  );
}
