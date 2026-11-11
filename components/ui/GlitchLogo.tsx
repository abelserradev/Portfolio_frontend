"use client";

import { obtenerConfigMarca } from '@/lib/site-config';

/** Marca de taller — tipografía de fundición, sin clones glitch. */
export default function GlitchLogo() {
  const { logoText } = obtenerConfigMarca();

  return (
    <span className="inline-block font-display text-lg font-bold tracking-[0.14em] text-foundry-type-bright sm:text-xl sm:tracking-[0.16em]">
      {logoText}
    </span>
  );
}
