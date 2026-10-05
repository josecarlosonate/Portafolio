import { useState } from "react";
import Navbar from "./components/Navbar";
import MagneticDotGrid from "./components/MagneticDotGrid";
import type { Language } from "./types/language";
import type { Theme } from "./types/theme";

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
  const isDark = theme === "dark";

  return (
    <>
      <Navbar language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} />
      <main
        className={`relative min-h-screen overflow-hidden p-10 ${
          isDark ? "bg-slate-950 text-white" : "bg-[#f4f1ea] text-slate-950"
        }`}
      >
        <MagneticDotGrid
          baseColor={isDark ? "#1e3a34" : "#c5e6da"}
          activeColor={isDark ? "#5eead4" : "#0f6b5c"}
        />
      </main>
    </>
  );
}

export default App;
