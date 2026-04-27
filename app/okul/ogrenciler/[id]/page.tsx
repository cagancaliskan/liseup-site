import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/app/page-header";
import { MOCK_OKUL_STUDENTS } from "@/lib/mock-data";

export default async function OgrenciDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const s = MOCK_OKUL_STUDENTS.find((x) => x.id === id);
  if (!s) notFound();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/okul" },
          { label: "Öğrenciler", href: "/okul/ogrenciler" },
          { label: `${s.firstName} ${s.lastInitial}` },
        ]}
        title={`${s.firstName} ${s.lastInitial}`}
        kicker={`${s.classYear} · ${s.city}`}
        actions={
          <Button asChild variant="ghost" size="sm">
            <Link href="/okul/ogrenciler">
              <ArrowLeft className="size-3.5" />
              Listeye dön
            </Link>
          </Button>
        }
      />

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 md:px-8 md:py-10">
        <div className="rounded-xl border border-border/70 bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[20px] font-black text-white">
              {s.firstName[0]}
              {s.lastInitial[0]}
            </div>
            <div>
              <h2 className="font-display text-[20px] font-black text-foreground">
                {s.firstName} {s.lastInitial}
              </h2>
              <p className="font-mono text-[11px] text-muted-foreground">
                {s.classYear} · {s.city} · Ana yetenek: {s.topSkill}
              </p>
              {s.status === "Doğrulanmış" && (
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-success">
                  <ShieldCheck className="size-3" />
                  Doğrulanmış
                </span>
              )}
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-3">
            <Stat label="Aktif proje" value={String(s.activeProjects)} />
            <Stat label="Başvuru" value={String(s.applications)} />
            <Stat label="Son aktivite" value={s.lastActivity} />
          </dl>
        </div>

        <div className="rounded-xl border border-border/70 bg-muted/30 p-5 text-[12px] leading-5 text-muted-foreground">
          <strong className="font-semibold text-foreground">Gizlilik:</strong> Bu
          panelde mesaj içeriği görmüyorsun, yalnızca "mesajlaşma var/yok"
          metriği. Hassas fırsat başvuruları okul paneline mimari olarak
          düşmez.
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/70 bg-background p-3">
      <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 font-display text-[16px] font-black text-foreground tabular-nums">
        {value}
      </dd>
    </div>
  );
}
