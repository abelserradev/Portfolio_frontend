'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, MessageSquare, Send, X } from 'lucide-react';
import { useChatSession } from '@/app/hooks/useChatSession';
import {
  enviarCotizacionChat,
  enviarMensajeChat,
  obtenerConfigChat,
  type ChatConfig,
  type QuoteDraft,
} from '@/lib/chat-api';
import { EVENTO_ABRIR_CHAT, type AbrirChatDetalle } from '@/lib/chat-events';

interface MensajeUi {
  readonly rol: 'user' | 'assistant';
  readonly texto: string;
  readonly whatsappUrl?: string;
  readonly whatsappDisplay?: string;
}

function BotonWhatsApp({
  url,
  display,
  compacto = false,
}: {
  readonly url: string;
  readonly display?: string;
  readonly compacto?: boolean;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={
        compacto
          ? 'mt-2 inline-flex items-center gap-1.5 rounded border border-emerald-500/60 bg-emerald-500/15 px-2.5 py-1.5 text-[10px] font-medium text-emerald-200 transition hover:bg-emerald-500/25'
          : 'mt-2 flex w-full items-center justify-center gap-2 rounded border border-emerald-500/60 bg-emerald-500/15 py-2 text-[11px] font-medium text-emerald-200 transition hover:bg-emerald-500/25'
      }
    >
      <MessageSquare size={14} className="shrink-0" />
      Abrir WhatsApp{display ? ` · ${display}` : ''}
      <ExternalLink size={12} className="shrink-0 opacity-70" />
    </a>
  );
}

