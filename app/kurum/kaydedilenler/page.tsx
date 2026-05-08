import { PageHeader } from "@/components/app/page-header";
import { StudentCardApp } from "@/components/app/student-card-app";
import { MOCK_STUDENTS } from "@/lib/mock-data";

export default function KaydedilenlerPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/kurum" },
          { label: "Kaydedilenler" },
        ]}
        title="Kaydedilen profiller"
        description="Aday CRM'in. Etiket ekle, mesaj at, mülakat planla."
      />
      <div className="px-4 py-8 md:px-8 md:py-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {MOCK_STUDENTS.map((s) => (
            <StudentCardApp key={s.id} student={s} />
          ))}
        </div>
      </div>
    </>
  );
}
