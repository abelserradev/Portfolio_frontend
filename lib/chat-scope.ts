/**
 * Lightweight client-side scope heuristic mirroring Portfolio_backend
 * chat_scope_guard — soft-block before the API; backend remains source of truth.
 */

export const MENSAJE_FUERA_DE_ALCANCE =
  'Solo puedo ayudarte con proyectos de software de Buildforge: portfolio, ' +
  'servicios, cotizaciones y contacto. Cuéntame qué quieres construir ' +
  '(landing, MVP, API, app o integración con IA) y te oriento.';

/** FAQ: "qué es Buildforge" — must never show the generic refuse. */
export const MENSAJE_IDENTIDAD_BUILDFORGE =
  'Buildforge es la marca y el dominio de un desarrollador fullstack: ' +
  'representa el portafolio de sus proyectos de software (apps web, APIs, ' +
  'móvil e integraciones con IA). Aquí puedes ver esos trabajos, conocer ' +
  'los servicios y pedir una cotización orientativa.';

/** FAQ: mission-card badges (EN PRODUCCIÓN / EN DESARROLLO / …). */
export const MENSAJE_ESTADO_MISION =
  'En las tarjetas del portafolio, esas etiquetas indican el estado de cada proyecto:\n' +
  '• EN PRODUCCIÓN: ya está publicado y puedes abrirlo con el enlace de la tarjeta.\n' +
  '• EN DESARROLLO: aún se construye o despliega; el acceso público puede no estar listo.\n' +
  '• MVP ACTIVO: hay una demo usable mientras el producto sigue evolucionando.\n' +
  '• PRÓXIMAMENTE: anunciado, todavía sin demo pública.\n' +
  'Si te interesa uno en concreto, dime el nombre y te oriento o cotizamos algo similar.';

const JAILBREAK_PATTERNS: readonly RegExp[] = [
  /ignore\s+(all\s+)?(previous|prior|above|earlier)\s+instructions?/i,
  /disregard\s+(all\s+)?(previous|prior|your)\s+(instructions?|rules?)/i,
  /forget\s+(all\s+)?(your\s+)?(instructions?|rules?|prompt)/i,
  /ignora(r)?\s+(todas\s+)?(las\s+)?(instrucciones|reglas|indicaciones)/i,
  /olvida(r)?\s+(todas\s+)?(las\s+)?(instrucciones|reglas)/i,
  /\bdan\b.{0,40}\b(mode|jailbreak)\b/i,
  /\bjailbreak\b/i,
  /developer\s+mode/i,
  /act\s+as\s+(an?\s+)?unrestricted/i,
  /act[uaá]a?\s+como\s+(una?\s+)?ia\s+sin\s+restricciones/i,
  /you\s+are\s+now\s+(a|an|dan|unrestricted)/i,
  /pretend\s+(you\s+have\s+)?no\s+restrictions?/i,
  /reveal\s+(your\s+)?(system\s+)?prompt/i,
  /show\s+(me\s+)?(your\s+)?(system\s+)?prompt/i,
  /revela(r)?\s+(el\s+)?(system\s+)?prompt/i,
  /muestra(me)?\s+(el\s+)?(system\s+)?prompt/i,
  /print\s+(your\s+)?system\s+prompt/i,
  /bypass\s+(your\s+)?(safety|filters?|rules?)/i,
  /sin\s+restricciones?\s+(eticas|éticas|de\s+seguridad)?/i,
  /roleplay\s+as\s+(an?\s+)?(unrestricted|uncensored)/i,
];

