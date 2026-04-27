"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background, animated node network in LiseUP brand tones.
 * Award-tier upgrade: random nodes assume liseli / kurum identities,
 * labels fade in/out periodically. Connection lines between labeled
 * nodes draw thicker, visualizes the eşleştirme metaphor.
 *
 * Static SVG fallback kicks in under prefers-reduced-motion.
 */

const LISELI_NAMES = [
  "Deniz",
  "Ece",
  "Bora",
  "Zeynep",
  "Ege",
  "Mira",
  "Kaan",
  "Elif",
];
const KURUM_NAMES = [
  "Turkcell LAB",
  "Koç Vakfı",
  "İTÜ Çekirdek",
  "Endeavor",
  "Kworks",
  "TEB Girişim Evi",
];

type NodeKind = "plain" | "liseli" | "kurum";

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  kind: NodeKind;
  label?: string;
  labelAlpha: number;
  labelTarget: number;
  lastLabelChangeAt: number;
  nextLabelChangeAt: number;
}

export function HeroNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = 0;
    let running = true;
    let startT = performance.now();

    let nodes: NetworkNode[] = [];

    const now = () => performance.now() - startT;

    const scheduleLabelChange = (node: NetworkNode, t: number) => {
      node.lastLabelChangeAt = t;
      node.nextLabelChangeAt = t + 3000 + Math.random() * 4000;
    };

    const assignLabel = (node: NetworkNode) => {
      // 55% chance no label, 25% liseli, 20% kurum
      const roll = Math.random();
      if (roll < 0.55) {
        node.kind = "plain";
        node.label = undefined;
        node.labelTarget = 0;
        return;
      }
      if (roll < 0.8) {
        node.kind = "liseli";
        node.label = LISELI_NAMES[Math.floor(Math.random() * LISELI_NAMES.length)];
      } else {
        node.kind = "kurum";
        node.label = KURUM_NAMES[Math.floor(Math.random() * KURUM_NAMES.length)];
      }
      node.labelTarget = 1;
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = width < 600 ? 0.00007 : 0.00012;
      const target = Math.max(16, Math.floor(width * height * density));
      const t = now();
      nodes = Array.from({ length: target }, () => {
        const node: NetworkNode = {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: Math.random() * 1.6 + 1.4,
          kind: "plain",
          labelAlpha: 0,
          labelTarget: 0,
          lastLabelChangeAt: t - Math.random() * 5000,
          nextLabelChangeAt: t + Math.random() * 5000,
        };
        assignLabel(node);
        if (node.kind !== "plain") node.r = 2.6;
        return node;
      });
    };

    const step = () => {
      if (!running) {
        rafId = requestAnimationFrame(step);
        return;
      }
      const t = now();
      ctx.clearRect(0, 0, width, height);

      // Update labels (cycle identities)
      for (const n of nodes) {
        if (t >= n.nextLabelChangeAt) {
          // Fade out first; once alpha is 0, reassign
          if (n.labelAlpha > 0.02) {
            n.labelTarget = 0;
          } else {
            assignLabel(n);
            if (n.kind !== "plain") n.r = 2.6;
            else n.r = Math.random() * 1.6 + 1.4;
            scheduleLabelChange(n, t);
          }
        }
        // Ease labelAlpha toward target
        n.labelAlpha += (n.labelTarget - n.labelAlpha) * 0.04;
      }

      // Move
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // Links
      const maxDist = Math.min(width, height) * 0.15;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const distAlpha = (1 - dist / maxDist) * 0.32;
            // Highlight lines between labeled nodes
            const labeledBoth = a.kind !== "plain" && b.kind !== "plain";
            const crossKind =
              labeledBoth && a.kind !== b.kind ? true : false;

            if (crossKind) {
              ctx.strokeStyle = `rgba(56, 113, 223, ${Math.min(
                0.6,
                distAlpha * 2.5 * Math.min(a.labelAlpha, b.labelAlpha),
              )})`;
              ctx.lineWidth = 1.4;
            } else if (labeledBoth) {
              ctx.strokeStyle = `rgba(56, 113, 223, ${Math.min(
                0.5,
                distAlpha * 1.8 * Math.min(a.labelAlpha, b.labelAlpha),
              )})`;
              ctx.lineWidth = 1.1;
            } else {
              ctx.strokeStyle = `rgba(56, 113, 223, ${distAlpha})`;
              ctx.lineWidth = 0.9;
            }
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        if (n.kind === "liseli") {
          ctx.fillStyle = `rgba(56, 113, 223, ${0.85})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(56, 113, 223, ${0.35 * n.labelAlpha})`;
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
          ctx.stroke();
        } else if (n.kind === "kurum") {
          ctx.fillStyle = `rgba(22, 163, 74, 0.88)`; // success green for kurum
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(22, 163, 74, ${0.3 * n.labelAlpha})`;
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.fillStyle = "rgba(56, 113, 223, 0.7)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Labels (drawn last so they sit above)
      ctx.font = "600 11px 'Inter', ui-sans-serif, system-ui, sans-serif";
      ctx.textBaseline = "middle";
      for (const n of nodes) {
        if (n.labelAlpha < 0.05 || !n.label) continue;
        const alpha = n.labelAlpha;
        const color = n.kind === "kurum" ? "22, 163, 74" : "15, 23, 42";
        const bgColor = n.kind === "kurum" ? "220, 252, 231" : "255, 255, 255";

        const text = n.label;
        const padX = 6;
        const metrics = ctx.measureText(text);
        const textW = metrics.width;
        const bgX = n.x + n.r + 6;
        const bgY = n.y - 8;
        const bgW = textW + padX * 2;
        const bgH = 16;

        // pill background
        ctx.fillStyle = `rgba(${bgColor}, ${0.92 * alpha})`;
        roundRect(ctx, bgX, bgY, bgW, bgH, 8);
        ctx.fill();

        // border
        ctx.strokeStyle = `rgba(${color}, ${0.2 * alpha})`;
        ctx.lineWidth = 0.6;
        roundRect(ctx, bgX, bgY, bgW, bgH, 8);
        ctx.stroke();

        // text
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fillText(text, bgX + padX, bgY + bgH / 2);
      }

      rafId = requestAnimationFrame(step);
    };

    const onVisibilityChange = () => {
      running = !document.hidden;
    };

    resize();
    step();

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 h-full w-full " + (className ?? "")
      }
    />
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}
