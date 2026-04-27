import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/app/page-header";

export default function ProfilDuzenlePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Panom", href: "/app" },
          { label: "Profilim", href: "/app/profil" },
          { label: "Düzenle" },
        ]}
        title="Profili düzenle"
        actions={
          <>
            <Button asChild variant="ghost" size="sm">
              <Link href="/app/profil">
                <ArrowLeft className="size-3.5" />
                İptal
              </Link>
            </Button>
            <DemoActionButton size="sm" action="Profil güncellendi">
              <Save className="size-3.5" />
              Kaydet
            </DemoActionButton>
          </>
        }
      />

      <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-10">
        <form className="space-y-8">
          <Section title="Temel">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Ad" id="ad" defaultValue="Deniz" />
              <Field label="Soyad" id="soyad" defaultValue="Kaya" />
            </div>
            <Field
              label="Kısa bio"
              id="bio"
              placeholder="280 karakter, kim olduğunu anlatan bir cümle"
            />
          </Section>

          <Section title="Yetenekler">
            <p className="text-[12px] text-muted-foreground">
              Chip'leri tıklayarak düzenleyebilirsin. Seviye ekle / çıkar.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { label: "React", level: "Orta" },
                { label: "Figma", level: "Orta" },
                { label: "Python", level: "Başlangıç" },
              ].map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-[13px] font-semibold text-foreground"
                >
                  {s.label} · {s.level}
                  <button type="button" aria-label="Sil" className="text-muted-foreground hover:text-destructive">
                    ×
                  </button>
                </span>
              ))}
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-dashed border-border bg-background px-3 py-1.5 text-[13px] font-medium text-muted-foreground hover:border-primary/50"
              >
                + Ekle
              </button>
            </div>
          </Section>

          <Section
            title="Profil görünürlüğü"
            description="Kim ne görsün? Varsayılan olarak 18 yaş altı profillerde soyad ve fotoğraf kurumlara kapalı."
          >
            <ul className="divide-y divide-border/70 rounded-xl border border-border/70 bg-card">
              <ToggleRow
                label="Diğer liselilere görünür"
                description="Projeye davet edebilmeleri için."
                defaultOn
              />
              <ToggleRow
                label="Doğrulanmış kurumlara görünür"
                description="Yetenek havuzunda aranabilir."
                defaultOn
              />
              <ToggleRow
                label="Soyad kurumlara görünür"
                description="18 yaş altı için varsayılan kapalı."
              />
              <ToggleRow
                label="Fotoğraf kurumlara görünür"
                description="Mesajını kabul ettiğin kurum için açılır."
              />
            </ul>
          </Section>
        </form>
      </div>
    </>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-[15px] font-black text-foreground">{title}</h2>
      {description && (
        <p className="mt-1 text-[13px] text-muted-foreground">{description}</p>
      )}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  id,
  ...rest
}: {
  label: string;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-[13px] font-semibold">
        {label}
      </Label>
      <Input id={id} name={id} className="h-10" {...rest} />
    </div>
  );
}

function ToggleRow({
  label,
  description,
  defaultOn,
}: {
  label: string;
  description: string;
  defaultOn?: boolean;
}) {
  return (
    <li className="flex items-start justify-between gap-4 p-4">
      <div className="flex-1">
        <p className="text-[13px] font-semibold text-foreground">{label}</p>
        <p className="mt-0.5 text-[12px] text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultOn} />
    </li>
  );
}
