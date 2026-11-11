# Media estáticos (`public/media/`)

Placeholders SVG incluidos para desarrollo y deploy sin assets finales.

| Archivo | Uso | Reemplazo en prod |
|---------|-----|-------------------|
| `buildforge-assistant.svg` | Avatar del chat (FAB e intro) | PNG/WebP 256×256 recomendado |
| `banner_frame.svg` | Poster por defecto de servicios | `banner_frame.png` o URL en `NEXT_PUBLIC_SERVICES_POSTER_URL` |
| `missions/*.png|jpg` | Stills de misiones (hero + cards) cuando la API no trae `image_url` | Sustituir por URLs permanentes en el catálogo |

Video de servicios: configurar `NEXT_PUBLIC_SERVICES_VIDEO_URL` (HTTPS). Valores `none`, `false` u `off` desactivan el reproductor.

| Archivo | Uso |
|---------|-----|
| `portfolio-launch-cyber-reel.webm` | Reel local del launch (no versionado; generar fuera del PR) |
| `VIDEO-PROMPT-portfolio-launch.md` | Guion + prompts IA para regenerar el reel |
