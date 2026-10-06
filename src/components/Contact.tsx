import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { ContactTranslations } from "../translations/contact"
import type { Language } from "../types/language"
import { ExternalLink } from "lucide-react";

type ContactProps = {
    language: Language
}

function Contact({ language }: ContactProps) {
    const translations = ContactTranslations[language]

    return (
        <section id="contact" className="scroll-mt-15 w-full lg:min-h-screen text-foreground">
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-20">

                <div className="flex flex-col gap-8 min-[956px]:flex-row min-[956px]:gap-4">
                    <div className="flex flex-col items-start basis-3/5">
                        <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                            {translations.title}
                            <span className="text-primary"> {translations.highlight} </span>
                        </h2>
                        <p className="mt-6 max-w-xl text-lg text-muted">
                            {translations.description}
                        </p>
                        <ul className="mt-8 grid max-w-2xl grid-cols-2 gap-4">
                            <li>
                                <a href="mailto:ingeniero.josec@gmail.com"
                                    className="group flex h-full items-center gap-4 rounded-lg border border-border
                                        bg-surface px-4 py-3 text-foreground transition-all duration-200
                                        hover:-translate-y-0.5 hover:border-primary hover:bg-surface-hover hover:shadow-md">
                                    <FaEnvelope size={20} className="shrink-0 text-primary" />
                                    <div className="flex flex-col">
                                        <span className="font-medium">
                                            {translations.contact.email}
                                        </span>
                                        <span className="text-sm text-muted">
                                            ingeniero.josec@gmail.com
                                        </span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/josecarlosonate" target="_blank" rel="noopener noreferrer"
                                    className="group flex h-full items-center gap-4 rounded-lg border border-border
                                        bg-surface px-4 py-3 text-foreground transition-all duration-200
                                        hover:-translate-y-0.5 hover:border-primary hover:bg-surface-hover hover:shadow-md">
                                    <FaLinkedin size={20} className="shrink-0 text-primary" />
                                    <div className="flex flex-1 flex-col">
                                        <span className="font-medium">
                                            {translations.contact.linkedin.title}
                                        </span>
                                        <span className="text-sm text-muted">
                                            {translations.contact.linkedin.description}
                                        </span>
                                    </div>
                                    <ExternalLink size={16} className="shrink-0 text-muted transition-colors group-hover:text-primary" />
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/josecarlosonate" target="_blank" rel="noopener noreferrer"
                                    className="group flex h-full items-center gap-4 rounded-lg border border-border
                                        bg-surface px-4 py-3 text-foreground transition-all duration-200
                                        hover:-translate-y-0.5 hover:border-primary hover:bg-surface-hover hover:shadow-md">
                                    <FaGithub size={20} className="shrink-0 text-primary" />
                                    <div className="flex flex-1 flex-col">
                                        <span className="font-medium">
                                            {translations.contact.github.title}
                                        </span>
                                        <span className="text-sm text-muted">
                                            {translations.contact.github.description}
                                        </span>
                                    </div>
                                    <ExternalLink size={16} className="shrink-0 text-muted transition-colors group-hover:text-primary" />
                                </a>
                            </li>
                            <li>
                                <a href="https://wa.me/onate338"
                                    target="_blank" rel="noopener noreferrer"
                                    className="group flex h-full items-center gap-4 rounded-lg border border-border
                                        bg-surface px-4 py-3 text-foreground transition-all duration-200
                                        hover:-translate-y-0.5 hover:border-primary hover:bg-surface-hover hover:shadow-md">
                                    <FaWhatsapp size={22} className="shrink-0 text-primary" />
                                    <div className="flex flex-1 flex-col">
                                        <span className="font-medium">
                                            @onate338
                                        </span>
                                        <span className="text-sm text-muted">
                                            {translations.contact.whatsapp.description}
                                        </span>
                                    </div>
                                    <ExternalLink
                                        size={16}
                                        className="shrink-0 text-muted transition-colors group-hover:text-primary"
                                    />
                                </a>
                            </li>
                        </ul>
                        <div className="mt-6 flex items-center gap-3">
                            <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                                <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2
                                        animate-ping rounded-full bg-green-500 opacity-50" />
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                            </span>
                            <span className="text-sm font-medium text-foreground">
                                {translations.contact.availability}
                            </span>
                        </div>
                    </div>

                    <div className="basis-2/5">
                        <form>
                            <div className="rounded-2xl border border-border bg-surface p-6 text-foreground shadow-surface
                                transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.03]
                                hover:border-card-border hover:ring-1">
                                <label className="block text-sm font-medium tracking-wide text-muted uppercase">
                                    {translations.form.name.label}
                                    <input type="text" name="name" required placeholder={translations.form.name.placeholder}
                                        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 
                                        text-foreground outline-none placeholder:text-muted focus:border-primary"/>
                                </label>
                                <label className="mt-4 block text-sm font-medium tracking-wide text-muted uppercase">
                                    {translations.form.email.label}
                                    <input type="email" name="email" required placeholder={translations.form.email.placeholder}
                                        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 
                                        text-foreground outline-none placeholder:text-muted focus:border-primary"/>
                                </label>
                                <label className="mt-4 block text-sm font-medium tracking-wide text-muted uppercase">
                                    {translations.form.message.label}
                                    <textarea name="message" required rows={5} placeholder={translations.form.message.placeholder}
                                        className="mt-2 w-full resize-y rounded-lg border border-border bg-background px-3 
                                        py-3 text-foreground outline-none placeholder:text-muted focus:border-primary"/>
                                </label>
                                <button type="submit"
                                    className="mt-6 w-full rounded-lg bg-primary px-5 py-3 font-medium tracking-wide 
                                    text-on-primary uppercase hover:bg-primary-hover cursor-pointer">
                                    {translations.form.submit}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Contact