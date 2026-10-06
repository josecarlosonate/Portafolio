import { Database } from "lucide-react";
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

const groups: { key: keyof typeof TechnologiesTranslations.ES.groups; items: Technology[] }[] = [
    {
        key: "backend",
        items: [
            { name: "PHP", icon: SiPhp, color: "#777BB4" },
            { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
            { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
        ],
    },
    {
        key: "frontend",
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
        items: [
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
            { name: "MySQL", icon: SiMysql, color: "#4479A1" },
            { name: "SQL", icon: Database, color: "#2563EB" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        ],
    },
    {
        key: "infrastructure",
        items: [
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "GitHub", icon: FaGithub, themeAware: true },
            { name: "Azure DevOps", icon: VscAzureDevops, color: "#0078D7" },
            { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
        ],
    },
];

export default function Technologies({ language }: TechnologiesProps) {
    const translations = TechnologiesTranslations[language];

    return (
        <section id="technologies" className="scroll-mt-20 text-foreground">
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    {translations.title}
                </h2>
                <p className="mt-3 max-w-2xl text-lg text-muted">
                    {translations.subtitle}
                </p>

                <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
                    {groups.map((group) => (
                        <div key={group.key}>
                            <h3 className="text-sm font-semibold tracking-wide text-primary">
                                {translations.groups[group.key]}
                            </h3>
                            <ul className="mt-4 flex flex-wrap gap-3">
                                {group.items.map((technology) => (
                                    <li key={technology.name}>
                                        <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-soft px-3 py-2 text-foreground shadow-md">
                                            <technology.icon
                                                className={`text-2xl ${technology.themeAware ? "text-icon" : ""}`}
                                                style={technology.themeAware ? undefined : { color: technology.color }}
                                                aria-hidden
                                            />
                                            {technology.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
