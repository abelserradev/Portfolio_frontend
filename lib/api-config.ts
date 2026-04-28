const DEFAULT_API_BASE = 'http://localhost:8000/api/v1';

export function obtenerBaseApiPortfolio(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE;
}

/** URL del backend que redirecciona a live_url tras contar una visita. */
export function obtenerUrlRedirectVisita(projectId: number): string {
  return `${obtenerBaseApiPortfolio()}/projects/${projectId}/visit`;
}
