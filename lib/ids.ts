/** IDs de cliente/sesión — un solo lugar para evitar divergencia chat vs analytics. */
export function generarIdCliente(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}`;
}
