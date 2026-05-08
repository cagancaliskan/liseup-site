import Link from "next/link";
import { ArrowRight, Eye, Users } from "lucide-react";
import type { ActiveProjectMock } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STATUS_TINT: Record<ActiveProjectMock["status"], string> = {
  Açık: "bg-success/10 text-success",
  Yayında: "bg-primary/10 text-primary",
  Tamamlandı: "bg-muted text-muted-foreground",
  Taslak: "bg-warning/10 text-warning",
};

interface ProjectCardAppProps {
  project: ActiveProjectMock;
  href?: string;
  className?: string;
}

export function ProjectCardApp({
  project,
  href,
  className,
}: ProjectCardAppProps) {
  const link = href ?? `/app/projeler/${project.id}`;
  return (
    <Link
      href={link}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card transition-all duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="relative h-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, ${project.cover[0]}, ${project.cover[1]})`,
        }}
      >
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.35), transparent 45%)",
          }}
        />
        <span
          className={cn(
            "absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] backdrop-blur",
            STATUS_TINT[project.status],
          )}
        >
          <span className="size-1 rounded-full bg-current" />
          {project.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-display text-[17px] font-black leading-tight text-foreground">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">
            {project.role} · {project.city}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 tabular-nums">
              <Users className="size-3" />
              {project.teamCount}
            </span>
            <span className="inline-flex items-center gap-1 tabular-nums">
              <Eye className="size-3" />
              {project.openRoles} açık rol
            </span>
          </div>
          <span className="inline-flex items-center gap-1 font-semibold text-primary">
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
