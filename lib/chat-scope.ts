/**
 * Lightweight client-side scope heuristic mirroring Portfolio_backend
 * chat_scope_guard — soft-block before the API; backend remains source of truth.
 */

export const MENSAJE_FUERA_DE_ALCANCE =
  'Solo puedo ayudarte con proyectos de software de Buildforge: portfolio, ' +
  'servicios, cotizaciones y contacto. Cuéntame qué quieres construir ' +
  '(landing, MVP, API, app o integración con IA) y te oriento.';

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

const OFFTOPIC_PATTERNS: readonly RegExp[] = [
  /\b(poema|poem|poesia|poetry|haiku|soneto)\b/i,
  /\b(receta|recipe|cocinar|cocina|baking)\b/i,
  /\b(tarea|homework|ensayo|essay)\b.{0,30}\b(escuela|colegio|universidad|school|college)\b/i,
  /\b(politica|politics|elecciones|election)\b/i,
  /\b(diagnostico|medical advice|consejo medico|receta medica)\b/i,
  /\b(asesoria legal|legal advice|demanda judicial)\b/i,
  /como\s+hacke(ar|o)\b/i,
  /\b(hackear|crackear|piratear)\b.{0,40}\b(wifi|wi-?fi|contrasena|password|cuenta)\b/i,
  /escribe(me)?\s+(un|una)\s+(cuento|chiste|cancion|letra)\b/i,
  /write\s+(me\s+)?(a\s+)?(poem|story|song|joke)\b/i,
  /genera(me)?\s+(un|una)\s+(poema|receta|chiste)\b/i,
  /\b(credenciales|api[_ ]?keys?|secret[_ ]?key|password\s+de\s+produccion)\b/i,
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
  'inteligencia artificial',
  'integracion',
  'whatsapp',
  'contacto',
  'email',
  'correo',
  'telefono',
  'proyecto',
  'desarrollo',
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
  // bare "ia" needs a word boundary so "familia" does not count
  if (/\bia\b/.test(texto)) {
    return true;
  }
  return TOPIC_SIGNALS.some((signal) => texto.includes(signal));
}

function esClaramenteFueraDeTema(mensaje: string): boolean {
  if (tieneSenalTemaPermitido(mensaje)) {
    return false;
  }
  const texto = normalizar(mensaje);
  return OFFTOPIC_PATTERNS.some((p) => p.test(texto));
}

/** True when the client should soft-refuse without calling the chat API. */
export function esFueraDeAlcance(texto: string): boolean {
  const limpio = texto.trim();
  if (!limpio) {
    return false;
  }
  if (esIntentoJailbreak(limpio)) {
    return true;
  }
  return esClaramenteFueraDeTema(limpio);
}
