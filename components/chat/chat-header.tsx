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
    <header className="flex items-center gap-3 border-b border-foundry-seam bg-foundry-chrome px-4 py-3">
      <AssistantAvatar size={44} />
      <div className="min-w-0 flex-1">
        <h2
          id="chat-titulo"
          className="truncate font-display text-sm font-semibold tracking-wide text-foundry-type-bright"
        >
          Asistente BuildForge
        </h2>
        <p className="truncate text-xs text-foundry-type-dim">
          Proyectos, servicios y cotizaciones
        </p>
      </div>
      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          onClick={onReiniciar}
          className="flex h-11 w-11 items-center justify-center rounded text-foundry-type-dim transition-colors hover:bg-foundry-ground hover:text-foundry-type focus:outline-none focus-visible:ring-2 focus-visible:ring-foundry-brass"
          aria-label="Reiniciar conversación"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onCerrar}
          className="flex h-11 w-11 items-center justify-center rounded text-foundry-type-dim transition-colors hover:bg-foundry-ground hover:text-foundry-type focus:outline-none focus-visible:ring-2 focus-visible:ring-foundry-brass"
          aria-label="Cerrar chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
