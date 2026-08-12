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

Variables: crea `.env` o `.env.local` con `NEXT_PUBLIC_API_URL` apuntando al backend (p. ej. `http://localhost:8010/api/v1`).

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

## Deploy

El despliegue lo orquesta **Coolify** desde la rama configurada.

**Build pack: Nixpacks** (recomendado). Autoconfigura puerto y start command; no requiere ajustes de red en Coolify. Tras el deploy, toma la URL `Network` de los logs y úsala como origen en Cloudflare.

**Respaldo: Dockerfile.** El repo incluye un `Dockerfile` funcional (Node 22 + pnpm, salida `standalone`) por si Nixpacks falla — p. ej. cuando GitHub devuelve 503 al descargar `nixpkgs`. Si se usa:

1. **Build Pack:** `Dockerfile`
2. **Ports Exposes:** `5173` (debe coincidir con `EXPOSE`/`ENV PORT` del Dockerfile)
3. **Domains:** con protocolo, `https://portfolio.buildforge.work`

Variables `NEXT_PUBLIC_*` deben estar definidas como **Build Variables** en Coolify (se inyectan en build time).
