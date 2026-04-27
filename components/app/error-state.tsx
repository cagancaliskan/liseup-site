"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Bir şeyler ters gitti.",
  description = "Veriler şu an yüklenemiyor. Bir saniye bekleyip tekrar deneyebilirsin.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-5 rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-14 text-center",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-2xl bg-destructive/15 text-destructive">
        <AlertTriangle className="size-5" strokeWidth={2} />
      </div>
      <div className="max-w-md">
        <h3 className="font-display text-[18px] font-black leading-tight text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-[14px] leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={onRetry}>
          <RefreshCcw className="size-3.5" />
          Tekrar dene
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href="/iletisim">Destek al</Link>
        </Button>
      </div>
    </div>
  );
}
