import { RotateCcw, X } from 'lucide-react';
import { AssistantAvatar } from '@/components/chat/assistant-avatar';

export function ChatHeader({
  onReiniciar,
  onCerrar,
}: {
  readonly onReiniciar: () => void;
  readonly onCerrar: () => void;
}) {
  return (
    <header className="flex items-center gap-3 border-b border-slate-800 bg-slate-900/80 px-4 py-3">
      <AssistantAvatar size={44} />
      <div className="min-w-0 flex-1">
        <h2
          id="chat-titulo"
          className="truncate font-orbitron text-sm font-semibold tracking-wide text-cyan-300"
        >
          Asistente BuildForge
        </h2>
        <p className="truncate text-xs text-slate-400">Cotizaciones y consultas</p>
      </div>
      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          onClick={onReiniciar}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Reiniciar conversación"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onCerrar}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Cerrar chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
