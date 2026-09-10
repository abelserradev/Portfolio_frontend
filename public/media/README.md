# Media estáticos (`public/media/`)

Placeholders SVG incluidos para desarrollo y deploy sin assets finales.

| Archivo | Uso | Reemplazo en prod |
|---------|-----|-------------------|
| `buildforge-assistant.svg` | Avatar del chat (FAB e intro) | PNG/WebP 256×256 recomendado |
| `banner_frame.svg` | Poster por defecto de servicios | `banner_frame.png` o URL en `NEXT_PUBLIC_SERVICES_POSTER_URL` |

Video de servicios: configurar `NEXT_PUBLIC_SERVICES_VIDEO_URL` (HTTPS). Valores `none`, `false` u `off` desactivan el reproductor.
