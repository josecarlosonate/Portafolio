import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import type { Language } from "./types/language";
import type { Theme } from "./types/theme";
import Hero from "./components/Hero";

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
      <Hero theme={theme} language={language} />
    </>
  );
}

export default App;
