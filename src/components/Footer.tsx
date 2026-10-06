import type { Language } from "../types/language";

type FooterProps = {
    language: Language;
};

const copy = {
    ES: {
        rights: "\u00a9 2026 Jos\u00e9 Carlos O\u00f1ate. Todos los derechos reservados.",
        madeWith: "Hecho con",
        and: "y",
    },
    EN: {
        rights: "\u00a9 2026 Jos\u00e9 Carlos O\u00f1ate. All rights reserved.",
        madeWith: "Made with",
        and: "and",
    },
} as const;

export default function Footer({ language }: FooterProps) {
    const text = copy[language];

    return (
        <footer className="relative z-10 w-full bg-background">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
                <p>{text.rights}</p>
                <p className="sm:text-right">
                    {text.madeWith}{" "}
                    <span className="text-red-500" aria-hidden>❤️</span>{" "}
                    {text.and} React
                </p>
            </div>
        </footer>
    );
}
