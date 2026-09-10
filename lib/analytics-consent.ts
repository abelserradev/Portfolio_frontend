/** Consentimiento GDPR: analytics solo tras aceptación explícita. */

export type EstadoConsentimientoAnalytics = 'pending' | 'accepted' | 'rejected';

const CONSENT_KEY = 'buildforge_analytics_consent';
export const EVENTO_CONSENTIMIENTO_ANALYTICS = 'buildforge:analytics-consent';

function analyticsDeshabilitadoPorEnv(): boolean {
  const flag = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED?.trim().toLowerCase();
  return flag === 'false' || flag === '0' || flag === 'off';
}

export function obtenerEstadoConsentimiento(): EstadoConsentimientoAnalytics {
  if (typeof window === 'undefined') {
    return 'pending';
  }
  const guardado = localStorage.getItem(CONSENT_KEY);
  if (guardado === 'accepted' || guardado === 'rejected') {
    return guardado;
  }
  return 'pending';
}

export function analyticsHabilitado(): boolean {
  if (analyticsDeshabilitadoPorEnv()) {
    return false;
  }
  return obtenerEstadoConsentimiento() === 'accepted';
}

export function consentimientoAnalyticsPendiente(): boolean {
  if (analyticsDeshabilitadoPorEnv()) {
    return false;
  }
  return obtenerEstadoConsentimiento() === 'pending';
}

export function guardarConsentimiento(estado: 'accepted' | 'rejected'): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(CONSENT_KEY, estado);
  window.dispatchEvent(
    new CustomEvent<EstadoConsentimientoAnalytics>(EVENTO_CONSENTIMIENTO_ANALYTICS, {
      detail: estado,
    }),
  );
}
