import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { ASSISTANT_IMAGE } from '@/components/chat/chat-constants';

export function ChatFab({ onAbrir }: { readonly onAbrir: () => void }) {
  return (
    <button
      type="button"
      onClick={onAbrir}
      className="group fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-slate-950 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/50 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/60 motion-reduce:transition-none sm:bottom-6 sm:right-6"
      aria-label="Abrir asistente de cotización BuildForge"
    >
      <span className="absolute inset-0 rounded-full bg-cyan-400/10 opacity-0 transition-opacity group-hover:opacity-100" />
      <Image
        src={ASSISTANT_IMAGE}
        alt=""
        width={52}
        height={52}
        className="relative h-[52px] w-[52px] rounded-full object-cover object-[center_20%]"
      />
      <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-white">
        <MessageCircle className="h-3 w-3" aria-hidden />
      </span>
    </button>
  );
}
