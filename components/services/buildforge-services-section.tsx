'use client';

import { obtenerConfigMarca } from '@/lib/site-config';
import { dispararAbrirChat } from '@/lib/chat-events';
import ServicesMediaPlayer from './services-media-player';
import ProcessTeachDiagram from './process-teach-diagram';

export default function BuildforgeServicesSection() {
  const marca = obtenerConfigMarca();

  return (
    <section
      id="servicios"
      className="container mx-auto scroll-mt-28 px-4 py-16 sm:scroll-mt-24 sm:py-20"
      aria-label="Servicios de software Buildforge"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-display text-2xl tracking-wide text-foundry-type-bright sm:text-3xl">
          {marca.brandTagline}
        </h2>
        <p className="mx-auto mt-4 max-w-[65ch] text-center text-sm leading-relaxed text-foundry-type-mute sm:text-base">
          {marca.brandPitch}
        </p>

        <ProcessTeachDiagram />

        <ul className="mx-auto mt-10 max-w-2xl space-y-2 border-t border-foundry-seam pt-8">
          {marca.servicesList.map((servicio) => (
            <li
              key={servicio}
              className="flex items-baseline gap-3 border-b border-foundry-seam/60 py-2.5 text-sm text-foundry-type sm:text-base"
            >
              <span className="foundry-plate-id shrink-0" aria-hidden>
                ◆
              </span>
              {servicio}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <ServicesMediaPlayer
            videoUrl={marca.servicesVideoUrl}
            posterUrl={marca.servicesPosterUrl}
            altPoster={`Servicios de software — ${marca.brandName}`}
          />
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a href="#misiones" className="foundry-cta">
            Ver proyectos
          </a>
          <button
            type="button"
            onClick={() => dispararAbrirChat({ intent: 'cotizacion' })}
            className="inline-flex justify-center border border-foundry-brass/70 bg-transparent px-6 py-2.5 font-display text-sm uppercase tracking-wider text-foundry-brass transition-colors hover:bg-foundry-brass/10"
          >
            Solicitar cotización
          </button>
        </div>
      </div>
    </section>
  );
}
