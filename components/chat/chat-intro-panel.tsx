import Image from 'next/image';
import { ASSISTANT_IMAGE, SUGERENCIAS_CHAT } from '@/components/chat/chat-constants';

export function ChatIntroPanel({
  onSugerencia,
}: {
  readonly onSugerencia: (texto: string) => void;
}) {
  return (
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
        Cuéntame qué proyecto tienes en mente y te doy una estimación orientativa.
        También puedes dejarnos tus datos para contactarte.
      </p>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
        Preguntas frecuentes
      </p>
      <div className="flex w-full flex-col gap-2">
        {SUGERENCIAS_CHAT.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSugerencia(s)}
            className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2.5 text-left text-sm text-slate-200 transition-colors hover:border-cyan-500/50 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
