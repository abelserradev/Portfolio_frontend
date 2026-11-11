# Buildforge Portfolio — Contexto del proyecto

Documento de referencia (spec-anchored) para humanos y agentes: qué es el portafolio, a quién va dirigido, qué problema resuelve y cómo encaja con el ecosistema Buildforge.

**Producción:** [portfolio.buildforge.work](https://portfolio.buildforge.work)  
**Repositorios:** `Portfolio_frontend` (Next.js) + `Portfolio_backend` (FastAPI)  
**Última revisión de contexto:** 2026-11-01

---

## 1. Respuesta en una frase

El portafolio es la **cara comercial y técnica** del estudio **Buildforge**: un sitio cyber/retro que muestra servicios, proyectos reales (“misiones”), actividad pública en GitHub, contacto y un **asistente de cotización** — todo alimentado por un backend propio que también registra analytics con consentimiento.

---

## 2. Qué es (y qué no es)

| Es | No es |
|----|--------|
| Landing + showcase de proyectos y MVPs | Un CMS genérico ni un marketplace |
| Canal de captación freelance / B2B pequeño | Tienda ni pasarela de pagos |
| Puerta de entrada a demos (p. ej. Spend$ave / Mobile Gastos) | Sustituto de la app de producto |
| Sitio con chat orientado a **cotización** y leads | Chat de soporte 24/7 garantizado (depende de Ollama/reglas) |

**Marca por defecto:** Buildforge (`lib/site-config.ts`), personalizable vía `NEXT_PUBLIC_*`.

---

## 3. A quién quiere llegar

### Audiencia primaria

- **Fundadores y equipos pequeños** (LatAm, especialmente Venezuela/región) que necesitan software a medida: web, móvil, APIs, MVP → producción.
- **Clientes potenciales freelance** que llegan por Instagram (`@buildforge.work`), LinkedIn, GitHub o referidos y quieren ver **trabajo real** antes de escribir.

### Audiencia secundaria

- **Early adopters** de productos propios (hoy: **Mobile Gastos / Spend$ave**) — banner, misión destacada, guía 3D embebida, CTAs hacia [mobilegastos.buildforge.work](https://mobilegastos.buildforge.work).
- **Reclutadores / partners técnicos** que revisan stack, GitHub y calidad de entrega (CI, seguridad, Sonar).

### Jobs-to-be-done (JTBD)

1. *“¿Este estudio puede construir lo que necesito?”* → servicios + pitch + video/poster + misiones.
2. *“¿Tienen algo desplegado que pueda probar?”* → misión destacada, demo web, visitas contadas vía backend.
3. *“¿Cómo los contacto rápido?”* → contacto retro, redes, chat de cotización.
4. *“Quiero probar Spend$ave”* → flujo desde portfolio → login/descarga en subdominio de producto.

---

## 4. Fin y objetivos de negocio

1. **Generar leads cualificados** (correo, chat con intención `cotizacion`, early adopter Mobile Gastos).
2. **Demostrar capacidad técnica** con proyectos etiquetados (`live`, `mvp_active`, `in_development`, `coming_soon`).
3. **Centralizar narrativa de marca** (servicios, tono visual, enlaces sociales).
4. **Medir interés con respeto a privacidad** (analytics solo tras consentimiento GDPR en banner).
5. **Impulsar productos propios** sin mezclarlos con el mensaje genérico de consultoría (bloque “misión destacada” + producto en construcción en home).

Objetivos **no** explícitos en código pero alineados: SEO básico vía metadata Next; despliegue estable en **Coolify** (Dockerfile + `standalone`).

---

## 5. Propuesta de valor (mensaje)

Configurable en env; valores por defecto en `obtenerConfigMarca()`:

- **Rol:** Estudio de desarrollo de software.
- **Tagline:** Desarrollo de software a medida.
- **Pitch:** Apps web, APIs, móvil, IA, MVP → producción, enfoque en resultados de negocio.
- **Servicios típicos:** aplicaciones web/móvil, APIs/backends, integraciones IA, MVP y deploy.

Tono UI: **terminal / cyberpunk** (Orbitron, cyan/magenta/amarillo, copy tipo `VER_SERVICIOS`, `// MISIÓN DESTACADA`).

---

## 6. Arquitectura del sistema

```text
┌─────────────────────────────────────────────────────────────┐
│  Usuario (navegador)                                        │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Portfolio_frontend — Next.js 16 (App Router), React 19     │
│  • SSR/CSR híbrido, output standalone, CSP en next.config   │
│  • Estáticos: public/media, public/demos/*.html             │
└───────────────────────────┬─────────────────────────────────┘
                            │ NEXT_PUBLIC_API_URL → /api/v1
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Portfolio_backend — FastAPI + SQLAlchemy                   │
│  • /projects (catálogo, redirect visitas)                   │
│  • /chat (cotización; Ollama opcional + fallback reglas)    │
│  • /github (actividad pública)                              │
│  • /analytics (eventos anónimos post-consentimiento)        │
└─────────────────────────────────────────────────────────────┘
```

### Contratos front ↔ back

| Front | Backend | Uso |
|-------|---------|-----|
| `listarProyectos()` | `GET /api/v1/projects/` | Grid de misiones |
| `obtenerUrlRedirectVisita(id)` | `GET /api/v1/projects/{id}/visit` | CTA “probar demo” + contador |
| Chat API | `POST /api/v1/chat/...` | Asistente Buildforge |
| Analytics | `POST /api/v1/analytics/...` | Tras aceptar banner |
| GitHub hook | `GET /api/v1/github/...` | Panel actividad |

Base API normalizada en `obtenerBaseApiPortfolio()` (soporta URL sin sufijo `/api/v1` en Coolify).

---

## 7. Mapa del sitio (una página, anclas)

Orden en `app/pages/Home.tsx`:

| Ancla | Componente | Propósito |
|-------|------------|-----------|
| `#inicio` | `HeroSection` | Marca, typewriter servicios, CTA servicios/chat |
| (banner) | `FeaturedBannerSlot` | Producto en construcción (Mobile Gastos) si hay `is_featured` |
| `#servicios` | `BuildforgeServicesSection` | Pitch, lista servicios, video/poster, CTA misiones/cotización |
| (estado) | `StatusPanel` | Métricas / estado “núcleo” |
| (actividad) | `ActivityGraph` | GitHub vía API |
| `#misiones` | `MissionGrid` | Destacada + resto; demo 3D Spend$ave en iframe |
| `#contacto` | `RetroContactCard` | Email, redes, estado disponibilidad |

Global: `Navbar`, `CyberBackground`, `ChatProvider` (FAB), `AnalyticsConsentBanner`, `PortfolioAnalytics`, `CodeFooter`.

---

## 8. Dominio “Misiones” (proyectos)

Los proyectos son **entidades del backend**, no hardcode en el front (salvo demos estáticas en `public/demos/`).

- **`is_featured`:** misión destacada + banner home; layout `FeaturedMissionBlock` (tarjeta + `FeaturedMission3dShowcase`).
- **`status`:** controla badges y copy (`mission-presentation.ts`).
- **`live_url`:** demo; el enlace público pasa por redirect de visitas en backend.

**Producto estrella actual:** Mobile Gastos (Spend$ave) — MVP activo, demo en subdominio, app Android en evolución. Guía 3D: `/demos/spendave-guia-usuario-3d.html` (Three.js, embebida con CSP dedicada: `frame-ancestors 'self'`, jsDelivr).

---

## 9. Seguridad y cumplimiento (front)

- **CSP global:** `frame-ancestors 'none'` en rutas normales (anti-clickjacking).
- **CSP `/demos/*`:** permite iframe same-origin + scripts CDN para la guía 3D.
- **Analytics:** opt-in; `NEXT_PUBLIC_ANALYTICS_ENABLED=false` desactiva pipeline.
- **Dependencias:** pnpm, audit high en CI, SonarCloud, CodeQL, gitleaks.

---

## 10. Calidad y gobernanza de cambios

- **CI:** lint, build, `pnpm audit`, tests unitarios (Vitest), e2e smoke (Playwright).
- **PR Validation:** obligatorio `Closes #N` con issue `status:approved` + exactamente un label `type:*`.
- **SonarCloud:** quality gate en PRs; demos estáticas excluidas vía `sonar-project.properties` (`public/demos/**`).

Flujo habitual: `develop` → PR → `main` → deploy Coolify.

---

## 11. Stack y operación

| Capa | Tecnología |
|------|------------|
| UI | Next.js 16, React 19, Tailwind 4, Framer Motion |
| Tests | Vitest, Testing Library, Playwright |
| API | FastAPI, PostgreSQL (backend), rate limit, CORS |
| IA chat | Ollama (opcional) + fallback por reglas |
| Deploy | Docker Node 22, `next build` standalone, puerto 3000 |

Variables clave: ver `README.md` y `.env.example`.

---

## 12. Principios (constitution lite)

1. **Una fuente de verdad para marca/contacto:** `lib/site-config.ts`.
2. **Presentación de misiones desacoplada:** `lib/mission-presentation.ts` (no duplicar badges en componentes).
3. **API URL tolerante a misconfig Coolify:** `lib/api-config.ts`.
4. **Secciones aisladas:** `SectionBoundary` por bloque en home (fallo parcial no tumba la página).
5. **Specs/docs viven en repo:** este archivo y README operativo; features grandes → SDD (PRD, delta specs) cuando aplique.

---

## 13. Criterios EARS (muestra — comportamiento esperado)

| ID | Criterio (EARS) |
|----|------------------|
| REQ-001 | WHEN el usuario abre el sitio, THE SYSTEM SHALL mostrar hero, servicios y misiones sin requerir login. |
| REQ-002 | WHEN el backend de proyectos no responde, THE SYSTEM SHALL mostrar estado de error en `#misiones` sin bloquear el resto de la home. |
| REQ-003 | WHERE analytics está habilitado, WHEN el usuario no ha aceptado consentimiento, THE SYSTEM SHALL NOT enviar eventos al backend. |
| REQ-004 | WHEN el usuario pulsa visitar demo con `live_url`, THE SYSTEM SHALL usar redirect `/projects/{id}/visit` del backend. |
| REQ-005 | WHEN el usuario inicia la guía 3D embebida, THE SYSTEM SHALL cargar `/demos/...` en iframe con política CSP que permita `frame-ancestors 'self'`. |
| REQ-006 | WHEN el usuario pulsa CTAs de la guía 3D, THE SYSTEM SHALL navegar a mobilegastos.buildforge.work (`/login`, `/descargar`) con `target="_top"`. |

---

## 14. Roadmap implícito (deuda visible en producto)

- Video de servicios real (`NEXT_PUBLIC_SERVICES_VIDEO_URL`) vs poster placeholder.
- Chat 100% útil solo si Ollama está configurado en producción.
- Dependabot: bumps mayores (React, CodeQL v4) requieren PRs con validación completa, no merge masivo.
- Sincronizar copia fuente `gastos/docs/spendave-guia-usuario-3d.html` con `public/demos/` cuando cambie la guía.

---

## 15. Revisión de código (hallazgos — prioridad)

Revisión orientada a bugs/regresiones/seguridad; **sin cambios aplicados en este documento**.

### Alta

1. **Dependencia runtime del backend:** si `NEXT_PUBLIC_API_URL` falla en build Coolify, el front cae a `127.0.0.1:8010` — en producción eso rompe misiones, chat y analytics. *Mitigación:* validar env en build/deploy checklist.

### Media

2. **Demo HTML ~1.8k líneas en repo:** mantenimiento duplicado (gastos vs portfolio); riesgo de drift. *Mitigación:* script de copy en CI o un solo artefacto publicado.
3. **Iframe + CSP:** correcto hoy con ruta `/demos/*`; cualquier nueva demo embebida debe repetir patrón headers o fallará en silencio (icono roto).
4. **Chat/Ollama:** degradación silenciosa a reglas — OK para UX, pero expectativas de “IA” deben estar documentadas comercialmente.

### Baja

5. **`useProjects` sin revalidación:** lista de misiones fija en sesión; aceptable para portfolio estático, no para admin en vivo.
6. **Sonar excluye `public/demos/**`:** bien para QG; no sustituye accesibilidad manual en demos (p. ej. labels en controles).

### Tests

- Cobertura razonable en analytics, consent, mission-presentation, chat hooks; **faltan tests e2e** del flujo iframe + CSP (difícil en CI sin deploy preview).

---

## 16. Referencias rápidas

| Tema | Ubicación |
|------|-----------|
| Operación local/deploy | `README.md` |
| Marca y contacto | `lib/site-config.ts` |
| Misiones / CTAs | `lib/mission-presentation.ts`, `components/missions/` |
| CSP / iframe demos | `next.config.ts` |
| Demo 3D Spend$ave | `public/demos/spendave-guia-usuario-3d.html` |
| Backend API | `Portfolio_backend/app/api/v1/endpoints/` |
| Producto Spend$ave | `gastos/frontend_gastosmobile`, `gastos/README.md` |

---

*Para ampliar con SDD v2 (PRD completo, API spec formal, tasks trazables a REQ-NNN), usar la skill spec-driven-design y colgar deltas en `docs/changes/` cuando una feature supere el umbral “medium feature”.*
