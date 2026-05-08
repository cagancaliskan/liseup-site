import { Search, SlidersHorizontal, Bookmark } from "lucide-react";
import { MockBrowserFrame } from "./mock-browser-frame";

interface StudentRow {
  initials: string;
  gradient: [string, string];
  firstName: string;
  school: string;
  grade: string;
  city: string;
  skills: string[];
  verified: boolean;
  saved?: boolean;
}

const STUDENTS: StudentRow[] = [
  {
    initials: "DK",
    gradient: ["#3871DF", "#14306D"],
    firstName: "Deniz",
    school: "Ankara Atatürk L.",
    grade: "11. Sınıf",
    city: "Ankara",
    skills: ["React", "Figma"],
    verified: true,
  },
  {
    initials: "EY",
    gradient: ["#2C5CC8", "#1F47A5"],
    firstName: "Ece",
    school: "Beykent Koleji",
    grade: "10. Sınıf",
    city: "İstanbul",
    skills: ["Tasarım", "Araştırma"],
    verified: true,
    saved: true,
  },
  {
    initials: "BM",
    gradient: ["#5F8FE4", "#1F47A5"],
    firstName: "Bora",
    school: "-",
    grade: "12. Sınıf",
    city: "İzmir",
    skills: ["Python", "Donanım"],
    verified: false,
  },
];

export function KurumDiscoverMock() {
  return (
    <MockBrowserFrame label="liseup.org/kurum/kesfet/liseliler" tone="brand">
      <div className="p-5">
        {/* Search + filter row */}
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
            <Search className="size-3.5 text-muted-foreground" />
            <span className="text-[12px] text-muted-foreground">
              Yazılım, tasarım, veri...
            </span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-[12px] font-medium text-foreground"
          >
            <SlidersHorizontal className="size-3.5" />
            Filtreler
            <span className="font-mono text-[10px] font-semibold text-primary">3</span>
          </button>
        </div>

        {/* Active filter chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["React", "İstanbul + Ankara", "Doğrulanmış"].map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
            >
              {chip}
              <span className="text-[10px] text-primary/70">×</span>
            </span>
          ))}
        </div>

        {/* Result list */}
        <div className="mt-4 space-y-2">
          {STUDENTS.map((s) => (
            <div
              key={s.initials}
              className="flex items-center gap-3 rounded-md border border-border/70 bg-background p-3"
            >
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-full font-display text-[15px] font-black text-white"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${s.gradient[0]}, ${s.gradient[1]})`,
                }}
              >
                {s.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-foreground">
                    {s.firstName}{" "}
                    <span className="font-normal text-muted-foreground">
                      {s.grade} · {s.city}
                    </span>
                  </span>
                  {s.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-success">
                      Doğrulandı
                    </span>
                  )}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {s.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex rounded-md border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {s.school}
                </div>
              </div>
              <button
                type="button"
                aria-label="Kaydet"
                className={
                  "inline-flex size-8 shrink-0 items-center justify-center rounded-md transition-colors " +
                  (s.saved
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground")
                }
              >
                <Bookmark
                  className={"size-3.5 " + (s.saved ? "fill-current" : "")}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Privacy note */}
        <p className="mt-4 rounded-md bg-muted/40 p-3 text-[11px] leading-5 text-muted-foreground">
          <strong className="font-semibold text-foreground">Gizlilik:</strong>{" "}
          Soyad ve fotoğraf varsayılan olarak gizli. Yaş ve doğum tarihi hiçbir
          zaman görünmez. Liseli mesajını kabul ederse fotoğraf sana açılır.
        </p>
      </div>
    </MockBrowserFrame>
  );
}
