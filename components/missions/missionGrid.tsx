"use client";

import { useProjects } from '../../app/hooks/useProjects';
import MissionCard from './missioncard';

export default function MissionGrid() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <section id="misiones" className="container mx-auto scroll-mt-24 px-4 py-16">
        <div className="text-cyan-400 font-mono text-center py-20">
          <span className="animate-pulse">Cargando misiones...</span>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section id="misiones" className="container mx-auto scroll-mt-24 px-4 py-16">
        <div className="text-magenta-500 font-mono text-center py-20">Error al conectar con el núcleo</div>
      </section>
    );
  }

  return (
    <section
      id="misiones"
      className="container mx-auto scroll-mt-24 px-4 py-16"
    >
      <h2 className="font-orbitron text-3xl text-center mb-12 text-cyan-300 tracking-widest">
        {'// MISIONES COMPLETADAS'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <MissionCard key={project.id} mission={project} />
        ))}
      </div>
    </section>
  );
}