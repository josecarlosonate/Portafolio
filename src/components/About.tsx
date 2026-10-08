import { ArrowRight, BriefcaseBusiness, CircleCheck, CodeXml, UserRound } from "lucide-react";
import type { Language } from "../types/language";
import { AboutTranslations } from "../translations/about";


type AboutProps = {
    language: Language
}

export default function About({ language }: AboutProps) {
    const translations = AboutTranslations[language];

    return (
        <section id="about" className="scroll-mt-15">
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16">
                <div className="grid rounded-2xl border border-border bg-surface pb-4 shadow-surface md:grid-cols-3 
                    transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.03] 
                    hover:border-card-border hover:ring-1 hover:ring-card-border">

                    <div className="p-6">
                        <div className="flex items-center gap-3">
                            <UserRound className="size-5 text-primary" />
                            <h2 className="text-lg font-semibold text-foreground">
                                {translations.title}
                            </h2>
                        </div>
                        <p className="mt-5 text-sm leading-7 text-muted">
                            {translations.description}
                        </p>
                        <a href="#projects"
                            className="mt-6 inline-flex items-center gap-3 rounded-lg border 
                            border-border bg-surface px-4 py-3 text-sm font-medium text-foreground 
                            transition-colors hover:bg-surface-hover cursor-pointer">
                            {translations.action}
                            <ArrowRight className="size-4 text-primary" />
                        </a>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center gap-3">
                            <BriefcaseBusiness className="size-5 shrink-0 text-primary" />
                            <h2 className="text-lg font-semibold text-foreground">
                                {translations.experience.title}
                            </h2>
                        </div>
                        <div className="relative mt-5 border-l border-border pl-6">
                            <div className="relative">
                                <span className="absolute -left-7.25 top-1.5 size-2.5 rounded-full bg-primary" />
                                <p className="text-sm font-medium text-primary">
                                    2026 - {translations.experience.present}
                                </p>
                                <p className="mt-1 text-sm font-semibold text-foreground">
                                    {translations.experience.jobs.freelance}
                                </p>
                                <p className="text-sm text-muted">
                                    Freelance
                                </p>
                            </div>
                            <div className="relative mt-5">
                                <span className="absolute -left-7.25 top-1.5 size-2.5 rounded-full bg-primary" />
                                <p className="text-sm font-medium text-primary">
                                    2022 - 2023
                                </p>
                                <p className="mt-1 text-sm font-semibold text-foreground">
                                    {translations.experience.jobs.cognox}
                                </p>
                                <p className="text-sm text-muted">
                                    COGNOX SAS
                                </p>
                            </div>
                            <div className="relative mt-5">
                                <span className="absolute -left-7.25 top-1.5 size-2.5 rounded-full bg-primary" />
                                <p className="text-sm font-medium text-primary">
                                    2021 - 2022
                                </p>
                                <p className="mt-1 text-sm font-semibold text-foreground">
                                    {translations.experience.jobs.gx7}
                                </p>
                                <p className="text-sm text-muted">
                                    GX7 INNOVATION SAS
                                </p>
                            </div>
                            <div className="relative mt-5">
                                <span className="absolute -left-7.25 top-1.5 size-2.5 rounded-full bg-primary" />
                                <p className="text-sm font-medium text-primary">
                                    2019 - 2021
                                </p>
                                <p className="mt-1 text-sm font-semibold text-foreground">
                                    {translations.experience.jobs.elon}
                                </p>
                                <p className="text-sm text-muted">
                                    ELON SAS
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center gap-3">
                            <CodeXml className="size-5 shrink-0 text-primary" />
                            <h2 className="text-lg font-semibold text-foreground">
                                {translations.services.title}
                            </h2>
                        </div>
                        {translations.services.items.map((item, _index) => (
                            <div key={_index} className="mt-5">
                                <div className="flex items-start gap-3">
                                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                                    <p className="text-sm leading-6 text-muted">
                                        {item}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}