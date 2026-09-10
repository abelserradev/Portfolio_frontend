import { describe, expect, it } from 'vitest';
import {
  esUrlWhatsAppSegura,
  extraerTextoDesdeWaUrl,
  sanitizarUrlWhatsApp,
} from '@/lib/url-safety';

describe('esUrlWhatsAppSegura', () => {
  it('acepta wa.me con https', () => {
    expect(esUrlWhatsAppSegura('https://wa.me/584128034283?text=hola')).toBe(true);
  });

  it('acepta api.whatsapp.com', () => {
    expect(esUrlWhatsAppSegura('https://api.whatsapp.com/send?phone=584')).toBe(true);
  });

  it('rechaza http', () => {
    expect(esUrlWhatsAppSegura('http://wa.me/123')).toBe(false);
  });

  it('rechaza dominio arbitrario', () => {
    expect(esUrlWhatsAppSegura('https://evil.example/phish')).toBe(false);
  });
});

describe('sanitizarUrlWhatsApp', () => {
  it('devuelve null para URL no permitida', () => {
    expect(sanitizarUrlWhatsApp('https://evil.example')).toBeNull();
  });

  it('conserva URL válida', () => {
    const url = 'https://wa.me/584?text=hi';
    expect(sanitizarUrlWhatsApp(url)).toBe(url);
  });
});

describe('extraerTextoDesdeWaUrl', () => {
  it('decodifica parámetro text', () => {
    const url = 'https://wa.me/584?text=Hola%20mundo';
    expect(extraerTextoDesdeWaUrl(url)).toBe('Hola mundo');
  });
});
