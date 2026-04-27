import { ArrowRight, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectMock } from "@/lib/mock-data";

interface ProjectCardProps {
  project: ProjectMock;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { title, owner, pitch, rolesOpen, cityLabel, teamCount, category } = project;

  return (
    <article
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card transition-all duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      {/* Cover, procedural gradient, no photo needed */}
      <div
        className="relative h-28 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800"
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 20% 70%, rgba(255,255,255,0.25), transparent 45%)",
          }}
        />
        <div className="absolute inset-0 flex items-end p-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-primary" />
            {category}
          </span>
        </div>
        <h3 className="absolute top-4 left-4 right-4 font-display text-[22px] font-black leading-[1.05] text-white drop-shadow">
          {title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <p className="text-[14px] leading-6 text-muted-foreground">{pitch}</p>

        <div className="flex items-center justify-between gap-3 text-[12px]">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-accent font-display text-[12px] font-bold text-accent-foreground">
              {owner[0]}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-foreground">{owner}</span>
              <span className="font-mono text-[10px] text-muted-foreground">proje sahibi</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="inline-flex items-center gap-1 tabular-nums">
              <Users className="size-3" />
              {teamCount}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3" />
              {cityLabel.split(" · ")[0]}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-border/70 pt-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            Açık rol
          </span>
          {rolesOpen.map((r) => (
            <span
              key={r}
              className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary"
            >
              {r}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-[13px] font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          Projeye başvur
          <ArrowRight className="size-3.5 transition-transform group-hover/card:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}
