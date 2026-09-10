'use client';

import { extraerTextoDesdeWaUrl } from '@/lib/url-safety';
import { ChatComposer } from '@/components/chat/chat-composer';
import { ChatEstimateNote } from '@/components/chat/chat-estimate-note';
import { ChatFab } from '@/components/chat/chat-fab';
import { ChatHeader } from '@/components/chat/chat-header';
import { ChatIntroPanel } from '@/components/chat/chat-intro-panel';
import { ChatMessageList } from '@/components/chat/chat-message-list';
import { ChatQuoteForm } from '@/components/chat/chat-quote-form';
import { ChatTypingIndicator } from '@/components/chat/chat-typing-indicator';
import { PanelWhatsAppCotizacion } from '@/components/chat/panel-whatsapp-cotizacion';
import { useBuildforgeChat } from '@/components/chat/use-buildforge-chat';

export default function BuildforgeChatWidget() {
  const {
    abierto,
    mensajes,
    entrada,
    setEntrada,
    cargando,
    error,
    draft,
    mostrarFormulario,
    formulario,
    actualizarFormulario,
    whatsappUrl,
    whatsappPrefill,
    whatsappPopupBloqueado,
    enviado,
    scrollRef,
    inputRef,
    abrirWidget,
    cerrarWidget,
    enviarTexto,
    onSubmitMensaje,
    onSubmitCotizacion,
    reiniciar,
  } = useBuildforgeChat();

  return (
    <>
      {!abierto && <ChatFab onAbrir={() => abrirWidget('floating_button')} />}

      {abierto && (
        <div
          className="fixed inset-x-3 bottom-3 z-50 flex max-h-[min(85dvh,640px)] flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950/95 font-sans shadow-2xl shadow-black/50 backdrop-blur-md sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[min(100vw-2rem,420px)]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-titulo"
        >
          <ChatHeader onReiniciar={reiniciar} onCerrar={cerrarWidget} />

          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
            aria-live="polite"
          >
            {mensajes.length === 0 && !cargando && (
              <ChatIntroPanel onSugerencia={(t) => void enviarTexto(t)} />
            )}

            <ChatMessageList mensajes={mensajes} enviado={enviado} />

            {cargando && <ChatTypingIndicator />}

            {draft && !enviado && <ChatEstimateNote draft={draft} />}

            {error ? (
              <p
                className="rounded-lg border border-red-500/40 bg-red-950/30 px-3 py-2 text-sm text-red-300"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            {mostrarFormulario && !enviado && (
              <ChatQuoteForm
                formulario={formulario}
                draft={draft}
                cargando={cargando}
                onChange={actualizarFormulario}
                onSubmit={onSubmitCotizacion}
              />
            )}

            {whatsappUrl && enviado && formulario.canal === 'whatsapp' && (
              <PanelWhatsAppCotizacion
                url={whatsappUrl}
                prefill={whatsappPrefill ?? extraerTextoDesdeWaUrl(whatsappUrl)}
                popupBloqueado={whatsappPopupBloqueado}
              />
            )}
          </div>

          {!enviado && (
            <ChatComposer
              entrada={entrada}
              cargando={cargando}
              inputRef={inputRef}
              onChange={setEntrada}
              onSubmit={onSubmitMensaje}
              onEnviarTexto={(t) => void enviarTexto(t)}
            />
          )}
        </div>
      )}
    </>
  );
}
