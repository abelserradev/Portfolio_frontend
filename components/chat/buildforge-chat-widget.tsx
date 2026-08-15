'use client';

import Image from 'next/image';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import {
  ExternalLink,
  MessageCircle,
  MessageSquare,
  RotateCcw,
  SendHorizontal,
  X,
} from 'lucide-react';
import { useChatSession } from '@/app/hooks/useChatSession';
import {
  enviarCotizacionChat,
  enviarMensajeChat,
  obtenerConfigChat,
  type ChatConfig,
  type QuoteDraft,
} from '@/lib/chat-api';
import { EVENTO_ABRIR_CHAT, type AbrirChatDetalle } from '@/lib/chat-events';

const ASSISTANT_IMAGE = '/media/buildforge-assistant.png';

const SUGERENCIAS = [
  '¿Cuánto cuesta una página web?',
  'Necesito una app móvil',
  'Quiero integrar IA en mi negocio',
] as const;

interface MensajeUi {
  readonly id: string;
  readonly rol: 'user' | 'assistant';
  readonly texto: string;
  readonly whatsappUrl?: string;
  readonly whatsappDisplay?: string;
}

function generarId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}`;
}

function AssistantAvatar({
  size = 40,
  className = '',
}: {
  readonly size?: number;
  readonly className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full ring-2 ring-cyan-400/40 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={ASSISTANT_IMAGE}
        alt=""
        aria-hidden
        width={size}
        height={size}
        className="h-full w-full object-cover object-[center_20%]"
        priority={size >= 56}
      />
    </div>
  );
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
          ? 'mt-2 inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-emerald-600/60 bg-emerald-950/40 px-3 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-900/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400'
          : 'mt-2 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-emerald-600/60 bg-emerald-950/40 py-2.5 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-900/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400'
      }
    >
      <MessageSquare size={16} className="shrink-0" aria-hidden />
      Abrir WhatsApp{display ? ` · ${display}` : ''}
      <ExternalLink size={14} className="shrink-0 opacity-70" aria-hidden />
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    obtenerConfigChat()
      .then(setConfig)
      .catch(() => setConfig(null));
  }, []);

  useEffect(() => {
    if (abierto && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensajes, cargando, abierto, draft, mostrarFormulario, enviado]);

  useEffect(() => {
    if (abierto) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 120);
      return () => window.clearTimeout(t);
    }
  }, [abierto]);

  const enviarTexto = useCallback(
    async (texto: string) => {
      const limpio = texto.trim();
      if (!limpio || cargando) return;

      setError(null);
      setCargando(true);
      setMensajes((prev) => [
        ...prev,
        { id: generarId(), rol: 'user', texto: limpio },
      ]);
      setEntrada('');

      try {
        const resp = await enviarMensajeChat(limpio, sessionId);
        persistirSession(resp.session_id);
        setMensajes((prev) => [
          ...prev,
          {
            id: generarId(),
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
            ? 'El asistente tarda en responder. Espera un momento e intenta de nuevo.'
            : 'No pudimos conectar con el asistente. Verifica la conexión e intenta otra vez.',
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
    if (!sessionId || !email.trim()) return;

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
      setMostrarFormulario(false);
      if (resp.whatsapp_url) {
        setWhatsappUrl(resp.whatsapp_url);
      }
      setMensajes((prev) => [
        ...prev,
        {
          id: generarId(),
          rol: 'assistant',
          texto:
            canal === 'whatsapp'
              ? `Cotización registrada. Puedes continuar la conversación por WhatsApp (${resp.whatsapp_display ?? config?.whatsapp_display}).`
              : 'Tu solicitud ya nos ha llegado al correo. La evaluará nuestro equipo y te responderemos lo antes posible.',
          whatsappUrl: resp.whatsapp_url ?? undefined,
          whatsappDisplay: resp.whatsapp_display ?? config?.whatsapp_display,
        },
      ]);
    } catch {
      setError('No se pudo enviar la solicitud. Verifica tu correo e intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const reiniciar = () => {
    reiniciarSession();
    setMensajes([]);
    setDraft(null);
    setMostrarFormulario(false);
    setEnviado(false);
    setWhatsappUrl(null);
    setEmail('');
    setNombre('');
    setCanal('email');
    setError(null);
  };

  const whatsappLabel = config?.whatsapp_display ?? '+58 412-8034283';

  return (
    <>
      {!abierto && (
        <button
          type="button"
          onClick={() => setAbierto(true)}
          className="group fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-slate-950 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/50 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/60 motion-reduce:transition-none sm:bottom-6 sm:right-6"
          aria-label="Abrir asistente de cotización BuildForge"
        >
          <span className="absolute inset-0 rounded-full bg-cyan-400/10 opacity-0 transition-opacity group-hover:opacity-100" />
          <Image
            src={ASSISTANT_IMAGE}
            alt=""
            width={52}
            height={52}
            className="relative h-[52px] w-[52px] rounded-full object-cover object-[center_20%]"
          />
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-white">
            <MessageCircle className="h-3 w-3" aria-hidden />
          </span>
        </button>
      )}

      {abierto && (
        <div
          className="fixed inset-x-3 bottom-3 z-50 flex max-h-[min(85dvh,640px)] flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950/95 font-sans shadow-2xl shadow-black/50 backdrop-blur-md sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[min(100vw-2rem,420px)]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-titulo"
        >
          <header className="flex items-center gap-3 border-b border-slate-800 bg-slate-900/80 px-4 py-3">
            <AssistantAvatar size={44} />
            <div className="min-w-0 flex-1">
              <h2
                id="chat-titulo"
                className="truncate font-orbitron text-sm font-semibold tracking-wide text-cyan-300"
              >
                Asistente BuildForge
              </h2>
              <p className="truncate text-xs text-slate-400">
                Cotizaciones y consultas
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                onClick={reiniciar}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Reiniciar conversación"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setAbierto(false)}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Cerrar chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
            aria-live="polite"
          >
            {mensajes.length === 0 && !cargando && (
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3 w-full max-w-[220px] overflow-hidden rounded-xl bg-gradient-to-b from-slate-800/50 to-transparent p-2">
                  <Image
                    src={ASSISTANT_IMAGE}
                    alt="Robot asistente BuildForge"
                    width={220}
                    height={120}
                    className="mx-auto h-auto w-full object-contain"
                    priority
                  />
                </div>
                <p className="mb-1 text-base font-medium text-slate-100">
                  Hola, soy tu asistente BuildForge
                </p>
                <p className="mb-4 max-w-[280px] text-sm leading-relaxed text-slate-400">
                  Cuéntame qué proyecto tienes en mente y te doy una estimación
                  orientativa. También puedes dejarnos tus datos para
                  contactarte.
                </p>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Preguntas frecuentes
                </p>
                <div className="flex w-full flex-col gap-2">
                  {SUGERENCIAS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void enviarTexto(s)}
                      className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2.5 text-left text-sm text-slate-200 transition-colors hover:border-cyan-500/50 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                  {m.whatsappUrl ? (
                    <BotonWhatsApp
                      url={m.whatsappUrl}
                      display={m.whatsappDisplay}
                      compacto
                    />
                  ) : null}
                </div>
              </div>
            ))}

            {cargando && (
              <div className="flex gap-2.5">
                <AssistantAvatar size={36} />
                <div
                  className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-slate-700/80 bg-slate-900/90 px-4 py-3"
                  aria-label="El asistente está escribiendo"
                >
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0ms] motion-reduce:animate-none" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms] motion-reduce:animate-none" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:300ms] motion-reduce:animate-none" />
                </div>
              </div>
            )}

            {draft?.estimated_range_usd && (
              <div className="ml-[46px] rounded-xl border border-amber-500/30 bg-amber-950/20 px-3 py-2.5">
                <p className="text-sm font-semibold text-amber-300">
                  Estimación: {draft.estimated_range_usd}
                </p>
                {draft.disclaimer && (
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    {draft.disclaimer}
                  </p>
                )}
              </div>
            )}

            {error && (
              <p
                className="rounded-lg border border-red-500/40 bg-red-950/30 px-3 py-2 text-sm text-red-300"
                role="alert"
              >
                {error}
              </p>
            )}

            {mostrarFormulario && !enviado && (
              <form
                onSubmit={onSubmitCotizacion}
                className="ml-[46px] space-y-3 rounded-xl border border-slate-700 bg-slate-900/60 p-4"
              >
                <p className="text-sm font-medium text-slate-200">
                  Recibe tu cotización por correo o WhatsApp
                </p>

                <div>
                  <label
                    htmlFor="chat-email"
                    className="mb-1 block text-xs font-medium text-slate-400"
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="chat-email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="chat-nombre"
                    className="mb-1 block text-xs font-medium text-slate-400"
                  >
                    Nombre <span className="text-slate-500">(opcional)</span>
                  </label>
                  <input
                    id="chat-nombre"
                    type="text"
                    autoComplete="name"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <fieldset>
                  <legend className="mb-2 text-xs font-medium text-slate-400">
                    ¿Cómo prefieres que te contactemos?
                  </legend>
                  <div className="flex flex-col gap-2">
                    <label className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 has-[:checked]:border-violet-500 has-[:checked]:bg-violet-950/30">
                      <input
                        type="radio"
                        name="canal"
                        checked={canal === 'email'}
                        onChange={() => setCanal('email')}
                        className="h-4 w-4 accent-violet-500"
                      />
                      <span className="text-sm text-slate-200">Correo</span>
                    </label>
                    <label className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 has-[:checked]:border-violet-500 has-[:checked]:bg-violet-950/30">
                      <input
                        type="radio"
                        name="canal"
                        checked={canal === 'whatsapp'}
                        onChange={() => setCanal('whatsapp')}
                        className="h-4 w-4 accent-violet-500"
                      />
                      <span className="text-sm text-slate-200">
                        WhatsApp · {whatsappLabel}
                      </span>
                    </label>
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={cargando}
                  className="flex min-h-[44px] w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  {cargando ? 'Enviando…' : 'Enviar solicitud'}
                </button>
              </form>
            )}

            {whatsappUrl && enviado && (
              <div className="ml-[46px]">
                <BotonWhatsApp url={whatsappUrl} display={whatsappLabel} />
              </div>
            )}
          </div>

          {!enviado && (
            <form
              onSubmit={onSubmitMensaje}
              className="border-t border-slate-800 bg-slate-900/80 p-3"
            >
              <div className="flex items-end gap-2">
                <label htmlFor="chat-input" className="sr-only">
                  Escribe tu mensaje
                </label>
                <textarea
                  id="chat-input"
                  ref={inputRef}
                  rows={1}
                  value={entrada}
                  onChange={(e) => setEntrada(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      void enviarTexto(entrada);
                    }
                  }}
                  placeholder="Escribe tu mensaje…"
                  maxLength={2000}
                  disabled={cargando}
                  className="max-h-28 min-h-[44px] flex-1 resize-none rounded-xl border border-slate-600 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={cargando || !entrada.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-600 text-white transition-colors hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Enviar mensaje"
                >
                  <SendHorizontal className="h-5 w-5" />
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
}
