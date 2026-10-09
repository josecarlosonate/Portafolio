export type Project = {
    id: string;
    order: number;
    category: {
        ES: string;
        EN: string;
    }
    title: {
        ES: string;
        EN: string;
    };
    description: {
        ES: string;
        EN: string;
    };
    technologies: string[];
    repositoryUrl: string;
    demoUrl?: string;
    images: string[];
};

export const projects: Project[] = [
    {
        id: "appbank",
        order: 1,
        category: {
            ES: "Banca digital",
            EN: "Digital banking",
        },
        title: {
            ES: "AppBank",
            EN: "AppBank",
        },
        description: {
            ES: "Aplicación de banca digital simulada construida en PHP nativo con arquitectura MVC. Permite autenticarse, administrar varias cuentas, inscribir destinatarios, realizar transferencias y consultar el historial y el resumen mensual de movimientos, con validación de propiedad, controles de seguridad y operaciones atómicas en MySQL.",
            EN: "Simulated digital banking application built with native PHP and an MVC architecture. It lets customers authenticate, manage multiple accounts, register third-party recipients, make transfers, and review transaction history and monthly summaries, with ownership checks, security controls, and atomic MySQL operations.",
        },
        technologies: ["PHP", "MySQL", "Docker", "Chart.js"],
        repositoryUrl: "https://github.com/josecarlosonate/AppBank",
        demoUrl: "",
        images: [
            "/images/projects/appbank/index.png",
            "/images/projects/appbank/login.png",
            "/images/projects/appbank/dashboard.png",
            "/images/projects/appbank/accounts.png",
            "/images/projects/appbank/transfers.png",
            "/images/projects/appbank/movements.png",
        ],
    },
    {
        id: "stockcore",
        order: 2,
        category: {
            ES: "Gestion De Inventario",
            EN: "Inventory Management",
        },
        title: {
            ES: "StockCore",
            EN: "StockCore",
        },
        description: {
            ES: "StockCore es una API REST para la gestión de inventario, diseñada para administrar productos, categorías, proveedores, clientes, movimientos de stock y órdenes de venta. Desarrollada con Laravel 13 y PostgreSQL, incorpora autenticación mediante Laravel Sanctum, gestión de roles y permisos con Spatie, además de operaciones transaccionales y control de concurrencia para garantizar la consistencia del inventario.",
            EN: "StockCore is a REST API for inventory management, designed to manage products, categories, suppliers, customers, stock movements, and sales orders. Built with Laravel 13 and PostgreSQL, it provides authentication through Laravel Sanctum, role and permission management with Spatie, as well as transactional operations and concurrency control to ensure inventory consistency.",
        },
        technologies: ["PHP", "Laravel", "PostgreSQL", "Swagger"],
        repositoryUrl: "https://github.com/josecarlosonate/StockCore",
        demoUrl: "https://api.josecarlosonate.com/stock-core-api/introduction",
        images: [
            "/images/projects/stockcore/introduction.png",
            "/images/projects/stockcore/list-products.png",
            "/images/projects/stockcore/login.png",
            "/images/projects/stockcore/create-order.png",
        ],
    },
    {
        id: "zendticket",
        order: 3,
        title: {
            ES: "ZendTicket",
            EN: "ZendTicket",
        },
        category: {
            ES: "Gestión de tickets",
            EN: "Ticket management",
        },
        description: {
            ES: "Sistema de gestión de tickets construido con Laravel 13, Blade y Tailwind CSS. Permite registrar solicitudes, clasificarlas por departamento, categoría y prioridad, asignarlas a agentes y controlar su ciclo de vida con un workflow de estados, autorización por roles y permisos, trazabilidad de actividades y pruebas automatizadas con Pest.",
            EN: "Ticket management system built with Laravel 13, Blade, and Tailwind CSS. It lets authorized users register requests, classify them by department, category, and priority, assign them to agents, and control their lifecycle through a status workflow, role and permission authorization, activity traceability, and automated Pest tests.",
        },
        technologies: ["Laravel", "MySQL", "Blade", "Tailwind CSS"],
        repositoryUrl: "https://github.com/josecarlosonate/ZendTicket",
        demoUrl: "",
        images: [
            "/images/projects/zendticket/index.png",
            "/images/projects/zendticket/section_2.png",
            "/images/projects/zendticket/sectores.png",
            "/images/projects/zendticket/login.png",
            "/images/projects/zendticket/dashboard.png",
        ],
    },
];