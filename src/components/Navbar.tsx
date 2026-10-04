import { ChevronDown, Moon } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "#home" },
  { label: "Sobre mí", href: "#about" },
  { label: "Proyectos", href: "#projects" },
  { label: "Experiencia", href: "#experience" },
  { label: "Tecnologías", href: "#technologies" },
  { label: "Contacto", href: "#contact" },
];

function Navbar() {
  return (
    <header className="w-full border-b border-white/10 bg-slate-950">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="flex items-center gap-5"
          aria-label="Ir al inicio"
        >
          <span className="text-[30px] font-bold leading-none tracking-wide text-blue-500">
            JO
          </span>
          <span className="hidden text-[15px] font-bold text-white sm:block">
            José Carlos Oñate
          </span>
        </a>

        <div className="hidden h-full items-center gap-8 lg:flex text-white">
          {navItems.map((item) => {
            const isActive = item.href === "#home";
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative flex h-full items-center text-[15px] font-medium  transition-colors 
                    after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-500
                    after:transition-all after:duration-200
                    ${
                      isActive
                        ? "text-blue-500 after:w-full"
                        : "text-slate-300 hover:text-blue-500 hover:after:w-full"
                    }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-md border border-blue-500 
            px-3 text-sm font-medium text-blue-400 cursor-pointer"
          >
            <span>ES</span>
            <ChevronDown size={16} />
          </button>
          <button
            type="button"
            aria-label="Cambiar tema"
            className="flex h-8 w-14 items-center rounded-full border border-white/10 
            bg-white/10 text-white transition-colors hover:border-blue-500 cursor-pointer"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
              <Moon size={16} />
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
