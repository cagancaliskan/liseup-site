import type { LucideIcon } from "lucide-react";
import {
  Send,
  Eye,
  Sparkles,
  Handshake,
  CheckCircle2,
  Users,
} from "lucide-react";
import type { ActivityEventMock } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const KIND_ICON: Record<ActivityEventMock["kind"], LucideIcon> = {
  applied: Send,
  joined: Users,
  matched: Sparkles,
  opened: Eye,
  completed: CheckCircle2,
  viewed: Handshake,
};

export function ActivityRow({
  event,
  className,
}: {
  event: ActivityEventMock;
  className?: string;
}) {
  const Icon = KIND_ICON[event.kind];
  return (
    <li
      className={cn(
        "flex items-start gap-3 rounded-md border border-border/70 bg-background px-3 py-2.5 transition-colors hover:bg-muted/40",
        className,
      )}
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="size-3.5" strokeWidth={2.2} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold leading-5 text-foreground">
          {event.title}
        </p>
        {event.subtitle && (
          <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
            {event.subtitle}
          </p>
        )}
      </div>
      <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
        {event.time}
      </span>
    </li>
  );
}
