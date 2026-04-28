import type { ReactNode } from 'react';

export default function CRTEffect({ children }: { readonly children?: ReactNode }) {
  return (
    <div className="relative">
      {/* Curvatura de monitor */}
      <div className="pointer-events-none fixed inset-0 z-50 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
      {/* Línea de barrido horizontal */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-1 w-full animate-scan" />
      {children}
    </div>
  );
}