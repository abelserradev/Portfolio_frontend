"use client";

import { useProjects } from '../../app/hooks/useProjects';
import { particionarProyectosMisiones } from '@/lib/mission-presentation';
import MissionCard from './missioncard';

export default function MissionGrid() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <section id="misiones" className="container mx-auto scroll-mt-28 px-4 py-12 sm:scroll-mt-24 sm:py-16">
        <div className="text-cyan-400 font-mono text-center py-20">
          <span className="animate-pulse">Cargando misiones...</span>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section id="misiones" className="container mx-auto scroll-mt-28 px-4 py-12 sm:scroll-mt-24 sm:py-16">
        <div className="text-magenta-500 font-mono text-center py-20">Error al conectar con el núcleo</div>
      </section>
    );
  }

  const { destacados, resto } = particionarProyectosMisiones(projects);

  return (
    <section
      id="misiones"
      className="container mx-auto scroll-mt-28 px-4 py-12 sm:scroll-mt-24 sm:py-16"
    >
      {destacados.length > 0 ? (
        <div className="mb-14 sm:mb-16">
          <h2 className="mb-2 text-center font-orbitron text-2xl tracking-widest text-yellow-300 sm:text-3xl">
            {'// MISIÓN DESTACADA'}
          </h2>
          <p className="mb-8 text-center font-mono text-xs text-gray-500 sm:mb-10">
            Producto con desarrollo activo y salida al mercado en curso
          </p>
          <div className="grid grid-cols-1 gap-5 sm:gap-8">
            {destacados.map((project) => (
              <MissionCard key={project.id} mission={project} destacada />
            ))}
          </div>
        </div>
      ) : null}

      <h2 className="mb-10 text-center font-orbitron text-2xl tracking-widest text-cyan-300 sm:mb-12 sm:text-3xl">
        {destacados.length > 0 ? '// OTRAS MISIONES' : '// MISIONES COMPLETADAS'}
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {resto.map((project) => (
          <MissionCard key={project.id} mission={project} />
        ))}
      </div>
    </section>
  );
}