const TOPIC_SIGNALS: readonly string[] = [
  'buildforge',
  'portfolio',
  'cotiz',
  'presupuesto',
  'precio',
  'costo',
  'cuesta',
  'servicio',
  'landing',
  'mvp',
  'saas',
  'api',
  'backend',
  'frontend',
  'app',
  'movil',
  'mobile',
  'android',
  'ios',
  'pwa',
  'web',
  'sitio',
  'pagina',
  'portal',
  'tienda',
  'ecommerce',
  'chatbot',
  'llm',
  'ocr',
  'ia',
  'inteligencia artificial',
  'integracion',
  'whatsapp',
  'contacto',
  'email',
  'correo',
  'telefono',
  'proyecto',
  'desarrollo',
  'produccion',
  'mision',
  'etiqueta',
  'software',
  'stack',
  'react',
  'next',
  'nestjs',
  'django',
  'fastapi',
  'hosting',
  'dominio',
  'ui',
  'ux',
  'dashboard',
  'panel',
  'microservicio',
  'graphql',
  'rest',
];

const GREETING_RE =
  /^\s*(hola|buenas|buen[oa]s?\s+(dias|tardes|noches)|hey|hi|hello|saludos|que\s+tal|como\s+estas?)\b/i;

function normalizar(texto: string): string {
  return texto
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();
}

function esIntentoJailbreak(mensaje: string): boolean {
  const texto = normalizar(mensaje);
  return JAILBREAK_PATTERNS.some((p) => p.test(texto));
}

function tieneSenalTemaPermitido(mensaje: string): boolean {
  const texto = normalizar(mensaje);
  if (GREETING_RE.test(texto) && texto.length < 80) {
    return true;
  }
  // Pad tokens so short signals (ia/ui/api) match whole words without JS \\b quirks
  const padded = ` ${texto.replace(/[^\p{L}\p{N}]+/gu, ' ')} `;
  return TOPIC_SIGNALS.some((signal) => {
    if (signal.length <= 3) {
      return padded.includes(` ${signal} `);
    }
    return texto.includes(signal);
  });
}

/** Brand/portfolio identity — canned answer, never the generic refuse. */
export function esPreguntaIdentidadBuildforge(mensaje: string): boolean {
  const texto = normalizar(mensaje);
  if (!texto.trim()) {
    return false;
  }
  if (
    texto.includes('buildforge') &&
    [
      'que es',
      'quien es',
      'que hace',
      'que significa',
      'sobre',
      'acerca de',
      'marca',
      'dominio',
      'portafolio',
      'portfolio',
      'estudio',
      'empresa',
    ].some((p) => texto.includes(p))
  ) {
    return true;
  }
  return [
    'quien eres',
    'que eres',
    'que es esto',
    'sobre ti',
    'hablame de ti',
    'cuentame de ti',
    'para que sirve este chat',
  ].some((p) => texto.includes(p));
}

/** Mission-card status badges — canned answer, never the generic refuse. */
export function esPreguntaEstadoMision(mensaje: string): boolean {
  const texto = normalizar(mensaje);
  if (!texto.trim()) {
    return false;
  }
  const pregunta = [
    'que significa',
    'que quiere decir',
    'significa',
    'quiere decir',
    'diferencia entre',
    'que es en ',
    'etiqueta',
    'badge',
    'estado de',
    'estado del',
  ].some((p) => texto.includes(p));
  if (!pregunta) {
    return false;
  }
  return [
    'en produccion',
    'en desarrollo',
    'mvp activo',
    'proximamente',
    'en curso',
    'produccion',
    'mvp',
  ].some((e) => texto.includes(e));
}

/**
 * Allowlist soft-block: only greetings + Buildforge/project signals call the API.
 * General trivia ("qué es Google") has no signal → refuse without hitting the backend.
 * Brand/status FAQs are never treated as out of scope.
 */
export function esFueraDeAlcance(texto: string): boolean {
  const limpio = texto.trim();
  if (!limpio) {
    return true;
  }
  if (esPreguntaIdentidadBuildforge(limpio) || esPreguntaEstadoMision(limpio)) {
    return false;
  }
  if (esIntentoJailbreak(limpio)) {
    return true;
  }
  return !tieneSenalTemaPermitido(limpio);
}
