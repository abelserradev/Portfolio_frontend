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
    <div className="flex min-h-screen flex-col items-center justify-center bg-foundry-ground px-4 text-foundry-type">
      <div className="foundry-plate max-w-md p-8 text-center">
        <h1 className="font-display text-xl font-semibold text-foundry-type-bright">
          No pudimos cargar esta vista
        </h1>
        <p className="mt-2 text-sm text-foundry-type-mute">
          Puede ser un fallo temporal. Intenta de nuevo o vuelve al inicio.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button type="button" onClick={reset} className="foundry-cta">
            Reintentar
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-foundry-seam px-4 py-2 text-sm text-foundry-type-mute transition-colors hover:border-foundry-brass hover:text-foundry-type"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
