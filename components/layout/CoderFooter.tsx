"use client";

import { obtenerConfigMarca } from '@/lib/site-config';

export default function CodeFooter() {
  const { brandName } = obtenerConfigMarca();

  return (
    <footer className="mt-8 w-full border-t border-foundry-seam bg-foundry-chrome px-5 py-5 sm:mt-12 sm:px-7">
      <div className="container mx-auto flex min-w-0 flex-col items-center justify-between gap-3 font-mono text-[11px] text-foundry-type-dim md:flex-row md:text-xs">
        <span>REGISTER · FIXED SCALE</span>
        <span className="text-center">
          © {new Date().getFullYear()} {brandName} · buildforge.work
        </span>
      </div>
    </footer>
  );
}
