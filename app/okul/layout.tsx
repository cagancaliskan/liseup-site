import { headers } from "next/headers";
import { OkulShell } from "@/components/okul/okul-shell";
import { SessionProvider } from "@/lib/session-context";
import type { UserPayload } from "@/lib/session";

/**
 * Okul panel layout, Pass 3.
 *
 * Same register as /app: app-UI, no Lenis, no aurora, no kinetic motion.
 * Distinct sidebar nav config + okul session reader.
 */
export default async function OkulLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const raw = headersList.get("x-user-payload");
  const payload: UserPayload | null = raw ? JSON.parse(raw) : null;
  return (
    <SessionProvider payload={payload}>
      <OkulShell>{children}</OkulShell>
    </SessionProvider>
  );
}
