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
  window.dispatchEvent(
    new CustomEvent<AbrirChatDetalle>(EVENTO_ABRIR_CHAT, { detail: detalle }),
  );
}
