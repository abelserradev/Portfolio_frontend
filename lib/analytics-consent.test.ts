import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  analyticsHabilitado,
  consentimientoAnalyticsPendiente,
  guardarConsentimiento,
  obtenerEstadoConsentimiento,
} from '@/lib/analytics-consent';

describe('analytics-consent', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    localStorage.clear();
  });

  it('bloquea analytics hasta aceptar', () => {
    expect(obtenerEstadoConsentimiento()).toBe('pending');
    expect(analyticsHabilitado()).toBe(false);
    expect(consentimientoAnalyticsPendiente()).toBe(true);

    guardarConsentimiento('accepted');
    expect(analyticsHabilitado()).toBe(true);
    expect(consentimientoAnalyticsPendiente()).toBe(false);
  });

  it('respeta NEXT_PUBLIC_ANALYTICS_ENABLED=false', () => {
    vi.stubEnv('NEXT_PUBLIC_ANALYTICS_ENABLED', 'false');
    guardarConsentimiento('accepted');
    expect(analyticsHabilitado()).toBe(false);
    expect(consentimientoAnalyticsPendiente()).toBe(false);
  });
});
