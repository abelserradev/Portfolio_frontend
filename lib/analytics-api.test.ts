import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { obtenerVisitorId, registrarEventoAnalytics } from '@/lib/analytics-api';

describe('analytics-api', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('obtenerVisitorId persiste en localStorage tras consentimiento', () => {
    localStorage.setItem('buildforge_analytics_consent', 'accepted');
    const id1 = obtenerVisitorId();
    const id2 = obtenerVisitorId();
    expect(id1).toBe(id2);
    expect(localStorage.getItem('buildforge_visitor_id')).toBe(id1);
  });

  it('no envía eventos sin consentimiento', () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    registrarEventoAnalytics({ event: 'page.load' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('registrarEventoAnalytics usa fetch cuando sendBeacon no existe', () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.test/api/v1');
    localStorage.setItem('buildforge_analytics_consent', 'accepted');
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('navigator', { sendBeacon: undefined } as Navigator);

    registrarEventoAnalytics({ event: 'page.load' });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.test/api/v1/analytics/event',
      expect.objectContaining({ method: 'POST', keepalive: true }),
    );
  });
});
