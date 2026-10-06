import type { Language } from "../types/language";

type TechnologiesTranslations = {
    title: string;
    groups: {
        backend: string;
        frontend: string;
        database: string;
        infrastructure: string;
    };
};

export const TechnologiesTranslations: Record<Language, TechnologiesTranslations> = {
    ES: {
        title: "Tecnologías",
        groups: {
            backend: "Backend",
            frontend: "Frontend",
            database: "Base de datos",
            infrastructure: "Infraestructura y herramientas",
        },
    },
    EN: {
        title: "Technologies",
        groups: {
            backend: "Backend",
            frontend: "Frontend",
            database: "Databases",
            infrastructure: "Infrastructure and tools",
        },
    },
};