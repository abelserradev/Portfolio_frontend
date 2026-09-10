import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useBuildforgeChat } from '@/components/chat/use-buildforge-chat';

const enviarMensajeChat = vi.fn();
const enviarCotizacionChat = vi.fn();
const registrarEventoAnalytics = vi.fn();

vi.mock('@/lib/chat-api', () => ({
  enviarMensajeChat: (...args: unknown[]) => enviarMensajeChat(...args),
  enviarCotizacionChat: (...args: unknown[]) => enviarCotizacionChat(...args),
}));

vi.mock('@/lib/analytics-api', () => ({
  registrarEventoAnalytics: (...args: unknown[]) => registrarEventoAnalytics(...args),
}));

describe('useBuildforgeChat', () => {
  beforeEach(() => {
    localStorage.setItem('buildforge_analytics_consent', 'accepted');
    sessionStorage.clear();
    enviarMensajeChat.mockResolvedValue({
      session_id: 'sess-test-1',
      reply: 'Hola, ¿en qué te ayudo?',
      flow_state: 'discovery',
      quote_draft: null,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('abrirWidget marca el chat como abierto', () => {
    const { result } = renderHook(() => useBuildforgeChat());
    expect(result.current.abierto).toBe(false);

    act(() => {
      result.current.abrirWidget('fab');
    });

    expect(result.current.abierto).toBe(true);
    expect(registrarEventoAnalytics).toHaveBeenCalledWith(
      expect.objectContaining({ event: 'chat.widget.open' }),
    );
  });

  it('enviarTexto agrega mensaje de usuario y respuesta del asistente', async () => {
    const { result } = renderHook(() => useBuildforgeChat());

    await act(async () => {
      await result.current.enviarTexto('Quiero una landing');
    });

    await waitFor(() => {
      expect(result.current.mensajes).toHaveLength(2);
    });
    expect(result.current.mensajes[0]?.rol).toBe('user');
    expect(result.current.mensajes[1]?.rol).toBe('assistant');
    expect(enviarMensajeChat).toHaveBeenCalledWith('Quiero una landing', null);
  });
});
