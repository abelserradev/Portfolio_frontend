'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { RUTA_DEMO_GUIA_3D_SPENDAVE } from '@/lib/mission-demo-paths';

interface FeaturedMission3dShowcaseProps {
  readonly tituloMision?: string;
}

function MarcoDemo({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="foundry-plate relative w-full overflow-hidden border-foundry-brass/50">
      <div className="flex items-center justify-between gap-2 border-b border-foundry-seam bg-foundry-chrome/80 px-3 py-2 sm:px-4">
        <p className="font-mono text-[10px] tracking-widest text-foundry-brass sm:text-xs">
          GUÍA 3D · SPEND$AVE
        </p>
        <span className="hidden font-mono text-[10px] text-foundry-type-dim sm:inline">
          LIVE
        </span>
      </div>
      <div className="relative aspect-[16/11] min-h-[240px] w-full sm:min-h-[280px] lg:min-h-[320px]">
        {children}
      </div>
    </div>
  );
}

export default function FeaturedMission3dShowcase({
  tituloMision = 'Mobile Gastos',
}: FeaturedMission3dShowcaseProps) {
  const contenedorRef = useRef<HTMLDivElement>(null);
  const [demoLista, setDemoLista] = useState(false);
  const [usuarioActivo, setUsuarioActivo] = useState(false);

  const activarDemo = useCallback(() => {
    setUsuarioActivo(true);
    setDemoLista(true);
  }, []);

  useEffect(() => {
    if (usuarioActivo) return;
    const nodo = contenedorRef.current;
    if (!nodo) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setDemoLista(true);
        }
      },
      { rootMargin: '80px', threshold: 0.2 },
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, [usuarioActivo]);

  const urlDemo = RUTA_DEMO_GUIA_3D_SPENDAVE;
  const urlPantallaCompleta = urlDemo;

  return (
    <div ref={contenedorRef} className="flex h-full flex-col gap-3">
      <MarcoDemo>
        {!demoLista ? (
          <div
            className="flex h-full flex-col items-center justify-center bg-foundry-chrome p-6 text-center"
            aria-busy="true"
          >
            <span className="font-mono text-xs tracking-widest text-foundry-brass">
              Preparando molde 3D…
            </span>
          </div>
        ) : null}

        {demoLista && !usuarioActivo ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-foundry-chrome/90 p-6 text-center">
            <p className="max-w-sm text-sm leading-relaxed text-foundry-type-mute">
              Recorrido visual de cómo usar{' '}
              <span className="text-foundry-brass">{tituloMision}</span>: presupuesto,
              gastos pendientes vs pagados y disponible del mes.
            </p>
            <button
              type="button"
              onClick={activarDemo}
              className="foundry-cta"
            >
              Iniciar recorrido 3D
            </button>
            <a
              href={urlPantallaCompleta}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-foundry-brass underline decoration-dotted hover:text-foundry-type-bright"
            >
              Abrir en pantalla completa
            </a>
          </div>
        ) : null}

        {demoLista && usuarioActivo ? (
          <iframe
            title={`Guía interactiva 3D — ${tituloMision}`}
            src={urlDemo}
            className="absolute inset-0 h-full w-full border-0 bg-[#fdf3e7]"
            allow="fullscreen"
            loading="lazy"
          />
        ) : null}
      </MarcoDemo>

      <p className="text-[10px] leading-relaxed text-foundry-type-dim sm:text-xs">
        Arrastra dentro del visor para orbitar · Usa los controles de la guía para avanzar
        pasos ·{' '}
        <a
          href={urlPantallaCompleta}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foundry-brass hover:text-foundry-type-bright"
        >
          ventana nueva
        </a>
      </p>
    </div>
  );
}
