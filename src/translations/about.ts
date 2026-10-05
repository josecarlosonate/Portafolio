import type { Language } from "../types/language";

type AboutTranslations = {
    title: string;
    description: string;
    action: string;
    experience: {
        title: string;
        present: string;
        jobs: {
            freelance: string;
            cognox: string;
            gx7: string;
            elon: string;
        };
    };
    services: {
        title: string;
        items: string[];
    };
}

export const AboutTranslations: Record<Language, AboutTranslations> = {
    ES: {
        title: "Sobre mí",
        description:
            "Soy desarrollador PHP Full Stack con más de 5 años de experiencia construyendo y manteniendo aplicaciones web, APIs y sistemas orientados a negocio. Me especializo en PHP y Laravel, con experiencia profesional en React, TypeScript, APIs REST y GraphQL.",
        action: "Conocer más",
        experience: {
            title: "Experiencia destacada",
            present: "Actualidad",
            jobs: {
                freelance: "Desarrollador de Software Independiente",
                cognox: "Desarrollador Backend PHP",
                gx7: "Profesional de Proyectos / Desarrollador PHP",
                elon: "Desarrollador Web PHP",
            },
        },
        services: {
            title: "Lo que hago",
            items: [
                "Diseño y desarrollo de APIs RESTful y GraphQL",
                "Desarrollo backend con PHP y Laravel",
                "Desarrollo de interfaces con React y TypeScript",
                "Consultas masivas y procesamiento de datos",
                "Integración y evolución de proyectos existentes",
                "Integración de servicios y APIs externas",
            ],
        },
    },

    EN: {
        title: "About me",
        description:
            "I'm a PHP Full Stack Developer with over 5 years of experience building and maintaining web applications, APIs, and business-oriented systems. I specialize in PHP and Laravel, with professional experience in React, TypeScript, REST APIs, and GraphQL.",
        action: "Learn more",
        experience: {
            title: "Highlighted experience",
            present: "Present",
            jobs: {
                freelance: "Independent Software Developer",
                cognox: "PHP Backend Developer",
                gx7: "Project Professional / PHP Developer",
                elon: "PHP Web Developer",
            },
        },
        services: {
            title: "What I do",
            items: [
                "Design and development of RESTful and GraphQL APIs",
                "Backend development with PHP and Laravel",
                "Interface development with React and TypeScript",
                "Large-scale database queries and data processing",
                "Integration and evolution of existing projects",
                "Integration of external services and APIs",
            ],
        },
    },
};