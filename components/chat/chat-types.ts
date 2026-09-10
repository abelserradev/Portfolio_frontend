import type { QuoteDraft } from '@/lib/chat-api';

export interface MensajeUi {
  readonly id: string;
  readonly rol: 'user' | 'assistant';
  readonly texto: string;
  readonly whatsappUrl?: string;
  readonly whatsappDisplay?: string;
}

export type CanalContacto = 'email' | 'whatsapp';

export interface FormularioCotizacion {
  readonly email: string;
  readonly nombre: string;
  readonly telefono: string;
  readonly descripcion: string;
  readonly presupuesto: string;
  readonly canal: CanalContacto;
}

export interface EstadoWhatsAppPostEnvio {
  readonly url: string | null;
  readonly prefill: string | null;
  readonly popupBloqueado: boolean;
}

export type { QuoteDraft };
