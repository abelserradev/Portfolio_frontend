import { describe, expect, it } from 'vitest';
import { generarIdCliente } from '@/lib/ids';

describe('generarIdCliente', () => {
  it('genera strings distintos en llamadas sucesivas', () => {
    const a = generarIdCliente();
    const b = generarIdCliente();
    expect(a).not.toBe(b);
  });

  it('no devuelve cadena vacía', () => {
    expect(generarIdCliente().length).toBeGreaterThan(0);
  });
});
