import { AppShell } from "@/components/app/app-shell";

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
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
