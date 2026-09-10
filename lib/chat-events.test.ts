import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  EVENTO_ABRIR_CHAT,
  dispararAbrirChat,
  type AbrirChatDetalle,
} from '@/lib/chat-events';

const registrarEventoAnalytics = vi.fn();

vi.mock('@/lib/analytics-api', () => ({
  registrarEventoAnalytics: (...args: unknown[]) => registrarEventoAnalytics(...args),
}));

describe('dispararAbrirChat', () => {
  beforeEach(() => {
    registrarEventoAnalytics.mockClear();
  });

  it('emite CustomEvent con detalle', () => {
    const handler = vi.fn();
    window.addEventListener(EVENTO_ABRIR_CHAT, handler);

    const detalle: AbrirChatDetalle = {
      intent: 'cotizacion',
      mensajeInicial: 'Hola',
    };
    dispararAbrirChat(detalle);

    expect(handler).toHaveBeenCalledTimes(1);
    const ev = handler.mock.calls[0][0] as CustomEvent<AbrirChatDetalle>;
    expect(ev.detail).toEqual(detalle);
    window.removeEventListener(EVENTO_ABRIR_CHAT, handler);
  });

  it('registra analytics de cta cotización', async () => {
    dispararAbrirChat({ intent: 'cotizacion' });
    await vi.waitFor(() => {
      expect(registrarEventoAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          event: 'cta.click',
          cta: 'solicitar_cotizacion',
        }),
      );
    });
  });
});
