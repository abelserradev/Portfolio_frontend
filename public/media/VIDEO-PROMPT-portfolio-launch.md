# VIDEO PROMPT: Buildforge Portfolio Launch

Estilo visual: **Cyber-Retro / Terminal / Clean Tech**  
Duración objetivo: **~90–130 s** (placas con fade in/out, velos, scroll eased 60fps + chat real)  
Salida grabada: `portfolio-launch-cyber-reel.webm` (playwright-cli)

## Escenas (guion)

| Tiempo | Overlay | Acción en pantalla |
|--------|---------|-------------------|
| 0–10s | `// ESTUDIO BUILDFORGE` | Terminal boot → [portfolio.buildforge.work](https://portfolio.buildforge.work) hero |
| 10–38s | Placas `MISIONES REALES` + stack (pantalla completa) | Luego `#misiones` y demo 3D Spend$ave |
| 38–75s | Cotización IA | FAB → envío → **espera respuesta del asistente** (+ placa con extracto) |
| 40–60s | `BUILDFORGE` + URL | `#contacto` → cierre CRT |

## Audio + LinkedIn (ElevenLabs + ffmpeg)

1. Crear `Portfolio_frontend/.env.local` con `ELEVENLABS_API_KEY=...` (clave con **De texto a voz → Acceso**; no hace falta listar voces si usás el voice id en el JSON)
2. Instalar ffmpeg embebido (una vez): `pnpm add -D ffmpeg-static`
3. Ejecutar:

```bash
pnpm media:linkedin-reel
```

Salida: `portfolio-launch-linkedin.mp4` (H.264 + AAC, `faststart`). Guion de voz en `portfolio-launch-voiceover-scenes.json` (voz masculina **George**, español).

Solo remux sin regenerar TTS: `node scripts/build-portfolio-linkedin-reel.mjs --skip-voice`

## Regenerar el WebM

Desde `Portfolio_frontend/`:

```bash
playwright-cli open --browser=chrome about:blank
playwright-cli run-code --filename scripts/record-portfolio-launch-video.mjs
playwright-cli close
```

## Prompts para IA de video (post-producción)

Usar los bloques del brief original (Escenas 1–4) para upscaling, música synthwave o B-roll si el WebM base necesita pulido.
