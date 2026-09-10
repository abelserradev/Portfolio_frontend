import { FormEvent } from 'react';
import type {
  CanalContacto,
  FormularioCotizacion,
  QuoteDraft,
} from '@/components/chat/chat-types';

export function ChatQuoteForm({
  formulario,
  draft,
  cargando,
  onChange,
  onSubmit,
}: {
  readonly formulario: FormularioCotizacion;
  readonly draft: QuoteDraft | null;
  readonly cargando: boolean;
  readonly onChange: (campo: keyof FormularioCotizacion, valor: string | CanalContacto) => void;
  readonly onSubmit: (ev: FormEvent) => void;
}) {
  const estimacionReferencia = draft?.estimated_range_usd ?? null;

  return (
    <form
      onSubmit={onSubmit}
      className="ml-[46px] space-y-3 rounded-xl border border-slate-700 bg-slate-900/60 p-4"
    >
      <p className="text-sm font-medium text-slate-200">
        Recibe tu cotización por correo o WhatsApp
      </p>

      <div>
        <label htmlFor="chat-email" className="mb-1 block text-xs font-medium text-slate-400">
          Correo electrónico
        </label>
        <input
          id="chat-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={formulario.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="tu@email.com"
          className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
        />
      </div>

      <div>
        <label htmlFor="chat-nombre" className="mb-1 block text-xs font-medium text-slate-400">
          Nombre <span className="text-slate-500">(opcional)</span>
        </label>
        <input
          id="chat-nombre"
          type="text"
          autoComplete="name"
          value={formulario.nombre}
          onChange={(e) => onChange('nombre', e.target.value)}
          placeholder="Tu nombre"
          className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
        />
      </div>

      <div>
        <label htmlFor="chat-telefono" className="mb-1 block text-xs font-medium text-slate-400">
          Teléfono de contacto
        </label>
        <input
          id="chat-telefono"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          value={formulario.telefono}
          onChange={(e) => onChange('telefono', e.target.value)}
          placeholder="+58 412 1234567"
          className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
        />
      </div>

      <div>
        <label htmlFor="chat-descripcion" className="mb-1 block text-xs font-medium text-slate-400">
          ¿Qué quieres construir?
        </label>
        <textarea
          id="chat-descripcion"
          required
          rows={3}
          value={formulario.descripcion}
          onChange={(e) => onChange('descripcion', e.target.value)}
          placeholder="Ej. landing con catálogo, formulario de contacto y panel admin básico"
          className="w-full resize-none rounded-lg border border-slate-600 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
        />
      </div>

      <div>
        <label htmlFor="chat-presupuesto" className="mb-1 block text-xs font-medium text-slate-400">
          Presupuesto aproximado <span className="text-slate-500">(opcional)</span>
        </label>
        {estimacionReferencia ? (
          <p className="mb-1.5 text-xs text-amber-300/90">
            Referencia del chat: {estimacionReferencia}
          </p>
        ) : null}
        <input
          id="chat-presupuesto"
          type="text"
          value={formulario.presupuesto}
          onChange={(e) => onChange('presupuesto', e.target.value)}
          placeholder={
            estimacionReferencia
              ? `Ej. dentro de ${estimacionReferencia}`
              : 'Ej. USD 300 – 800'
          }
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
              checked={formulario.canal === 'email'}
              onChange={() => onChange('canal', 'email')}
              className="h-4 w-4 accent-violet-500"
            />
            <span className="text-sm text-slate-200">Correo</span>
          </label>
          <label className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 has-[:checked]:border-violet-500 has-[:checked]:bg-violet-950/30">
            <input
              type="radio"
              name="canal"
              checked={formulario.canal === 'whatsapp'}
              onChange={() => onChange('canal', 'whatsapp')}
              className="h-4 w-4 accent-violet-500"
            />
            <span className="text-sm text-slate-200">WhatsApp</span>
          </label>
        </div>
        {formulario.canal === 'whatsapp' ? (
          <p className="mt-2 text-xs text-slate-500">
            Al enviar, abriremos WhatsApp con un mensaje que incluye tu descripción,
            presupuesto y datos de contacto. Solo tendrás que pulsar enviar allí.
          </p>
        ) : null}
      </fieldset>

      <button
        type="submit"
        disabled={cargando}
        className="flex min-h-[44px] w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
      >
        {cargando
          ? 'Enviando…'
          : formulario.canal === 'whatsapp'
            ? 'Enviar y abrir WhatsApp'
            : 'Enviar solicitud'}
      </button>
    </form>
  );
}
