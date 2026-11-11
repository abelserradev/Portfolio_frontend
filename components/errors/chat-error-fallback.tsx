'use client';

export function ChatErrorFallback({
  onReintentar,
}: {
  readonly onReintentar: () => void;
}) {
  return (
    <div
      role="alert"
      className="foundry-plate fixed bottom-5 right-5 z-50 max-w-[280px] p-4 sm:bottom-6 sm:right-6"
    >
      <p className="text-sm font-medium text-foundry-type-bright">Asistente no disponible</p>
      <p className="mt-1 text-xs text-foundry-type-mute">
        Ocurrió un error inesperado. El resto del sitio sigue activo.
      </p>
      <button
        type="button"
        onClick={onReintentar}
        className="foundry-cta mt-3 w-full justify-center text-xs"
      >
        Reintentar chat
      </button>
    </div>
  );
}
