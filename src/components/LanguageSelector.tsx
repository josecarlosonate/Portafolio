import { ChevronDown, Check } from "lucide-react";
import colombiaFlag from "../assets/flags/co.svg";
import americanFlag from "../assets/flags/us.svg";
import type { Language } from "../types/language";
import { useState } from "react";
import type { Theme } from "../types/theme";

type LanguageSelectorProps = {
    language: Language;
    setLanguage: (value: Language) => void;
    theme: Theme;
};

const languages: { code: Language; name: string; flag: string }[] = [
    { code: "ES", name: "Español", flag: colombiaFlag },
    { code: "EN", name: "English", flag: americanFlag },
];

function LanguageSelector({ language, setLanguage, theme }: LanguageSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="relative">
                <button type="button" onClick={() => setIsOpen((prev) => !prev)}
                    className={`flex h-10 items-center gap-2 rounded-md border border-blue-500 px-3 text-sm font-medium text-blue-400 cursor-pointer transition-colors ${theme === "dark" ? "hover:bg-white/5" : "hover:bg-blue-50"}`} >
                    <span className="min-w-6">{language}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Menu Selector de Idioma */}
                {isOpen
                    && (
                        <div className={`absolute right-0 sm:right-auto border w-50 rounded-lg p-2.5 mt-3 ${theme === "dark" ? "border-white/10 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-900"}`} >
                            {languages.map(({ code, name, flag }) => {
                                const isSelected = language === code;
                                return (
                                    <button className={`flex items-center gap-3 w-full p-2 rounded-md text-blue-400 cursor-pointer ${isSelected ? (theme === "dark" ? "bg-white/5" : "bg-slate-200") : ""}`}
                                        key={code} type="button" onClick={() => setLanguage(code)}>
                                        <Check size={15} className={isSelected ? "visible" : "invisible"} />
                                        <img src={flag} alt="" className="w-5" />
                                        <span className={`font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>{name}</span>
                                        {isSelected ? <span></span> :
                                            <span className={`flex items-center justify-center text-[13px] border h-5 w-7 ml-4 rounded-md ${theme === "dark" ? "border-white/10 bg-white/5 text-slate-300" : "border-slate-200 bg-slate-100 text-slate-600"}`}>
                                                {code}
                                            </span>
                                        }
                                    </button>
                                )
                            })}
                        </div>
                    )}

            </div>
        </>
    )
}

export default LanguageSelector