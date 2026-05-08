import { ShieldCheck, Sparkles } from "lucide-react";
import type { ProfileMock } from "@/lib/mock-data";
import { MockBrowserFrame } from "./mock-browser-frame";

interface ProfilePreviewCardProps {
  profile: ProfileMock;
}

export function ProfilePreviewCard({ profile }: ProfilePreviewCardProps) {
  const initials = `${profile.firstName[0]}${profile.lastInitial[0]}`;

  return (
    <MockBrowserFrame label="liseup.org/app/profil">
      {/* cover gradient */}
      <div className="relative h-24 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700">
        <div
          aria-hidden
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 35%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.28) 0%, transparent 40%)",
          }}
        />
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur">
          <ShieldCheck className="size-3" /> Doğrulanmış
        </span>
      </div>

      {/* header */}
      <div className="relative px-6 pb-6">
        <div className="-mt-10 flex items-end justify-between gap-3">
          <div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[26px] font-black text-white ring-4 ring-background shadow-[var(--shadow-card)]">
            {initials}
          </div>
          <div className="mb-1 flex flex-col items-end">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Partner Okul
            </span>
            <span className="text-[13px] font-semibold text-foreground">
              {profile.schoolName}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-display text-[24px] font-black leading-tight tracking-[-0.01em] text-foreground">
            {profile.firstName} {profile.lastInitial}
          </h3>
          <p className="mt-1 text-[14px] text-muted-foreground">
            {profile.classYear} · {profile.city}
          </p>
        </div>

        {/* skills */}
        <div className="mt-5">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Yetenekler
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {profile.skills.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-1 rounded-md border border-border/80 bg-background px-2.5 py-1 text-[12px] font-semibold text-foreground"
              >
                {s.label}
                <span className="font-mono text-[10px] font-normal text-muted-foreground">
                  · {s.level}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* interests */}
        <div className="mt-4">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            İlgi alanları
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {profile.interests.map((i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-md bg-accent px-2.5 py-1 text-[12px] font-semibold text-accent-foreground"
              >
                {i}
              </span>
            ))}
          </div>
        </div>

        {/* stats */}
        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border/70 pt-5">
          <Stat label="Proje" value={String(profile.projectCount)} />
          <Stat label="Rozet" value={String(profile.badgeCount)} />
          <Stat
            label="Portfolyo"
            value={String(profile.portfolioLinks.length)}
            icon={<Sparkles className="size-3" />}
          />
        </div>
      </div>
    </MockBrowserFrame>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 inline-flex items-center gap-1 font-display text-[22px] font-black text-foreground tabular-nums">
        {value}
        {icon && <span className="text-primary">{icon}</span>}
      </div>
    </div>
  );
}
