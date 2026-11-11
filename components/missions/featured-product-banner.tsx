'use client';

import { obtenerEnlaceEarlyAdopter } from '@/lib/mission-presentation';
import { obtenerUrlRedirectVisita } from '@/lib/api-config';

/** Banner fijo en home: el MVP con más tracción no se pierde entre el grid */
interface FeaturedProductBannerProps {
  readonly projectId: number;
  readonly demoUrl?: string | null;
}

export default function FeaturedProductBanner({
  projectId,
  demoUrl,
}: FeaturedProductBannerProps) {
  const visitUrl = obtenerUrlRedirectVisita(projectId);
  const earlyAdopterHref = obtenerEnlaceEarlyAdopter();
  const hayDemo = Boolean(demoUrl?.trim());

  return (
    <section
      id="producto-destacado"
      className="container mx-auto scroll-mt-28 px-4 pb-4 pt-6 sm:scroll-mt-24 sm:pb-6 sm:pt-8"
      aria-label="Producto destacado Mobile Gastos"
    >
      <div className="foundry-plate foundry-plate-register relative p-5 sm:p-8">
        <span className="foundry-plate-id">PAT · DESTACADA</span>
        <h2 className="mt-3 font-display text-xl text-foundry-type-bright sm:text-2xl">
          Mobile Gastos · MVP en evolución
        </h2>
        <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-foundry-type-mute sm:text-base">
          Finanzas personales con demo web hoy y app móvil en desarrollo activo.
          Presupuestos, OCR de comprobantes y conversión BCV — orientado a salir al
          mercado (beta y tiendas en preparación).
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {hayDemo ? (
            <a href={visitUrl} target="_blank" rel="noopener noreferrer" className="foundry-cta">
              Probar demo web
            </a>
          ) : null}
          <a
            href="#misiones"
            className="inline-flex justify-center border border-foundry-seam px-5 py-2.5 font-display text-sm uppercase tracking-wider text-foundry-type-mute transition-colors hover:border-foundry-brass hover:text-foundry-brass"
          >
            Ver misión destacada
          </a>
          <a
            href={earlyAdopterHref}
            className="inline-flex justify-center border border-foundry-brass/50 bg-foundry-brass/10 px-5 py-2.5 font-display text-sm uppercase tracking-wider text-foundry-brass transition-colors hover:bg-foundry-brass/20"
          >
            Early adopter
          </a>
        </div>
      </div>
    </section>
  );
}
