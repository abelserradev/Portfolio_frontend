import { FormEvent, RefObject } from 'react';
import { SendHorizontal } from 'lucide-react';
import { CHAT_COMPOSER_PLACEHOLDER } from '@/components/chat/chat-constants';

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
      className="border-t border-foundry-seam bg-foundry-chrome p-3"
    >
      <div className="flex items-end gap-2">
        <label htmlFor="chat-input" className="sr-only">
          Pregunta por un proyecto, servicio o cotización
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
          placeholder={CHAT_COMPOSER_PLACEHOLDER}
          maxLength={2000}
          disabled={cargando}
          className="max-h-28 min-h-[44px] flex-1 resize-none border border-foundry-seam bg-foundry-ground px-3 py-2.5 text-sm text-foundry-type placeholder:text-foundry-type-dim focus:border-foundry-brass focus:outline-none focus:ring-2 focus:ring-foundry-brass/30 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={cargando || !entrada.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center bg-foundry-brass text-foundry-chrome transition-colors hover:bg-[#d4b03a] disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-foundry-brass"
          aria-label="Enviar mensaje"
        >
          <SendHorizontal className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
