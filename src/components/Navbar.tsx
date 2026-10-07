import { Menu, Moon, Sun } from "lucide-react";
import type { Language } from "../types/language";
import LanguageSelector from "./LanguageSelector";
import { NavbarTranslations } from "../translations/navbar";
import type { Theme } from "../types/theme";
import { useEffect, useState } from "react";

type NavbarProps = {
    language: Language;
    setLanguage: (value: Language) => void;
    theme: Theme;
    setTheme: (value: Theme) => void
};

const navItems = [
    { key: "home", href: "#home" },
    { key: "about", href: "#about" },
    { key: "projects", href: "#projects" },
    { key: "technologies", href: "#technologies" },
    { key: "contact", href: "#contact" },
] as const;

const sectionIds = ["home", "about", "technologies", "contact"];

function Navbar({ language, setLanguage, theme, setTheme }: NavbarProps) {
    const translations = NavbarTranslations[language];
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeHref, setActiveHref] = useState(() => window.location.hash || "#home");

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveHref(`#${entry.target.id}`);
                }
            });
        },
            {
                root: null,
                rootMargin: "-30% 0px -69% 0px",
            });

        sectionIds.forEach((id) => {
            const section = document.getElementById(id);
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            observer.disconnect();
        };

    }, []);

    useEffect(() => {
        const hash = window.location.hash;

        if (!hash) return;
        const section = document.getElementById(hash.slice(1));
        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
            });
        }

    }, []);

    return (
        <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-border-subtle bg-background">
            <nav className="relative mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <a href="#home" className="flex items-center gap-5" aria-label="Ir al inicio" >
                    <span className="text-[30px] font-bold leading-none tracking-wide text-primary">
                        JO
                    </span>
                    <span className="hidden text-[15px] font-bold text-foreground sm:block">
                        José Carlos Oñate
                    </span>
                </a>

                <div className="hidden h-full items-center gap-8 lg:flex">
                    {navItems.map((item) => {
                        const isActive = item.href === activeHref;
                        return (
                            <a key={item.href} href={item.href} onClick={() => setActiveHref(item.href)}
                                className={`relative flex h-full items-center text-[15px] font-medium transition-colors 
                                after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 
                                ${isActive
                                        ? "text-primary after:w-full"
                                        : "text-muted hover:text-interactive hover:after:w-full"
                                    }`}>
                                {translations[item.key]}
                            </a>
                        );
                    })}
                </div>

                <div className="flex items-center gap-4">
                    {/*Selector de Idioma */}
                    <LanguageSelector language={language} setLanguage={setLanguage} />
                    {/*Selector de tema oscuro/claro */}
                    <button type="button" aria-label="Cambiar tema" onClick={toggleTheme}
                        className="flex h-8 w-14 cursor-pointer items-center rounded-full border 
                        border-border-subtle bg-theme-track transition-colors">
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-theme-thumb 
                        text-theme-thumb-foreground transition-all duration-200
                        ${theme === "light" ? "translate-x-6" : "translate-x-0"}`}>
                            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
                        </span>
                    </button>
                    {/* Menú móvil */}
                    <button type="button" aria-label="Abrir menú" onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md
                        text-muted transition-colors hover:bg-surface-hover hover:text-foreground lg:hidden">
                        <Menu size={24} />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute top-full left-0 flex w-full flex-col rounded-lg border 
                            border-border-subtle bg-surface p-2.5 text-foreground">
                            {navItems.map((item) => {
                                const isActive = item.href === activeHref;

                                return (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`border-l-2 px-4 py-3 text-sm font-medium transition-colors
                                                ${isActive
                                                ? "border-primary bg-primary-soft text-primary"
                                                : "border-transparent text-muted hover:bg-surface-hover hover:text-interactive"
                                            }`}
                                    >
                                        {translations[item.key]}
                                    </a>
                                );
                            })}
                        </div>
                    )}

                </div>

            </nav>
        </header >
    );
}

export default Navbar;
