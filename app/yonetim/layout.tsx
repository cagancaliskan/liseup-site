import { headers } from "next/headers";
import { AdminShell } from "@/components/admin/admin-shell";
import { SessionProvider } from "@/lib/session-context";
import type { UserPayload } from "@/lib/session";

/**
 * Admin paneli, Pass 4. Compact density, slate-heavy console aesthetic,
 * grouped sidebar nav. App-UI register, no marketing primitives.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const raw = headersList.get("x-user-payload");
  const payload: UserPayload | null = raw ? JSON.parse(raw) : null;
  return (
    <SessionProvider payload={payload}>
      <AdminShell>{children}</AdminShell>
    </SessionProvider>
  );
}
