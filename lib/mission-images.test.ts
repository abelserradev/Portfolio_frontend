import { describe, expect, it } from 'vitest';
import {
  obtenerImagenMision,
  ordenarProyectosConImagen,
} from '@/lib/mission-images';
import type { PortfolioProject } from '@/lib/types/portfolio-project';

function stub(partial: Partial<PortfolioProject> & Pick<PortfolioProject, 'id'>): PortfolioProject {
  return {
    title: 't',
    description: 'd',
    tech_stack: null,
    created_at: '2026-01-01',
    visits: 0,
    ...partial,
  };
}

describe('obtenerImagenMision', () => {
  it('prefers API image_url over local fallback', () => {
    expect(
      obtenerImagenMision(
        stub({ id: 3, image_url: 'https://cdn.example.com/gastos.png' }),
      ),
    ).toBe('https://cdn.example.com/gastos.png');
  });

  it('falls back to workshop still when API is empty', () => {
    expect(obtenerImagenMision(stub({ id: 3, image_url: null }))).toBe(
      '/media/missions/mobile-gastos.png',
    );
  });
});

describe('ordenarProyectosConImagen', () => {
  it('puts featured missions first among plates with images', () => {
    const actual = ordenarProyectosConImagen([
      stub({ id: 2, is_featured: false }),
      stub({ id: 3, is_featured: true }),
      stub({ id: 4, is_featured: false }),
    ]);
    expect(actual.map((p) => p.id)).toEqual([3, 2]);
  });
});
