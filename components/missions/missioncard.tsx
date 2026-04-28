"use client";

import { motion } from 'framer-motion';
import type { PortfolioProject } from '@/lib/types/portfolio-project';
import { obtenerUrlRedirectVisita } from '@/lib/api-config';

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
      className="bg-black/60 backdrop-blur border border-cyan-500/50 p-5 rounded-sm relative overflow-hidden group"
      style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 10%, 100% 100%, 5% 100%, 0% 90%)' }}
    >
      {/* Línea de estado */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 to-magenta-500" />
      <div className="flex justify-between items-start">
        <h3 className="font-orbitron text-xl text-cyan-300 group-hover:text-white transition-colors">
          {mission.title}
        </h3>
        <span className="font-mono text-xs text-magenta-400 border border-magenta-500/50 px-2 py-0.5 bg-magenta-500/10">
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
      <div className="mt-4 flex justify-between items-end">
        <div className="flex items-center gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={i} className="w-2 h-2 bg-yellow-400 rounded-full shadow-neon" />
          ))}
        </div>
        {hayUrlPublica ? (
          <a
            href={visitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-magenta-400 hover:text-magenta-300 underline decoration-dotted transition-colors shrink-0"
          >
            {'>'} ACCEDER A MISIÓN
          </a>
        ) : (
          <span className="font-mono text-xs text-cyan-400/85 shrink-0 text-right leading-none">
            {'>'} En proceso de deploy
          </span>
        )}
      </div>
      {/* Efecto de barrido */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform -skew-x-12 -translate-x-1/2" />
    </motion.div>
  );
}