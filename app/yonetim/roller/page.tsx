import { Check, KeyRound } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import {
  ADMIN_ROLES,
  PERMISSION_MATRIX,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TEAM_COUNT: Record<string, number> = {
  "Super Admin": 4,
  "Teknik Admin": 2,
  "İçerik Moderatör": 3,
  "Okul Success": 2,
  "Kurum Success": 2,
  "İçerik Editör": 1,
  Destek: 2,
  Analist: 1,
};

export default function RollerPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Pano", href: "/yonetim" }, { label: "Roller" }]}
        title="Roller ve yetki matrisi"
        description="8 rol × 14 modül. PRD §11.2 standardı."
      />

      <div className="space-y-8 px-4 py-6 md:px-8 md:py-8">
        {/* Role cards */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {ADMIN_ROLES.map((r) => (
            <div
              key={r}
              className="rounded-xl border border-border/70 bg-card p-4"
            >
              <div className="flex items-center justify-between">
                <KeyRound className="size-3.5 text-primary" />
                <span className="font-mono text-[11px] font-semibold text-muted-foreground tabular-nums">
                  {TEAM_COUNT[r] ?? 0} kişi
                </span>
              </div>
              <p className="mt-2 font-display text-[13px] font-black text-foreground">
                {r}
              </p>
            </div>
          ))}
        </div>

        {/* Matrix */}
        <section>
          <h2 className="font-display text-[14px] font-black uppercase tracking-[0.1em] text-foreground">
            İzin matrisi
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border/70 bg-card">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-border/70 bg-muted/40">
                  <th className="sticky left-0 z-10 min-w-44 bg-muted/40 px-4 py-2.5 text-left font-display text-[11px] font-black uppercase tracking-[0.08em] text-foreground">
                    Modül
                  </th>
                  {ADMIN_ROLES.map((r) => (
                    <th
                      key={r}
                      className="min-w-24 px-2 py-2.5 text-center font-display text-[10px] font-bold text-foreground"
                    >
                      <span className="block leading-tight">{r}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERMISSION_MATRIX.map((row) => (
                  <tr
                    key={row.module}
                    className="border-b border-border/60 last:border-b-0 hover:bg-muted/30"
                  >
                    <td className="sticky left-0 bg-card px-4 py-2 font-semibold text-foreground">
                      {row.module}
                    </td>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-2 py-2 text-center">
                        {v ? (
                          <span className="inline-flex size-6 items-center justify-center rounded-full bg-success/15 text-success">
                            <Check className="size-3.5" />
                          </span>
                        ) : (
                          <span className="inline-block size-1 rounded-full bg-muted-foreground/30" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-[10px] text-muted-foreground">
            Yeşil tik · yetki var. Boş · yetki yok. Analitik dashboard tüm
            rollere açık (sadece okuma).
          </p>
        </section>
      </div>
    </>
  );
}
