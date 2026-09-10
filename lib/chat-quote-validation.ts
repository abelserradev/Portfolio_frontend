export interface ValidacionCotizacion {
  readonly valido: boolean;
  readonly error?: string;
}

export function validarFormularioCotizacion(input: {
  readonly email: string;
  readonly telefono: string;
  readonly descripcion: string;
  readonly sessionId: string | null;
}): ValidacionCotizacion {
  if (!input.sessionId?.trim()) {
    return { valido: false, error: 'Sesión de chat no iniciada.' };
  }
  if (!input.email.trim()) {
    return { valido: false, error: 'Indica un correo de contacto.' };
  }
  const desc = input.descripcion.trim();
  if (desc.length < 10) {
    return { valido: false, error: 'Describe tu proyecto en al menos 10 caracteres.' };
  }
  if (input.telefono.trim().length < 6) {
    return { valido: false, error: 'Indica un número de contacto válido.' };
  }
  return { valido: true };
}
