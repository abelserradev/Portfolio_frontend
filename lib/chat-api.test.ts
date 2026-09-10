import { afterEach, describe, expect, it, vi } from 'vitest';
import { enviarCotizacionChat, enviarMensajeChat } from '@/lib/chat-api';

describe('chat-api', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('enviarMensajeChat devuelve respuesta parseada', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.test/api/v1');
    const payload = {
      session_id: 's1',
      reply: 'Hola',
      flow_state: 'chat',
    };
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => payload }),
    );

    const resp = await enviarMensajeChat('Hola', null);
    expect(resp.reply).toBe('Hola');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.test/api/v1/chat/message',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('enviarMensajeChat lanza con detalle del servidor', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        text: async () => 'Rate limit',
      }),
    );
    await expect(enviarMensajeChat('x')).rejects.toThrow('Rate limit');
  });

  it('enviarCotizacionChat envía payload esperado', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.test/api/v1');
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ lead_id: 9, status: 'pending' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await enviarCotizacionChat({
      sessionId: 'sess-abc',
      clientEmail: 'a@b.com',
      clientPhone: '+58412',
      projectDescription: 'Landing page completa',
      preferredChannel: 'email',
    });

    const body = JSON.parse(
      (fetchMock.mock.calls[0][1] as RequestInit).body as string,
    );
    expect(body.session_id).toBe('sess-abc');
    expect(body.preferred_channel).toBe('email');
  });
});
