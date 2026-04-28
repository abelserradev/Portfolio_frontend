"use client";

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] scroll-mt-24 flex flex-col items-center justify-center text-center px-4 pt-20"
    >
      {/* Marco de escaneo */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-cyan-500/30 pointer-events-none"
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Glitch decorativo */}
      <div className="font-orbitron text-6xl md:text-8xl font-bold text-white mb-6 relative">
        <span className="relative z-10">Abelserradev</span>
        <span className="absolute top-0 left-0 text-cyan-500 opacity-70 animate-pulse" aria-hidden="true">Abelserradev</span>
        <span className="absolute top-0 left-0 text-magenta-500 opacity-70 animate-ping" style={{ animationDuration: '3s' }} aria-hidden="true">Abelserradev</span>
      </div>

      <h2 className="font-tech text-xl md:text-2xl text-gray-400 mb-8 h-12">
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

      <div className="flex gap-6">
        <a href="#misiones" className="group relative inline-flex items-center gap-2 bg-black/40 border border-cyan-500/50 px-8 py-3 font-mono text-cyan-300 hover:bg-cyan-500/10 transition-colors">
          <span>VER_MISIONES</span>
          <span className="text-magenta-400">↓</span>
          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-cyan-400 group-hover:w-full transition-all duration-500" />
        </a>
        <a href="#contacto" className="group relative inline-flex items-center gap-2 bg-black/40 border border-magenta-500/50 px-8 py-3 font-mono text-magenta-300 hover:bg-magenta-500/10 transition-colors">
          <span>ESTABLECER_CONTACTO</span>
          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-magenta-400 group-hover:w-full transition-all duration-500" />
        </a>
      </div>
    </section>
  );
}