import { obtenerBaseApiPortfolio } from '@/lib/api-config';
import type { PortfolioProject } from '@/lib/types/portfolio-project';

export async function listarProyectos(): Promise<PortfolioProject[]> {
  const resp = await fetch(`${obtenerBaseApiPortfolio()}/projects/`, {
    cache: 'no-store',
  });
  if (!resp.ok) {
    throw new Error('Error al cargar proyectos');
  }
  return resp.json() as Promise<PortfolioProject[]>;
}
