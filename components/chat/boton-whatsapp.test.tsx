import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BotonWhatsApp } from '@/components/chat/boton-whatsapp';

describe('BotonWhatsApp', () => {
  it('renderiza enlace seguro wa.me', () => {
    render(
      <BotonWhatsApp
        url="https://wa.me/584128034283?text=hola"
        etiqueta="Abrir chat"
      />,
    );
    const link = screen.getByRole('link', { name: /Abrir chat/i });
    expect(link.getAttribute('href')).toBe('https://wa.me/584128034283?text=hola');
    expect(link.getAttribute('rel')).toContain('noopener');
  });

  it('no renderiza nada si URL no permitida', () => {
    const { container } = render(
      <BotonWhatsApp url="https://evil.example/phish" etiqueta="Phish" />,
    );
    expect(container.firstChild).toBeNull();
  });
});
