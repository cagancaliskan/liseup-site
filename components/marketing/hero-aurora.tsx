"use client";

import { useReducedMotion } from "motion/react";

/**
 * Aurora mesh gradient that sits behind the hero network canvas.
 * Pure CSS, no canvas, no raster images. Animates very slowly when allowed.
 * Bold-pass sizes + central spotlight for stronger visual weight.
 */
export function HeroAurora() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base soft brand wash, richer than Pass 1 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 20% 18%, rgba(56,113,223,0.22) 0%, transparent 55%), radial-gradient(ellipse 75% 55% at 80% 42%, rgba(95,143,228,0.16) 0%, transparent 50%), radial-gradient(ellipse 55% 45% at 55% 92%, rgba(31,71,165,0.12) 0%, transparent 55%)",
        }}
      />

      {/* Central spotlight, anchors the composition */}
      <div
        className="absolute left-1/2 top-0 size-[1200px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(56,113,223,0.18) 0%, rgba(56,113,223,0.08) 35%, transparent 65%)",
        }}
      />

      {/* Animated aurora blobs, larger + more opaque for Pass 1.6 */}
      {!reduced && (
        <>
          <div
            className="absolute -top-40 left-[18%] size-[720px] rounded-full opacity-45 blur-3xl mix-blend-multiply dark:mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle, rgba(56,113,223,0.75) 0%, transparent 68%)",
              animation: "hero-aurora-drift-1 16s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-1/4 right-[15%] size-[560px] rounded-full opacity-40 blur-3xl mix-blend-multiply dark:mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle, rgba(95,143,228,0.7) 0%, transparent 68%)",
              animation: "hero-aurora-drift-2 22s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-[-80px] left-[45%] size-[440px] rounded-full opacity-30 blur-3xl mix-blend-multiply dark:mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle, rgba(31,71,165,0.65) 0%, transparent 68%)",
              animation: "hero-aurora-drift-3 18s ease-in-out infinite",
            }}
          />
        </>
      )}

      {/* Fine noise grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Grid lines, slightly more visible for bold frame */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Bottom soft fade into background */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

      <style jsx>{`
        @keyframes hero-aurora-drift-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(50px, 24px) scale(1.1);
          }
        }
        @keyframes hero-aurora-drift-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-36px, 48px) scale(0.92);
          }
        }
        @keyframes hero-aurora-drift-3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(26px, -36px) scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}
