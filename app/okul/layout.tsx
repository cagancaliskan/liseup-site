import { OkulShell } from "@/components/okul/okul-shell";

/**
 * Okul panel layout, Pass 3.
 *
 * Same register as /app: app-UI, no Lenis, no aurora, no kinetic motion.
 * Distinct sidebar nav config + okul session reader.
 */
export default function OkulLayout({ children }: { children: React.ReactNode }) {
  return <OkulShell>{children}</OkulShell>;
}
