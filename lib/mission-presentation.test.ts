import { describe, expect, it, vi } from 'vitest';
import {
  normalizarStatusProyecto,
  obtenerEtiquetaMision,
  obtenerSubtituloMision,
  obtenerTextoCtaMision,
  obtenerEnlaceEarlyAdopter,
  particionarProyectosMisiones,
} from '@/lib/mission-presentation';
import type { PortfolioProject } from '@/lib/types/portfolio-project';

vi.mock('@/lib/site-config', () => ({
  obtenerConfigContacto: () => ({ email: 'test@buildforge.work' }),
}));

const proyectoBase: PortfolioProject = {
  id: 1,
  title: 'Demo',
  description: 'Desc',
  tech_stack: 'Next.js',
  visits: 0,
  created_at: '2026-01-01T00:00:00Z',
};

describe('normalizarStatusProyecto', () => {
  it('conserva status válido', () => {
    expect(normalizarStatusProyecto('mvp_active')).toBe('mvp_active');
  });

  it('fallback a live si status desconocido', () => {
    expect(normalizarStatusProyecto('legacy')).toBe('live');
    expect(normalizarStatusProyecto(null)).toBe('live');
  });
});

describe('obtenerEtiquetaMision', () => {
  it('mvp_active tiene badge animado', () => {
    const r = obtenerEtiquetaMision('mvp_active', true);
    expect(r.texto).toBe('MVP ACTIVO');
    expect(r.claseBadge).toContain('animate-pulse');
  });

  it('live con URL pública → EN PRODUCCIÓN', () => {
    expect(obtenerEtiquetaMision('live', true).texto).toBe('EN PRODUCCIÓN');
  });

  it('live sin URL → EN CURSO', () => {
    expect(obtenerEtiquetaMision('live', false).texto).toBe('EN CURSO');
  });
});

describe('obtenerTextoCtaMision', () => {
  it('sin URL pública no permite visitar', () => {
    const r = obtenerTextoCtaMision('live', false);
    expect(r.puedeVisitar).toBe(false);
    expect(r.texto).toContain('deploy');
  });

  it('mvp con URL usa copy de demo', () => {
    const r = obtenerTextoCtaMision('mvp_active', true);
    expect(r.puedeVisitar).toBe(true);
    expect(r.texto).toContain('DEMO');
  });
});

describe('obtenerSubtituloMision', () => {
  it('devuelve subtítulo solo para estados específicos', () => {
    expect(obtenerSubtituloMision('mvp_active')).toContain('Demo web');
    expect(obtenerSubtituloMision('live')).toBeNull();
  });
});

describe('obtenerEnlaceEarlyAdopter', () => {
  it('genera mailto con asunto codificado', () => {
    const url = obtenerEnlaceEarlyAdopter();
    expect(url).toMatch(/^mailto:test@buildforge\.work\?/);
    expect(url).toContain('subject=');
    expect(url).toContain('body=');
  });
});

describe('particionarProyectosMisiones', () => {
  it('separa destacados del resto', () => {
    const projects: PortfolioProject[] = [
      { ...proyectoBase, id: 1, is_featured: true },
      { ...proyectoBase, id: 2, is_featured: false },
      { ...proyectoBase, id: 3 },
    ];
    const { destacados, resto } = particionarProyectosMisiones(projects);
    expect(destacados).toHaveLength(1);
    expect(destacados[0].id).toBe(1);
    expect(resto).toHaveLength(2);
  });
});
