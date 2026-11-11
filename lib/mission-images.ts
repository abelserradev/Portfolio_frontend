import type { PortfolioProject } from '@/lib/types/portfolio-project';

/**
 * API image_url is often empty in prod; keep workshop plates filled with
 * representative stills until the catalog has permanent URLs.
 * TODO: drop fallbacks once every project has a durable image_url in the API.
 */
const FALLBACK_BY_PROJECT_ID: Readonly<Record<number, string>> = {
  1: '/media/missions/condominio.png',
  2: '/media/missions/pokemon.png',
  3: '/media/missions/mobile-gastos.png',
  5: '/media/missions/sambilstore.jpg',
  6: '/media/missions/exchange-rate.png',
};

export function obtenerImagenMision(
  project: Pick<PortfolioProject, 'id' | 'image_url'>,
): string | null {
  const fromApi = project.image_url?.trim();
  if (fromApi) {
    return fromApi;
  }
  return FALLBACK_BY_PROJECT_ID[project.id] ?? null;
}

/** Featured first, then the rest that still have a resolvable plate image. */
export function ordenarProyectosConImagen(
  projects: readonly PortfolioProject[],
): PortfolioProject[] {
  const conPlaca = projects.filter((p) => obtenerImagenMision(p));
  return [...conPlaca].sort((a, b) => {
    const fa = a.is_featured === true ? 0 : 1;
    const fb = b.is_featured === true ? 0 : 1;
    if (fa !== fb) return fa - fb;
    return (a.sort_order ?? 0) - (b.sort_order ?? 0);
  });
}
