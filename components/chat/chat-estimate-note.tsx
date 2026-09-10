import type { QuoteDraft } from '@/components/chat/chat-types';

export function ChatEstimateNote({ draft }: { readonly draft: QuoteDraft }) {
  if (!draft.estimated_range_usd) return null;

  return (
    <div className="ml-[46px] rounded-xl border border-amber-500/30 bg-amber-950/20 px-3 py-2.5">
      <p className="text-sm font-semibold text-amber-300">
        Estimación: {draft.estimated_range_usd}
      </p>
      {draft.disclaimer ? (
        <p className="mt-1 text-xs leading-relaxed text-slate-400">{draft.disclaimer}</p>
      ) : null}
    </div>
  );
}
