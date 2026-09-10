import { FormEvent, RefObject } from 'react';
import { SendHorizontal } from 'lucide-react';

export function ChatComposer({
  entrada,
  cargando,
  inputRef,
  onChange,
  onSubmit,
  onEnviarTexto,
}: {
  readonly entrada: string;
  readonly cargando: boolean;
  readonly inputRef: RefObject<HTMLTextAreaElement | null>;
  readonly onChange: (valor: string) => void;
  readonly onSubmit: (ev: FormEvent) => void;
  readonly onEnviarTexto: (texto: string) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
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
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onEnviarTexto(entrada);
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
  );
}
