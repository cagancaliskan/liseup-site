"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle, Vec2, Vec3 } from "ogl";
import { vertexShader } from "../shaders/quad-vert";
import { fragmentShaderVariantA } from "../shaders/variant-a";
import { fragmentShaderVariantB } from "../shaders/variant-b";
import { fragmentShaderVariantC } from "../shaders/variant-c";
import { fragmentShaderVariantD } from "../shaders/variant-d";
import { MobileHeroFallback } from "./MobileHeroFallback";

type Variant = "A" | "B" | "C" | "D";

interface ShaderHeroProps {
  variant?: Variant;
  className?: string;
}

const variantConfig: Record<Variant, { fragment: string; tint: [number, number, number] }> = {
  A: { fragment: fragmentShaderVariantA, tint: [0.220, 0.443, 0.875] },
  B: { fragment: fragmentShaderVariantB, tint: [0.122, 0.278, 0.647] },
  C: { fragment: fragmentShaderVariantC, tint: [0.416, 0.620, 0.921] },
  D: { fragment: fragmentShaderVariantD, tint: [0.173, 0.361, 0.784] },
};

export function ShaderHero({ variant = "A", className }: ShaderHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const config = variantConfig[variant] ?? variantConfig.A;

    const renderer = new Renderer({
      alpha: false,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    Object.assign(gl.canvas.style, {
      display: "block",
      width: "100%",
      height: "100%",
    });

    const setSize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height);
      program?.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height);
    };

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: config.fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2(gl.canvas.width, gl.canvas.height) },
        uMouse: { value: new Vec2(0.5, 0.5) },
        uTint: { value: new Vec3(...config.tint) },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    setSize();

    const targetMouse = { x: 0.5, y: 0.5 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = 1 - (e.clientY - rect.top) / rect.height;
    };
    container.addEventListener("pointermove", onPointerMove);

    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    let rafId: number | undefined;
    const start = performance.now();

    const tick = () => {
      const t = (performance.now() - start) / 1000;
      program.uniforms.uTime.value = t;

      const m = program.uniforms.uMouse.value;
      m.x += (targetMouse.x - m.x) * 0.06;
      m.y += (targetMouse.y - m.y) * 0.06;

      renderer.render({ scene: mesh });
      rafId = requestAnimationFrame(tick);
    };

    if (reducedMotion) {
      renderer.render({ scene: mesh });
    } else {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      container.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [variant]);

  return (
    <div className={`absolute inset-0 ${className ?? ""}`}>
      <MobileHeroFallback variant={variant} className="md:hidden" />
      <div
        ref={containerRef}
        aria-hidden="true"
        className="hidden md:block absolute inset-0 w-full h-full"
      />
      {/* Dark-mode overlay, keeps text legible over light-canvas shaders (A/C/D) */}
      {variant !== "B" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] hidden bg-[var(--surface-0)] opacity-[0.78] dark:block"
        />
      )}
    </div>
  );
}
