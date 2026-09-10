import { describe, expect, it } from 'vitest';
import { validarFormularioCotizacion } from '@/lib/chat-quote-validation';

describe('validarFormularioCotizacion', () => {
  const base = {
    sessionId: 'sess-1',
    email: 'user@example.com',
    telefono: '+584121234567',
    descripcion: 'Landing con catálogo y formulario',
  };

  it('acepta datos mínimos válidos', () => {
    expect(validarFormularioCotizacion(base).valido).toBe(true);
  });

  it('rechaza descripción corta', () => {
    const r = validarFormularioCotizacion({ ...base, descripcion: 'corto' });
    expect(r.valido).toBe(false);
    expect(r.error).toMatch(/10 caracteres/);
  });

  it('rechaza teléfono corto', () => {
    const r = validarFormularioCotizacion({ ...base, telefono: '123' });
    expect(r.valido).toBe(false);
  });

  it('rechaza sin sesión', () => {
    const r = validarFormularioCotizacion({ ...base, sessionId: null });
    expect(r.valido).toBe(false);
  });
});
