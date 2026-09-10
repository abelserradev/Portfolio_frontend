import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatErrorFallback } from '@/components/errors/chat-error-fallback';

describe('ChatErrorFallback', () => {
  it('muestra mensaje y ejecuta callback al reintentar', async () => {
    const user = userEvent.setup();
    const onReintentar = vi.fn();
    render(<ChatErrorFallback onReintentar={onReintentar} />);

    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText(/Asistente no disponible/)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /Reintentar chat/i }));
    expect(onReintentar).toHaveBeenCalledTimes(1);
  });
});
