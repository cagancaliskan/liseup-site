type Variant = "A" | "B" | "C" | "D";

interface MobileHeroFallbackProps {
  variant?: Variant;
  className?: string;
}

const variantBackgrounds: Record<Variant, string> = {
  A: `radial-gradient(ellipse at 25% 30%, rgba(56,113,223,0.20), transparent 55%),
      radial-gradient(ellipse at 75% 70%, rgba(95,143,228,0.15), transparent 50%),
      #FBFBF9`,
  B: `radial-gradient(ellipse at 30% 25%, rgba(31,71,165,0.28), transparent 55%),
      radial-gradient(ellipse at 70% 75%, rgba(56,113,223,0.18), transparent 50%),
      #FBFBF9`,
  C: `radial-gradient(ellipse at 42% 50%, rgba(106,159,235,0.38), transparent 60%),
      radial-gradient(ellipse at 68% 38%, rgba(140,133,255,0.20), transparent 50%),
      #FBFBF9`,
  D: `radial-gradient(ellipse at 30% 30%, rgba(44,92,200,0.20), transparent 55%),
      radial-gradient(ellipse at 70% 70%, rgba(56,113,223,0.12), transparent 50%),
      #FBFBF9`,
};

export function MobileHeroFallback({ variant = "A", className }: MobileHeroFallbackProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background: variantBackgrounds[variant],
        backgroundAttachment: "fixed",
      }}
    />
  );
}
