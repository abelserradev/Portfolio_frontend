'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('[global-error]', error);
    }
  }, [error]);

  return (
    <html lang="es">
      <body className="min-h-screen bg-black text-white antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="max-w-md rounded-xl border border-red-500/30 bg-red-950/20 p-8 text-center font-mono">
            <p className="text-sm uppercase tracking-wider text-red-400">Error crítico</p>
            <h1 className="mt-3 text-xl font-semibold">Buildforge no pudo iniciarse</h1>
            <p className="mt-2 text-sm text-slate-400">
              Recarga la página. Si persiste, prueba más tarde.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 rounded-lg border border-cyan-500/50 bg-cyan-950/40 px-4 py-2 text-sm text-cyan-300 hover:bg-cyan-900/40"
            >
              Reintentar
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
