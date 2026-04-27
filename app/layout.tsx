import type { Metadata, Viewport } from "next";
import { livvic, fraunces, inter, jetbrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liseup.org"),
  title: {
    default: "LiseUP, Liselinin ekibini, kurumun yeteneğini bulduğu platform",
    template: "%s · LiseUP",
  },
  description:
    "Türkiye'nin lise fırsat ve ekip platformu. Fikir bende, ekip nerede? Burada. Lise öğrencilerine ücretsiz. LiseUP Derneği.",
  applicationName: "LiseUP",
  authors: [{ name: "LiseUP Derneği" }],
  keywords: [
    "lise",
    "öğrenci",
    "proje",
    "ekip",
    "fırsat",
    "staj",
    "burs",
    "girişimcilik",
    "LiseUP",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://liseup.org",
    siteName: "LiseUP",
    title: "LiseUP, Liselinin ekibini, kurumun yeteneğini bulduğu platform",
    description: "Fikir bende, ekip nerede? Burada. Lise öğrencilerine ücretsiz.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LiseUP",
    description: "Türkiye'nin lise fırsat ve ekip platformu.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${livvic.variable} ${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
