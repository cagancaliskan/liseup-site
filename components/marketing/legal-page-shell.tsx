import Link from "next/link";

interface LegalTOCItem {
  id: string;
  label: string;
}

interface LegalPageShellProps {
  kicker: string;
  title: string;
  lastUpdated: string;
  effective: string;
  toc: LegalTOCItem[];
  children: React.ReactNode;
}

export function LegalPageShell({
  kicker,
  title,
  lastUpdated,
  effective,
  toc,
  children,
}: LegalPageShellProps) {
  return (
    <div className="bg-[var(--surface-0)] pb-[var(--space-section-y)]">
      {/* Page header */}
      <section className="border-b border-[var(--rule)]">
        <div className="mx-auto w-full max-w-[var(--max-content)] px-[var(--space-gutter)] pb-10 pt-16 md:pb-12 md:pt-24">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-brand-500)]">
            {kicker}
          </span>
          <h1 className="mt-4 font-display text-[var(--text-4xl)] font-black leading-[var(--text-4xl--line-height)] tracking-[-0.025em] text-[var(--ink)] md:text-[var(--text-5xl)] md:leading-[var(--text-5xl--line-height)]">
            {title}
          </h1>
          <dl className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ink-3)]">
                Son güncelleme
              </dt>
              <dd className="mt-0.5 font-sans text-[var(--text-sm)] font-medium text-[var(--ink)]">
                {lastUpdated}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ink-3)]">
                Yürürlük
              </dt>
              <dd className="mt-0.5 font-sans text-[var(--text-sm)] font-medium text-[var(--ink)]">
                {effective}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Two-column: ToC sidebar + content */}
      <div className="mx-auto grid w-full max-w-[var(--max-content)] gap-12 px-[var(--space-gutter)] py-14 md:grid-cols-[240px_1fr] md:gap-16 md:py-16">
        {/* Desktop ToC */}
        <aside className="hidden md:block">
          <nav className="sticky top-24">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
              İçindekiler
            </h2>
            <ol className="mt-4 space-y-2.5">
              {toc.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex items-baseline gap-2.5 font-sans text-[var(--text-sm)] text-[var(--ink-3)] transition-colors hover:text-[var(--ink)]"
                  >
                    <span className="font-mono text-[10px] tabular-nums opacity-40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-xl border border-[rgba(56,113,223,0.20)] bg-[rgba(56,113,223,0.04)] p-4">
              <p className="font-display text-[var(--text-sm)] font-bold text-[var(--ink)]">
                Bir sorun mu var?
              </p>
              <p className="mt-1.5 font-sans text-[var(--text-xs)] leading-[1.6] text-[var(--ink-3)]">
                Bu metinde anlamadığın bir kısım varsa{" "}
                <Link
                  href="mailto:info@liseup.org"
                  className="font-medium text-[var(--color-brand-500)] hover:underline"
                >
                  info@liseup.org
                </Link>
                &rsquo;a yaz.
              </p>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <article className="min-w-0">{children}</article>
      </div>
    </div>
  );
}

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-b border-[var(--rule)] py-8 first:pt-0 last:border-b-0"
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgba(56,113,223,0.08)] font-mono text-[11px] font-bold tabular-nums text-[var(--color-brand-500)]">
          {number}
        </span>
        <h2 className="font-display text-[var(--text-xl)] font-bold leading-[var(--text-xl--line-height)] tracking-[-0.02em] text-[var(--ink)]">
          {title}
        </h2>
      </div>
      <div className="mt-5 space-y-3 [&_a]:text-[var(--color-brand-500)] [&_a]:hover:underline [&_li]:font-sans [&_li]:text-[var(--text-base)] [&_li]:leading-[var(--text-base--line-height)] [&_li]:text-[var(--ink-2)] [&_p]:font-sans [&_p]:text-[var(--text-base)] [&_p]:leading-[var(--text-base--line-height)] [&_p]:text-[var(--ink-2)] [&_strong]:font-semibold [&_strong]:text-[var(--ink)] [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
