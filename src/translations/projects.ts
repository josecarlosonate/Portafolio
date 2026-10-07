import type { Language } from "../types/language";

type ProjectsTranslation = {
    title: string;
    subtitle: string;
    challenge: string;
    solution: string;
    code: string;
    viewProject: string;
    empty: string;
    error: string;
    loading: string;
};

export const ProjectsTranslations: Record<Language, ProjectsTranslation> = {
    ES: {
        title: "Proyectos",
        subtitle: "Casos reales, del problema a la solución.",
        challenge: "El desafío",
        solution: "La solución",
        code: "Código",
        viewProject: "Ver proyecto",
        empty: "Todavía no hay proyectos publicados.",
        error: "No se pudieron cargar los proyectos.",
        loading: "Cargando proyectos",
    },
    EN: {
        title: "Projects",
        subtitle: "Real cases, from the problem to the solution.",
        challenge: "The challenge",
        solution: "The solution",
        code: "Code",
        viewProject: "View project",
        empty: "There are no published projects yet.",
        error: "Projects could not be loaded.",
        loading: "Loading projects",
    },
};
