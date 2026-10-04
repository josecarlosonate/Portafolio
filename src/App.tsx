import { useState } from "react";
import Navbar from "./components/Navbar";
import type { Language } from "./types/language";
import type { Theme } from "./types/theme";

function App() {
  const [language, setLanguage] = useState<Language>("ES");
  const [theme, setTheme] = useState<Theme>("dark");

  return (
    <>
      <Navbar language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} />
      <main
        className={`min-h-screen p-10 ${theme === "dark"
            ? "bg-slate-950 text-white"
            : "bg-white text-slate-950"
          }`}
      ></main>
    </>
  );
}

export default App;
