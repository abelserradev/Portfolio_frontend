import { afterEach, describe, expect, it, vi } from 'vitest';
import { listarProyectos } from '@/lib/projects-api';

describe('listarProyectos', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('fetch a /projects/ con no-store', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.test/api/v1');
    const mockData = [{ id: 1, title: 'P1' }];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await listarProyectos();

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.test/api/v1/projects/',
      { cache: 'no-store' },
    );
    expect(result).toEqual(mockData);
  });

  it('lanza error si respuesta no ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );
    await expect(listarProyectos()).rejects.toThrow('Error al cargar proyectos');
  });
});
