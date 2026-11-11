'use client';

import { useCallback, useState, useSyncExternalStore } from 'react';
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
  window.addEventListener('storage', onStoreChange);
  return () => {
    window.removeEventListener(EVENTO_CONSENTIMIENTO_ANALYTICS, onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
}

function snapshotConsentimientoCliente(): EstadoConsentimientoAnalytics {
  return obtenerEstadoConsentimiento();
}

function snapshotConsentimientoServidor(): EstadoConsentimientoAnalytics {
  return 'pending';
}

/** SSR: false; cliente: true — sin useEffect ni setState en efecto (eslint react-hooks/set-state-in-effect). */
function snapshotEsCliente(): boolean {
  return true;
}

function snapshotEsServidor(): boolean {
  return false;
}

export default function AnalyticsConsentBanner() {
  const esCliente = useSyncExternalStore(
    () => () => undefined,
    snapshotEsCliente,
    snapshotEsServidor,
  );

  const estadoStore = useSyncExternalStore(
    suscribirConsentimiento,
    snapshotConsentimientoCliente,
    snapshotConsentimientoServidor,
  );
  const [estadoUi, setEstadoUi] = useState<EstadoConsentimientoAnalytics | null>(null);
  const estado = estadoUi ?? estadoStore;

  const aceptar = useCallback(() => {
    guardarConsentimiento('accepted');
    setEstadoUi('accepted');
  }, []);

  const rechazar = useCallback(() => {
    guardarConsentimiento('rejected');
    setEstadoUi('rejected');
  }, []);

  if (!esCliente || estado !== 'pending' || !consentimientoAnalyticsPendiente()) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="analytics-consent-title"
      aria-describedby="analytics-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-foundry-seam bg-foundry-chrome p-4 shadow-[0_-8px_28px_rgba(14,10,6,0.45)] sm:p-5"
    >
      <div className="container mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <p
            id="analytics-consent-title"
            className="font-display text-xs tracking-widest text-foundry-brass"
          >
            Privacidad · analytics
          </p>
          <p
            id="analytics-consent-desc"
            className="mt-1 text-sm text-foundry-type-mute"
          >
            Usamos eventos anónimos (secciones visitadas, clics en navegación) para mejorar el
            portfolio. No vendemos datos. Puedes rechazar y seguir navegando con normalidad.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={rechazar}
            className="border border-foundry-seam px-4 py-2 font-display text-xs uppercase tracking-wider text-foundry-type-mute transition-colors hover:border-foundry-type-dim hover:bg-foundry-ground"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={aceptar}
            className="foundry-cta !py-2 !text-xs"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
