import { AdminShell } from "@/components/admin/admin-shell";

/**
 * Admin paneli, Pass 4. Compact density, slate-heavy console aesthetic,
 * grouped sidebar nav. App-UI register, no marketing primitives.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
