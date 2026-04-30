"use client";

import { motion } from 'framer-motion';
import type { PortfolioProject } from '@/lib/types/portfolio-project';
import { obtenerUrlRedirectVisita } from '@/lib/api-config';

const nivelesSenal = ['senal-baja', 'senal-media', 'senal-alta', 'senal-maxima'] as const;

export default function MissionCard({ mission }: { readonly mission: PortfolioProject }) {
  const visitUrl = obtenerUrlRedirectVisita(mission.id);
  const tecnologias = (mission.tech_stack ?? '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const hayUrlPublica = Boolean(
    mission.live_url && mission.live_url.trim().length > 0,
  );
  const etiquetaProgreso = hayUrlPublica ? 'COMPLETADO' : 'EN CURSO';

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0 0 25px #ff00ff80' }}
      className="group relative overflow-hidden rounded-sm border border-cyan-500/50 bg-black/60 p-4 backdrop-blur sm:p-5"
      style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 10%, 100% 100%, 5% 100%, 0% 90%)' }}
    >
      {/* Línea de estado */}
      <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-cyan-400 to-magenta-500" />
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="min-w-0 wrap-break-word font-orbitron text-lg text-cyan-300 transition-colors group-hover:text-white sm:text-xl">
          {mission.title}
        </h3>
        <span className="w-fit shrink-0 border border-magenta-500/50 bg-magenta-500/10 px-2 py-0.5 font-mono text-xs text-magenta-400">
          {etiquetaProgreso}
        </span>
      </div>
      <p className="mt-2 text-gray-400 font-tech text-sm line-clamp-3">{mission.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tecnologias.map((tech) => (
          <span key={tech} className="text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 text-cyan-400">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-1">
          {nivelesSenal.map((senal) => (
            <span key={senal} className="w-2 h-2 bg-yellow-400 rounded-full shadow-neon" />
          ))}
        </div>
        {hayUrlPublica ? (
          <a
            href={visitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-magenta-400 underline decoration-dotted transition-colors hover:text-magenta-300 sm:shrink-0"
          >
            {'>'} ACCEDER A MISIÓN
          </a>
        ) : (
          <span className="font-mono text-xs leading-none text-cyan-400/85 sm:shrink-0 sm:text-right">
            {'>'} En proceso de deploy
          </span>
        )}
      </div>
      {/* Efecto de barrido */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-linear-to-r from-transparent via-cyan-500 to-transparent transform -skew-x-12 -translate-x-1/2" />
    </motion.div>
  );
}