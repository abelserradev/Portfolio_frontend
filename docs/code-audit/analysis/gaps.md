# Gap matrix — code-audit Phase 0

**Repo:** `C:\Users\aserra\OneDrive - VENEMERGENCIA AG, C.A\Documentos\buildforge\Portfolio_frontend`  
**Stacks:** nextjs, reactjs, vitejs  
**Dockerfiles:** 1 · **Lockfiles:** 1 · **pre-commit:** NO

**Tests:** 16 unit (heuristic) · 1 integration

| Dimension | Tooling present? | Tools found |
|---|---|---|
| DRY | ❌ | — |
| SOLID | ❌ | — |
| unit_tests | ✅ | vitest |
| integration_tests | ✅ | e2e |
| SAST | ✅ | codeql |
| SCA | ✅ | npm audit |
| secrets | ✅ | gitleaks |
| containers | ❌ | — |

## Stack details
- **nextjs** in `.` — evidence: package.json:next
- **vitejs** in `.` — evidence: package.json:vite
- **reactjs** in `.` — evidence: package.json:react

## Dockerfiles
- `Dockerfile`

> Note: the matrix detects *configuration*, not execution. A ✅ means the tool appears in the scanned pre-commit/CI/configs; verify in Phase 1 that it actually runs and blocks.
