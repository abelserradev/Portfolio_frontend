'use client';

import { motion } from 'framer-motion';
import { obtenerConfigMarca } from '@/lib/site-config';
import ServicesMediaPlayer from './services-media-player';

export default function BuildforgeServicesSection() {
  const marca = obtenerConfigMarca();

  return (
    <section
      id="servicios"
      className="container mx-auto scroll-mt-28 px-4 py-12 sm:scroll-mt-24 sm:py-16"
      aria-label="Servicios de software Buildforge"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl"
      >
        <p className="text-center font-mono text-xs tracking-widest text-cyan-400/90">
          {'// SERVICIOS_BUILDFORGE'}
        </p>
        <h2 className="mt-2 text-center font-orbitron text-2xl tracking-wider text-white sm:text-3xl">
          {marca.brandTagline}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center font-tech text-sm leading-relaxed text-gray-300 sm:text-base">
          {marca.brandPitch}
        </p>

        <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2">
          {marca.servicesList.map((servicio) => (
            <li
              key={servicio}
              className="flex items-center gap-2 rounded border border-cyan-800/30 bg-black/40 px-3 py-2 font-mono text-xs text-cyan-200/90 sm:text-sm"
            >
              <span className="text-fuchsia-400" aria-hidden="true">
                ▸
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
          <a
            href="#misiones"
            className="inline-flex justify-center border border-cyan-500/60 bg-cyan-500/10 px-6 py-2.5 font-mono text-sm text-cyan-200 transition-colors hover:bg-cyan-500/20"
          >
            VER_PROYECTOS
          </a>
          <a
            href="#contacto"
            className="inline-flex justify-center border border-fuchsia-500/50 bg-fuchsia-500/10 px-6 py-2.5 font-mono text-sm text-fuchsia-200 transition-colors hover:bg-fuchsia-500/15"
          >
            SOLICITAR_COTIZACIÓN
          </a>
        </div>
      </motion.div>
    </section>
  );
}
