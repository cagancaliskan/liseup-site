import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/app/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DemoActionButton } from "@/components/app/demo-action-button";

export default function AyarlarPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Panom", href: "/app" }, { label: "Ayarlar" }]}
        title="Ayarlar"
        description="Hesap, gizlilik kontrolleri, veli bilgileri ve bildirim tercihleri."
      />

      <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-8">
        <Tabs defaultValue="hesap">
          <TabsList className="flex w-full flex-wrap justify-start">
            <TabsTrigger value="hesap">Hesap</TabsTrigger>
            <TabsTrigger value="gorunurluk">Gizlilik</TabsTrigger>
            <TabsTrigger value="bildirim">Bildirim</TabsTrigger>
            <TabsTrigger value="veli">Veli</TabsTrigger>
            <TabsTrigger value="tema">Tema</TabsTrigger>
            <TabsTrigger value="sil">Sil / Arşiv</TabsTrigger>
          </TabsList>

          <TabsContent value="hesap" className="mt-6 space-y-5">
            <SectionCard title="Hesap bilgileri">
              <Field label="E-posta" id="email" defaultValue="deniz@example.com" />
              <Field label="Ad" id="ad" defaultValue="Deniz" />
              <Field label="Soyad" id="soyad" defaultValue="Kaya" />
              <Field label="Şifre" id="sifre" type="password" defaultValue="••••••••" />
              <DemoActionButton size="sm" action="Ayarlar güncellendi">Kaydet</DemoActionButton>
            </SectionCard>
            <SectionCard title="İki faktörlü doğrulama">
              <ToggleRow
                label="2FA aktif"
                description="SMS veya TOTP app ile ek güvenlik."
              />
            </SectionCard>
          </TabsContent>

          <TabsContent value="gorunurluk" className="mt-6 space-y-5">
            <SectionCard title="Profil görünürlük">
              <ToggleRow
                label="Diğer liselilere görünür"
                description="Projeye davet edebilmeleri için."
                defaultOn
              />
              <ToggleRow
                label="Doğrulanmış kurumlara görünür"
                description="Yetenek havuzunda aranabilirsin."
                defaultOn
              />
              <ToggleRow
                label="Soyad kurumlara görünür"
                description="18 yaş altı için varsayılan kapalı."
              />
              <ToggleRow
                label="Fotoğraf kurumlara görünür"
                description="Kabul ettiğin kurum için açılır."
              />
            </SectionCard>
          </TabsContent>

          <TabsContent value="bildirim" className="mt-6 space-y-5">
            <SectionCard title="Bildirim tercihleri">
              {[
                ["E-posta", "Önemli güncellemeler", true],
                ["Platform", "Uygulama içi bildirimler", true],
                ["Haftalık özet", "Pazar sabahı", false],
                ["Veli özeti", "Veline aylık özet", false],
              ].map(([label, desc, on]) => (
                <ToggleRow
                  key={String(label)}
                  label={String(label)}
                  description={String(desc)}
                  defaultOn={Boolean(on)}
                />
              ))}
            </SectionCard>
          </TabsContent>

          <TabsContent value="veli" className="mt-6 space-y-5">
            <SectionCard title="Veli bilgileri (<18)">
              <Field label="Veli e-postası" id="veli-email" defaultValue="anne@example.com" />
              <Field label="Yakınlık" id="yakinlik" defaultValue="Anne" />
              <p className="text-[11px] text-muted-foreground">
                Velinin istediği zaman hesabını iptal hakkı bulunur.{" "}
                <Link href="/kvkk" className="font-semibold text-primary hover:underline">
                  KVKK metni
                </Link>
                .
              </p>
            </SectionCard>
          </TabsContent>

          <TabsContent value="tema" className="mt-6 space-y-5">
            <SectionCard title="Görünüm">
              <ToggleRow
                label="Karanlık mod"
                description="Sistem tercihine uy veya manuel seç"
              />
              <div className="space-y-1.5">
                <Label className="text-[13px] font-semibold">Dil</Label>
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-[14px]">
                  <option>Türkçe (TR)</option>
                  <option>English (EN)</option>
                </select>
              </div>
            </SectionCard>
          </TabsContent>

          <TabsContent value="sil" className="mt-6 space-y-5">
            <SectionCard title="Hesabı arşivle">
              <p className="text-[13px] leading-5 text-muted-foreground">
                Arşivleme: profilin kurumlara ve diğer liselilere görünmez olur
                ama verilerin saklanır. Geri dönüş yapabilirsin.
              </p>
              <DemoActionButton variant="outline" size="sm" action="Hesap arşivleme talebi alındı" toastType="info">
                Hesabı arşivle
              </DemoActionButton>
            </SectionCard>
            <SectionCard title="Hesabı sil">
              <p className="text-[13px] leading-5 text-muted-foreground">
                30 gün geri dönüş penceresi + tam silme. Bu işlem geri alınamaz
                (30 gün sonra).{" "}
                <Link href="/app/veri-indir" className="font-semibold text-primary hover:underline">
                  Önce verilerini indirmek ister misin?
                </Link>
              </p>
              <DemoActionButton variant="destructive" size="sm" action="Hesap silme talebi alındı, 30 gün geri dönüş penceresi" toastType="info">
                Hesabı sil
                <ArrowRight className="size-3.5" />
              </DemoActionButton>
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border/60 bg-background p-3">
      <div className="flex-1">
        <p className="text-[13px] font-semibold text-foreground">{label}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultOn} />
    </div>
  );
}
