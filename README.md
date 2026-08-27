# Portafolio (Next.js)

Sitio del portafolio. Gestor de paquetes: **pnpm** (lockfile `pnpm-lock.yaml`).

## Requisitos

- Node.js 20+
- [pnpm](https://pnpm.io/installation) 10+ (o `corepack enable` y usar la versión de `packageManager` en `package.json`)

## Desarrollo local

```bash
corepack enable
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

Variables: crea `.env` o `.env.local` con al menos:

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend (p. ej. `http://localhost:8010/api/v1`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Correo de contacto freelance |

Opcionales (marca Buildforge — defaults en `lib/site-config.ts`):

| Variable | Default |
|----------|---------|
| `NEXT_PUBLIC_BRAND_NAME` | `Buildforge` |
| `NEXT_PUBLIC_LOGO_TEXT` | `</BUILDFORGE>` |
| `NEXT_PUBLIC_BRAND_ROLE` | Estudio de desarrollo de software |
| `NEXT_PUBLIC_BRAND_TAGLINE` | Desarrollo de software a medida |
| `NEXT_PUBLIC_BRAND_PITCH` | Pitch comercial (párrafo) |
| `NEXT_PUBLIC_SERVICES_LIST` | JSON array o items separados por `\|` |
| `NEXT_PUBLIC_SERVICES_VIDEO_URL` | `/media/buildforge-servicios.mp4` |
| `NEXT_PUBLIC_SERVICES_POSTER_URL` | `/media/buildforge-servicios-poster.jpg` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | `https://www.instagram.com/buildforge.work/` |
| `NEXT_PUBLIC_GITHUB_URL` | GitHub |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn |
| `NEXT_PUBLIC_CONTACT_STATUS` | Línea de estado en contacto |

Media promocional: ver [`public/media/README.md`](public/media/README.md).

## Scripts

| Comando | Uso |
|---------|-----|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Servir build |
| `pnpm lint` | ESLint |
| `pnpm audit` | Auditoría de dependencias |

En CI se usa `pnpm install --frozen-lockfile` para instalar exactamente lo del lockfile.

## Seguridad (pnpm)

- Estructura de `node_modules` estricta (menos dependencias fantasma que npm clásico).
- `onlyBuiltDependencies` en `pnpm-workspace.yaml`: solo `sharp` y `unrs-resolver` ejecutan scripts de instalación.
- `.npmrc` con `engine-strict=true`.

No uses `npm install` en este repo; `package-lock.json` está ignorado a propósito.

## Deploy (Coolify)

El despliegue lo orquesta **Coolify** desde la rama configurada.

### Recomendado: Build Pack **Dockerfile**

Evita Nixpacks (descargas de `nixpkgs` desde GitHub, builds más lentos e inestables).

1. En el recurso → **Configuration** → **Build Pack:** `Dockerfile`
2. **Ports Exposes:** `3000` (coincide con `EXPOSE` / `ENV PORT` del Dockerfile)
3. **Build Variables:** todas las `NEXT_PUBLIC_*` necesarias (build time)
4. Redeploy

El `Dockerfile` usa Node 22 + pnpm, salida Next.js `standalone` y `node server.js`.

### Alternativa: Nixpacks

Si usas Nixpacks, existe `nixpacks.toml` con `pnpm install --frozen-lockfile` y Node 22. Coolify suele autodetectar el puerto.

### Fallo `exit code 255` a mitad de `pnpm install`

El log se corta **sin error de pnpm** (p. ej. en “downloaded 57/367”). Eso casi nunca es bug del código: Coolify mata la sesión SSH del build ([issue conocido](https://github.com/coollabsio/coolify/issues/10853)).

**Qué hacer:**

1. **Redeploy** (a menudo basta en el segundo intento)
2. **Force deploy without cache** en Coolify
3. Cambiar a **Build Pack = Dockerfile** (más estable)
4. Si persiste: en el servidor Coolify, valorar `MUX_ENABLED=false` o revisar timeouts/red hacia `registry.npmjs.org`

### Variables de build

Las `NEXT_PUBLIC_*` deben estar como **Build Variables** en Coolify (se inyectan en build time).
