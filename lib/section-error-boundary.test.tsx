import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SectionErrorBoundary } from '@/components/errors/section-error-boundary';

function SiempreFalla(): never {
  throw new Error('fallo simulado');
}

describe('SectionErrorBoundary', () => {
  it('renderiza hijos estables', () => {
    render(
      <SectionErrorBoundary section="test">
        <p>Contenido OK</p>
      </SectionErrorBoundary>,
    );
    expect(screen.getByText('Contenido OK')).toBeTruthy();
  });

  it('muestra fallback con nombre de sección', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <SectionErrorBoundary section="misiones">
        <SiempreFalla />
      </SectionErrorBoundary>,
    );
    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText(/Error en misiones/)).toBeTruthy();
  });

  it('recupera tras reintentar', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();
    let debeFallar = true;

    function FallaCondicional() {
      if (debeFallar) {
        throw new Error('fallo simulado');
      }
      return <p>Recuperado</p>;
    }

    render(
      <SectionErrorBoundary section="misiones">
        <FallaCondicional />
      </SectionErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toBeTruthy();
    debeFallar = false;
    await user.click(screen.getByRole('button', { name: /Reintentar/i }));
    expect(screen.getByText('Recuperado')).toBeTruthy();
  });
});
