import { useEffect, useRef } from "react";
import type { Theme } from "../types/theme";

type HeroCanvasProps = {
    theme: Theme
}

type Particle = {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    radius: number;
}

type Mouse = {
    x: number;
    y: number;
};

function HeroCanvas({ theme }: HeroCanvasProps) {
    // 1. Creamos la referencia apuntando al elemento Canvas
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        // 2. Verificamos que el canvas realmente exista en el DOM
        const canvas = canvasRef.current;
        if (!canvas) return;

        // 3. Obtenemos el contexto de dibujo (2D en este caso)
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // capturar posicion del mouse
        let mouse: Mouse | null = null;
        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
        };
        const handleMouseLeave = () => {
            mouse = null;
        };

        let particles: Particle[] = []
        const particleColor = theme === "dark" ? "rgba(96, 165, 250, 0.14)" : "rgba(29, 78, 216, 0.12)";

        const drawParticles = () => {
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();
            });
        };

        const updateParticles = () => {
            const mouseRadius = 150;
            const repulsionForce = 1.5;
            const returnForce = 0.03;
            const friction = 0.90;

            particles.forEach((particle) => {
                if (mouse) {
                    const dx = particle.x - mouse.x;
                    const dy = particle.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouseRadius && distance > 0) {
                        const force = (mouseRadius - distance) / mouseRadius;

                        const directionX = dx / distance;
                        const directionY = dy / distance;

                        particle.vx += directionX * force * repulsionForce;
                        particle.vy += directionY * force * repulsionForce;
                    }
                }

                // Fuerza que hace regresar la partícula a su posición original
                const returnX = particle.baseX - particle.x;
                const returnY = particle.baseY - particle.y;

                particle.vx += returnX * returnForce;
                particle.vy += returnY * returnForce;

                // Fricción para evitar que oscile indefinidamente
                particle.vx *= friction;
                particle.vy *= friction;

                // Aplicamos la velocidad a la posición
                particle.x += particle.vx;
                particle.y += particle.vy;
            });
        };

        let animationFrameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            updateParticles();

            // Dibujar en pantalla
            drawParticles();

            animationFrameId = requestAnimationFrame(animate);
        };

        const resizeCanvas = () => {
            const height = canvas.clientHeight;
            const width = canvas.clientWidth;
            canvas.width = width
            canvas.height = height
            // Crear grid de particulas
            particles = createParticles(canvas.width, canvas.height);
        }

        resizeCanvas();
        animate();
        //
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        // Escuchar cuando el usuario cambia el tamaño de la ventana
        window.addEventListener("resize", resizeCanvas);

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener("resize", resizeCanvas)
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [theme])

    return (
        <>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        </>
    )
}

function createParticles(width: number, height: number): Particle[] {
    const particles: Particle[] = [];
    const spacing = 40;

    for (let y = 0; y < height; y += spacing) {
        for (let x = 0; x < width; x += spacing) {
            particles.push({
                x: x,
                y: y,
                baseX: x,
                baseY: y,
                vx: 0,
                vy: 0,
                radius: 3
            });
        }
    }

    return particles;
}

export default HeroCanvas