"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroNetwork } from "@/components/marketing/hero-network";
import { HeroAurora } from "@/components/marketing/hero-aurora";
import { ProfilePreviewCard } from "@/components/marketing/profile-preview-card";
import { KineticHeadline } from "@/components/marketing/kinetic-headline";
import { MagneticButton } from "@/components/marketing/magnetic-button";
import { MOCK_PROFILE } from "@/lib/mock-data";

const EASE = [0.2, 0, 0, 1] as const;

const heroVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.09,
    },
  },
};

function itemVariants(y = 20): Variants {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE },
    },
  };
}

export function ShowcaseHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-b border-border/70">
      <HeroAurora />
      <HeroNetwork />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/70 to-transparent"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pt-24 pb-28 md:px-8 md:pt-36 md:pb-40 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* LEFT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reduced ? undefined : heroVariants}
          className="relative"
        >
          <motion.div variants={itemVariants(12)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3.5 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-muted-foreground backdrop-blur-md">
              <span className="relative inline-flex size-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              Lise öğrencilerine ücretsiz · LiseUP Derneği
            </div>
          </motion.div>

          <KineticHeadline
            className="mt-7 font-display font-black leading-[0.92] tracking-[-0.035em] text-foreground"
            style={{ fontSize: "clamp(56px, 9.5vw, 140px)" }}
            delay={0.2}
            stagger={0.055}
            lines={[
              "Liselinin",
              "ekibini,",
              [
                "kurumun ",
                <span
                  key="highlight"
                  className="relative inline-block text-primary"
                >
                  yeteneğini
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1 h-[10px] rounded-full bg-primary/30 md:-bottom-2 md:h-[14px]"
                  />
                </span>,
              ],
              <span key="close" className="text-foreground/80">
                bulduğu yer.
              </span>,
            ]}
          />

          <motion.p
            variants={itemVariants()}
            className="mt-8 max-w-lg text-[18px] leading-7 text-muted-foreground md:text-[21px] md:leading-8"
          >
            Fikrini paylaş, ekibini kur, kurumların açtığı fırsatlara başvur.
            Türkiye'de 14–18 yaşındaki liseliler için yapılmış{" "}
            <span className="font-semibold text-foreground">ilk platform</span>.
          </motion.p>

          <motion.div
            variants={itemVariants()}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton strength={10}>
              <Button asChild size="xl">
                <Link href="/kayit/liseli">
                  Ücretsiz kaydol
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton strength={6}>
              <Button asChild size="xl" variant="outline">
                <Link href="#firsatlar">Fırsatları gör</Link>
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.dl
            variants={itemVariants()}
            className="mt-12 grid grid-cols-3 gap-x-6 gap-y-2 border-t-2 border-border/80 pt-7 md:max-w-lg"
          >
            <MiniStat label="Yaş aralığı" value="14 – 18" />
            <MiniStat label="Pilot şehir" value="3" />
            <MiniStat label="Başlangıç" value="Eylül '26" />
          </motion.dl>
        </motion.div>

        {/* RIGHT, Layered mocks */}
        <div className="relative mx-auto w-full max-w-[480px] lg:max-w-[620px]">
          <div
            aria-hidden
            className="absolute -inset-12 -z-10 rounded-[48px] bg-gradient-to-br from-brand-500/25 via-transparent to-brand-400/20 blur-3xl"
          />

          {/* Profile card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 36, scale: 0.95 }}
            animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
            className="relative lg:scale-[1.03]"
          >
            <ProfilePreviewCard profile={MOCK_PROFILE} />
          </motion.div>

          {/* Floating notification, top right */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -16, x: 16, rotate: -2.5 }}
            animate={reduced ? undefined : { opacity: 1, y: 0, x: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            className="absolute -top-6 -right-5 hidden w-[280px] rounded-2xl border border-border bg-background/95 p-4 shadow-[var(--shadow-dramatic)] backdrop-blur md:block"
          >
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Send className="size-4" strokeWidth={2.1} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">
                  Yeni mesaj · 2 dk önce
                </p>
                <p className="mt-1 text-[13px] font-bold text-foreground">
                  Turkcell LAB seninle konuşmak istiyor
                </p>
              </div>
            </div>
          </motion.div>

          {/* Floating opportunity, bottom left */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20, x: -18, rotate: 2.5 }}
            animate={reduced ? undefined : { opacity: 1, y: 0, x: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
            className="absolute -bottom-8 -left-6 hidden w-[300px] rounded-2xl border border-border bg-background/95 p-4 shadow-[var(--shadow-dramatic)] backdrop-blur md:block"
          >
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="size-4" strokeWidth={2.1} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">
                  Önerildi · Hackathon
                </p>
                <p className="mt-1 text-[13px] font-bold text-foreground">
                  Endeavor Gen Z Pitch · ₺50.000
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  Son 7 gün · 142 başvuru
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1.5 font-display text-[26px] font-black text-foreground tabular-nums md:text-[32px]">
        {value}
      </dd>
    </div>
  );
}
