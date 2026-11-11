"use client";

import { useEffect, useRef, useState } from 'react';
import type { PortfolioProject } from '@/lib/types/portfolio-project';
import { obtenerUrlRedirectVisita } from '@/lib/api-config';
import {
  normalizarStatusProyecto,
  obtenerEtiquetaMision,
  obtenerSubtituloMision,
  obtenerTextoCtaMision,
} from '@/lib/mission-presentation';

function padPlateId(n: number): string {
  return `PAT-${String(n).padStart(3, '0')}`;
}

export default function MissionCard({
  mission,
  destacada = false,
  enLayoutDestacado = false,
  plateIndex = 1,
}: {
  readonly mission: PortfolioProject;
  readonly destacada?: boolean;
  /** Cuando la tarjeta va junto al visor 3D, no ocupar todo el ancho del grid. */
  readonly enLayoutDestacado?: boolean;
  readonly plateIndex?: number;
}) {
  const visitUrl = obtenerUrlRedirectVisita(mission.id);
  const tecnologias = (mission.tech_stack ?? '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const hayUrlPublica = Boolean(
    mission.live_url && mission.live_url.trim().length > 0,
  );
  const status = normalizarStatusProyecto(mission.status);
  const etiqueta = obtenerEtiquetaMision(status, hayUrlPublica);
  const subtitulo = obtenerSubtituloMision(status);
  const cta = obtenerTextoCtaMision(status, hayUrlPublica);
  const badgeFoundry =
    status === 'mvp_active'
      ? 'border-foundry-brass/70 bg-foundry-brass/15 text-foundry-brass'
      : status === 'coming_soon'
        ? 'border-foundry-seam bg-foundry-ground text-foundry-type-dim'
        : hayUrlPublica && status === 'live'
          ? 'border-foundry-brass/50 bg-foundry-brass/10 text-foundry-type-bright'
          : 'border-foundry-seam bg-foundry-chrome text-foundry-type-mute';
  const plateRef = useRef<HTMLElement>(null);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setRegistered(true);
      return;
    }
    const el = plateRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRegistered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.28, rootMargin: '0px 0px -8% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      ref={plateRef}
      className={`foundry-plate foundry-plate-register foundry-mission-plate group relative flex h-full flex-col overflow-hidden p-4 sm:p-5 ${
        registered ? 'is-registered' : 'is-unsettled'
      } ${
        destacada
          ? `border-foundry-brass/70 ${enLayoutDestacado ? '' : 'md:col-span-2 lg:col-span-3'}`
          : ''
      }`}
    >
      <div className="absolute left-2 top-2 h-2 w-2 border border-foundry-brass/80" aria-hidden />
      <div className="absolute right-2 top-2 h-2 w-2 border border-foundry-brass/80" aria-hidden />
      <div className="absolute bottom-2 left-2 h-2 w-2 border border-foundry-brass/80" aria-hidden />
      <div className="absolute bottom-2 right-2 h-2 w-2 border border-foundry-brass/80" aria-hidden />

      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="foundry-plate-id">{padPlateId(plateIndex)}</span>
        <span
          className={`w-fit shrink-0 border px-2 py-0.5 font-mono text-[10px] tracking-wide ${badgeFoundry}`}
        >
          {etiqueta.texto}
        </span>
      </div>

      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="min-w-0 wrap-break-word font-display text-xl text-foundry-type-bright transition-colors group-hover:text-foundry-brass sm:text-2xl">
          {mission.title}
        </h3>
      </div>
      {subtitulo ? (
        <p className="mt-1 text-xs text-foundry-brass/90">{subtitulo}</p>
      ) : null}
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foundry-type-mute sm:line-clamp-4">
        {mission.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tecnologias.map((tech) => (
          <span
            key={tech}
            className="border border-foundry-seam bg-foundry-chrome/60 px-2 py-0.5 font-mono text-[10px] text-foundry-type-mute"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-end sm:justify-between">
        <span className="font-mono text-[10px] tracking-widest text-foundry-type-dim">
          ESCALA 1:1
        </span>
        {cta.puedeVisitar ? (
          <a
            href={visitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-foundry-brass underline decoration-dotted underline-offset-4 transition-colors hover:text-foundry-type-bright sm:shrink-0"
          >
            {cta.texto}
          </a>
        ) : (
          <span className="font-mono text-xs leading-none text-foundry-type-dim sm:shrink-0 sm:text-right">
            {cta.texto}
          </span>
        )}
      </div>
    </article>
  );
}
