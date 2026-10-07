import { useState } from "react";
import { Code2, ExternalLink } from "lucide-react";
import type { Language } from "../types/language";
import type { Theme } from "../types/theme";
import type { Project } from "../types/project";
import { ProjectsTranslations } from "../translations/projects";
import projectsData from "../data/projects.json" with { type: "json" };

type ProjectsProps = {
    language: Language;
    theme: Theme;
};

const projects = (projectsData as Project[]).slice().sort((a, b) => a.order - b.order);

function pad(value: number) {
    return String(value).padStart(2, "0");
}

export default function Projects({ language, theme }: ProjectsProps) {
    const translations = ProjectsTranslations[language];
    const [activeIndex, setActiveIndex] = useState(0);
    const project = projects[activeIndex];

    return (
        <section id="projects" className="scroll-mt-10 text-foreground">
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        {translations.title}
                    </h2>
                    <p className="mt-3 text-lg leading-8 text-muted">{translations.subtitle}</p>
                </div>

                {projects.length === 0 && (
                    <p className="mt-10 text-sm text-muted">{translations.empty}</p>
                )}

                {project && (
                    <>
                        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
                            <div>
                                <h3 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
                                    {project.title[language]}
                                </h3>

                                <p className="mt-8 text-xs font-bold tracking-[0.16em] text-primary uppercase">
                                    {translations.challenge}
                                </p>
                                <p className="mt-2 max-w-xl text-sm leading-7 text-muted md:text-base">
                                    {project.challenge[language]}
                                </p>

                                <p className="mt-6 text-xs font-bold tracking-[0.16em] text-primary uppercase">
                                    {translations.solution}
                                </p>
                                <p className="mt-2 max-w-xl text-sm leading-7 text-muted md:text-base">
                                    {project.solution[language]}
                                </p>

                                <ul className="mt-6 flex flex-wrap gap-2">
                                    {project.stack.map((item) => (
                                        <li key={item}>
                                            <span className="rounded-full border border-border bg-surface-soft px-3 py-1 text-xs font-medium text-muted">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    {project.repoUrl && (
                                        <a
                                            href={project.repoUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-on-primary transition-colors hover:bg-primary-hover"
                                        >
                                            <Code2 className="size-4" aria-hidden />
                                            {translations.code}
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-surface-hover"
                                        >
                                            <ExternalLink className="size-4" aria-hidden />
                                            {translations.viewProject}
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-3xl border border-primary/40 bg-surface p-3 shadow-surface md:p-4">
                                <img
                                    src={theme === "dark" && project.imageDark ? project.imageDark : project.image}
                                    alt={project.title[language]}
                                    className="aspect-video w-full rounded-2xl border border-border-subtle object-cover object-top"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between gap-4 text-sm text-muted">
                            <p className="truncate">{project.title[language]}</p>
                            <p className="shrink-0 tabular-nums">
                                {activeIndex + 1}/{projects.length}
                            </p>
                        </div>
                        <div className="mt-3 h-1 overflow-hidden rounded-full bg-surface-highlight">
                            <div
                                className="h-full rounded-full bg-primary transition-all duration-300"
                                style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                            />
                        </div>

                        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                            {projects.map((item, index) => {
                                const isActive = index === activeIndex;

                                return (
                                    <button
                                        key={item.slug}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        aria-current={isActive}
                                        className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                                            isActive
                                                ? "border-primary bg-primary-soft"
                                                : "border-border-subtle bg-surface hover:bg-surface-hover"
                                        }`}
                                    >
                                        <span className="text-xs font-bold text-primary">{pad(index + 1)}</span>
                                        <span className="mt-1 block text-sm font-semibold leading-5 text-foreground">
                                            {item.title[language]}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
