'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useChatSession } from '@/hooks/useChatSession';
import {
  enviarCotizacionChat,
  enviarMensajeChat,
  type QuoteDraft,
} from '@/lib/chat-api';
import { EVENTO_ABRIR_CHAT, type AbrirChatDetalle } from '@/lib/chat-events';
import { registrarEventoAnalytics } from '@/lib/analytics-api';
import { validarFormularioCotizacion } from '@/lib/chat-quote-validation';
import { generarIdCliente } from '@/lib/ids';
import {
  extraerTextoDesdeWaUrl,
  sanitizarUrlWhatsApp,
} from '@/lib/url-safety';
import type {
  CanalContacto,
  FormularioCotizacion,
  MensajeUi,
} from '@/components/chat/chat-types';

const FORMULARIO_VACIO: FormularioCotizacion = {
  email: '',
  nombre: '',
  telefono: '',
  descripcion: '',
  presupuesto: '',
  canal: 'email',
};

export function useBuildforgeChat() {
  const { sessionId, persistirSession, reiniciarSession } = useChatSession();
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<MensajeUi[]>([]);
  const [entrada, setEntrada] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<QuoteDraft | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formulario, setFormulario] = useState<FormularioCotizacion>(FORMULARIO_VACIO);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [whatsappPrefill, setWhatsappPrefill] = useState<string | null>(null);
  const [whatsappPopupBloqueado, setWhatsappPopupBloqueado] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const actualizarFormulario = useCallback(
    (campo: keyof FormularioCotizacion, valor: string | CanalContacto) => {
      setFormulario((prev) => ({ ...prev, [campo]: valor }));
    },
    [],
  );

  useEffect(() => {
    if (abierto && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensajes, cargando, abierto, draft, mostrarFormulario, enviado]);

  useEffect(() => {
    if (!abierto) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(t);
  }, [abierto]);

  const enviarTexto = useCallback(
    async (texto: string) => {
      const limpio = texto.trim();
      if (!limpio || cargando) return;

      setError(null);
      setCargando(true);
      setMensajes((prev) => [
        ...prev,
        { id: generarIdCliente(), rol: 'user', texto: limpio },
      ]);
      setEntrada('');

      try {
        const resp = await enviarMensajeChat(limpio, sessionId);
        persistirSession(resp.session_id);
        setMensajes((prev) => [
          ...prev,
          {
            id: generarIdCliente(),
            rol: 'assistant',
            texto: resp.reply,
            whatsappUrl: sanitizarUrlWhatsApp(resp.whatsapp_url) ?? undefined,
            whatsappDisplay: resp.whatsapp_display ?? undefined,
          },
        ]);
        if (resp.quote_draft) {
          setDraft(resp.quote_draft);
          if (resp.quote_draft.scope_summary) {
            setFormulario((prev) => ({
              ...prev,
              descripcion: resp.quote_draft!.scope_summary!,
            }));
          }
        }
        if (resp.flow_state === 'contact' || resp.flow_state === 'estimate') {
          setMostrarFormulario(true);
          registrarEventoAnalytics({
            event: 'chat.form.visible',
            sessionId: resp.session_id,
            metadata: { flow_state: resp.flow_state },
          });
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
      setWhatsappPrefill(null);
      setWhatsappPopupBloqueado(false);
      registrarEventoAnalytics({
        event: 'chat.widget.open',
        cta: custom.detail?.intent === 'cotizacion' ? 'cta_cotizacion' : 'evento_custom',
      });
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

  const abrirWidget = useCallback((cta: string) => {
    setAbierto(true);
    registrarEventoAnalytics({ event: 'chat.widget.open', cta });
  }, []);

  const cerrarWidget = useCallback(() => setAbierto(false), []);

  const onSubmitMensaje = (ev: FormEvent) => {
    ev.preventDefault();
    void enviarTexto(entrada);
  };

  const onSubmitCotizacion = async (ev: FormEvent) => {
    ev.preventDefault();
    const validacion = validarFormularioCotizacion({
      sessionId,
      email: formulario.email,
      telefono: formulario.telefono,
      descripcion: formulario.descripcion,
    });
    if (!validacion.valido) {
      setError(validacion.error ?? 'Datos incompletos.');
      return;
    }

    setCargando(true);
    setError(null);
    try {
      const resp = await enviarCotizacionChat({
        sessionId: sessionId!,
        clientEmail: formulario.email.trim(),
        clientName: formulario.nombre.trim() || undefined,
        clientPhone: formulario.telefono.trim(),
        projectDescription: formulario.descripcion.trim(),
        clientBudget: formulario.presupuesto.trim() || undefined,
        preferredChannel: formulario.canal,
      });
      setEnviado(true);
      setMostrarFormulario(false);
      const urlWaSegura = sanitizarUrlWhatsApp(resp.whatsapp_url);
      if (urlWaSegura) {
        setWhatsappUrl(urlWaSegura);
        setWhatsappPrefill(
          resp.whatsapp_prefill_text ?? extraerTextoDesdeWaUrl(urlWaSegura),
        );
        if (formulario.canal === 'whatsapp') {
          const ventana = window.open(urlWaSegura, '_blank', 'noopener,noreferrer');
          setWhatsappPopupBloqueado(ventana === null);
        }
      }
      setMensajes((prev) => [
        ...prev,
        {
          id: generarIdCliente(),
          rol: 'assistant',
          texto:
            formulario.canal === 'whatsapp'
              ? 'Listo. Tu cotización quedó registrada. En WhatsApp verás un mensaje con tus datos: solo revísalo y pulsa enviar.'
              : 'Tu solicitud ya nos ha llegado al correo. La evaluará nuestro equipo y te responderemos lo antes posible.',
        },
      ]);
    } catch {
      setError('No se pudo enviar la solicitud. Revisa los datos e intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const reiniciar = useCallback(() => {
    reiniciarSession();
    setMensajes([]);
    setDraft(null);
    setMostrarFormulario(false);
    setEnviado(false);
    setWhatsappUrl(null);
    setWhatsappPrefill(null);
    setWhatsappPopupBloqueado(false);
    setFormulario(FORMULARIO_VACIO);
    setError(null);
  }, [reiniciarSession]);

  return {
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
  };
}
