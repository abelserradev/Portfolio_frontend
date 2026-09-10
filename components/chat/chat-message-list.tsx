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
              className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.rol === 'user'
                  ? 'rounded-tr-md bg-violet-700/90 text-white'
                  : 'rounded-tl-md border border-slate-700/80 bg-slate-900/90 text-slate-100'
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
