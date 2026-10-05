import { useEffect, useRef } from "react";

type MagneticDotGridProps = {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  returnDuration?: number;
};

type Dot = {
  cx: number;
  cy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  busy: boolean;
};

function parseColor(hex: string) {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? value.split("").map((c) => c + c).join("") : value;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
    a: full.length >= 8 ? parseInt(full.slice(6, 8), 16) / 255 : 1,
  };
}

export default function MagneticDotGrid({
  dotSize = 6,
  gap = 30,
  baseColor = "#22C55E33",
  activeColor = "#22C55E",
  proximity = 140,
  speedTrigger = 100,
  shockRadius = 220,
  shockStrength = 4,
  returnDuration = 1.2,
}: MagneticDotGridProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const base = parseColor(baseColor);
    const active = parseColor(activeColor);
    const dots: Dot[] = [];
    const pointer = { x: -9999, y: -9999, vx: 0, vy: 0, speed: 0, lastX: 0, lastY: 0, lastTime: 0 };
    let raf = 0;
    let running = true;
    let lastFrame = performance.now();

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots.length = 0;
      const step = dotSize + gap;
      const cols = Math.floor((rect.width + gap) / step);
      const rows = Math.floor((rect.height + gap) / step);
      const gridW = step * cols - gap;
      const gridH = step * rows - gap;
      const originX = (rect.width - gridW) / 2 + dotSize / 2;
      const originY = (rect.height - gridH) / 2 + dotSize / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({
            cx: originX + col * step,
            cy: originY + row * step,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            busy: false,
          });
        }
      }
    };

    const pushDot = (dot: Dot, impulseX: number, impulseY: number) => {
      dot.busy = true;
      dot.vx += impulseX;
      dot.vy += impulseY;
    };

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const now = performance.now();
      const dt = pointer.lastTime ? now - pointer.lastTime : 16;
      let vx = ((event.clientX - pointer.lastX) / dt) * 1000;
      let vy = ((event.clientY - pointer.lastY) / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > 5000) {
        const scale = 5000 / speed;
        vx *= scale;
        vy *= scale;
        speed = 5000;
      }
      pointer.lastTime = now;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
      pointer.vx = vx;
      pointer.vy = vy;
      pointer.speed = speed;
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;

      if (speed <= speedTrigger) return;
      for (const dot of dots) {
        const dist = Math.hypot(dot.cx - pointer.x, dot.cy - pointer.y);
        if (dist < proximity && !dot.busy) {
          pushDot(
            dot,
            dot.cx - pointer.x + vx * 0.005,
            dot.cy - pointer.y + vy * 0.005,
          );
        }
      }
    };

    const onClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      for (const dot of dots) {
        const dist = Math.hypot(dot.cx - x, dot.cy - y);
        if (dist < shockRadius && !dot.busy) {
          const falloff = Math.max(0, 1 - dist / shockRadius);
          pushDot(
            dot,
            (dot.cx - x) * shockStrength * falloff,
            (dot.cy - y) * shockStrength * falloff,
          );
        }
      }
    };

    const draw = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.032, (now - lastFrame) / 1000);
      lastFrame = now;

      const stiffness = 36 / (returnDuration * returnDuration);
      const damping = 7.2 / returnDuration;

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const proximitySq = proximity * proximity;

      for (const dot of dots) {
        const ax = -stiffness * dot.x - damping * dot.vx;
        const ay = -stiffness * dot.y - damping * dot.vy;
        dot.vx += ax * dt;
        dot.vy += ay * dt;
        dot.x += dot.vx * dt;
        dot.y += dot.vy * dt;

        if (dot.busy && Math.hypot(dot.x, dot.y) < 0.35 && Math.hypot(dot.vx, dot.vy) < 12) {
          dot.x = 0;
          dot.y = 0;
          dot.vx = 0;
          dot.vy = 0;
          dot.busy = false;
        }

        const dx = dot.cx - pointer.x;
        const dy = dot.cy - pointer.y;
        const distSq = dx * dx + dy * dy;
        let r = base.r;
        let g = base.g;
        let b = base.b;
        let a = base.a;
        if (distSq <= proximitySq) {
          const t = 1 - Math.sqrt(distSq) / proximity;
          r = Math.round(base.r + (active.r - base.r) * t);
          g = Math.round(base.g + (active.g - base.g) * t);
          b = Math.round(base.b + (active.b - base.b) * t);
          a = base.a + (active.a - base.a) * t;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.arc(dot.cx + dot.x, dot.cy + dot.y, dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    build();
    const observer = new ResizeObserver(build);
    observer.observe(wrap);
    raf = requestAnimationFrame(draw);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, [dotSize, gap, baseColor, activeColor, proximity, speedTrigger, shockRadius, shockStrength, returnDuration]);

  return (
    <div ref={wrapRef} className="absolute inset-0 h-full w-full">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />
    </div>
  );
}
