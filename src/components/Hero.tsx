import { BriefcaseBusiness, Download } from "lucide-react";
import { SiPhp, SiLaravel, SiReact, SiTypescript, SiPostgresql, SiGraphql } from "react-icons/si";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import type { Language } from "../types/language";
import { HeroTranslations } from "../translations/hero";

type HeroProps = {
    language: Language
}

const technologies = [
    { name: "PHP", icon: SiPhp, color: "#777BB4" },
    { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
];

function Hero({ language }: HeroProps) {
    const translations = HeroTranslations[language];
    const socialIconClass = "text-3xl text-icon transition-colors hover:text-interactive";

    return (
        <>
            <section id="home" className="w-full min-h-screen text-foreground">
                <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 
                    items-start gap-10 px-6 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pt-24">
                    <div className="flex flex-col items-start">
                        <p className="mb-2 text-xl font-semibold md:text-2xl">
                            {translations.greeting}
                        </p>
                        <h1 className="text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
                            José Carlos Oñate
                        </h1>
                        <h2 className="mt-4 text-xl font-semibold md:text-2xl">
                            PHP / Laravel Developer
                            <span className="text-primary"> | </span>
                            Backend & Full-Stack
                        </h2>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                            {translations.description.intro}{" "}
                            <strong className="font-bold text-accent-text">{translations.description.phpLaravel}</strong>{" "}
                            {translations.description.experience}{" "}
                            <strong className="font-bold text-accent-text">{translations.description.apis}</strong>{" "}
                            {translations.description.integrations}{" "}
                            <strong className="font-bold text-accent-text">{translations.description.reactTypescript}</strong>{" "}
                            {translations.description.combining}{" "}
                            <strong className="font-bold text-accent-text">{translations.description.backendFrontend}</strong>{" "}
                            {translations.description.conclusion}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3 lg:w-max">
                            {technologies.map((technology) => (
                                <div key={technology.name}
                                    className="flex items-center gap-2 rounded-lg border border-border bg-surface-soft px-3 py-2 shadow-md">
                                    <technology.icon className="text-2xl" style={{ color: technology.color }} />
                                    <span>{technology.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a href="#projects" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium 
                                                    text-on-primary transition-colors hover:bg-primary-hover">
                                <BriefcaseBusiness size={18} />
                                {translations.actions.projects}
                            </a>

                            <a href={`/docs/Jose_Onate_CV_${language}.pdf`} download
                                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-hover px-5 py-3 
                                font-medium transition-colors hover:bg-surface-highlight">
                                {translations.actions.downloadCv}
                                <Download size={18} />
                            </a>
                        </div>

                        <div className="mt-6 flex items-center gap-10">
                            <a href="https://github.com/josecarlosonate" target="_blank"
                                rel="noopener noreferrer" aria-label="GitHub">
                                <FaGithub className={socialIconClass} />
                            </a>
                            <a href="https://www.linkedin.com/in/josecarlosonate" target="_blank"
                                rel="noopener noreferrer" aria-label="LinkedIn" >
                                <FaLinkedin className={socialIconClass} />
                            </a>
                            <a href="mailto:ingeniero.josec@gmail.com" aria-label="Email" >
                                <FaEnvelope className={socialIconClass} />
                            </a>
                        </div>

                    </div>

                    <div className="relative mt-8 flex justify-center lg:mt-0">
                        <div className="absolute z-0 h-100 w-100 rounded-full bg-primary/15 blur-3xl" />
                        <img src="/images/jose-onate.png" alt="José Carlos Oñate"
                            className="relative z-9 h-auto w-72 object-contain lg:w-140 lg:max-w-none" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero