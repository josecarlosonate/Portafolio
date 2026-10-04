import { Menu, Moon, Sun } from "lucide-react";
import type { Language } from "../types/language";
import LanguageSelector from "./LanguageSelector";
import { NavbarTranslations } from "../translations/navbar";
import type { Theme } from "../types/theme";
import { useState } from "react";

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
    { key: "experience", href: "#experience" },
    { key: "technologies", href: "#technologies" },
    { key: "contact", href: "#contact" },
] as const;

function Navbar({ language, setLanguage, theme, setTheme }: NavbarProps) {
    const translations = NavbarTranslations[language];
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <header className={`w-full border-b ${theme === "dark" ? "border-white/10 bg-slate-950" : "border-slate-200 bg-white"}`}>
            <nav className="relative mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <a href="#home" className="flex items-center gap-5" aria-label="Ir al inicio" >
                    <span className="text-[30px] font-bold leading-none tracking-wide text-blue-500">
                        JO
                    </span>
                    <span className={`hidden text-[15px] font-bold sm:block ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                        José Carlos Oñate
                    </span>
                </a>

                <div className="hidden h-full items-center gap-8 lg:flex text-white">
                    {navItems.map((item) => {
                        const isActive = item.href === "#home";
                        return (
                            <a key={item.href} href={item.href}
                                className={`relative flex h-full items-center text-[15px] font-medium transition-colors 
                                after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all after:duration-200 
                                ${isActive
                                        ? "text-blue-500 after:w-full"
                                        : theme === "dark"
                                            ? "text-slate-300 hover:text-blue-500 hover:after:w-full"
                                            : "text-slate-700 hover:text-blue-500 hover:after:w-full"
                                    }`}>
                                {translations[item.key]}
                            </a>
                        );
                    })}
                </div>

                <div className="flex items-center gap-4">
                    {/*Selector de Idioma */}
                    <LanguageSelector language={language} setLanguage={setLanguage} theme={theme} />
                    {/*Selector de tema oscuro/claro */}
                    <button type="button" aria-label="Cambiar tema" onClick={toggleTheme}
                        className={`flex h-8 w-14 items-center rounded-full border transition-colors cursor-pointer 
                        ${theme === "dark" ? "border-white/10 bg-white/10" : "border-slate-300 bg-slate-200"}`}>
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 
                            ${theme === "light" ? "translate-x-6 bg-white text-slate-900" : "translate-x-0 bg-black text-white"}`}>
                            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
                        </span>
                    </button>
                    {/* Menú móvil */}
                    <button type="button" aria-label="Abrir menú" onClick={() => setIsMenuOpen((prev) => !prev)}
                        className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors cursor-pointer lg:hidden 
                        ${theme === "dark" ? "text-slate-300 hover:bg-white/10 hover:text-white"
                                : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"}`}>
                        <Menu size={24} />
                    </button>
                    {isMenuOpen && (
                        <div className={`absolute flex flex-col top-full left-0 w-full border rounded-lg p-2.5 
                        ${theme === "dark" ? "border-white/10 bg-slate-900 text-white"
                                : "border-slate-200 bg-white text-slate-900"}`} >
                            {navItems.map((item) => {
                                const isActive = item.href === "#home";
                                return (
                                    <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}
                                        className={`px-4 py-3 text-sm font-medium border-l-2 transition-colors 
                                        ${isActive
                                                ? (theme === "dark"
                                                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                                                    : "border-blue-500 bg-blue-50 text-blue-500"
                                                )
                                                : (theme === "dark"
                                                    ? "border-transparent text-slate-300 hover:bg-white/5 hover:text-blue-500"
                                                    : "border-transparent text-slate-700 hover:bg-slate-100 hover:text-blue-500"
                                                )}`}>
                                        {translations[item.key]}
                                    </a>
                                )
                            })}
                        </div>
                    )}

                </div>

            </nav>
        </header >
    );
}

export default Navbar;
