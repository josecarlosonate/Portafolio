import type { Language } from "../types/language"

type ContactTranslations = {
    title: string,
    highlight: string,
    description: string,
    contact: {
        email: string,
        linkedin: {
            title: string,
            description: string,
        },
        github: {
            title: string,
            description: string,
        },
        whatsapp: {
            title: string,
            description: string,
        },
        availability: string,
    },
    form: {
        name: {
            label: string,
            placeholder: string
        },
        email: {
            label: string,
            placeholder: string
        },
        message: {
            label: string,
            placeholder: string
        },
        submit: string,
        submitting: string,
        errors: {
            name: {
                minLength: string,
            },
            email: {
                invalid: string,
            },
            message: {
                minLength: string,
                maxLength: string,
            }
        }
        success: string;
        error: string;
    }
}


export const ContactTranslations: Record<Language, ContactTranslations> = {
    ES: {
        title: "¿Tienes un proyecto en mente?",
        highlight: "Hablemos.",
        description: "Me interesa construir software, APIs e integraciones que resuelvan problemas reales y aporten valor.",
        contact: {
            email: "Email",
            linkedin: {
                title: "LinkedIn",
                description: "Conectemos profesionalmente",
            },
            github: {
                title: "GitHub",
                description: "Explora mis repositorios",
            },
            whatsapp: {
                title: "@onate338",
                description: "Escríbeme directamente",
            },
            availability: "Disponible para proyectos freelance",
        },
        form: {
            name: {
                label: "Nombre",
                placeholder: "Tu nombre"
            },
            email: {
                label: "Email",
                placeholder: "tu@email.com"
            },
            message: {
                label: "Mensaje",
                placeholder: "Tu mensaje..."
            },
            submit: "Enviar mensaje",
            submitting: "Enviando...",
            errors: {
                name: {
                    minLength: "El nombre debe tener al menos 2 caracteres.",
                },
                email: {
                    invalid: "Por favor, ingresa un correo electrónico válido.",
                },
                message: {
                    minLength: "El mensaje debe tener al menos 10 caracteres.",
                    maxLength: "El mensaje no puede superar los 2000 caracteres.",
                },
            },
            success: "Mensaje enviado correctamente. Te responderé lo antes posible.",
            error: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
        }
    },
    EN: {
        title: "Have a project in mind?",
        highlight: "Let's talk.",
        description: "I'm interested in building software, APIs, and integrations that solve real-world problems and deliver value.",
        contact: {
            email: "Email",
            linkedin: {
                title: "LinkedIn",
                description: "Let's connect professionally",
            },
            github: {
                title: "GitHub",
                description: "Explore my repositories",
            },
            whatsapp: {
                title: "@onate338",
                description: "Message me directly",
            },
            availability: "Available for freelance projects",
        },
        form: {
            name: {
                label: "Name",
                placeholder: "Your name"
            },
            email: {
                label: "Email",
                placeholder: "you@email.com"
            },
            message: {
                "label": "Message",
                placeholder: "Your message..."
            },
            submit: "Send message",
            submitting: "Sending...",
            errors: {
                name: {
                    minLength: "Name must be at least 2 characters long.",
                },
                email: {
                    invalid: "Please enter a valid email address.",
                },
                message: {
                    minLength: "Message must be at least 10 characters long.",
                    maxLength: "Message cannot exceed 2000 characters.",
                },
            },
            success: "Message sent successfully. I'll get back to you as soon as possible.",
            error: "The message could not be sent. Please try again.",
        }
    }
}