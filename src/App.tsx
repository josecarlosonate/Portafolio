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
        className={`relative min-h-screen overflow-hidden ${
          isDark ? "bg-[#07111f] text-white" : "bg-[#f4f1ea] text-slate-950"
        }`}
      >
        <MagneticDotGrid
          dotSize={6}
          gap={30}
          baseColor={isDark ? "#22C55E33" : "#0f6b5c33"}
          activeColor={isDark ? "#22C55E" : "#0f6b5c"}
          proximity={140}
          shockRadius={220}
          shockStrength={4}
          returnDuration={1.2}
        />
      </main>
    </>
  );
}

export default App;
