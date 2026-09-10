import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  obtenerConfigContacto,
  obtenerConfigMarca,
  obtenerEnlacesSociales,
} from '@/lib/site-config';

describe('obtenerConfigMarca', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('usa defaults cuando no hay env custom', () => {
    vi.unstubAllEnvs();
    const cfg = obtenerConfigMarca();
    expect(cfg.brandName).toBeTruthy();
    expect(cfg.servicesList.length).toBeGreaterThan(0);
  });

  it('parsea lista de servicios separada por pipe', () => {
    vi.stubEnv('NEXT_PUBLIC_SERVICES_LIST', 'Web|APIs|IA');
    const cfg = obtenerConfigMarca();
    expect(cfg.servicesList).toEqual(['Web', 'APIs', 'IA']);
  });
});

describe('obtenerConfigContacto', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('respeta email custom', () => {
    vi.stubEnv('NEXT_PUBLIC_CONTACT_EMAIL', 'hola@buildforge.work');
    expect(obtenerConfigContacto().email).toBe('hola@buildforge.work');
  });
});

describe('obtenerEnlacesSociales', () => {
  it('incluye cuatro canales con mailto en mail', () => {
    const contacto = obtenerConfigContacto();
    const links = obtenerEnlacesSociales(contacto);
    expect(links).toHaveLength(4);
    expect(links[0].url).toMatch(/^mailto:/);
    expect(links.map((l) => l.canal)).toEqual(['mail', 'github', 'linkedin', 'instagram']);
  });
});
