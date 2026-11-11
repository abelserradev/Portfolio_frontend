import { Mail } from 'lucide-react';
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
  const animar = 'transition-transform duration-300 group-hover:scale-105';
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
    <div className="flex items-center justify-center px-4 py-16 sm:py-20">
      <div className="foundry-plate w-full max-w-2xl p-5 sm:p-7">
        <div className="mb-6 flex min-w-0 items-center justify-between gap-3 border-b border-foundry-seam pb-4">
          <span className="foundry-plate-id">PLATE · CONTACTO</span>
          <span className="h-2 w-2 rounded-full bg-foundry-brass shadow-[2px_3px_8px_rgba(201,162,39,0.35)]" />
        </div>

        <div className="mb-6 space-y-3">
          <div>
            <h3 className="font-display text-2xl tracking-wide text-foundry-type-bright sm:text-3xl">
              {marca.brandName}
            </h3>
            <p className="mt-1 text-sm text-foundry-type-mute">{marca.brandRole}</p>
          </div>
          <p className="text-sm leading-relaxed text-foundry-type-dim">
            {contacto.status}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 border border-foundry-seam bg-foundry-chrome/80 p-2 sm:grid-cols-4">
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
                className={`group flex items-center justify-center border border-foundry-seam bg-foundry-ground p-3.5 transition-colors hover:border-foundry-brass hover:text-foundry-brass sm:p-4 ${color}`}
              >
                {renderizarIconoCanal(canal)}
              </a>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-foundry-seam pt-4 text-[10px] text-foundry-type-dim">
          <span className="min-w-0 truncate">
            © {new Date().getFullYear()} {marca.brandName}
          </span>
          <span className="font-mono tracking-wider">REGISTERED</span>
        </div>
      </div>
    </div>
  );
}
