"use client";
import { Bookmark, Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { type StudentMock } from "@/lib/mock-data";

export function StudentCardApp({
  student,
  className,
}: {
  student: StudentMock;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex flex-col gap-4 rounded-xl border border-border/80 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex size-12 items-center justify-center rounded-full font-display text-[14px] font-black text-white shadow-[var(--shadow-card)]"
          style={{
            backgroundImage: `linear-gradient(135deg, ${student.gradient[0]}, ${student.gradient[1]})`,
          }}
        >
          {student.initials}
        </div>
        <button
          type="button"
          aria-label="Kaydet"
          onClick={() => toast.success("Aday kaydedildi")}
          className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bookmark className="size-3.5" />
        </button>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <p className="text-[14px] font-bold text-foreground">
            {student.firstName}
          </p>
          {student.verified && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-success/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-success">
              <ShieldCheck className="size-2.5" />
            </span>
          )}
        </div>
        <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
          {student.classYear} · {student.city}
        </p>
        {student.school && (
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {student.school}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {student.skills.map((s) => (
          <span
            key={s}
            className="inline-flex rounded-md border border-border bg-background px-2 py-0.5 text-[10px] font-semibold text-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => toast.success("Davet gönderildi")}
        className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-[12px] font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
      >
        <Send className="size-3.5" />
        Projeme davet et
      </button>
    </div>
  );
}
