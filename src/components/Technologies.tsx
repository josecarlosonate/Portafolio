import { Blocks, Code2, Database, Wrench } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { VscAzureDevops } from "react-icons/vsc";
import {
    SiBootstrap,
    SiDocker,
    SiGit,
    SiGraphql,
    SiJavascript,
    SiJenkins,
    SiLaravel,
    SiMongodb,
    SiMysql,
    SiPhp,
    SiPostgresql,
    SiPostman,
    SiReact,
    SiTailwindcss,
    SiTypescript,
} from "react-icons/si";
import type { IconType } from "react-icons";
import type { Language } from "../types/language";
import { TechnologiesTranslations } from "../translations/technologies";

type TechnologiesProps = {
    language: Language;
};

type Technology = {
    name: string;
    icon: IconType;
    color?: string;
    themeAware?: boolean;
};

const groups: {
    key: keyof typeof TechnologiesTranslations.ES.groups;
    icon: IconType;
    items: Technology[];
}[] = [
        {
            key: "backend",
            icon: Code2,
            items: [
                { name: "PHP", icon: SiPhp, color: "#777BB4" },
                { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
                { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
            ],
        },
        {
            key: "frontend",
            icon: Blocks,
            items: [
                { name: "React", icon: SiReact, color: "#61DAFB" },
                { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
                { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
                { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
                { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
            ],
        },
        {
            key: "database",
            icon: Database,
            items: [
                { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
                { name: "MySQL", icon: SiMysql, color: "#4479A1" },
                { name: "SQL", icon: Database, color: "#2563EB" },
                { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            ],
        },
        {
            key: "infrastructure",
            icon: Wrench,
            items: [
                { name: "Docker", icon: SiDocker, color: "#2496ED" },
                { name: "Git", icon: SiGit, color: "#F05032" },
                { name: "GitHub", icon: FaGithub, themeAware: true },
                { name: "Azure DevOps", icon: VscAzureDevops, color: "#0078D7" },
                { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
                { name: "Postman", icon: SiPostman, color: "#FF6C37" },
            ],
        },
    ];

export default function Technologies({ language }: TechnologiesProps) {
    const translations = TechnologiesTranslations[language];

    return (
        <section id="technologies" className="scroll-mt-10 text-foreground">
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        {translations.title}
                    </h2>
                    <p className="mt-3 text-lg leading-8 text-muted">
                        {translations.subtitle}
                    </p>
                </div>

                <div className="mt-7 grid gap-x-16 gap-y-5 md:grid-cols-2 md:gap-y-7 lg:gap-x-24">
                    {groups.map((group) => {
                        const GroupIcon = group.icon;

                        return (
                            <div
                                key={group.key}
                                className="relative pt-4 before:absolute before:left-0 before:top-0 before:h-px before:w-20 before:bg-border-subtle md:pt-5 md:before:w-24"
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className="flex size-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
                                        <GroupIcon className="size-4" aria-hidden />
                                    </span>
                                    <h3 className="text-sm font-bold tracking-wide text-primary">
                                        {translations.groups[group.key]}
                                    </h3>
                                </div>

                                <ul className="mt-3 flex flex-wrap gap-2 md:mt-4 md:gap-2.5">
                                    {group.items.map((technology) => (
                                        <li key={technology.name}>
                                            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-soft px-3 py-2 text-sm font-medium text-foreground shadow-surface transition-transform duration-200 hover:-translate-y-0.5">
                                                <technology.icon
                                                    className={`text-xl ${technology.themeAware ? "text-icon" : ""}`}
                                                    style={technology.themeAware ? undefined : { color: technology.color }}
                                                    aria-hidden
                                                />
                                                {technology.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
