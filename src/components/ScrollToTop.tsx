import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hero = document.querySelector("#home");
        if (!hero) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(!entry.isIntersecting);
        });

        observer.observe(hero);

        return () => observer.disconnect();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isVisible) return null;

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="fixed right-4 bottom-4 z-50 flex size-12 cursor-pointer items-center 
                justify-center rounded-full border border-primary/50 bg-surface text-primary 
                shadow-[0_4px_16px_rgba(37,99,235,0.22)] transition-all duration-300 hover:-translate-y-1 
                hover:border-primary hover:bg-surface-hover hover:shadow-[0_6px_20px_rgba(37,99,235,0.32)] 
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-6 sm:bottom-6"
        >
            <ArrowUp size={20} />
        </button>
    );
}