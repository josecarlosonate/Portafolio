import type { Language } from "../types/language";

type ProjectsTranslation = {
    titleLeft: string;
    titleRight: string;
    description: {
        showMore: string;
        showLess: string;
    };
    subTitleLeft: string;
    btnCode: string;
    btnView: string;
};

export const ProjectsTranslations: Record<Language, ProjectsTranslation> = {
    ES: {
        titleLeft: "PROYECTO DESTACADO",
        titleRight: "GALERIA",
        description: {
            showMore: "Ver más",
            showLess: "Ver menos",
        },
        subTitleLeft: "Tecnologías principales",
        btnCode: "Codigo",
        btnView: "Ver Proyecto"
    },
    EN: {
        titleLeft: "FEATURED PROJECT",
        titleRight: "GALERY",
        description: {
            showMore: "Show more",
            showLess: "Show less",
        },
        subTitleLeft: "Core technologies",
        btnCode: "Code",
        btnView: "View Project"
    }
}