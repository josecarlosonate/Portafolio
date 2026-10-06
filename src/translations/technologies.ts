import type { Language } from "../types/language";

type TechnologiesTranslations = {
    title: string;
    subtitle: string;
    groups: {
        backend: string;
        frontend: string;
        database: string;
        infrastructure: string;
    };
};

export const TechnologiesTranslations: Record<Language, TechnologiesTranslations> = {
    ES: {
        title: "Tecnolog\u00edas",
        subtitle: "Las herramientas con las que construyo y mantengo aplicaciones web.",
        groups: {
            backend: "Backend",
            frontend: "Frontend",
            database: "Base de datos",
            infrastructure: "Herramientas",
        },
    },
    EN: {
        title: "Technologies",
        subtitle: "The tools I use to build and maintain web applications.",
        groups: {
            backend: "Backend",
            frontend: "Frontend",
            database: "Databases",
            infrastructure: "Tooling",
        },
    },
};
