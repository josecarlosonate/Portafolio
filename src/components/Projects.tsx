import { ArrowRight, BookOpen, Code2, ExternalLink, FolderKanban } from "lucide-react";
import { ProjectsTranslations } from "../translations/projects"
import type { Language } from "../types/language"

type ProjectsProps = {
    language: Language
}

function Projects({ language }: ProjectsProps) {
    const translations = ProjectsTranslations[language];
    const array = Array.from({ length: 3 });

    return (
        <>
            <section id="projects" className="w-full min-h-screen text-foreground">
                <div className="relative z-10 mx-auto w-full px-6 py-16">

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <FolderKanban className="size-5 shrink-0 text-primary" />
                            <h2 className="text-xl font-bold text-foreground">
                                {translations.title}
                            </h2>
                        </div>
                        <button
                            type="button"
                            className="flex shrink-0 items-center gap-2 text-sm font-bold text-primary cursor-pointer"
                        >
                            <span className="hidden sm:inline">{translations.action}</span>
                            <span className="sm:hidden">Ver más</span>
                            <ArrowRight className="size-4" />
                        </button>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {array.map((_, index) => (
                            <article
                                key={index}
                                className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-border
                                    bg-background shadow-surface transition-all duration-300 ease-out
                                    hover:-translate-y-1.5 hover:border-primary
                                    hover:shadow-[0_12px_32px_rgb(59_130_246_/_0.18)]"
                            >
                                <div className="p-3 pb-0">
                                    <div className="aspect-video overflow-hidden rounded-lg border border-border">
                                        <img
                                            src="/images/projects/stockcore.png"
                                            alt="StockCore API documentation"
                                            className="h-full w-full object-cover object-top"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col p-5">
                                    <h3 className="text-lg font-bold text-foreground">
                                        StockCore
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-muted">
                                        API REST para gestionar inventario, ventas y movimientos de stock
                                        con operaciones seguras y control de concurrencia.
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="rounded-full border border-border bg-surface-soft px-3 py-1 text-xs font-medium text-muted">
                                            Laravel
                                        </span>
                                        <span className="rounded-full border border-border bg-surface-soft px-3 py-1 text-xs font-medium text-muted">
                                            PostgreSQL
                                        </span>
                                        <span className="rounded-full border border-border bg-surface-soft px-3 py-1 text-xs font-medium text-muted">
                                            REST API
                                        </span>
                                    </div>

                                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
                                        <a
                                            href="#"
                                            className="flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
                                        >
                                            <Code2 className="size-4" />
                                            Código
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
                                        >
                                            <ExternalLink className="size-4" />
                                            Demo
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
                                        >
                                            <BookOpen className="size-4" />
                                            Docs
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                </div>
            </section>
        </>
    )
}

export default Projects