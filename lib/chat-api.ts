import { obtenerBaseApiPortfolio } from '@/lib/api-config';

export interface QuoteDraft {
  readonly project_type?: string | null;
  readonly scope_summary?: string | null;
  readonly estimated_range_usd?: string | null;
  readonly disclaimer?: string | null;
}

export interface ChatMessageResponse {
  readonly session_id: string;
  readonly reply: string;
  readonly flow_state: string;
  readonly quote_draft?: QuoteDraft | null;
  readonly whatsapp_url?: string | null;
  readonly whatsapp_display?: string | null;
}

export interface ChatConfig {
  readonly whatsapp_display: string;
  readonly whatsapp_e164: string;
  readonly disclaimer: string;
  readonly brand_name: string;
}

export interface QuoteSubmitResponse {
  readonly lead_id: number;
  readonly status: string;
  readonly whatsapp_url?: string | null;
  readonly whatsapp_display?: string | null;
  readonly email_notified?: boolean;
}

function baseChatUrl(): string {
  return `${obtenerBaseApiPortfolio()}/chat`;
}

export async function obtenerConfigChat(): Promise<ChatConfig> {
  const resp = await fetch(`${baseChatUrl()}/config`, { cache: 'no-store' });
  if (!resp.ok) {
    throw new Error('No se pudo cargar configuración del chat');
  }
  return resp.json() as Promise<ChatConfig>;
}

export async function enviarMensajeChat(
  message: string,
  sessionId?: string | null,
): Promise<ChatMessageResponse> {
  const resp = await fetch(`${baseChatUrl()}/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, session_id: sessionId ?? undefined }),
    // Ollama en CPU puede tardar 15–60 s en la primera respuesta
    signal: AbortSignal.timeout(120_000),
  });
  if (!resp.ok) {
    const detalle = await resp.text();
    throw new Error(detalle || 'Error al enviar mensaje');
  }
  return resp.json() as Promise<ChatMessageResponse>;
}

export async function enviarCotizacionChat(input: {
  readonly sessionId: string;
  readonly clientEmail: string;
  readonly clientName?: string;
  readonly clientPhone: string;
  readonly projectDescription: string;
  readonly clientBudget?: string;
  readonly preferredChannel: 'email' | 'whatsapp';
}): Promise<QuoteSubmitResponse> {
  const resp = await fetch(`${baseChatUrl()}/quote/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id: input.sessionId,
      client_email: input.clientEmail,
      client_name: input.clientName,
      client_phone: input.clientPhone,
      project_description: input.projectDescription,
      client_budget: input.clientBudget,
      preferred_channel: input.preferredChannel,
    }),
  });
  if (!resp.ok) {
    const detalle = await resp.text();
    throw new Error(detalle || 'Error al enviar cotización');
  }
  return resp.json() as Promise<QuoteSubmitResponse>;
}

export function construirEnlaceWhatsApp(e164: string, texto: string): string {
  const digits = e164.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(texto)}`;
}
