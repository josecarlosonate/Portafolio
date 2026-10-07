import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { ContactTranslations } from "../translations/contact"
import type { Language } from "../types/language"
import { ExternalLink } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

type ContactProps = {
    language: Language
}

type ContactFormState = {
    status: "idle" | "success" | "error";
    submissionId: number;
    errors: {
        name?: "minLength";
        email?: "invalid";
        message?: "minLength" | "maxLength";
    };
};

const initialState: ContactFormState = {
    status: "idle",
    submissionId: 0,
    errors: {},
};

const getTextValue = (formData: FormData, key: string): string => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
};

const submitAction = async (previousState: ContactFormState, formData: FormData): Promise<ContactFormState> => {
    const name = getTextValue(formData, "name");
    const email = getTextValue(formData, "email");
    const message = getTextValue(formData, "message");
    const errors: ContactFormState["errors"] = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 2) errors.name = "minLength";
    if (!email || !emailRegex.test(email)) errors.email = "invalid";
    if (message.length < 10) errors.message = "minLength";
    if (message.length > 2000) errors.message = "maxLength";

    if (Object.keys(errors).length > 0) {
        return {
            status: "idle",
            submissionId: previousState.submissionId + 1,
            errors,
        };
    }

    // Aquí lógica de envío
    const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
    });

    if (!response.ok) {
        return {
            status: "error",
            submissionId: previousState.submissionId + 1,
            errors: {},
        };
    }

    return {
        status: "success",
        submissionId: previousState.submissionId + 1,
        errors: {},
    };
};

function Contact({ language }: ContactProps) {
    const translations = ContactTranslations[language]
    const [state, formAction, isPending] = useActionState(submitAction, initialState);

    useEffect(() => {
        if (state.submissionId === 0) return;
        if (state.status === "success") toast.success(translations.form.success);
        if (state.status === "error") toast.error(translations.form.error);
    }, [state.submissionId, translations.form.success, translations.form.error]);

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
                        <ul className="mx-auto mt-8 grid max-w-sm grid-cols-1 sm:mx-0 sm:max-w-2xl sm:grid-cols-2 gap-4">
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
                                            {translations.contact.whatsapp.title}
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
                        <form action={formAction}>
                            <div className="rounded-2xl border border-border bg-surface p-6 text-foreground shadow-surface
                                transition-all duration-300 ease-out
                                hover:border-card-border hover:ring-1 hover:ring-card-border">
                                <label className="block text-sm font-medium tracking-wide text-muted uppercase">
                                    {translations.form.name.label}
                                    <input type="text" name="name" required placeholder={translations.form.name.placeholder}
                                        aria-invalid={Boolean(state.errors.name)} aria-describedby={state.errors.name ? "name-error" : undefined}
                                        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 
                                        text-foreground outline-none placeholder:text-muted focus:border-primary"/>
                                </label>
                                {state.errors.name && (
                                    <span id="name-error" className="text-sm text-red-500">
                                        {translations.form.errors.name[state.errors.name]}
                                    </span>
                                )}
                                <label className="mt-4 block text-sm font-medium tracking-wide text-muted uppercase">
                                    {translations.form.email.label}
                                    <input type="email" name="email" required placeholder={translations.form.email.placeholder}
                                        aria-invalid={Boolean(state.errors.email)} aria-describedby={state.errors.email ? "email-error" : undefined}
                                        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 
                                        text-foreground outline-none placeholder:text-muted focus:border-primary"/>
                                </label>
                                {state.errors.email && (
                                    <span id="email-error" className="text-sm text-red-500">
                                        {translations.form.errors.email[state.errors.email]}
                                    </span>
                                )}
                                <label className="mt-4 block text-sm font-medium tracking-wide text-muted uppercase">
                                    {translations.form.message.label}
                                    <textarea name="message" rows={5} autoComplete="off"
                                        aria-invalid={Boolean(state.errors.message)} aria-describedby={state.errors.message ? "message-error" : undefined}
                                        placeholder={translations.form.message.placeholder}
                                        className="mt-2 w-full resize-y rounded-lg border border-border bg-background px-3 
                                        py-3 text-foreground outline-none placeholder:text-muted focus:border-primary"/>
                                </label>
                                {state.errors.message && (
                                    <span id="message-error" className="text-sm text-red-500">
                                        {translations.form.errors.message[state.errors.message]}
                                    </span>
                                )}
                                <button type="submit" disabled={isPending}
                                    className="mt-6 w-full rounded-lg bg-primary px-5 py-3 font-medium tracking-wide 
                                    text-on-primary uppercase hover:bg-primary-hover cursor-pointer disabled:cursor-not-allowed disabled:opacity-60">
                                    {isPending ? translations.form.submitting : translations.form.submit}
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