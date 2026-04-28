import { Mail, Database, Terminal } from 'lucide-react';

type CanalContactoVisual = 'mail' | 'github' | 'linkedin';

interface SocialLinkDescriptor {
  readonly etiqueta: string;
  readonly canal: CanalContactoVisual;
  readonly url: string;
  readonly color: string;
}

function obtenerEnlacesSociales(contactData: ContactDataResolved): SocialLinkDescriptor[] {
  const filas: SocialLinkDescriptor[] = [
    {
      etiqueta: 'mail',
      canal: 'mail',
      url: `mailto:${contactData.email}`,
      color: 'text-red-400',
    },
    {
      etiqueta: 'github',
      canal: 'github',
      url: contactData.githubFullUrl,
      color: 'text-white',
    },
    {
      etiqueta: 'linkedin',
      canal: 'linkedin',
      url: contactData.linkedinFullUrl,
      color: 'text-cyan-400',
    },
  ];
  return filas;
}

/** Valores públicos (NEXT_PUBLIC_*) o estos por defecto; edita lo que aplique */
interface ContactDataResolved {
  readonly name: string;
  readonly title: string;
  readonly status: string;
  readonly email: string;
  readonly githubFullUrl: string;
  readonly linkedinFullUrl: string;
}

function resolverDatosContacto(): ContactDataResolved {
  return {
    name: process.env.NEXT_PUBLIC_DISPLAY_NAME ?? 'ABEL SERRA',
    title: process.env.NEXT_PUBLIC_JOB_TITLE ?? 'AI Solutions Engineer',
    status:
      process.env.NEXT_PUBLIC_CONTACT_STATUS ??
      'EN LÍNEA // SECTOR: CARACAS_NODE_42',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'tucorreo@ejemplo.com',
    githubFullUrl:
      process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/Abelserradev',
    linkedinFullUrl:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ??
      'https://linkedin.com/in/tuusuario',
  };
}

/** Lucide omitió logos de marca en bundles recientes — SVG livianos con currentColor */
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

function renderizarIconoCanal(canal: CanalContactoVisual) {
  const animar = 'transition-transform duration-300 group-hover:scale-110';
  switch (canal) {
    case 'mail':
      return <Mail size={20} className={animar} />;
    case 'github':
      return <IconoGithubMarca size={20} className={animar} />;
    case 'linkedin':
      return <IconoLinkedinMarca size={20} className={animar} />;
  }
}

export default function RetroContactCard() {
  const contactData = resolverDatosContacto();
  const socialLinks = obtenerEnlacesSociales(contactData);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative group w-full max-w-2xl">
        <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-fuchsia-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

        <div className="relative bg-slate-900/90 border border-slate-700/50 p-6 rounded-lg leading-none flex flex-col font-mono text-cyan-100">
          <div className="flex items-center justify-between mb-5 border-b border-cyan-800/50 pb-3">
            <div className="flex items-center gap-3">
              <Database size={20} className="text-fuchsia-500 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#34d399]" />
            </div>
            <span className="text-[10px] text-fuchsia-400 tracking-wider uppercase font-bold">
              PERFIL DE USUARIO.SYS
            </span>
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 border border-red-900" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-emerald-900" />
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-4 border border-cyan-800/40 p-3 bg-slate-950/50 rounded shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]">
              <Terminal size={32} className="text-cyan-400" />
              <div>
                <h3 className="text-xl font-black text-white tracking-tight italic">
                  {contactData.name}
                </h3>
                <p className="text-[11px] text-fuchsia-500 font-extrabold uppercase tracking-widest mt-0.5">
                  &gt; {contactData.title}
                </p>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 leading-relaxed pl-1">
              &gt; STATUS: {contactData.status}
              <br />
              &gt; ENCRIPTACIÓN PROTOCOL_A_90... OK<br />
              &gt; ESPERANDO TRANSMISIÓN...
            </p>
          </div>

          <div className="border border-slate-700 p-2 bg-slate-950/80 rounded grid grid-cols-3 gap-2">
            {socialLinks.map(({ etiqueta, canal, url, color }) => {
              const enlazarExterno = url.startsWith('http');
              return (
                <a
                  key={etiqueta}
                  href={url}
                  {...(enlazarExterno
                    ? ({ target: '_blank', rel: 'noopener noreferrer' } as const)
                    : {})}
                  className={`flex items-center justify-center p-3.5 bg-slate-800 hover:bg-slate-700/50 border border-slate-600/50 hover:border-cyan-500 rounded transition-all duration-300 group ${color} hover:shadow-[0_0_12px_#22d3ee]`}
                >
                  {renderizarIconoCanal(canal)}
                </a>
              );
            })}
          </div>

          <div className="mt-5 pt-3 border-t border-cyan-800/30 flex justify-between items-center text-[9px] text-slate-500">
            <span>
              © {new Date().getFullYear()} {contactData.name}. // NEON_ARCH
            </span>
            <div className="h-1 w-16 bg-cyan-600 shadow-[0_0_5px_#22d3ee]" />
          </div>
        </div>
      </div>
    </div>
  );
}
