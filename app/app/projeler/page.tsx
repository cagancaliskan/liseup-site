import Link from "next/link";
import { Plus, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/app/page-header";
import { ProjectCardApp } from "@/components/app/project-card-app";
import { EmptyState } from "@/components/app/empty-state";
import { MOCK_ACTIVE_PROJECTS } from "@/lib/mock-data";

const FILTERS = ["Tümü", "Aktif", "Tamamlandı", "Arşiv"];

export default function ProjelerPage() {
  const hasProjects = MOCK_ACTIVE_PROJECTS.length > 0;

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Panom", href: "/app" }, { label: "Projelerim" }]}
        title="Projelerim"
        description="Açtığın + katıldığın projelerin akışı."
        actions={
          <Button asChild>
            <Link href="/app/projeler/yeni">
              <Plus className="size-4" />
              Yeni proje
            </Link>
          </Button>
        }
      />

      <div className="px-4 py-8 md:px-8 md:py-10">
        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f, i) => (
            <button
              key={f}
              type="button"
              className={
                i === 0
                  ? "inline-flex h-8 items-center rounded-full bg-foreground px-3 text-[12px] font-semibold text-background"
                  : "inline-flex h-8 items-center rounded-full border border-border bg-background px-3 text-[12px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              }
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {hasProjects ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_ACTIVE_PROJECTS.map((p) => (
              <ProjectCardApp key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState
              icon={Lightbulb}
              title="Henüz bir projen yok."
              description="İlk adımı atalım mı? Fikrini 5 dakikada projeye dönüştür, ekip aramaya başla."
              primary={{ href: "/app/projeler/yeni", label: "İlk projemi aç" }}
              secondary={{ href: "/app/kesfet/projeler", label: "Önce keşfedeyim" }}
            />
          </div>
        )}
      </div>
    </>
  );
}
