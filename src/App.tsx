import { useState } from "react";
import Navbar from "./components/Navbar";
import type { Language } from "./types/language";

function App() {
  const [language, setLanguage] = useState<Language>("ES");

  return (
    <>
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="min-h-screen bg-slate-950 p-10 text-white"></main>
    </>
  );
}

export default App;
