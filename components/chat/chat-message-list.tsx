import { AssistantAvatar } from '@/components/chat/assistant-avatar';
import { BotonWhatsApp } from '@/components/chat/boton-whatsapp';
import type { MensajeUi } from '@/components/chat/chat-types';

export function ChatMessageList({
  mensajes,
  enviado,
}: {
  readonly mensajes: MensajeUi[];
  readonly enviado: boolean;
}) {
  return (
    <>
      {mensajes.map((m) => (
        <div
          key={m.id}
          className={`flex gap-2.5 ${m.rol === 'user' ? 'flex-row-reverse' : ''}`}
        >
          {m.rol === 'assistant' && <AssistantAvatar size={36} />}
          <div className="max-w-[85%] space-y-1">
            <div
              className={`px-3.5 py-2.5 text-sm leading-relaxed ${
                m.rol === 'user'
                  ? 'bg-foundry-brass text-foundry-chrome'
                  : 'border border-foundry-seam bg-foundry-chrome text-foundry-type'
              }`}
            >
              <p className="whitespace-pre-wrap">{m.texto}</p>
            </div>
            {m.whatsappUrl && !enviado ? (
              <BotonWhatsApp
                url={m.whatsappUrl}
                display={m.whatsappDisplay}
                compacto
              />
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
}
