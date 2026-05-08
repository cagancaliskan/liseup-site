import { PageHeader } from "@/components/app/page-header";
import { KesfetTabs } from "@/components/app/kesfet-tabs";
import { FilterSidebar } from "@/components/app/filter-sidebar";
import { StudentCardApp } from "@/components/app/student-card-app";
import { MOCK_STUDENTS } from "@/lib/mock-data";

export default function KesfetLiselilerPage() {
  // Duplicate for a fuller grid
  const students = [
    ...MOCK_STUDENTS,
    ...MOCK_STUDENTS.map((s) => ({ ...s, id: s.id + "-b" })),
  ];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Panom", href: "/app" }, { label: "Keşfet" }]}
        title="Keşfet · Liseliler"
        description="Ekip arkadaşı bul. Şehir, yetenek ve ilgi alanına göre filtrele, ortak projeye davet veya başvuru çağrısı yolla."
      />

      <div className="px-4 pt-6 md:px-8">
        <KesfetTabs />
      </div>

      <div className="grid gap-8 px-4 py-6 md:grid-cols-[240px_1fr] md:gap-10 md:px-8 md:py-8">
        <FilterSidebar
          groups={[
            {
              name: "Yetenek",
              options: [
                "Yazılım",
                "Tasarım",
                "Video",
                "Araştırma",
                "Ürün",
                "Donanım",
              ],
            },
            {
              name: "İlgi alanı",
              options: ["Sosyal Etki", "Eğitim", "Biyoloji", "Girişim"],
            },
            {
              name: "Şehir",
              options: ["İstanbul", "Ankara", "İzmir"],
            },
            {
              name: "Doğrulama",
              options: ["Doğrulanmış öğrenci", "Bağımsız"],
              defaultOpen: false,
            },
          ]}
        />

        <div>
          <div className="flex items-center justify-between pb-4">
            <p className="font-mono text-[11px] text-muted-foreground">
              <span className="font-semibold text-foreground">
                {students.length}
              </span>{" "}
              liseli
            </p>
            <p className="font-mono text-[11px] text-muted-foreground">
              DM yok, ortak projeye davet / başvuru çağrısı
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {students.map((s) => (
              <StudentCardApp key={s.id} student={s} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
