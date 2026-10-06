import { Blocks, Database } from "lucide-react";
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

const groups: { key: "backend" | "frontend" | "database" | "infrastructure"; items: Technology[] }[] = [
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
        <section id="technologies" className="w-full">
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16">
                <div className="flex items-center gap-3">
                    <Blocks className="size-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground md:text-2xl">{translations.title}</h2>
                </div>

                <div className="mt-8 flex flex-col gap-8">
                    {groups.map((group) => (
                        <div key={group.key} className="grid gap-4 sm:grid-cols-[13rem_1fr] sm:items-center">
                            <h3 className="text-lg text-muted">
                                {translations.groups[group.key]}
                            </h3>
                            <ul className="flex flex-wrap gap-3">
                                {group.items.map((technology) => (
                                    <li
                                        key={technology.name}
                                        className="flex items-center gap-2 rounded-lg border border-border bg-surface-soft px-3 py-2 shadow-md"
                                    >
                                        <technology.icon
                                            className={`text-2xl ${technology.themeAware ? "text-icon" : ""}`}
                                            style={technology.themeAware ? undefined : { color: technology.color }}
                                            aria-hidden
                                        />
                                        <span>{technology.name}</span>
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
