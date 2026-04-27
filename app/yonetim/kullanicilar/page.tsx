import { Search, Filter } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const USERS = [
  { name: "Deniz K.", role: "Liseli", email: "deniz@example.com", school: "Ankara Atatürk L.", status: "Aktif", joined: "2 ay" },
  { name: "Ela B.", role: "Liseli", email: "ela@example.com", school: "Ankara Atatürk L.", status: "Aktif", joined: "5 ay" },
  { name: "Serkan Yılmaz", role: "Okul", email: "serkan@atalisesi.k12.tr", school: "Ankara Atatürk L.", status: "Aktif", joined: "6 ay" },
  { name: "Ayşe Demir", role: "Kurum", email: "ayse@turkcellab.com", school: "Turkcell LAB", status: "Aktif", joined: "3 ay" },
  { name: "Berk D.", role: "Liseli", email: "berk@example.com", school: "-", status: "Askıda", joined: "1 ay" },
] as const;

const STATUS_TINT: Record<string, string> = {
  Aktif: "bg-success/10 text-success",
  Askıda: "bg-destructive/10 text-destructive",
  Arşiv: "bg-muted text-muted-foreground",
};

const ROLE_TINT: Record<string, string> = {
  Liseli: "bg-primary/10 text-primary",
  Okul: "bg-warning/10 text-warning",
  Kurum: "bg-info/10 text-info",
};

export default function KullanicilarPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/yonetim" },
          { label: "Kullanıcılar" },
        ]}
        title="Tüm kullanıcılar"
        description="Liseli, okul, kurum hesaplarının birleşik görünümü."
        actions={
          <DemoActionButton variant="outline" size="sm" action="Filtre paneli açıldı">
            <Filter className="size-3.5" />
            Filtreler
          </DemoActionButton>
        }
      />
      <div className="px-4 py-6 md:px-8 md:py-8">
        <div className="mb-4 flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 md:max-w-md">
          <Search className="size-3.5 text-muted-foreground" />
          <span className="text-[13px] text-muted-foreground">İsim, e-posta, okul ara...</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kullanıcı</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>E-posta</TableHead>
                <TableHead>Okul / Kurum</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Üyelik</TableHead>
                <TableHead className="text-right">Aksiyon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {USERS.map((u) => (
                <TableRow key={u.email}>
                  <TableCell className="font-semibold">{u.name}</TableCell>
                  <TableCell>
                    <span className={cn("inline-flex rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em]", ROLE_TINT[u.role])}>{u.role}</span>
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">{u.email}</TableCell>
                  <TableCell className="text-muted-foreground">{u.school}</TableCell>
                  <TableCell>
                    <span className={cn("inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em]", STATUS_TINT[u.status])}>{u.status}</span>
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">{u.joined}</TableCell>
                  <TableCell className="text-right">
                    <DemoActionButton variant="link" size="sm" action="Detay sayfası demo aşamasında, yakında" className="h-auto p-0 text-[12px]">Detay</DemoActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
