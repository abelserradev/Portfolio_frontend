'use client';

import BuildforgeChatWidget from '@/components/chat/buildforge-chat-widget';
import { ChatErrorFallback } from '@/components/errors/chat-error-fallback';
import { SectionErrorBoundary } from '@/components/errors/section-error-boundary';

export default function ChatProvider() {
  return (
    <SectionErrorBoundary
      section="chat"
      fallback={(reiniciar) => <ChatErrorFallback onReintentar={reiniciar} />}
    >
      <BuildforgeChatWidget />
    </SectionErrorBoundary>
  );
}
