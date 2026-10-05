import HeroCanvas from "./HeroCanvas";
import type { Theme } from "../types/theme";

type HeroProps = {
    theme: Theme
}

function Hero({ theme }: HeroProps) {
    return (
        <>
            <section id="home" className={`relative w-full min-h-screen 
            ${theme === "dark"
                    ? "bg-slate-950 text-white"
                    : "bg-white text-slate-950"
                }`
            } >
                <HeroCanvas theme={theme} />
            </section>
        </>
    )
}

export default Hero