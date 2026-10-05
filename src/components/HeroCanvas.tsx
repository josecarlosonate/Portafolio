import { useEffect, useRef } from "react";
import type { Theme } from "../types/theme";

type HeroCanvasProps = {
    theme: Theme;
};

type Particle = {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    radius: number;
};

type Mouse = {
    x: number;
    y: number;
};

// Configuración visual y física del grid.
const GRID_SPACING = 40;
const PARTICLE_RADIUS = 3;
const MOUSE_RADIUS = 150;
const REPULSION_FORCE = 1.5;
const RETURN_FORCE = 0.03;
const FRICTION = 0.9;

function HeroCanvas({ theme }: HeroCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles = createParticles(canvas.clientWidth, canvas.clientHeight);
        let mouse: Mouse | null = null;
        let animationFrameId: number;

        const particleColor =
            theme === "dark"
                ? "rgba(96, 165, 250, 0.14)"
                : "rgba(37, 99, 235, 0.10)";

        // Convierte la posición del mouse de coordenadas de pantalla a coordenadas del canvas.
        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();

            mouse = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
        };

        // Al salir del canvas dejamos de aplicar la fuerza de repulsión.
        const handleMouseLeave = () => {
            mouse = null;
        };

        // Actualiza tamaño interno del canvas y reconstruye el grid.
        const resizeCanvas = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            particles = createParticles(canvas.width, canvas.height);
        };

        // Calcula repulsión, retorno al origen y fricción de cada partícula.
        const updateParticles = () => {
            particles.forEach((particle) => {
                applyMouseRepulsion(particle, mouse);
                applyReturnForce(particle);
                moveParticle(particle);
            });
        };

        // Dibuja el estado actual de todas las partículas.
        const drawParticles = () => {
            ctx.fillStyle = particleColor;

            particles.forEach((particle) => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        // Loop principal: limpiar → actualizar física → dibujar.
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            updateParticles();
            drawParticles();
            animationFrameId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        animate();

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("resize", resizeCanvas);

        // Limpieza al desmontar el componente o cambiar el theme.
        return () => {
            cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [theme]);

    return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

// Genera una cuadrícula regular y guarda la posición original de cada punto.
function createParticles(width: number, height: number): Particle[] {
    const particles: Particle[] = [];

    for (let y = 0; y < height; y += GRID_SPACING) {
        for (let x = 0; x < width; x += GRID_SPACING) {
            particles.push({
                x,
                y,
                baseX: x,
                baseY: y,
                vx: 0,
                vy: 0,
                radius: PARTICLE_RADIUS,
            });
        }
    }

    return particles;
}

// Empuja la partícula en dirección opuesta al mouse cuando entra en su radio de influencia.
function applyMouseRepulsion(particle: Particle, mouse: Mouse | null) {
    if (!mouse) return;

    const dx = particle.x - mouse.x;
    const dy = particle.y - mouse.y;
    const distance = Math.hypot(dx, dy);

    if (distance === 0 || distance >= MOUSE_RADIUS) return;

    const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;

    particle.vx += (dx / distance) * force * REPULSION_FORCE;
    particle.vy += (dy / distance) * force * REPULSION_FORCE;
}

// Actúa como un resorte que lleva la partícula de vuelta a su posición original.
function applyReturnForce(particle: Particle) {
    particle.vx += (particle.baseX - particle.x) * RETURN_FORCE;
    particle.vy += (particle.baseY - particle.y) * RETURN_FORCE;
}

// Reduce gradualmente la velocidad y aplica el movimiento a la posición actual.
function moveParticle(particle: Particle) {
    particle.vx *= FRICTION;
    particle.vy *= FRICTION;
    particle.x += particle.vx;
    particle.y += particle.vy;
}

export default HeroCanvas;
