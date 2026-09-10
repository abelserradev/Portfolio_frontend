import { ExternalLink, MessageSquare } from 'lucide-react';
import { sanitizarUrlWhatsApp } from '@/lib/url-safety';

export function BotonWhatsApp({
  url,
  display,
  compacto = false,
  etiqueta = 'Abrir WhatsApp',
}: {
  readonly url: string;
  readonly display?: string;
  readonly compacto?: boolean;
  readonly etiqueta?: string;
}) {
  const urlSegura = sanitizarUrlWhatsApp(url);
  if (!urlSegura) return null;

  return (
    <a
      href={urlSegura}
      target="_blank"
      rel="noopener noreferrer"
      className={
        compacto
          ? 'mt-2 inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-emerald-600/60 bg-emerald-950/40 px-3 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-900/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400'
          : 'flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/70 bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition-colors hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400'
      }
    >
      <MessageSquare size={16} className="shrink-0" aria-hidden />
      {etiqueta}
      {display && compacto ? ` · ${display}` : ''}
      <ExternalLink size={14} className="shrink-0 opacity-70" aria-hidden />
    </a>
  );
}
