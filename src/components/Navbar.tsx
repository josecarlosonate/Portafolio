import { Moon, Sun } from "lucide-react";
import type { Language } from "../types/language";
import LanguageSelector from "./LanguageSelector";
import { NavbarTranslations } from "../translations/navbar";
import type { Theme } from "../types/theme";

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
    return (
        <header className={`w-full border-b ${theme === "dark" ? "border-white/10 bg-slate-950" : "border-slate-200 bg-white"}`}>
            <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
                                className={`relative flex h-full items-center text-[15px] font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all after:duration-200 ${isActive ? "text-blue-500 after:w-full" : theme === "dark" ? "text-slate-300 hover:text-blue-500 hover:after:w-full" : "text-slate-700 hover:text-blue-500 hover:after:w-full"}`}>
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
                        className={`flex h-8 w-14 items-center rounded-full border transition-colors cursor-pointer ${theme === "dark" ? "border-white/10 bg-white/10" : "border-slate-300 bg-slate-200"}`}>
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${theme === "light" ? "translate-x-6 bg-white text-slate-900" : "translate-x-0 bg-black text-white"}`}>
                            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
                        </span>
                    </button>
                </div>

            </nav>
        </header >
    );
}

export default Navbar;
