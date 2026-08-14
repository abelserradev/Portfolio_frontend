/** Fuente única de env públicos — marca Buildforge y contacto freelance */

export type CanalContactoVisual = 'mail' | 'github' | 'linkedin' | 'instagram';

export interface SocialLinkDescriptor {
  readonly etiqueta: string;
  readonly canal: CanalContactoVisual;
  readonly url: string;
  readonly color: string;
  readonly ariaLabel: string;
}

export interface SiteBrandConfig {
  readonly brandName: string;
  readonly logoText: string;
  readonly brandRole: string;
  readonly brandTagline: string;
  readonly brandPitch: string;
  readonly servicesList: readonly string[];
  readonly servicesVideoUrl: string;
  readonly servicesPosterUrl: string;
}

export interface SiteContactConfig {
  readonly status: string;
  readonly email: string;
  readonly githubFullUrl: string;
  readonly linkedinFullUrl: string;
  readonly instagramUrl: string;
}

const DEFAULT_SERVICES = [
  'Aplicaciones web y móvil',
  'APIs y backends escalables',
  'Integraciones con IA',
  'MVP y despliegue a producción',
] as const;

const DEFAULT_INSTAGRAM = 'https://www.instagram.com/buildforge.work/';

function parseServicesList(raw: string | undefined): readonly string[] {
  if (!raw?.trim()) {
    return DEFAULT_SERVICES;
  }
  const trimmed = raw.trim();
  if (trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
        return parsed;
      }
    } catch {
      // fallback pipe-separated
    }
  }
  return trimmed.split('|').map((s) => s.trim()).filter(Boolean);
}

export function obtenerConfigMarca(): SiteBrandConfig {
  return {
    brandName: process.env.NEXT_PUBLIC_BRAND_NAME ?? 'Buildforge',
    logoText: process.env.NEXT_PUBLIC_LOGO_TEXT ?? '</BUILDFORGE>',
    brandRole:
      process.env.NEXT_PUBLIC_BRAND_ROLE ?? 'Estudio de desarrollo de software',
    brandTagline:
      process.env.NEXT_PUBLIC_BRAND_TAGLINE ?? 'Desarrollo de software a medida',
    brandPitch:
      process.env.NEXT_PUBLIC_BRAND_PITCH ??
      'Transformamos ideas en productos digitales: apps web, APIs robustas, soluciones móviles e integraciones con IA. Desde el MVP hasta producción, con enfoque en resultados para tu negocio.',
    servicesList: parseServicesList(process.env.NEXT_PUBLIC_SERVICES_LIST),
    servicesVideoUrl:
      process.env.NEXT_PUBLIC_SERVICES_VIDEO_URL ?? '/media/buildforge-servicios.mp4',
    servicesPosterUrl:
      process.env.NEXT_PUBLIC_SERVICES_POSTER_URL ??
      '/media/buildforge-servicios-poster.jpg',
  };
}

export function obtenerConfigContacto(): SiteContactConfig {
  return {
    status:
      process.env.NEXT_PUBLIC_CONTACT_STATUS ??
      'EN LÍNEA // DISPONIBLE PARA PROYECTOS',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'tucorreo@ejemplo.com',
    githubFullUrl:
      process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/Abelserradev',
    linkedinFullUrl:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ??
      'https://linkedin.com/in/tuusuario',
    instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? DEFAULT_INSTAGRAM,
  };
}

export function obtenerEnlacesSociales(
  contacto: SiteContactConfig,
): readonly SocialLinkDescriptor[] {
  return [
    {
      etiqueta: 'mail',
      canal: 'mail',
      url: `mailto:${contacto.email}`,
      color: 'text-red-400',
      ariaLabel: 'Enviar correo a Buildforge',
    },
    {
      etiqueta: 'github',
      canal: 'github',
      url: contacto.githubFullUrl,
      color: 'text-white',
      ariaLabel: 'GitHub de Buildforge',
    },
    {
      etiqueta: 'linkedin',
      canal: 'linkedin',
      url: contacto.linkedinFullUrl,
      color: 'text-cyan-400',
      ariaLabel: 'LinkedIn de Buildforge',
    },
    {
      etiqueta: 'instagram',
      canal: 'instagram',
      url: contacto.instagramUrl,
      color: 'text-fuchsia-400',
      ariaLabel: 'Instagram @buildforge.work',
    },
  ];
}

export const MISIONES_INTRO = {
  encabezado: process.env.NEXT_PUBLIC_MISSIONS_INTRO_HEADING ?? '// PROYECTOS ENTREGADOS',
  subtitulo:
    process.env.NEXT_PUBLIC_MISSIONS_INTRO_SUBTITLE ??
    'Casos reales desarrollados bajo Buildforge — desde MVP hasta producción.',
} as const;