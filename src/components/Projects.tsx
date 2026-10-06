import { ArrowRight, FolderKanban } from "lucide-react";
import { ProjectsTranslations } from "../translations/projects"
import type { Language } from "../types/language"

type ProjectsProps = {
    language: Language
}

function Projects({ language }: ProjectsProps) {
    const translations = ProjectsTranslations[language];
    const array = Array.from({ length: 5 });

    return (
        <>
            <section id="projects" className="w-full min-h-screen text-foreground">
                <div className="relative z-10 mx-auto w-full px-6 py-16">

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FolderKanban className="size-5 text-primary" />
                            <h2 className="text-xl font-bold text-foreground">
                                {translations.title}
                            </h2>
                        </div>
                        <button type="button"
                            className="flex items-center gap-2 text-sm font-bold text-primary cursor-pointer">
                            {translations.action}
                            <ArrowRight className="size-4 text-primary" />
                        </button>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-5">
                        {array.map(() => (
                            <article
                                className="flex w-72.5 min-h-125 flex-col overflow-hidden
                                    rounded-2xl border border-border bg-surface shadow-surface"
                            >
                                <div className="p-3">
                                    <div className="h-50 overflow-hidden rounded-xl border border-border">
                                        <img
                                            src="/images/projects/stockcore.png"
                                            alt="StockCore API documentation"
                                            className="h-full w-full object-cover object-top"
                                        />
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