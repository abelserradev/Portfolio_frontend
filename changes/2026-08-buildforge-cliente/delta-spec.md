# Delta Spec — Buildforge orientado a clientes

**Fecha:** 2026-08-14  
**Estado:** Implementado

## Cambios

### REQ-001 — Instagram en contacto

WHEN el visitante abre `#contacto`, THE SYSTEM SHALL mostrar enlace a Instagram [@buildforge.work](https://www.instagram.com/buildforge.work/) que abre en nueva pestaña.

- Default: `https://www.instagram.com/buildforge.work/` en `lib/site-config.ts`
- Override: `NEXT_PUBLIC_INSTAGRAM_URL`

### REQ-002 — Sección servicios con media

WHEN el visitante llega a `#servicios`, THE SYSTEM SHALL mostrar pitch comercial, lista de servicios y reproductor de video.

IF el video no carga, THE SYSTEM SHALL mostrar imagen poster.

IF el poster tampoco carga, THE SYSTEM SHALL mostrar placeholder “Media próximamente”.

### REQ-003 — Intro antes de misiones

WHEN el visitante llega a `#misiones`, THE SYSTEM SHALL mostrar texto introductorio antes del listado de proyectos.

### REQ-004 — Branding Buildforge

THE SYSTEM SHALL presentar Buildforge como marca principal en logo, contacto, metadata y hero orientado a clientes.

## Archivos tocados

- `lib/site-config.ts` (nuevo)
- `components/services/*` (nuevo)
- `components/missions/missions-intro-block.tsx` (nuevo)
- `components/contact/retro-contact-card.tsx`
- `components/missions/missionGrid.tsx`
- `components/hero/HeroSection.tsx`
- `components/ui/GlitchLogo.tsx`
- `components/layout/navbar.tsx`
- `app/pages/Home.tsx`
- `app/layout.tsx`
