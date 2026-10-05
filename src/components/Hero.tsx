import { BriefcaseBusiness, Download } from "lucide-react";
import type { Theme } from "../types/theme";
import { SiPhp, SiLaravel, SiReact, SiTypescript, SiPostgresql, SiGraphql } from "react-icons/si";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

type HeroProps = {
    theme: Theme
}

const technologies = [
    { name: "PHP", icon: SiPhp, color: "#777BB4" },
    { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
];

function Hero({ theme }: HeroProps) {
    const highlightText = theme === "dark"
        ? "font-bold text-blue-400"
        : "font-bold text-slate-600";
    const socialIconClass = theme === "dark"
        ? "text-3xl text-slate-200 transition-colors hover:text-blue-400"
        : "text-3xl text-slate-700 transition-colors hover:text-blue-600";

    return (
        <>
            <section id="home" className={`relative w-full min-h-screen 
                ${theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-950"}`}
            >
                <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-start gap-10 px-6 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pt-24">
                    <div className="flex flex-col items-start">
                        <p className="mb-2 text-xl font-semibold md:text-2xl">
                            Hola, soy
                        </p>
                        <h1 className="text-4xl font-bold text-blue-600 md:text-5xl lg:text-6xl">
                            José Carlos Oñate
                        </h1>
                        <h2 className="mt-4 text-xl font-semibold md:text-2xl">
                            PHP / Laravel Developer
                            <span className="text-blue-600"> | </span>
                            Backend & Full-Stack
                        </h2>
                        <p className={`mt-5 max-w-xl text-lg leading-relaxed 
                            ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}
                        >
                            Desarrollador de software especializado en{" "}
                            <strong className={highlightText}>PHP y Laravel</strong>,
                            con experiencia construyendo aplicaciones web,{" "}
                            <strong className={highlightText}>APIs</strong> e integraciones.
                            Desarrollo interfaces modernas con{" "}
                            <strong className={highlightText}>React y TypeScript</strong>,
                            combinando{" "}
                            <strong className={highlightText}>backend y frontend</strong>{" "}
                            para crear soluciones completas.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3 lg:w-max">
                            {technologies.map((technology) => (
                                <div key={technology.name} className={`flex items-center gap-2 rounded-lg border px-3 py-2 
                                    ${theme === "dark"
                                        ? "border-slate-700 bg-slate-900/60 shadow-md shadow-blue-400/10"
                                        : "border-slate-300 bg-slate-50 shadow-md"
                                    }`}
                                >
                                    <technology.icon className="text-2xl" style={{ color: technology.color }} />
                                    <span>{technology.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a href="#projects"
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white 
                                transition-colors hover:bg-blue-700"
                            >
                                <BriefcaseBusiness size={18} />
                                Ver mis proyectos
                            </a>
                            <a href="/cv-jose-carlos-onate.pdf"
                                download
                                className={`inline-flex items-center gap-2 rounded-lg border px-5 py-3 font-medium transition-colors 
                                    ${theme === "dark"
                                        ? "border-slate-700 hover:bg-slate-800"
                                        : "border-slate-300 hover:bg-slate-100"
                                    }`}
                            >
                                Descargar CV
                                <Download size={18} />
                            </a>
                        </div>

                        <div className="mt-6 flex items-center gap-10">
                            <a href="https://github.com/josecarlosonate" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <FaGithub className={socialIconClass} />
                            </a>
                            <a href="https://www.linkedin.com/in/josecarlosonate" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" >
                                <FaLinkedin className={socialIconClass} />
                            </a>
                            <a href="mailto:TU_CORREO" aria-label="Email" >
                                <FaEnvelope className={socialIconClass} />
                            </a>
                        </div>

                    </div>
                    <div className="relative mt-8 flex justify-center lg:mt-0">
                        <div className="absolute z-0 h-100 w-100 rounded-full bg-blue-500/15 blur-3xl" />
                        <img src="/images/jose-onate.png"
                            alt="José Carlos Oñate" className="relative z-9 h-auto w-72 object-contain lg:w-140 lg:max-w-none" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero