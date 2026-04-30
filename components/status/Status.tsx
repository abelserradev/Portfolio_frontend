"use client";

import { motion } from 'framer-motion';
import { useGithub } from '../../app/hooks/useGithub';

/** Clases Tailwind completas por acento: no concatenar huecos (--color--), que el compilador omitiría las utilidades */
function obtenerClasesTemaAccent(accento: string) {
  switch (accento) {
    case "cyan":
      return {
        textoPct: "text-cyan-400",
        barra: "bg-gradient-to-r from-cyan-500 to-cyan-300",
      };
    case "yellow":
      return {
        textoPct: "text-yellow-400",
        barra: "bg-gradient-to-r from-yellow-500 to-yellow-300",
      };
    case "magenta":
      return {
        textoPct: "text-fuchsia-400",
        barra: "bg-gradient-to-r from-fuchsia-500 to-fuchsia-300",
      };
    default:
      return {
        textoPct: "text-gray-300",
        barra: "bg-gradient-to-r from-gray-500 to-gray-300",
      };
  }
}

export default function StatusPanel() {
  const { languages, isLoading, error } = useGithub();

  return (
    <section id="skills" className="container mx-auto scroll-mt-28 px-4 py-12 sm:scroll-mt-24 sm:py-16">
      <h2 className="mb-10 text-center font-orbitron text-xl tracking-wider text-cyan-300 sm:mb-12 sm:text-2xl">
        {'<SYS.STATUS>'}
      </h2>
      <div className="max-w-2xl mx-auto space-y-6">
        {isLoading && (
          <div className="text-cyan-400 font-mono text-center py-10 animate-pulse">
            HACKING GITHUB DATABANKS...
          </div>
        )}

        {error && (
          <div className="text-fuchsia-500 font-mono text-center py-10">
            [ERROR] Conexión fallida: {error}
          </div>
        )}

        {!isLoading && !error && languages.map((skill) => {
          const tema = obtenerClasesTemaAccent(skill.color ?? 'gray');
          return (
          <div key={skill.name}>
            <div className="mb-1 flex min-w-0 justify-between gap-3 font-mono text-xs sm:text-sm">
              <span className="min-w-0 truncate text-gray-400">{`> ${skill.name}`}</span>
              <span className={tema.textoPct}>{skill.percentage}%</span>
            </div>
            <div className="w-full h-2 bg-black/60 border border-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${tema.barra}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
          );
        })}
      </div>
    </section>
  );
}
