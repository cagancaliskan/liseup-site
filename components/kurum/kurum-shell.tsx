import { KurumSidebar } from "@/components/kurum/kurum-sidebar";
import { KurumTopbar } from "@/components/kurum/kurum-topbar";
import { KurumMobileNav } from "@/components/kurum/kurum-mobile-nav";

export function KurumShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh bg-background text-foreground">
      <KurumSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <KurumTopbar />
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      </div>
      <KurumMobileNav />
    </div>
  );
}
