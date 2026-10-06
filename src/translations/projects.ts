import type { Language } from "../types/language";

type ProjectsTranslation = {
    title: string;
    action: string;
};

export const ProjectsTranslations: Record<Language, ProjectsTranslation> = {
    ES: {
        title: "Proyectos destacados",
        action: "Ver todos los proyectos",
    },
    EN: {
        title: "Featured projects",
        action: "View all projects",
    }
}