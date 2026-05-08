import { Check, Clock, ShieldCheck } from "lucide-react";
import { MockBrowserFrame } from "./mock-browser-frame";

/**
 * Visualizes the kademeli (gradual) messaging flow: kurum → liseli ilk mesaj
 * bekleyen istek klasöründe → liseli kabul eder → sohbet başlar.
 */
export function MessageThreadMock() {
  return (
    <MockBrowserFrame label="kurum → liseli · ilk istek" tone="brand">
      <div className="space-y-3 px-5 py-5">
        {/* request state */}
        <div className="rounded-lg border border-dashed border-border bg-muted/40 p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-accent font-display text-[11px] font-bold text-accent-foreground">
              T
            </span>
            <span className="text-[12px] font-semibold text-foreground">Turkcell LAB</span>
            <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
              <Clock className="size-3" />
              Bekleyen istek
            </span>
          </div>
          <p className="text-[13px] leading-5 text-foreground">
            "Profilin bizim LAB Junior programıyla uyumlu görünüyor. Seninle konuşmak istiyoruz;
            kabul edersen konuşmayı başlatalım."
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground"
            >
              <Check className="size-3" /> Konuşmayı başlat
            </button>
            <button
              type="button"
              className="rounded-md px-3 py-1.5 text-[12px] font-medium text-muted-foreground hover:bg-accent"
            >
              Şimdi değil
            </button>
          </div>
        </div>

        {/* footnotes */}
        <ul className="space-y-2 text-[12px] leading-5 text-muted-foreground">
          <li className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 size-3 shrink-0 text-primary" />
            Sen kabul edene kadar Turkcell LAB seninle tekrar mesaj atamaz.
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 size-3 shrink-0 text-primary" />
            14 gün içinde kabul etmezsen istek otomatik olarak silinir.
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 size-3 shrink-0 text-primary" />
            Telefon, Instagram ve TikTok gibi iletişim bilgileri otomatik filtrelenir.
          </li>
        </ul>
      </div>
    </MockBrowserFrame>
  );
}
