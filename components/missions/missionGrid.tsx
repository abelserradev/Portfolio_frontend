"use client";

import { useProjects } from '../../app/hooks/useProjects';
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

  return (
    <section
      id="misiones"
      className="container mx-auto scroll-mt-28 px-4 py-12 sm:scroll-mt-24 sm:py-16"
    >
      <h2 className="mb-10 text-center font-orbitron text-2xl tracking-widest text-cyan-300 sm:mb-12 sm:text-3xl">
        {'// MISIONES COMPLETADAS'}
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <MissionCard key={project.id} mission={project} />
        ))}
      </div>
    </section>
  );
}