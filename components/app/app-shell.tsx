import { AppSidebar } from "@/components/app/app-sidebar";
import { AppTopbar } from "@/components/app/app-topbar";
import { MobileBottomNav } from "@/components/app/mobile-bottom-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh bg-background text-foreground">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar />
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
