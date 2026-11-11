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
      <body
        className="min-h-screen antialiased"
        style={{ background: '#2a2218', color: '#e8dcc8' }}
      >
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div
            className="max-w-md p-8 text-center"
            style={{
              border: '1px solid #5c4a2e',
              background: '#1c1710',
              boxShadow: '6px 10px 28px rgba(14, 10, 6, 0.55)',
            }}
          >
            <h1 className="text-xl font-semibold" style={{ color: '#f3ead8' }}>
              Buildforge no pudo iniciarse
            </h1>
            <p className="mt-2 text-sm" style={{ color: '#c4b49a' }}>
              Recarga la página. Si persiste, prueba más tarde.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 px-4 py-2 text-sm font-semibold uppercase tracking-wide"
              style={{ background: '#c9a227', color: '#1c1710' }}
            >
              Reintentar
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
