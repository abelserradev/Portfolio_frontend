import type { PortfolioProject, PortfolioProjectStatus } from '@/lib/types/portfolio-project';
import { obtenerConfigContacto } from '@/lib/site-config';

export interface EtiquetaMision {
  readonly texto: string;
  readonly claseBadge: string;
}

export function normalizarStatusProyecto(
  status: string | undefined | null,
): PortfolioProjectStatus {
  const valores: PortfolioProjectStatus[] = [
    'live',
    'mvp_active',
    'in_development',
    'coming_soon',
  ];
  if (status && valores.includes(status as PortfolioProjectStatus)) {
    return status as PortfolioProjectStatus;
  }
  return 'live';
}

export function obtenerEtiquetaMision(
  status: PortfolioProjectStatus,
  hayUrlPublica: boolean,
): EtiquetaMision {
  switch (status) {
    case 'mvp_active':
      return {
        texto: 'MVP ACTIVO',
        claseBadge:
          'border-yellow-400/60 bg-yellow-400/15 text-yellow-300 animate-pulse',
      };
    case 'in_development':
      return {
        texto: 'EN DESARROLLO',
        claseBadge: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400',
      };
    case 'coming_soon':
      return {
        texto: 'PRÓXIMAMENTE',
        claseBadge: 'border-fuchsia-500/50 bg-fuchsia-500/10 text-fuchsia-400',
      };
    case 'live':
    default:
      return hayUrlPublica
        ? {
            texto: 'EN PRODUCCIÓN',
            claseBadge: 'border-magenta-500/50 bg-magenta-500/10 text-magenta-400',
          }
        : {
            texto: 'EN CURSO',
            claseBadge: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400',
          };
  }
}

export function obtenerSubtituloMision(status: PortfolioProjectStatus): string | null {
  if (status === 'mvp_active') {
    return 'Demo web disponible · App móvil en desarrollo · Camino al mercado';
  }
  if (status === 'in_development') {
    return 'En proceso de deploy público';
  }
  return null;
}

export function obtenerTextoCtaMision(
  status: PortfolioProjectStatus,
  hayUrlPublica: boolean,
): { readonly texto: string; readonly puedeVisitar: boolean } {
  if (!hayUrlPublica) {
    return { texto: '> En proceso de deploy', puedeVisitar: false };
  }
  if (status === 'mvp_active') {
    return { texto: '> PROBAR DEMO WEB', puedeVisitar: true };
  }
  return { texto: '> ACCEDER A MISIÓN', puedeVisitar: true };
}

export function obtenerEnlaceEarlyAdopter(): string {
  const email = obtenerConfigContacto().email;
  const asunto = encodeURIComponent('Mobile Gastos — early adopter');
  const cuerpo = encodeURIComponent(
    'Hola, me interesa seguir el lanzamiento de Mobile Gastos (beta / app móvil).',
  );
  return `mailto:${email}?subject=${asunto}&body=${cuerpo}`;
}

export function particionarProyectosMisiones(projects: readonly PortfolioProject[]) {
  const destacados = projects.filter((p) => p.is_featured === true);
  const resto = projects.filter((p) => p.is_featured !== true);
  return { destacados, resto };
}
