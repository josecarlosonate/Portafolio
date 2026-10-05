import type { Language } from "../types/language";

type HeroTranslations = {
    greeting: string;
    role: string;
    description: {
        intro: string;
        phpLaravel: string;
        experience: string;
        apis: string;
        integrations: string;
        reactTypescript: string;
        combining: string;
        backendFrontend: string;
        conclusion: string;
    };
    actions: {
        projects: string;
        downloadCv: string;
    };
};

export const HeroTranslations: Record<Language, HeroTranslations> = {
    ES: {
        greeting: "Hola, soy",
        role: "Desarrollador de software especializado en",
        description: {
            intro: "Desarrollador de software especializado en",
            phpLaravel: "PHP y Laravel",
            experience: "con experiencia construyendo aplicaciones web,",
            apis: "APIs",
            integrations: "e integraciones. Desarrollo interfaces modernas con",
            reactTypescript: "React y TypeScript",
            combining: "combinando",
            backendFrontend: "backend y frontend",
            conclusion: "para crear soluciones completas."
        },
        actions: {
            projects: "Ver mis proyectos",
            downloadCv: "Descargar CV"
        }
    },
    EN: {
        greeting: "Hi, I'm",
        role: "Desarrollador de software especializado en",
        description: {
            intro: "Software developer specialized in",
            phpLaravel: "PHP and Laravel",
            experience: "with experience building web applications,",
            apis: "APIs",
            integrations: "and integrations. I develop modern interfaces with",
            reactTypescript: "React and TypeScript",
            combining: "combining",
            backendFrontend: "backend and frontend",
            conclusion: "to create complete solutions."
        },
        actions: {
            projects: "View my projects",
            downloadCv: "Download CV"
        }
    }
}