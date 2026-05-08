import { PageHeader } from "@/components/app/page-header";
import { OpportunityCardApp } from "@/components/app/opportunity-card-app";
import { FilterSidebar } from "@/components/app/filter-sidebar";
import { MOCK_OPPORTUNITIES } from "@/lib/mock-data";

export default function FirsatlarPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Panom", href: "/app" }, { label: "Fırsatlar" }]}
        title="Fırsatlar"
        description="Yarışma, yaz programı, burs, staj, lise seviyesinde açılan tüm fırsatlar."
      />

      <div className="grid gap-8 px-4 py-6 md:grid-cols-[240px_1fr] md:gap-10 md:px-8 md:py-8">
        <FilterSidebar
          groups={[
            {
              name: "Kategori",
              options: [
                "Hackathon",
                "Yarışma",
                "Burs",
                "Yaz Programı",
                "Staj",
                "Program",
              ],
            },
            {
              name: "Son başvuru",
              options: ["Bu hafta", "Bu ay", "Sonraki 3 ay"],
            },
            {
              name: "Şehir",
              options: ["İstanbul", "Ankara", "İzmir", "Online"],
            },
            {
              name: "Sınıf",
              options: ["9. Sınıf", "10. Sınıf", "11. Sınıf", "12. Sınıf"],
              defaultOpen: false,
            },
          ]}
        />

        <div>
          <div className="flex items-center justify-between pb-4">
            <p className="font-mono text-[11px] text-muted-foreground">
              <span className="font-semibold text-foreground">
                {MOCK_OPPORTUNITIES.length}
              </span>{" "}
              aktif fırsat
            </p>
            <select className="h-8 rounded-md border border-border bg-background px-2 text-[12px]">
              <option>Son başvuru yakın</option>
              <option>En yeni</option>
              <option>En çok başvurulan</option>
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {MOCK_OPPORTUNITIES.map((op) => (
              <OpportunityCardApp key={op.id} opportunity={op} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
