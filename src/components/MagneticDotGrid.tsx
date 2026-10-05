import { useEffect, useRef } from "react";

type MagneticDotGridProps = {
  gap?: number;
  baseRadius?: number;
  maxRadius?: number;
  influence?: number;
  baseColor?: string;
  activeColor?: string;
};

const PULSE_MS = 900;

export default function MagneticDotGrid({
  gap = 28,
  baseRadius = 2.2,
  maxRadius = 4.6,
  influence = 160,
  baseColor = "#c5e6da",
  activeColor = "#0f6b5c",
}: MagneticDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointer = { x: -9999, y: -9999, inside: false };
    const smooth = { x: -9999, y: -9999 };
    const pulse = { x: 0, y: 0, start: 0, active: false };
    let raf = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const toLocal = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        inside:
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom,
      };
    };

    const onMove = (event: PointerEvent) => {
      const local = toLocal(event);
      pointer.inside = local.inside;
      if (!local.inside) return;
      pointer.x = local.x;
      pointer.y = local.y;
    };

    const onLeave = () => {
      pointer.inside = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const local = toLocal(event);
      if (!local.inside) return;
      pulse.x = local.x;
      pulse.y = local.y;
      pulse.start = performance.now();
      pulse.active = true;
    };

    const draw = () => {
      if (!running) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const now = performance.now();

      smooth.x += (pointer.x - smooth.x) * 0.2;
      smooth.y += (pointer.y - smooth.y) * 0.2;

      let beat = 0;
      if (pulse.active) {
        const elapsed = (now - pulse.start) / PULSE_MS;
        if (elapsed >= 1) pulse.active = false;
        else beat = Math.max(0, Math.sin(elapsed * Math.PI * 2)) * (1 - elapsed);
      }

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;
      const offsetX = (width - (cols - 1) * gap) / 2;
      const offsetY = (height - (rows - 1) * gap) / 2;
      const maxShift = gap * 0.16;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * gap;
          const y = offsetY + row * gap;
          const dx = smooth.x - x;
          const dy = smooth.y - y;
          const dist = Math.hypot(dx, dy);
          const t = Math.max(0, 1 - dist / influence);
          const eased = t * t * (3 - 2 * t);

          // la ola vive solo dentro del zoom y se apaga en el borde
          const crest = Math.sin(dist * 0.09 - now * 0.004);
          const wave = eased * crest;

          let throb = 0;
          if (beat > 0) {
            const pDist = Math.hypot(pulse.x - x, pulse.y - y);
            const pt = Math.max(0, 1 - pDist / influence);
            throb = pt * pt * (3 - 2 * pt) * beat;
          }

          const strength = Math.min(1, eased + throb * 0.35);
          const radius = Math.max(
            1.2,
            baseRadius +
              (maxRadius - baseRadius) * eased +
              (maxRadius - baseRadius) * 0.28 * wave +
              (maxRadius - baseRadius) * 0.7 * throb,
          );

          let px = x;
          let py = y;
          if (dist > 0.001 && eased > 0) {
            px += (dx / dist) * wave * maxShift;
            py += (dy / dist) * wave * maxShift;
          }

          ctx.beginPath();
          ctx.fillStyle = strength > 0.08 ? activeColor : baseColor;
          ctx.globalAlpha = 0.5 + strength * 0.5;
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      resize();
      running = false;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);
      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;
      const offsetX = (width - (cols - 1) * gap) / 2;
      const offsetY = (height - (rows - 1) * gap) / 2;
      ctx.fillStyle = baseColor;
      ctx.globalAlpha = 0.55;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          ctx.beginPath();
          ctx.arc(offsetX + col * gap, offsetY + row * gap, baseRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      return () => cancelAnimationFrame(raf);
    }

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [gap, baseRadius, maxRadius, influence, baseColor, activeColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
