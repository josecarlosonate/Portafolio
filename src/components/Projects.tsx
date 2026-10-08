import { useEffect, useState } from "react";
import { projects, type Project } from "../../data/projects";
import { ProjectsTranslations } from "../translations/projects"
import type { Language } from "../types/language"
import { SiChartdotjs, SiDocker, SiLaravel, SiMysql, SiPhp, SiPostgresql, SiSwagger, SiTailwindcss } from "react-icons/si";
import type { IconType } from "react-icons";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { TbTemplate } from "react-icons/tb";

type ProjectsProps = {
    language: Language
}

const technologyIcons: Record<string, { icon: IconType; color: string }> = {
    PHP: { icon: SiPhp, color: "#777BB4" },
    Laravel: { icon: SiLaravel, color: "#FF2D20" },
    PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
    Swagger: { icon: SiSwagger, color: "#85EA2D" },
    MySQL: { icon: SiMysql, color: "#4479A1" },
    "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
    Blade: { icon: TbTemplate, color: "#F05340" },
    Docker: { icon: SiDocker, color: "#2496ED" },
    "Chart.js": { icon: SiChartdotjs, color: "#FF6384" },
};

function Projects({ language }: ProjectsProps) {
    const translations = ProjectsTranslations[language];
    const [project, setProject] = useState<Project>(projects[0]);
    const [imageIndex, setImageIndex] = useState(0);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const selectProject = (next: Project) => {
        setProject(next);
        setImageIndex(0);
        setIsDescriptionExpanded(false);
    };

    const scrollPrev = () => emblaApi?.scrollPrev();
    const scrollNext = () => emblaApi?.scrollNext();

    useEffect(() => {
        if (!emblaApi) return;

        const updateButtons = () => {
            setCanScrollPrev(emblaApi.canScrollPrev());
            setCanScrollNext(emblaApi.canScrollNext());
        };
        updateButtons();
        emblaApi.on("select", updateButtons);
        emblaApi.on("reInit", updateButtons);

        return () => {
            emblaApi.off("select", updateButtons);
            emblaApi.off("reInit", updateButtons);
        };
    }, [emblaApi])

    useEffect(() => {
        if (project.images.length < 2) return;

        const interval = setInterval(() => {
            setImageIndex((current) => (current + 1) % project.images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [project.id, project.images.length]);

    return (
        <>
            <section id="projects" className="w-full min-h-screen text-foreground">
                <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 
                    px-6 pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:pt-24">

                    {/* Informacion del proyecto  */}
                    <div className="flex h-full flex-col">

                        <div>
                            <span className="text-sm font-medium uppercase tracking-wider text-primary">
                                {translations.titleLeft}
                            </span>
                            <h3 className="mt-4 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                                {project.title[language]}
                            </h3>
                            <div className="mt-6">
                                <p className={`max-w-xl text-lg leading-8 text-muted 
                                    ${isDescriptionExpanded ? "" : "line-clamp-4 md:line-clamp-none"}`}>
                                    {project.description[language]}
                                </p>
                                <button type="button" onClick={() => setIsDescriptionExpanded((current) => !current)}
                                    className="mt-2 cursor-pointer text-sm font-medium text-primary hover:underline md:hidden">
                                    {isDescriptionExpanded ? translations.description.showLess : translations.description.showMore}
                                </button>
                            </div>
                        </div>

                        <div className="mt-5">
                            <p>
                                <strong className="font-bold text-accent-text">
                                    {translations.subTitleLeft}
                                </strong>
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {project.technologies.map((technology) => {
                                    const technologyData = technologyIcons[technology];
                                    if (!technologyData) return null;
                                    const Icon = technologyData.icon;
                                    return (
                                        <div key={technology} className="flex items-center gap-1.5 rounded-md border border-border bg-surface-soft px-2.5 py-0.5 shadow-md">
                                            <Icon size={17} style={{ color: technologyData.color }} />
                                            <span>{technology}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="pt-3 flex gap-5">
                            <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg border border-border bg-zinc-800 
                                    px-4 py-0.5 font-medium text-white transition-colors hover:bg-zinc-900 dark:border-zinc-600">
                                {translations.btnCode}
                                <FaGithub size={17} />
                            </a>
                            {project.demoUrl && (
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-white 
                                    px-4 py-0.5 font-medium text-zinc-900 transition-colors hover:bg-zinc-100">
                                    {translations.btnView}
                                    <ExternalLink size={16} />
                                </a>
                            )}
                        </div>

                    </div>

                    {/* Imagenes del proyecto  */}
                    <div className="flex h-full flex-col">
                        <span className="text-sm font-medium uppercase tracking-wider text-primary">
                            {translations.titleRight}
                        </span>
                        <div className="mt-5">
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
                                {project.images.map((image, index) => (
                                    <img
                                        key={image}
                                        src={image}
                                        alt={project.title[language]}
                                        className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-in-out 
                                                ${index === imageIndex ? "opacity-100" : "opacity-0"}`}
                                    />
                                ))}
                            </div>
                            <div className="mt-3 flex justify-center gap-1">
                                {project.images.map((_, index) => (
                                    <button key={index} type="button" aria-label={`Imagen ${index + 1}`} onClick={() => setImageIndex(index)}
                                        className="group flex h-8 w-10 cursor-pointer items-center justify-center" >
                                        <span className={`h-2 rounded-full transition-all duration-300 
                                                ${index === imageIndex
                                                ? "w-7 bg-primary"
                                                : "w-3 bg-slate-400 dark:bg-white"}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Listado De Proyectos  */}
                <div className="relative z-10 mx-auto mt-5 max-w-7xl px-6 pt-3">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-3">
                            {projects.map((item, index) => {
                                const isActive = item.id === project.id;
                                return (
                                    <button key={item.id} type="button" onClick={() => selectProject(item)}
                                        className={`group min-h-20 w-56 shrink-0 cursor-pointer border px-3 py-1 text-left transition-colors
                                            ${isActive ? "border-primary bg-primary" : "border-border bg-surface hover:border-primary hover:bg-primary"}`}>
                                        <span className={`text-xs font-bold transition-colors ${isActive ? "text-on-primary" : "text-primary group-hover:text-on-primary"}`}>
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <p className={`mt-1 text-sm font-semibold transition-colors ${isActive ? "text-on-primary" : "text-foreground group-hover:text-on-primary"}`}>
                                            {item.title[language]}
                                        </p>
                                        <p className={`text-xs transition-colors ${isActive ? "text-on-primary/75" : "text-muted group-hover:text-on-primary/75"}`}>
                                            {item.category[language]}
                                        </p>
                                    </button>
                                )
                            })}
                        </div>

                        {canScrollPrev && (
                            <button type="button" aria-label="Anterior" onClick={scrollPrev}
                                className="absolute top-1/2 left-3 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center 
                                    justify-center rounded-full border border-border bg-surface/90 text-primary">
                                <ChevronLeft size={18} />
                            </button>
                        )}
                        {canScrollNext && (
                            <button type="button" aria-label="Siguiente" onClick={scrollNext}
                                className="absolute top-1/2 right-3 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center 
                                    justify-center rounded-full border border-border bg-surface/90 text-primary">
                                <ChevronRight size={18} />
                            </button>
                        )}
                    </div>

                </div>

            </section>
        </>
    )
}

export default Projects