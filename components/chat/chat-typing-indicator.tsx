import { AssistantAvatar } from '@/components/chat/assistant-avatar';

export function ChatTypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <AssistantAvatar size={36} />
      <div
        className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-slate-700/80 bg-slate-900/90 px-4 py-3"
        aria-label="El asistente está escribiendo"
      >
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:0ms] motion-reduce:animate-none" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms] motion-reduce:animate-none" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:300ms] motion-reduce:animate-none" />
      </div>
    </div>
  );
}
