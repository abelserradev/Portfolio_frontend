'use client';

import { motion } from 'framer-motion';
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
      className="container mx-auto scroll-mt-28 px-4 pb-4 pt-4 sm:scroll-mt-24 sm:pb-6 sm:pt-6"
      aria-label="Producto destacado Mobile Gastos"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-sm border border-yellow-400/40 bg-linear-to-br from-yellow-500/10 via-black/80 to-cyan-500/10 p-5 backdrop-blur sm:p-8"
        style={{
          clipPath:
            'polygon(0% 0%, 96% 0%, 100% 8%, 100% 100%, 4% 100%, 0% 92%)',
        }}
      >
        <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-yellow-400 via-cyan-400 to-fuchsia-500" />
        <p className="font-mono text-xs tracking-widest text-yellow-300/90">
          {'// PRODUCTO_EN_CONSTRUCCIÓN'}
        </p>
        <h2 className="mt-2 font-orbitron text-xl text-white sm:text-2xl">
          Mobile Gastos · MVP en evolución
        </h2>
        <p className="mt-3 max-w-3xl font-tech text-sm leading-relaxed text-gray-300 sm:text-base">
          Finanzas personales con demo web hoy y app móvil en desarrollo activo.
          Presupuestos, OCR de comprobantes y conversión BCV — orientado a salir al
          mercado (beta y tiendas en preparación).
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {hayDemo ? (
            <a
              href={visitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center border border-cyan-500/60 bg-cyan-500/10 px-5 py-2.5 font-mono text-sm text-cyan-200 transition-colors hover:bg-cyan-500/20"
            >
              PROBAR_DEMO_WEB
            </a>
          ) : null}
          <a
            href="#misiones"
            className="inline-flex justify-center border border-cyan-500/40 px-5 py-2.5 font-mono text-sm text-cyan-300/90 transition-colors hover:border-cyan-400/70"
          >
            VER_MISIÓN_DESTACADA
          </a>
          <a
            href={earlyAdopterHref}
            className="inline-flex justify-center border border-fuchsia-500/50 bg-fuchsia-500/10 px-5 py-2.5 font-mono text-sm text-fuchsia-200 transition-colors hover:bg-fuchsia-500/15"
          >
            EARLY_ADOPTER
          </a>
        </div>
      </motion.div>
    </section>
  );
}
