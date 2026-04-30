
import GlitchLogo from '../ui/GlitchLogo';

const enlacesNav = [
  { etiqueta: '_inicio', href: '#inicio' },
  { etiqueta: '_skills', href: '#skills' },
  { etiqueta: '_misiones', href: '#misiones' },
  { etiqueta: '_contacto', href: '#contacto' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex flex-col gap-3 border-b border-cyan-500/30 bg-black/80 px-4 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <a href="#inicio" className="relative group shrink-0 self-start hover:opacity-90 transition-opacity">
        <GlitchLogo />
      </a>
      <ul className="flex w-full items-center justify-between gap-3 overflow-x-auto pb-1 font-mono text-xs text-cyan-300 sm:w-auto sm:justify-end sm:gap-8 sm:overflow-visible sm:pb-0 sm:text-base">
        {enlacesNav.map(({ etiqueta, href }) => (
          <li key={etiqueta} className="relative group shrink-0">
            <a href={href} className="cursor-pointer hover:text-white transition-colors">
              {etiqueta}
            </a>
            <span className="pointer-events-none absolute -bottom-1 left-0 w-0 h-0.5 bg-magenta-500 group-hover:w-full transition-all duration-300" />
          </li>
        ))}
      </ul>
    </nav>
  );
}
