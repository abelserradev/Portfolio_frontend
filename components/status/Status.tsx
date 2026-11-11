"use client";

import { motion } from 'framer-motion';
import { useGithub } from '@/hooks/useGithub';

function obtenerClasesTemaAccent(accento: string) {
  switch (accento) {
    case "cyan":
      return {
        textoPct: "text-foundry-brass",
        barra: "bg-gradient-to-r from-foundry-brass-deep to-foundry-brass",
      };
    case "yellow":
      return {
        textoPct: "text-foundry-brass",
        barra: "bg-gradient-to-r from-[#a67c00] to-foundry-brass",
      };
    case "magenta":
      return {
        textoPct: "text-foundry-type-mute",
        barra: "bg-gradient-to-r from-foundry-seam to-foundry-wood-light",
      };
    default:
      return {
        textoPct: "text-foundry-type-mute",
        barra: "bg-gradient-to-r from-foundry-seam to-foundry-type-dim",
      };
  }
}

export default function StatusPanel() {
  const { languages, isLoading, error } = useGithub();

  return (
    <section
      id="skills"
      className="container mx-auto scroll-mt-28 px-4 py-14 sm:scroll-mt-24 sm:py-16"
    >
      <h2 className="mb-10 text-center font-display text-xl tracking-wide text-foundry-type-bright sm:mb-12 sm:text-2xl">
        Aleaciones en uso
      </h2>
      <div className="mx-auto max-w-2xl space-y-5">
        {isLoading && (
          <div className="py-10 text-center font-mono text-sm text-foundry-brass">
            Midiendo lingotes…
          </div>
        )}

        {error && (
          <div className="py-10 text-center font-mono text-sm text-foundry-type-mute">
            No se pudo leer el inventario: {error}
          </div>
        )}

        {!isLoading && !error && languages.map((skill) => {
          const tema = obtenerClasesTemaAccent(skill.color ?? 'gray');
          return (
          <div key={skill.name}>
            <div className="mb-1.5 flex min-w-0 justify-between gap-3 text-xs sm:text-sm">
              <span className="min-w-0 truncate text-foundry-type-mute">{skill.name}</span>
              <span className={`font-mono tabular-nums ${tema.textoPct}`}>
                {skill.percentage}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden border border-foundry-seam bg-foundry-chrome">
              <motion.div
                className={`h-full ${tema.barra}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
              />
            </div>
          </div>
          );
        })}
      </div>
    </section>
  );
}
