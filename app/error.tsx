'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('[app/error]', error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-white">
      <div className="max-w-md rounded-xl border border-red-500/30 bg-red-950/20 p-8 text-center font-mono">
        <p className="text-sm uppercase tracking-wider text-red-400">Error de página</p>
        <h1 className="mt-3 text-xl font-semibold text-slate-100">
          No pudimos cargar esta vista
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Puede ser un fallo temporal. Intenta de nuevo o vuelve al inicio.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-cyan-500/50 bg-cyan-950/40 px-4 py-2 text-sm text-cyan-300 hover:bg-cyan-900/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
