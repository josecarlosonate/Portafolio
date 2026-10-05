import { ArrowRight, BriefcaseBusiness, CircleCheck, CodeXml, UserRound } from "lucide-react";

export default function About() {
    return (
        <section id="about" className="bg-background">
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16">
                <div className="grid rounded-2xl border border-border bg-surface pb-4 shadow-surface md:grid-cols-3">
                    <div className="p-6">
                        <div className="flex items-center gap-3">
                            <UserRound className="size-5 text-primary" />

                            <h2 className="text-lg font-semibold text-foreground">
                                Sobre mí
                            </h2>
                        </div>

                        <p className="mt-5 text-sm leading-7 text-muted">
                            Soy desarrollador PHP Full Stack con más de 5 años de
                            experiencia construyendo y manteniendo aplicaciones web, APIs y
                            sistemas orientados a negocio. Me especializo en PHP y Laravel,
                            con experiencia profesional en React, JavaScript, APIs REST y
                            GraphQL.
                        </p>

                        <button type="button"
                            className="mt-6 inline-flex items-center gap-3 rounded-lg border 
                            border-border bg-surface px-4 py-3 text-sm font-medium text-foreground 
                            transition-colors hover:bg-surface-hover cursor-pointer">
                            Conocer más
                            <ArrowRight className="size-4 text-primary" />
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center gap-3">
                            <BriefcaseBusiness className="size-5 shrink-0 text-primary" />
                            <h2 className="text-lg font-semibold text-foreground">
                                Experiencia destacada
                            </h2>
                        </div>
                        <div className="relative mt-5 border-l border-border pl-6">
                            <div className="relative">
                                <span className="absolute -left-7.25 top-1.5 size-2.5 rounded-full bg-primary" />
                                <p className="text-sm font-medium text-primary">
                                    2026 - Actualidad
                                </p>
                                <p className="mt-1 text-sm font-semibold text-foreground">
                                    Desarrollador de Software Independiente
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
                                    Desarrollador Backend PHP
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
                                    Profesional de Proyectos / Desarrollador PHP
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
                                    Desarrollador Web PHP
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
                                Lo que hago
                            </h2>
                        </div>
                        <div className="mt-5">
                            <div className="flex items-start gap-3">
                                <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                                <p className="text-sm leading-6 text-muted">
                                    Diseño y desarrollo de APIs RESTful y GraphQL
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex items-start gap-3">
                            <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                            <p className="text-sm leading-6 text-muted">
                                Desarrollo backend con PHP y Laravel
                            </p>
                        </div>
                        <div className="mt-4 flex items-start gap-3">
                            <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                            <p className="text-sm leading-6 text-muted">
                                Desarrollo de interfaces con React y TypeScript
                            </p>
                        </div>
                        <div className="mt-4 flex items-start gap-3">
                            <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                            <p className="text-sm leading-6 text-muted">
                                Arquitectura de sistemas y base de datos
                            </p>
                        </div>
                        <div className="mt-4 flex items-start gap-3">
                            <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                            <p className="text-sm leading-6 text-muted">
                                Integración y evolución de proyectos existentes
                            </p>
                        </div>
                        <div className="mt-4 flex items-start gap-3">
                            <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                            <p className="text-sm leading-6 text-muted">
                                Integración de servicios y APIs externas
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}