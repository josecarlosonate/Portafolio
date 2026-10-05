import { ChevronDown, Check } from "lucide-react";
import colombiaFlag from "../assets/flags/co.svg";
import americanFlag from "../assets/flags/us.svg";
import type { Language } from "../types/language";
import { useState } from "react";

type LanguageSelectorProps = {
    language: Language;
    setLanguage: (value: Language) => void;
};

const languages: { code: Language; name: string; flag: string }[] = [
    { code: "ES", name: "Español", flag: colombiaFlag },
    { code: "EN", name: "English", flag: americanFlag },
];

function LanguageSelector({ language, setLanguage }: LanguageSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="relative">
                <button type="button" onClick={() => setIsOpen((prev) => !prev)}
                    className="flex h-10 cursor-pointer items-center gap-2 rounded-md border border-primary
                        px-3 text-sm font-medium text-interactive transition-colors hover:bg-primary-soft">
                    <span className="min-w-6">{language}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Menu Selector de Idioma */}
                {isOpen && (
                    <div className="absolute right-0 mt-3 w-50 rounded-lg border border-border-subtle bg-surface p-2.5 text-foreground sm:right-auto">
                        {languages.map(({ code, name, flag }) => {
                            const isSelected = language === code;

                            return (
                                <button key={code} type="button" onClick={() => {
                                    setLanguage(code);
                                    setIsOpen(false);
                                }}
                                    className={`flex w-full cursor-pointer items-center gap-3 rounded-md p-2 text-interactive
                                        ${isSelected ? "bg-surface-highlight" : ""}`}>
                                    <Check size={15} className={isSelected ? "visible" : "invisible"} />
                                    <img src={flag} alt="" className="w-5" />
                                    <span className="font-medium text-muted">{name}</span>

                                    {isSelected ? (
                                        <span />
                                    ) : (
                                        <span className="ml-4 flex h-5 w-7 items-center justify-center rounded-md border border-border-subtle bg-surface-hover text-[13px] text-muted">
                                            {code}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}

            </div>
        </>
    )
}

export default LanguageSelector