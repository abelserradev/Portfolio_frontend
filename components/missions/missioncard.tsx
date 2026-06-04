"use client";

import { motion } from 'framer-motion';
import type { PortfolioProject } from '@/lib/types/portfolio-project';
import { obtenerUrlRedirectVisita } from '@/lib/api-config';
import {
  normalizarStatusProyecto,
  obtenerEtiquetaMision,
  obtenerSubtituloMision,
  obtenerTextoCtaMision,
} from '@/lib/mission-presentation';

const nivelesSenal = ['senal-baja', 'senal-media', 'senal-alta', 'senal-maxima'] as const;

export default function MissionCard({
  mission,
  destacada = false,
}: {
  readonly mission: PortfolioProject;
  readonly destacada?: boolean;
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
  const esMvpActivo = status === 'mvp_active';

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: esMvpActivo ? '0 0 30px #facc1580' : '0 0 25px #ff00ff80' }}
      className={`group relative overflow-hidden rounded-sm border bg-black/60 p-4 backdrop-blur sm:p-5 ${
        destacada
          ? 'border-yellow-400/60 ring-1 ring-yellow-400/25 md:col-span-2 lg:col-span-3'
          : 'border-cyan-500/50'
      }`}
      style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 10%, 100% 100%, 5% 100%, 0% 90%)' }}
    >
      <div
        className={`absolute top-0 left-0 h-1 w-full bg-linear-to-r ${
          esMvpActivo ? 'from-yellow-400 via-cyan-400 to-fuchsia-500' : 'from-cyan-400 to-magenta-500'
        }`}
      />
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="min-w-0 wrap-break-word font-orbitron text-lg text-cyan-300 transition-colors group-hover:text-white sm:text-xl">
          {mission.title}
        </h3>
        <span
          className={`w-fit shrink-0 border px-2 py-0.5 font-mono text-xs ${etiqueta.claseBadge}`}
        >
          {etiqueta.texto}
        </span>
      </div>
      {subtitulo ? (
        <p className="mt-1 font-mono text-xs text-yellow-200/80">{subtitulo}</p>
      ) : null}
      <p className="mt-2 text-gray-400 font-tech text-sm line-clamp-3 sm:line-clamp-4">
        {mission.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tecnologias.map((tech) => (
          <span
            key={tech}
            className={`text-xs font-mono border px-2 py-0.5 ${
              tech === 'MVP' || tech === 'Web live' || tech === 'Mobile WIP'
                ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300'
                : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-1">
          {nivelesSenal.map((senal) => (
            <span
              key={senal}
              className={`w-2 h-2 rounded-full shadow-neon ${
                esMvpActivo ? 'bg-yellow-400' : 'bg-yellow-400/70'
              }`}
            />
          ))}
        </div>
        {cta.puedeVisitar ? (
          <a
            href={visitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-magenta-400 underline decoration-dotted transition-colors hover:text-magenta-300 sm:shrink-0"
          >
            {cta.texto}
          </a>
        ) : (
          <span className="font-mono text-xs leading-none text-cyan-400/85 sm:shrink-0 sm:text-right">
            {cta.texto}
          </span>
        )}
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-linear-to-r from-transparent via-cyan-500 to-transparent transform -skew-x-12 -translate-x-1/2" />
    </motion.div>
  );
}
