
import GlitchLogo from '../ui/GlitchLogo';

const enlacesNav = [
  { etiqueta: '_inicio', href: '#inicio' },
  { etiqueta: '_misiones', href: '#misiones' },
  { etiqueta: '_skills', href: '#skills' },
  { etiqueta: '_contacto', href: '#contacto' },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-cyan-500/30 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <a href="#inicio" className="relative group shrink-0 hover:opacity-90 transition-opacity">
        <GlitchLogo />
      </a>
      <ul className="flex gap-8 font-mono text-cyan-300">
        {enlacesNav.map(({ etiqueta, href }) => (
          <li key={etiqueta} className="relative group">
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
