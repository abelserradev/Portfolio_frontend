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

**Build pack:** usa **Dockerfile** (no Nixpacks). Nixpacks descarga `nixpkgs` desde GitHub en cada build y falla con 503 si GitHub no responde.

El `Dockerfile` del repo usa Node 22 + pnpm (`pnpm install --frozen-lockfile`, `pnpm build`, `node server.js` con salida `standalone`).

Variables `NEXT_PUBLIC_*` deben estar definidas como **Build Variables** en Coolify (se inyectan en build time).
