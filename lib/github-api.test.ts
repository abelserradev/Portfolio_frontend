import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  obtenerActividadGithub,
  obtenerLenguajesGithub,
} from '@/lib/github-api';

describe('github-api', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('obtenerLenguajesGithub parsea JSON', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.test/api/v1');
    const payload = [{ name: 'TypeScript', percentage: 80, color: '#fff' }];
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => payload }),
    );

    const data = await obtenerLenguajesGithub();
    expect(data).toEqual(payload);
  });

  it('obtenerActividadGithub lanza si falla', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false }),
    );
    await expect(obtenerActividadGithub()).rejects.toThrow(
      'Failed to fetch github activity',
    );
  });
});
