import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import {
  CommandPalette,
  CommandPaletteTrigger,
} from "@/components/app/command-palette";
import { UserMenu } from "@/components/app/user-menu";
import { NotificationsMenu } from "@/components/app/notifications-menu";

export function AppTopbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/70 bg-background/90 px-4 backdrop-blur md:px-6">
      {/* Logo (mobile only, sidebar has it on desktop) */}
      <div className="lg:hidden">
        <Logo showWordmark={false} />
      </div>

      {/* Search trigger */}
      <div className="flex flex-1 justify-center lg:justify-start">
        <CommandPaletteTrigger />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1.5">
        <ThemeToggle />
        <NotificationsMenu />
        <UserMenu />
      </div>

      {/* Mount the palette itself */}
      <CommandPalette />
    </header>
  );
}
