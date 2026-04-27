"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Users, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const SCREENS: Array<{
  icon: LucideIcon;
  title: string;
  body: string;
}> = [
  {
    icon: Sparkles,
    title: "Hoş geldin Deniz 👋",
    body: "LiseUP'ta 3 şey yapabilirsin: fikir paylaş, ekip kur, fırsata başvur. İlk hesap kurma adımında 3 dakika bekle; sonrası senin.",
  },
  {
    icon: Users,
    title: "Profilin portfolyoya dönüşür",
    body: "Yeteneklerini, ilgi alanlarını ve portfolyonu ekle. Her proje ve rozet profilinde birikir, üniversite başvurusunda fark yaratır.",
  },
  {
    icon: Send,
    title: "Kurumlar seni keşfeder",
    body: "Kurum mesajı geldiğinde önce sana danışılır. Sen kabul edersen konuşma açılır, reddedersen zarf bile açılmaz.",
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const current = SCREENS[step];
  const isLast = step === SCREENS.length - 1;

  return (
    <div className="mx-auto flex min-h-[calc(100svh-8rem)] max-w-2xl flex-col justify-center px-6 py-10 md:px-8">
      <div className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <current.icon className="size-8" strokeWidth={2.1} />
        </div>
        <h1 className="mt-6 font-display text-[28px] font-black leading-tight text-foreground md:text-[34px]">
          {current.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">
          {current.body}
        </p>
      </div>

      <div className="mt-10 flex justify-center gap-2">
        {SCREENS.map((_, i) => (
          <span
            key={i}
            className={
              i === step
                ? "h-1.5 w-8 rounded-full bg-primary"
                : "h-1.5 w-1.5 rounded-full bg-muted"
            }
          />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between gap-3">
        <Link
          href="/app"
          className="text-[13px] font-semibold text-muted-foreground hover:text-foreground"
        >
          Atla
        </Link>
        {isLast ? (
          <Button asChild>
            <Link href="/app">
              Başlayalım
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        ) : (
          <Button onClick={() => setStep(step + 1)}>
            İleri
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
