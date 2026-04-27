import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh bg-background text-foreground">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      </div>
      <AdminMobileNav />
    </div>
  );
}
