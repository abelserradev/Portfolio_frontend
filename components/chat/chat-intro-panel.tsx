import { AssistantAvatar } from '@/components/chat/assistant-avatar';
import { SUGERENCIAS_CHAT } from '@/components/chat/chat-constants';

export function ChatIntroPanel({
  onSugerencia,
}: {
  readonly onSugerencia: (texto: string) => void;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-3 flex w-full max-w-[220px] flex-col items-center gap-3 border border-foundry-seam bg-foundry-chrome p-4">
        <AssistantAvatar size={72} />
        <span className="foundry-plate-id">Asistente de taller</span>
      </div>
      <p className="mb-1 font-display text-base font-medium text-foundry-type-bright">
        Hola, soy tu asistente BuildForge
      </p>
      <p className="mb-4 max-w-[280px] text-sm leading-relaxed text-foundry-type-mute">
        Te ayudo solo con proyectos, servicios, estimaciones y contacto de
        Buildforge — no con preguntas generales. Cuéntame qué quieres construir
        y te oriento; también puedes dejarnos tus datos para contactarte.
      </p>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-foundry-type-dim">
        Preguntas frecuentes
      </p>
      <div className="flex w-full flex-col gap-2">
        {SUGERENCIAS_CHAT.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSugerencia(s)}
            className="border border-foundry-seam bg-foundry-chrome px-3 py-2.5 text-left text-sm text-foundry-type transition-colors hover:border-foundry-brass/60 hover:bg-foundry-ground focus:outline-none focus-visible:ring-2 focus-visible:ring-foundry-brass"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
