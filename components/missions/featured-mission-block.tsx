'use client';

import type { PortfolioProject } from '@/lib/types/portfolio-project';
import MissionCard from './missioncard';
import FeaturedMission3dShowcase from './featured-mission-3d-showcase';

/** Bloque compuesto: tarjeta de misión + demo 3D (chunk visual + detalle). */
export default function FeaturedMissionBlock({
  mission,
  plateIndex = 1,
}: {
  readonly mission: PortfolioProject;
  readonly plateIndex?: number;
}) {
  return (
    <article
      className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8"
      aria-label={`Misión destacada: ${mission.title}`}
    >
      <div className="order-2 lg:order-1 lg:col-span-5">
        <MissionCard
          mission={mission}
          destacada
          enLayoutDestacado
          plateIndex={plateIndex}
        />
      </div>
      <div className="order-1 lg:order-2 lg:col-span-7">
        <FeaturedMission3dShowcase tituloMision={mission.title} />
      </div>
    </article>
  );
}
