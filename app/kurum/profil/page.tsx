import { Edit } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getKurumSession } from "@/lib/session";

export default function KurumProfilPage() {
  const s = getKurumSession();
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/kurum" },
          { label: "Kurum profili" },
        ]}
        title="Kurum profili"
        description="Kurum profilin liseli feed'inde görünür, net olduğunda başvuru kalitesi artar."
        actions={
          <DemoActionButton size="sm" action="Profil kaydedildi">
            <Edit className="size-3.5" />
            Düzenle
          </DemoActionButton>
        }
      />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 md:px-8 md:py-10">
        <Section title="Temel">
          <Field label="Kurum adı" id="ad" defaultValue={s.companyName} />
          <Field label="Sektör" id="sektor" defaultValue={s.industry} />
          <Field label="Web sitesi" id="web" defaultValue="turkcellab.com" />
        </Section>
        <Section title="Hakkımızda (liseliye görünür)">
          <textarea
            rows={5}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-[14px] outline-none placeholder:text-muted-foreground focus-visible:border-ring"
            defaultValue="Turkcell'in inovasyon laboratuvarı. Genç yetenekleri keşfetmek + ürünleştirmek için programlar açıyoruz."
          />
        </Section>
        <Section title="Aktif fırsatlar">
          <ul className="space-y-1 text-[13px] text-foreground/90">
            <li>Turkcell LAB Kod Maratonu 2027, yayında, 203 başvuru</li>
            <li>Yaz Stajı 2027, yayında, 156 başvuru</li>
          </ul>
        </Section>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border/70 bg-card p-5">
      <h2 className="font-display text-[14px] font-black uppercase tracking-[0.1em] text-foreground">
        {title}
      </h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function Field({
  label,
  id,
  ...rest
}: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-[13px] font-semibold">
        {label}
      </Label>
      <Input id={id} name={id} className="h-10" {...rest} />
    </div>
  );
}
