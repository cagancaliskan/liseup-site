import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { FilterSidebar } from "@/components/app/filter-sidebar";
import { StudentCardApp } from "@/components/app/student-card-app";
import { MOCK_STUDENTS } from "@/lib/mock-data";

export default function KurumYetenekKesfetPage() {
  // Simulate larger result set
  const students = [
    ...MOCK_STUDENTS,
    ...MOCK_STUDENTS.map((s) => ({ ...s, id: s.id + "-b" })),
  ];

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/kurum" },
          { label: "Yetenek keşfet" },
        ]}
        title="Yetenek keşfet"
        description="14–18 yaş, doğrulanmış öğrenci havuzu. Yaş ve doğum tarihi asla görünmez."
      />

      <div className="grid gap-8 px-4 py-6 md:grid-cols-[260px_1fr] md:gap-10 md:px-8 md:py-8">
        <FilterSidebar
          groups={[
            {
              name: "Yetenek",
              options: [
                "Yazılım",
                "Tasarım",
                "Veri Analizi",
                "Donanım",
                "Ürün",
                "Araştırma",
                "Video",
              ],
            },
            {
              name: "İlgi alanı",
              options: [
                "Sosyal Etki",
                "Eğitim",
                "Girişim",
                "Biyoloji",
                "Sanat",
                "Sürdürülebilirlik",
              ],
            },
            {
              name: "Sınıf",
              options: ["9. Sınıf", "10. Sınıf", "11. Sınıf", "12. Sınıf"],
            },
            {
              name: "Şehir",
              options: ["İstanbul", "Ankara", "İzmir"],
              defaultOpen: false,
            },
            {
              name: "Doğrulama",
              options: ["Partner okul öğrencisi", "Bağımsız liseli"],
              defaultOpen: false,
            },
            {
              name: "Diğer",
              options: ["Portfolyo var", "Aktif proje var"],
              defaultOpen: false,
            },
          ]}
        />

        <div>
          {/* Privacy banner */}
          <div className="mb-5 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/[0.04] p-4">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
            <div className="text-[12px] leading-5 text-foreground/90">
              <strong className="font-semibold">Gizlilik:</strong> Soyad ve
              fotoğraf 18 yaş altı için varsayılan kapalı. Yaş ve doğum tarihi
              hiçbir zaman görünmez. Liseli mesajını kabul ederse fotoğraf sana
              açılır.
            </div>
          </div>

          <div className="flex items-center justify-between pb-4">
            <p className="font-mono text-[11px] text-muted-foreground">
              <span className="font-semibold text-foreground">
                {students.length}
              </span>{" "}
              liseli
            </p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-muted-foreground">
                Sırala:
              </span>
              <select className="h-8 rounded-md border border-border bg-background px-2 text-[12px]">
                <option>Eşleşme skoru</option>
                <option>En yeni</option>
                <option>En aktif</option>
              </select>
            </div>
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
