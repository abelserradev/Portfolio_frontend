'use client';

import { useCallback, useSyncExternalStore } from 'react';
import {
  consentimientoAnalyticsPendiente,
  EVENTO_CONSENTIMIENTO_ANALYTICS,
  guardarConsentimiento,
  obtenerEstadoConsentimiento,
  type EstadoConsentimientoAnalytics,
} from '@/lib/analytics-consent';

function suscribirConsentimiento(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => undefined;
  }
  window.addEventListener(EVENTO_CONSENTIMIENTO_ANALYTICS, onStoreChange);
  return () => window.removeEventListener(EVENTO_CONSENTIMIENTO_ANALYTICS, onStoreChange);
}

function leerEstadoConsentimiento(): EstadoConsentimientoAnalytics {
  return obtenerEstadoConsentimiento();
}

function estadoConsentimientoServidor(): EstadoConsentimientoAnalytics {
  return 'pending';
}

export default function AnalyticsConsentBanner() {
  const estado = useSyncExternalStore(
    suscribirConsentimiento,
    leerEstadoConsentimiento,
    estadoConsentimientoServidor,
  );

  const aceptar = useCallback(() => {
    guardarConsentimiento('accepted');
  }, []);

  const rechazar = useCallback(() => {
    guardarConsentimiento('rejected');
  }, []);

  if (estado !== 'pending' || !consentimientoAnalyticsPendiente()) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="analytics-consent-title"
      aria-describedby="analytics-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-cyan-500/30 bg-slate-950/95 p-4 shadow-[0_-8px_32px_rgba(6,182,212,0.12)] backdrop-blur-sm sm:p-5"
    >
      <div className="container mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <p
            id="analytics-consent-title"
            className="font-mono text-xs tracking-widest text-cyan-400/90"
          >
            {'// PRIVACIDAD_ANALYTICS'}
          </p>
          <p id="analytics-consent-desc" className="mt-1 font-tech text-sm text-gray-300">
            Usamos eventos anónimos (secciones visitadas, clics en navegación) para mejorar el
            portfolio. No vendemos datos. Puedes rechazar y seguir navegando con normalidad.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={rechazar}
            className="border border-gray-600 px-4 py-2 font-mono text-xs text-gray-300 transition-colors hover:border-gray-500 hover:bg-gray-900"
          >
            RECHAZAR
          </button>
          <button
            type="button"
            onClick={aceptar}
            className="border border-cyan-500/60 bg-cyan-500/15 px-4 py-2 font-mono text-xs text-cyan-100 transition-colors hover:bg-cyan-500/25"
          >
            ACEPTAR
          </button>
        </div>
      </div>
    </div>
  );
}
