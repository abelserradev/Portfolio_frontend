import { afterEach, describe, expect, it, vi } from 'vitest';
import { obtenerBaseApiPortfolio, obtenerUrlRedirectVisita } from '@/lib/api-config';

describe('obtenerBaseApiPortfolio', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('default local cuando falta env', () => {
    vi.unstubAllEnvs();
    delete process.env.NEXT_PUBLIC_API_URL;
    expect(obtenerBaseApiPortfolio()).toBe('http://127.0.0.1:8010/api/v1');
  });

  it('usa NEXT_PUBLIC_API_URL si está definida', () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.example.com/api/v1');
    expect(obtenerBaseApiPortfolio()).toBe('https://api.example.com/api/v1');
  });
});

describe('obtenerUrlRedirectVisita', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('compone ruta de visit con id', () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.example.com/api/v1');
    expect(obtenerUrlRedirectVisita(42)).toBe(
      'https://api.example.com/api/v1/projects/42/visit',
    );
  });
});
