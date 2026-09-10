const HOSTS_WHATSAPP_PERMITIDOS = ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'] as const;

export function esUrlWhatsAppSegura(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') {
      return false;
    }
    const host = parsed.hostname.toLowerCase();
    return HOSTS_WHATSAPP_PERMITIDOS.some(
      (permitido) => host === permitido || host.endsWith(`.${permitido}`),
    );
  } catch {
    return false;
  }
}

export function sanitizarUrlWhatsApp(url: string | null | undefined): string | null {
  if (!url?.trim()) {
    return null;
  }
  return esUrlWhatsAppSegura(url) ? url : null;
}

export function extraerTextoDesdeWaUrl(url: string): string | null {
  try {
    const texto = new URL(url).searchParams.get('text');
    return texto ? decodeURIComponent(texto.replace(/\+/g, ' ')) : null;
  } catch {
    return null;
  }
}
