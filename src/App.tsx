import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import type { Language } from "./types/language";
import type { Theme } from "./types/theme";
import Hero from "./components/Hero";
import About from "./components/About";
import DotGrid from "./components/DotGrid/DotGrid";


function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function App() {
  const [language, setLanguage] = useState<Language>("ES");
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <Navbar language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} />

      <div className="relative z-10 bg-background">
        <Hero language={language} />
        <About language={language} />

        <div className="absolute inset-0 z-0">
          <DotGrid dotSize={4} gap={24}
            baseColor={theme === "dark" ? "#1E293B" : "#E2E8F0"}
            activeColor={theme === "dark" ? "#60A5FA" : "#2563EB"}
            proximity={120} shockRadius={260}
            shockStrength={5} resistance={750} returnDuration={1.5}
          />
        </div>

      </div>
    </>
  );
}

export default App;
