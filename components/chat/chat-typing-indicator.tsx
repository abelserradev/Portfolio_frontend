import { AssistantAvatar } from '@/components/chat/assistant-avatar';

export function ChatTypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <AssistantAvatar size={36} />
      <div
        className="flex items-center gap-1.5 border border-foundry-seam bg-foundry-chrome px-4 py-3"
        aria-label="El asistente está escribiendo"
      >
        <span className="foundry-type-dot h-2 w-2 rounded-full bg-foundry-brass motion-reduce:opacity-70" />
        <span className="foundry-type-dot h-2 w-2 rounded-full bg-foundry-brass [animation-delay:160ms] motion-reduce:opacity-70" />
        <span className="foundry-type-dot h-2 w-2 rounded-full bg-foundry-brass [animation-delay:320ms] motion-reduce:opacity-70" />
      </div>
    </div>
  );
}
