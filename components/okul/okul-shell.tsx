import { OkulSidebar } from "@/components/okul/okul-sidebar";
import { OkulTopbar } from "@/components/okul/okul-topbar";
import { OkulMobileNav } from "@/components/okul/okul-mobile-nav";

export function OkulShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh bg-background text-foreground">
      <OkulSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <OkulTopbar />
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      </div>
      <OkulMobileNav />
    </div>
  );
}
