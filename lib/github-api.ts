import { obtenerBaseApiPortfolio } from '@/lib/api-config';

export interface LanguageStat {
  readonly name: string;
  readonly percentage: number;
  readonly color: string;
}

export interface ActivityCell {
  readonly month: string;
  readonly day: number;
  readonly level: number;
}

export interface ActivityScanResponse {
  readonly months: string[];
  readonly days_per_month: number;
  readonly cells: ActivityCell[];
}

export async function obtenerLenguajesGithub(): Promise<LanguageStat[]> {
  const resp = await fetch(`${obtenerBaseApiPortfolio()}/github/languages`, {
    cache: 'no-store',
  });
  if (!resp.ok) {
    throw new Error('Failed to fetch github stats');
  }
  return resp.json() as Promise<LanguageStat[]>;
}

export async function obtenerActividadGithub(): Promise<ActivityScanResponse> {
  const resp = await fetch(`${obtenerBaseApiPortfolio()}/github/activity`, {
    cache: 'no-store',
  });
  if (!resp.ok) {
    throw new Error('Failed to fetch github activity');
  }
  return resp.json() as Promise<ActivityScanResponse>;
}
