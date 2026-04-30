"use client";

import { motion } from 'framer-motion';
export default function GlitchLogo() {
  const text = "</IRACUZA>";

  return (
    <div className="relative inline-block font-orbitron text-lg font-bold tracking-[0.2em] text-white sm:text-2xl sm:tracking-widest">
      <motion.div
        className="relative z-10"
        animate={{ x: [0, -2, 2, -1, 1, 0], opacity: [1, 0.8, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        {text}
      </motion.div>
      {/* Capa cian desplazada */}
      <motion.div
        className="absolute top-0 left-0 opacity-70 mix-blend-screen text-cyan-400"
        animate={{ x: [0, 2, -2, 1, -1, 0], opacity: [0, 0.6, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      >
        {text}
      </motion.div>
      {/* Capa magenta */}
      <motion.div
        className="absolute top-0 left-0 opacity-70 mix-blend-screen text-magenta-500"
        animate={{ x: [0, -1, 1, -2, 2, 0], opacity: [0, 0.4, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
      >
        {text}
      </motion.div>
    </div>
  );
}