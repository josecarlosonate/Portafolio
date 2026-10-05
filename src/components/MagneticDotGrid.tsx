import { useEffect, useRef } from "react";

type MagneticDotGridProps = {
  gap?: number;
  baseRadius?: number;
  maxRadius?: number;
  influence?: number;
  pull?: number;
  baseColor?: string;
  activeColor?: string;
};

export default function MagneticDotGrid({
  gap = 28,
  baseRadius = 2.2,
  maxRadius = 5.2,
  influence = 180,
  pull = 14,
  baseColor = "#c5e6da",
  activeColor = "#0f6b5c",
}: MagneticDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointer = { x: -9999, y: -9999 };
    const smooth = { x: -9999, y: -9999 };
    let raf = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const draw = () => {
      if (!running) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      smooth.x += (pointer.x - smooth.x) * 0.18;
      smooth.y += (pointer.y - smooth.y) * 0.18;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;
      const offsetX = (width - (cols - 1) * gap) / 2;
      const offsetY = (height - (rows - 1) * gap) / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * gap;
          const y = offsetY + row * gap;
          const dx = smooth.x - x;
          const dy = smooth.y - y;
          const dist = Math.hypot(dx, dy);
          const t = Math.max(0, 1 - dist / influence);
          const eased = t * t * (3 - 2 * t);
          const radius = baseRadius + (maxRadius - baseRadius) * eased;
          const shift = pull * eased;
          const px = x + (dist === 0 ? 0 : (dx / dist) * shift);
          const py = y + (dist === 0 ? 0 : (dy / dist) * shift);

          ctx.beginPath();
          ctx.fillStyle = eased > 0.08 ? activeColor : baseColor;
          ctx.globalAlpha = 0.55 + eased * 0.45;
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
      pointer.x = -9999;
      pointer.y = -9999;
      draw();
      running = false;
      return () => {
        cancelAnimationFrame(raf);
      };
    }

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [gap, baseRadius, maxRadius, influence, pull, baseColor, activeColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
