import { MessageCircle } from 'lucide-react';

/** Foundry brass plate launcher — avoids cyber-purple assistant raster on the FAB. */
export function ChatFab({ onAbrir }: { readonly onAbrir: () => void }) {
  return (
    <button
      type="button"
      onClick={onAbrir}
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center border-2 border-foundry-brass bg-foundry-chrome shadow-[4px_8px_20px_rgba(14,10,6,0.5)] transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-foundry-brass/50 motion-reduce:transition-none sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      aria-label="Abrir asistente de cotización BuildForge"
    >
      <span
        className="absolute inset-1 border border-dashed border-foundry-brass/40 opacity-80"
        aria-hidden
      />
      <span className="relative font-display text-sm font-bold tracking-wide text-foundry-brass sm:text-base">
        {'</>'}
      </span>
      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center bg-foundry-brass text-foundry-chrome">
        <MessageCircle className="h-3 w-3" aria-hidden />
      </span>
    </button>
  );
}
