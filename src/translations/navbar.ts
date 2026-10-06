import type { Language } from "../types/language";

type NavbarTranslations = {
    home: string;
    about: string;
    projects: string;
    technologies: string;
    contact: string;
};

export const NavbarTranslations: Record<Language, NavbarTranslations> = {
    ES: {
        home: "Inicio",
        about: "Sobre mí",
        projects: "Proyectos",
        technologies: "Tecnologías",
        contact: "Contacto",
    },
    EN: {
        home: "Home",
        about: "About me",
        projects: "Projects",
        technologies: "Technologies",
        contact: "Contact",
    },
}