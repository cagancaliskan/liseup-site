import { PageHeader } from "@/components/app/page-header";
import { KesfetTabs } from "@/components/app/kesfet-tabs";
import { ProjectCardApp } from "@/components/app/project-card-app";
import { FilterSidebar } from "@/components/app/filter-sidebar";
import { MOCK_ACTIVE_PROJECTS } from "@/lib/mock-data";

export default function KesfetProjelerPage() {
  // Synthesize a slightly larger grid for discovery
  const projects = [
    ...MOCK_ACTIVE_PROJECTS,
    ...MOCK_ACTIVE_PROJECTS.map((p) => ({ ...p, id: p.id + "-b" })),
    ...MOCK_ACTIVE_PROJECTS.map((p) => ({ ...p, id: p.id + "-c" })),
  ];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Panom", href: "/app" }, { label: "Keşfet" }]}
        title="Keşfet · Projeler"
        description="Yayında olan projeleri tara. Aranan rol ve şehre göre filtrele, ilgi duyduğun ekibe başvuru gönder."
      />

      <div className="px-4 pt-6 md:px-8">
        <KesfetTabs />
      </div>

      <div className="grid gap-8 px-4 py-6 md:grid-cols-[240px_1fr] md:gap-10 md:px-8 md:py-8">
        <FilterSidebar
          groups={[
            {
              name: "Kategori",
              options: [
                "Yazılım",
                "Tasarım",
                "Sosyal Etki",
                "Girişim",
                "Sanat",
                "Bilim",
              ],
            },
            {
              name: "Aranan rol",
              options: ["Tasarımcı", "Yazılımcı", "Ürün Yöneticisi", "Araştırmacı"],
            },
            {
              name: "Şehir",
              options: ["İstanbul", "Ankara", "İzmir", "Online"],
            },
            {
              name: "Ekip boyutu",
              options: ["2–3 kişi", "4–5 kişi", "6+ kişi"],
              defaultOpen: false,
            },
          ]}
        />

        <div>
          <div className="flex items-center justify-between pb-4">
            <p className="font-mono text-[11px] text-muted-foreground">
              <span className="font-semibold text-foreground">
                {projects.length}
              </span>{" "}
              sonuç
            </p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-muted-foreground">
                Sırala:
              </span>
              <select className="h-8 rounded-md border border-border bg-background px-2 text-[12px]">
                <option>En yeni</option>
                <option>En popüler</option>
                <option>Yakınımdaki</option>
                <option>Benzer ilgi alanı</option>
              </select>
            </div>
          </div>
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
