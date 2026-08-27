export const EVENTO_ABRIR_CHAT = 'buildforge:open-chat';

export type ChatIntent = 'general' | 'cotizacion';

export interface AbrirChatDetalle {
  readonly intent?: ChatIntent;
  readonly mensajeInicial?: string;
}

export function dispararAbrirChat(detalle: AbrirChatDetalle = {}): void {
  if (typeof window === 'undefined') {
    return;
  }
  void import('@/lib/analytics-api').then(({ registrarEventoAnalytics }) => {
    registrarEventoAnalytics({
      event: 'cta.click',
      cta: detalle.intent === 'cotizacion' ? 'solicitar_cotizacion' : 'abrir_chat',
      metadata: { intent: detalle.intent ?? 'general' },
    });
  });
  window.dispatchEvent(
    new CustomEvent<AbrirChatDetalle>(EVENTO_ABRIR_CHAT, { detail: detalle }),
  );
}
