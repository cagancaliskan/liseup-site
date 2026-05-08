import { headers } from "next/headers";
import { KurumShell } from "@/components/kurum/kurum-shell";
import { SessionProvider } from "@/lib/session-context";
import type { UserPayload } from "@/lib/session";

/**
 * Kurum panel layout, Pass 3.
 *
 * App-UI register, no marketing motion. Distinct sidebar nav config + kurum
 * session reader.
 */
export default async function KurumLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const raw = headersList.get("x-user-payload");
  const payload: UserPayload | null = raw ? JSON.parse(raw) : null;
  return (
    <SessionProvider payload={payload}>
      <KurumShell>{children}</KurumShell>
    </SessionProvider>
  );
}
