'use client';

import { useEffect, useRef, useState } from 'react';
import GlitchLogo from '../ui/GlitchLogo';

const enlacesNav = [
  { etiqueta: 'Servicios', href: '#servicios' },
  { etiqueta: 'Misiones', href: '#misiones' },
  { etiqueta: 'Contacto', href: '#contacto' },
];

/** Barra fija de cromo de fundición; spacer evita saltos de layout. */
export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [alturaReserva, setAlturaReserva] = useState(64);

  useEffect(() => {
    const barra = navRef.current;
    if (!barra) return;
    const sincronizar = () => setAlturaReserva(barra.offsetHeight);
    sincronizar();
    const obs = new ResizeObserver(sincronizar);
    obs.observe(barra);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div aria-hidden className="shrink-0" style={{ height: alturaReserva }} />
      <nav
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-50 flex flex-col gap-3 border-b-2 border-foundry-brass-deep bg-foundry-chrome px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-7"
      >
        <a
          href="#inicio"
          className="shrink-0 self-start transition-opacity hover:opacity-90"
        >
          <GlitchLogo />
        </a>
        <ul className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 font-display text-[11px] uppercase tracking-[0.14em] text-foundry-type-mute sm:w-auto sm:justify-end sm:gap-6 sm:text-[13px]">
          {enlacesNav.map(({ etiqueta, href }) => (
            <li key={etiqueta} className="relative group shrink-0">
              <a
                href={href}
                className="cursor-pointer transition-colors hover:text-foundry-type-bright"
              >
                {etiqueta}
              </a>
              <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-foundry-brass transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