export default function BuildforgeChatWidget() {
  const { sessionId, persistirSession, reiniciarSession } = useChatSession();
  const [abierto, setAbierto] = useState(false);
  const [config, setConfig] = useState<ChatConfig | null>(null);
  const [mensajes, setMensajes] = useState<MensajeUi[]>([]);
  const [entrada, setEntrada] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<QuoteDraft | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [canal, setCanal] = useState<'email' | 'whatsapp'>('email');
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);
  const finListaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    obtenerConfigChat()
      .then(setConfig)
      .catch(() => setConfig(null));
  }, []);

  useEffect(() => {
    finListaRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes, cargando]);

  const enviarTexto = useCallback(
    async (texto: string) => {
      const limpio = texto.trim();
      if (!limpio || cargando) {
        return;
      }
      setError(null);
      setCargando(true);
      setMensajes((prev) => [...prev, { rol: 'user', texto: limpio }]);
      setEntrada('');
      try {
        const resp = await enviarMensajeChat(limpio, sessionId);
        persistirSession(resp.session_id);
        setMensajes((prev) => [
          ...prev,
          {
            rol: 'assistant',
            texto: resp.reply,
            whatsappUrl: resp.whatsapp_url ?? undefined,
            whatsappDisplay: resp.whatsapp_display ?? undefined,
          },
        ]);
        if (resp.quote_draft) {
          setDraft(resp.quote_draft);
        }
        if (resp.flow_state === 'contact' || resp.flow_state === 'estimate') {
          setMostrarFormulario(true);
        }
      } catch (err) {
        const esTimeout =
          err instanceof DOMException && err.name === 'TimeoutError';
        setError(
          esTimeout
            ? 'El asistente tarda en responder (CPU). Espera un momento e intenta de nuevo.'
            : 'No pudimos conectar con el asistente. Verifica que el backend esté en :8010 y recarga la página.',
        );
      } finally {
        setCargando(false);
      }
    },
    [cargando, persistirSession, sessionId],
  );

  useEffect(() => {
    const handler = (ev: Event) => {
      const custom = ev as CustomEvent<AbrirChatDetalle>;
      setAbierto(true);
      setEnviado(false);
      setWhatsappUrl(null);
      const intent = custom.detail?.intent;
      const msg =
        custom.detail?.mensajeInicial ??
        (intent === 'cotizacion'
          ? 'Hola, quiero solicitar una cotización para un proyecto.'
          : undefined);
      if (msg && mensajes.length === 0) {
        void enviarTexto(msg);
      }
    };
    window.addEventListener(EVENTO_ABRIR_CHAT, handler);
    return () => window.removeEventListener(EVENTO_ABRIR_CHAT, handler);
  }, [enviarTexto, mensajes.length]);

  const onSubmitMensaje = (ev: FormEvent) => {
    ev.preventDefault();
    void enviarTexto(entrada);
  };

  const onSubmitCotizacion = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!sessionId || !email.trim()) {
      return;
    }
    setCargando(true);
    setError(null);
    try {
      const resp = await enviarCotizacionChat({
        sessionId,
        clientEmail: email.trim(),
        clientName: nombre.trim() || undefined,
        preferredChannel: canal,
      });
      setEnviado(true);
      if (resp.whatsapp_url) {
        setWhatsappUrl(resp.whatsapp_url);
      }
      setMensajes((prev) => [
        ...prev,
        {
          rol: 'assistant',
          texto:
            canal === 'whatsapp'
              ? `Cotización registrada. Puedes continuar la conversación por WhatsApp (${resp.whatsapp_display ?? config?.whatsapp_display}).`
              : 'Tu solicitud ya nos ha llegado al correo, será evaluada por nuestro equipo y te daremos una respuesta por correo lo más pronto posible.',
          whatsappUrl: resp.whatsapp_url ?? undefined,
          whatsappDisplay: resp.whatsapp_display ?? config?.whatsapp_display,
        },
      ]);
    } catch {
      setError('No se pudo enviar la solicitud. Verifica tu email.');
    } finally {
      setCargando(false);
    }
  };

  const cerrar = () => setAbierto(false);

  const reiniciar = () => {
    reiniciarSession();
    setMensajes([]);
    setDraft(null);
    setMostrarFormulario(false);
    setEnviado(false);
    setWhatsappUrl(null);
    setEmail('');
    setNombre('');
    setError(null);
  };

  return (
    <>
      {!abierto ? (
        <button
          type="button"
          onClick={() => setAbierto(true)}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-cyan-500/60 bg-black/90 px-4 py-3 font-mono text-sm text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.25)] transition hover:bg-cyan-500/10"
          aria-label="Abrir chat de cotización Buildforge"
        >
          <MessageSquare size={18} />
          CHAT_COTIZACIÓN
        </button>
      ) : null}

      {abierto ? (
        <div
          className="fixed bottom-5 right-5 z-50 flex w-[min(100vw-2rem,24rem)] flex-col overflow-hidden rounded-lg border border-slate-700/80 bg-slate-950/95 font-mono text-xs text-cyan-100 shadow-2xl backdrop-blur"
          role="dialog"
          aria-label="Asistente Buildforge"
        >
          <div className="flex items-center justify-between border-b border-cyan-800/40 px-3 py-2">
            <span className="text-[10px] tracking-widest text-fuchsia-400">
              {'// ASISTENTE_BUILDFORGE'}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={reiniciar}
                className="text-[10px] text-slate-400 hover:text-cyan-300"
              >
                RESET
              </button>
              <button type="button" onClick={cerrar} aria-label="Cerrar chat">
                <X size={16} className="text-slate-400 hover:text-white" />
              </button>
            </div>
          </div>

          <div className="max-h-72 space-y-2 overflow-y-auto px-3 py-3">
            {mensajes.length === 0 ? (
              <p className="text-slate-400">
                &gt; Pregunta por servicios o pide una cotización preliminar.
              </p>
            ) : null}
            {mensajes.map((m, i) => (
              <div
                key={`${m.rol}-${i}`}
                className={
                  m.rol === 'user'
                    ? 'ml-4 rounded border border-fuchsia-500/30 bg-fuchsia-500/10 p-2 text-fuchsia-100'
                    : 'mr-2 rounded border border-cyan-800/40 bg-black/50 p-2 text-cyan-100'
                }
              >
                <p className="whitespace-pre-wrap leading-relaxed">{m.texto}</p>
                {m.whatsappUrl ? (
                  <BotonWhatsApp
                    url={m.whatsappUrl}
                    display={m.whatsappDisplay}
                    compacto
                  />
                ) : null}
              </div>
            ))}
            {cargando ? <p className="animate-pulse text-cyan-500">&gt; Procesando...</p> : null}
            <div ref={finListaRef} />
          </div>

          {draft?.estimated_range_usd ? (
            <div className="border-t border-cyan-900/40 px-3 py-2 text-[10px] text-yellow-200/90">
              Estimación: {draft.estimated_range_usd}
              {draft.disclaimer ? (
                <>
                  <br />
                  <span className="text-slate-500">{draft.disclaimer}</span>
                </>
              ) : null}
            </div>
          ) : null}

          {mostrarFormulario && !enviado ? (
            <form onSubmit={onSubmitCotizacion} className="space-y-2 border-t border-slate-800 px-3 py-2">
              <input
                type="email"
                required
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border border-slate-700 bg-black/60 px-2 py-1.5 text-cyan-100 outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                placeholder="Nombre (opcional)"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded border border-slate-700 bg-black/60 px-2 py-1.5 text-cyan-100 outline-none focus:border-cyan-500"
              />
              <div className="flex gap-2 text-[10px]">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={canal === 'email'}
                    onChange={() => setCanal('email')}
                  />
                  Email
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={canal === 'whatsapp'}
                    onChange={() => setCanal('whatsapp')}
                  />
                  WhatsApp {config?.whatsapp_display ?? '+58 412-8034283'}
                </label>
              </div>
              <button
                type="submit"
                disabled={cargando}
                className="w-full border border-fuchsia-500/50 bg-fuchsia-500/10 py-2 text-fuchsia-200 hover:bg-fuchsia-500/20"
              >
                ENVIAR_SOLICITUD
              </button>
            </form>
          ) : null}

          {whatsappUrl ? (
            <div className="px-3 pb-2">
              <BotonWhatsApp
                url={whatsappUrl}
                display={config?.whatsapp_display}
              />
            </div>
          ) : null}

          {error ? <p className="px-3 pb-2 text-red-400">{error}</p> : null}

          {!enviado ? (
            <form onSubmit={onSubmitMensaje} className="flex border-t border-slate-800">
              <input
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
                placeholder="Escribe tu mensaje..."
                maxLength={2000}
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-cyan-100 outline-none placeholder:text-slate-600"
              />
              <button
                type="submit"
                disabled={cargando || !entrada.trim()}
                className="px-3 text-cyan-400 hover:text-cyan-200 disabled:opacity-40"
                aria-label="Enviar"
              >
                <Send size={16} />
              </button>
            </form>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
