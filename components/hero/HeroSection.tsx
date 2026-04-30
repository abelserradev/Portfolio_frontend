"use client";

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100svh-96px)] scroll-mt-28 flex-col items-center justify-center px-4 pt-16 text-center sm:min-h-[90vh] sm:scroll-mt-24 sm:pt-20"
    >
      {/* Marco pegado al bloque del título: en móvil el rectángulo abs del section no coincidía con el ancho real del glitch */}
      <div className="relative z-0 mx-auto mb-6 w-fit max-w-[min(100%,calc(100vw-2rem))] px-3 py-2 text-center sm:max-w-none sm:px-5 sm:py-3">
        <motion.div
          className="pointer-events-none absolute inset-0 border border-cyan-500/30"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden
        />
        {/* clamp más conservador en viewport estrecho: la palabra larga + Orbitron no debe rebasar el marco */}
        <div className="relative font-orbitron text-[clamp(1.625rem,min(9vw,7vmin),6rem)] font-bold leading-tight text-white md:text-8xl">
          <span className="relative z-10 inline-block max-w-full">Abelserradev</span>
          <span className="absolute left-1/2 top-0 -translate-x-1/2 text-cyan-500 opacity-70 animate-pulse" aria-hidden="true">
            Abelserradev
          </span>
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 text-magenta-500 opacity-70 animate-ping"
            style={{ animationDuration: '3s' }}
            aria-hidden="true"
          >
            Abelserradev
          </span>
        </div>
      </div>

      <h2 className="mb-8 min-h-12 px-2 font-tech text-lg text-gray-400 md:text-2xl">
        <TypeAnimation
          sequence={[
            'FullStack Developer',
            2000,
            'Backend Warrior',
            2000,
            'Frontend Wizard',
            2000,
            '...AI Developer',
            2000,
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
        />
      </h2>

      <div className="flex w-full max-w-sm flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center sm:gap-6">
        <a href="#misiones" className="group relative inline-flex items-center justify-center gap-2 border border-cyan-500/50 bg-black/40 px-5 py-3 font-mono text-sm text-cyan-300 transition-colors hover:bg-cyan-500/10 sm:px-8 sm:text-base">
          <span>VER_MISIONES</span>
          <span className="text-magenta-400">↓</span>
          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-cyan-400 group-hover:w-full transition-all duration-500" />
        </a>
        <a href="#contacto" className="group relative inline-flex items-center justify-center gap-2 border border-magenta-500/50 bg-black/40 px-5 py-3 font-mono text-sm text-magenta-300 transition-colors hover:bg-magenta-500/10 sm:px-8 sm:text-base">
          <span>ESTABLECER_CONTACTO</span>
          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-magenta-400 group-hover:w-full transition-all duration-500" />
        </a>
      </div>
    </section>
  );
}