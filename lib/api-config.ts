const DEFAULT_API_BASE = 'http://127.0.0.1:8010/api/v1';
const API_V1_SUFFIX = '/api/v1';

/** Coolify/.env a veces apunta solo al host; el backend expone todo bajo /api/v1. */
export function obtenerBaseApiPortfolio(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!raw) {
    return DEFAULT_API_BASE;
  }
  const sinBarraFinal = raw.replace(/\/+$/, '');
  if (sinBarraFinal.endsWith(API_V1_SUFFIX)) {
    return sinBarraFinal;
  }
  return `${sinBarraFinal}${API_V1_SUFFIX}`;
}

/** URL del backend que redirecciona a live_url tras contar una visita. */
export function obtenerUrlRedirectVisita(projectId: number): string {
  return `${obtenerBaseApiPortfolio()}/projects/${projectId}/visit`;
}
