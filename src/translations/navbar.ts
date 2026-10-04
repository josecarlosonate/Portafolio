import type { Language } from "../types/language";

type NavbarTranslations = {
    home: string;
    about: string;
    projects: string;
    experience: string;
    technologies: string;
    contact: string;
};

export const NavbarTranslations: Record<Language, NavbarTranslations> = {
    ES: {
        home: "Inicio",
        about: "Sobre mí",
        projects: "Proyectos",
        experience: "Experiencia",
        technologies: "Tecnologías",
        contact: "Contacto",
    },
    EN: {
        home: "Home",
        about: "About me",
        projects: "Projects",
        experience: "Experience",
        technologies: "Technologies",
        contact: "Contact",
    },
}