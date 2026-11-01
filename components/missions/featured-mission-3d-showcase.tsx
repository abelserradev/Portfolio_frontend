'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { RUTA_DEMO_GUIA_3D_SPENDAVE } from '@/lib/mission-demo-paths';

interface FeaturedMission3dShowcaseProps {
  readonly tituloMision?: string;
}

function MarcoDemo({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      className="relative w-full overflow-hidden rounded-sm border border-yellow-400/45 bg-black/70 shadow-[0_0_32px_rgba(250,204,21,0.12),0_0_48px_rgba(6,182,212,0.08)]"
      style={{
        clipPath: 'polygon(0% 0%, 97% 0%, 100% 5%, 100% 100%, 3% 100%, 0% 95%)',
      }}
    >
      <div className="absolute top-0 left-0 h-0.5 w-full bg-linear-to-r from-yellow-400 via-cyan-400 to-fuchsia-500" />
      <div className="flex items-center justify-between gap-2 border-b border-yellow-400/20 bg-black/50 px-3 py-2 sm:px-4">
        <p className="font-mono text-[10px] tracking-widest text-yellow-300/90 sm:text-xs">
          {'// GUIA_INTERACTIVA_3D · SPEND$AVE'}
        </p>
        <span className="hidden font-mono text-[10px] text-cyan-500/70 sm:inline">
          WEBGL_LIVE
        </span>
      </div>
      <div className="relative aspect-[16/11] min-h-[240px] w-full sm:min-h-[280px] lg:min-h-[320px]">
        {children}
      </div>
    </motion.div>
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
            className="flex h-full flex-col items-center justify-center bg-linear-to-br from-yellow-950/40 via-black to-cyan-950/50 p-6 text-center"
            aria-busy="true"
          >
            <span className="font-mono text-xs tracking-widest text-cyan-400/80 animate-pulse">
              CARGANDO_NÚCLEO_3D...
            </span>
          </div>
        ) : null}

        {demoLista && !usuarioActivo ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-linear-to-br from-[#fdf3e7]/10 via-black/85 to-cyan-950/60 p-6 text-center backdrop-blur-[2px]">
            <p className="max-w-sm font-tech text-sm leading-relaxed text-gray-300">
              Recorrido visual de cómo usar{' '}
              <span className="text-yellow-200">{tituloMision}</span>: presupuesto,
              gastos pendientes vs pagados y disponible del mes.
            </p>
            <button
              type="button"
              onClick={activarDemo}
              className="border border-yellow-400/60 bg-yellow-500/15 px-5 py-2.5 font-mono text-sm text-yellow-100 transition-colors hover:bg-yellow-500/25"
            >
              INICIAR_RECORRIDO_3D
            </button>
            <a
              href={urlPantallaCompleta}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-cyan-400/90 underline decoration-dotted hover:text-cyan-300"
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

        {demoLista && !usuarioActivo ? (
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden
            style={{
              background:
                'radial-gradient(ellipse at 30% 20%, rgba(238,131,41,0.25), transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(6,182,212,0.2), transparent 50%)',
            }}
          />
        ) : null}
      </MarcoDemo>

      <p className="font-mono text-[10px] leading-relaxed text-gray-500 sm:text-xs">
        Arrastra dentro del visor para orbitar · Usa los controles de la guía para avanzar
        pasos ·{' '}
        <a
          href={urlPantallaCompleta}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-500/80 hover:text-cyan-400"
        >
          ventana nueva
        </a>
      </p>
    </div>
  );
}
