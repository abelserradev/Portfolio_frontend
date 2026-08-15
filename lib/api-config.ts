const DEFAULT_API_BASE = 'http://127.0.0.1:8010/api/v1';

export function obtenerBaseApiPortfolio(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE;
}

/** URL del backend que redirecciona a live_url tras contar una visita. */
export function obtenerUrlRedirectVisita(projectId: number): string {
  return `${obtenerBaseApiPortfolio()}/projects/${projectId}/visit`;
}
