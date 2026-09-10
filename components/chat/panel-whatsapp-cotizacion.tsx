import { BotonWhatsApp } from '@/components/chat/boton-whatsapp';

export function PanelWhatsAppCotizacion({
  url,
  prefill,
  popupBloqueado,
}: {
  readonly url: string;
  readonly prefill?: string | null;
  readonly popupBloqueado: boolean;
}) {
  return (
    <div className="ml-[46px] space-y-3 rounded-xl border border-emerald-600/40 bg-emerald-950/20 p-4">
      <p className="text-sm font-medium text-emerald-200">
        {popupBloqueado
          ? 'Tu solicitud quedó registrada. Pulsa el botón para abrir WhatsApp con el mensaje listo.'
          : 'Abrimos WhatsApp con tu mensaje preparado. Revisa y pulsa enviar allí.'}
      </p>
      {prefill ? (
        <div>
          <p className="mb-1 text-xs font-medium text-slate-400">
            Vista previa del mensaje
          </p>
          <pre className="max-h-40 overflow-y-auto whitespace-pre-wrap rounded-lg border border-slate-700 bg-slate-950/80 p-3 text-xs leading-relaxed text-slate-300">
            {prefill}
          </pre>
        </div>
      ) : null}
      <BotonWhatsApp url={url} etiqueta="Enviar en WhatsApp" />
      <p className="text-xs text-slate-500">
        También te notificamos por correo con el resumen de tu solicitud.
      </p>
    </div>
  );
}
