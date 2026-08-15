import { Mail, Database, Terminal } from 'lucide-react';
import {
  obtenerConfigContacto,
  obtenerConfigMarca,
  obtenerEnlacesSociales,
  type CanalContactoVisual,
} from '@/lib/site-config';

function IconoGithubMarca(props: Readonly<{ size?: number; className?: string }>) {
  const { size = 20, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function IconoLinkedinMarca(props: Readonly<{ size?: number; className?: string }>) {
  const { size = 20, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconoInstagramMarca(props: Readonly<{ size?: number; className?: string }>) {
  const { size = 20, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function renderizarIconoCanal(canal: CanalContactoVisual) {
  const animar = 'transition-transform duration-300 group-hover:scale-110';
  switch (canal) {
    case 'mail':
      return <Mail size={20} className={animar} />;
    case 'github':
      return <IconoGithubMarca size={20} className={animar} />;
    case 'linkedin':
      return <IconoLinkedinMarca size={20} className={animar} />;
    case 'instagram':
      return <IconoInstagramMarca size={20} className={animar} />;
  }
}

export default function RetroContactCard() {
  const marca = obtenerConfigMarca();
  const contacto = obtenerConfigContacto();
  const socialLinks = obtenerEnlacesSociales(contacto);

  return (
    <div className="flex items-center justify-center px-4 py-8 sm:p-4">
      <div className="relative group w-full max-w-2xl">
        <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-fuchsia-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

        <div className="relative flex flex-col rounded-lg border border-slate-700/50 bg-slate-900/90 p-4 font-mono leading-none text-cyan-100 sm:p-6">
          <div className="mb-5 flex min-w-0 items-center justify-between gap-3 border-b border-cyan-800/50 pb-3">
            <div className="flex items-center gap-3">
              <Database size={20} className="text-fuchsia-500 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#34d399]" />
            </div>
            <span className="min-w-0 truncate text-[10px] font-bold uppercase tracking-wider text-fuchsia-400">
              CANALES_BUILDFORGE.SYS
            </span>
            <div className="flex shrink-0 space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 border border-red-900" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-emerald-900" />
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex min-w-0 items-center gap-3 rounded border border-cyan-800/40 bg-slate-950/50 p-3 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)] sm:gap-4">
              <Terminal size={28} className="shrink-0 text-cyan-400 sm:size-8" />
              <div className="min-w-0">
                <h3 className="truncate text-lg font-black italic tracking-tight text-white sm:text-xl">
                  {marca.brandName}
                </h3>
                <p className="mt-0.5 truncate text-[10px] font-extrabold uppercase tracking-widest text-fuchsia-500 sm:text-[11px]">
                  &gt; {marca.brandRole}
                </p>
              </div>
            </div>

            <p className="wrap-break-word pl-1 text-[10px] leading-relaxed text-slate-400">
              &gt; STATUS: {contacto.status}
              <br />
              &gt; ENCRIPTACIÓN PROTOCOL_A_90... OK<br />
              &gt; ESPERANDO TRANSMISIÓN...
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded border border-slate-700 bg-slate-950/80 p-2 sm:grid-cols-4">
            {socialLinks.map(({ etiqueta, canal, url, color, ariaLabel }) => {
              const enlazarExterno = url.startsWith('http');
              return (
                <a
                  key={etiqueta}
                  href={url}
                  aria-label={ariaLabel}
                  {...(enlazarExterno
                    ? ({ target: '_blank', rel: 'noopener noreferrer' } as const)
                    : {})}
                  className={`group flex items-center justify-center rounded border border-slate-600/50 bg-slate-800 p-3 transition-all duration-300 hover:border-cyan-500 hover:bg-slate-700/50 hover:shadow-[0_0_12px_#22d3ee] sm:p-3.5 ${color}`}
                >
                  {renderizarIconoCanal(canal)}
                </a>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-cyan-800/30 pt-3 text-[9px] text-slate-500">
            <span className="min-w-0 truncate">
              © {new Date().getFullYear()} {marca.brandName}. // NEON_ARCH
            </span>
            <div className="h-1 w-12 shrink-0 bg-cyan-600 shadow-[0_0_5px_#22d3ee] sm:w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
