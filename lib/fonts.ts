import { Livvic, Inter, JetBrains_Mono, Fraunces } from "next/font/google";

export const livvic = Livvic({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "500", "600", "700", "900"],
  display: "swap",
});

// Fraunces, variable serif for editorial body. Replaces Inter as primary body font.
// Distinctive: variable axes (SOFT, opsz), Turkish-supporting, far from generic SaaS look.
export const fraunces = Fraunces({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

// Inter retained for app/admin surfaces (UI register), exposed as --font-ui.
export const inter = Inter({
  variable: "--font-ui",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});
