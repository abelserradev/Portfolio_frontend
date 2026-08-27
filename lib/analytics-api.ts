import { obtenerBaseApiPortfolio } from '@/lib/api-config';

export type EventoAnalyticsCliente =
  | 'page.load'
  | 'section.view'
  | 'nav.click'
  | 'chat.widget.open'
  | 'chat.form.visible'
  | 'cta.click';

const VISITOR_KEY = 'buildforge_visitor_id';

function generarVisitorId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `v-${Date.now()}`;
}

export function obtenerVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = generarVisitorId();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export function registrarEventoAnalytics(input: {
  readonly event: EventoAnalyticsCliente;
  readonly sessionId?: string | null;
  readonly section?: string;
  readonly cta?: string;
  readonly metadata?: Record<string, string | number | boolean>;
}): void {
  if (typeof window === 'undefined') return;
  const url = `${obtenerBaseApiPortfolio()}/analytics/event`;
  const body = JSON.stringify({
    event: input.event,
    visitor_id: obtenerVisitorId(),
    session_id: input.sessionId ?? undefined,
    section: input.section,
    cta: input.cta,
    metadata: input.metadata,
  });
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const ok = navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
      if (ok) return;
    }
  } catch {
    // sendBeacon puede fallar en algunos navegadores; fetch como respaldo
  }
  void fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => undefined);
}
