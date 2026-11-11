"use client";

import { useProjects } from '@/hooks/useProjects';
import { particionarProyectosMisiones } from '@/lib/mission-presentation';
import MissionCard from './missioncard';
import FeaturedMissionBlock from './featured-mission-block';
import MissionsIntroBlock from './missions-intro-block';

export default function MissionGrid() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <section id="misiones" className="container mx-auto scroll-mt-28 px-4 py-12 sm:scroll-mt-24 sm:py-16">
        <div className="py-20 text-center font-mono text-sm text-foundry-brass">
          <span>Registrando placas…</span>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section id="misiones" className="container mx-auto scroll-mt-28 px-4 py-12 sm:scroll-mt-24 sm:py-16">
        <div className="py-20 text-center font-mono text-sm text-foundry-type-mute">
          No se pudo leer el catálogo de misiones
        </div>
      </section>
    );
  }

  const { destacados, resto } = particionarProyectosMisiones(projects);

  return (
    <section
      id="misiones"
      className="container mx-auto scroll-mt-28 px-4 py-12 sm:scroll-mt-24 sm:py-16"
    >
      <MissionsIntroBlock />

      {destacados.length > 0 ? (
        <div className="mb-14 sm:mb-16">
          <h2 className="mb-2 text-center font-display text-2xl tracking-wide text-foundry-brass sm:text-3xl">
            Misión destacada
          </h2>
          <p className="mb-8 text-center text-xs text-foundry-type-dim sm:mb-10">
            Demos activas y en desarrollo
          </p>
          <div className="flex flex-col gap-10 sm:gap-12">
            {destacados.map((project, i) => (
              <FeaturedMissionBlock
                key={project.id}
                mission={project}
                plateIndex={i + 1}
              />
            ))}
          </div>
        </div>
      ) : null}

      <h2 className="mb-10 text-center font-display text-2xl tracking-wide text-foundry-type-bright sm:mb-12 sm:text-3xl">
        {destacados.length > 0 ? 'Otras misiones' : 'Misiones'}
      </h2>
      {/* Billing-rank density: tight gaps, fixed-scale plates */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-3">
        {resto.map((project, i) => (
          <MissionCard
            key={project.id}
            mission={project}
            plateIndex={destacados.length + i + 1}
          />
        ))}
      </div>
    </section>
  );
}
