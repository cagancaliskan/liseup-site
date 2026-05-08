import { PageHeader } from "@/components/app/page-header";
import { ProjectCardApp } from "@/components/app/project-card-app";
import { FilterSidebar } from "@/components/app/filter-sidebar";
import { MOCK_ACTIVE_PROJECTS } from "@/lib/mock-data";

export default function KurumProjeKesfetPage() {
  const projects = [
    ...MOCK_ACTIVE_PROJECTS,
    ...MOCK_ACTIVE_PROJECTS.map((p) => ({ ...p, id: p.id + "-b" })),
    ...MOCK_ACTIVE_PROJECTS.map((p) => ({ ...p, id: p.id + "-c" })),
  ];
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Pano", href: "/kurum" }, { label: "Proje keşfet" }]}
        title="Proje keşfet"
        description="Liseli projelerini gözat, ekibi mentörle, sponsor ol veya ürünleştirmesine destek ver."
      />
      <div className="grid gap-8 px-4 py-6 md:grid-cols-[260px_1fr] md:gap-10 md:px-8 md:py-8">
        <FilterSidebar
          groups={[
            { name: "Kategori", options: ["Yazılım", "Sosyal Etki", "Sanat", "Bilim"] },
            { name: "Ekip boyutu", options: ["2–3 kişi", "4–5 kişi", "6+ kişi"] },
            { name: "Şehir", options: ["İstanbul", "Ankara", "İzmir"], defaultOpen: false },
            { name: "Aşama", options: ["Açık", "Yayında", "Tamamlandı"], defaultOpen: false },
          ]}
        />
        <div>
          <p className="pb-4 font-mono text-[11px] text-muted-foreground">
            <span className="font-semibold text-foreground">{projects.length}</span> proje
          </p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((p) => (
              <ProjectCardApp key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
