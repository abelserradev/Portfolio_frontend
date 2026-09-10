'use client';

export function ChatErrorFallback({
  onReintentar,
}: {
  readonly onReintentar: () => void;
}) {
  return (
    <div
      role="alert"
      className="fixed bottom-5 right-5 z-50 max-w-[280px] rounded-2xl border border-red-500/40 bg-slate-950/95 p-4 shadow-xl backdrop-blur-md sm:bottom-6 sm:right-6"
    >
      <p className="text-sm font-medium text-red-300">Asistente no disponible</p>
      <p className="mt-1 text-xs text-slate-400">
        Ocurrió un error inesperado. El resto del sitio sigue activo.
      </p>
      <button
        type="button"
        onClick={onReintentar}
        className="mt-3 w-full rounded-lg border border-cyan-500/50 bg-cyan-950/50 py-2 text-xs font-medium text-cyan-300 hover:bg-cyan-900/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        Reintentar chat
      </button>
    </div>
  );
}
