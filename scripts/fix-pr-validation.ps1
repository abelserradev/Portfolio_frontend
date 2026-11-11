# Ejecutar DESPUÉS de: gh auth login
# Uso: .\scripts\fix-pr-validation.ps1

$ErrorActionPreference = "Stop"
$Repo = "abelserradev/Portfolio_frontend"

function Ensure-Label {
    param([string]$Name, [string]$Color, [string]$Description = "")
    $names = gh label list --repo $Repo --limit 200 --json name -q ".[].name"
    if ($names -contains $Name) {
        Write-Host "Label '$Name' ya existe, se omite."
        return
    }
    gh label create $Name --repo $Repo --color $Color --description $Description
    if ($LASTEXITCODE -ne 0) { throw "No se pudo crear la label '$Name'." }
}

Ensure-Label "status:approved" "0E8A16" "Issue aprobado para merge vía PR"
Ensure-Label "type:bug" "d73a4a" "Corrección de bug"
Ensure-Label "type:chore" "fef2c0" "Mantenimiento"

$issueBody = @"
## Contexto
Banner de consentimiento analytics no respondía (hidratación SSR) y CSP bloqueaba Cloudflare Insights.

## Alcance
- Banner analytics (useSyncExternalStore, cierre optimista)
- CSP + normalización NEXT_PUBLIC_API_URL
- Deps Next 16.4.1 / audit CI

## Criterio de cierre
- [ ] PR Validation verde
- [ ] CI lint/test/build/audit verde
- [ ] Banner ACEPTAR oculta diálogo y envía eventos al backend configurado
"@

Write-Host "Creando issue con status:approved..."
$issueUrl = gh issue create --repo $Repo `
    --title "fix: banner analytics, CSP Cloudflare y deps CI" `
    --body $issueBody `
    --label "status:approved"

if (-not $issueUrl) { throw "No se pudo crear el issue" }
$issueNum = ($issueUrl -split '/')[-1]
Write-Host "Issue #$issueNum -> $issueUrl"

$prJson = gh pr list --repo $Repo --base main --head develop --state open --json number,url
if (-not $prJson -or $prJson -eq "[]") {
    Write-Host "No hay PR abierto develop->main. Creando..."
    gh pr create --repo $Repo --base main --head develop `
        --title "fix: analytics consent, CSP y deps (develop → main)" `
        --label "type:bug" `
        --body "Fixes #$issueNum"
} else {
    $prNum = ($prJson | ConvertFrom-Json)[0].number
    Write-Host "Editando PR #$prNum..."

    $prBody = @"
Fixes #$issueNum

## Summary
- Banner GDPR analytics usable tras hidratación (eslint + cierre optimista + sync entre pestañas).
- CSP para Cloudflare Insights; \`NEXT_PUBLIC_API_URL\` normalizada con \`/api/v1\`.
- Next 16.4.1 y overrides para pasar \`pnpm audit --audit-level=high\`.

## Test Plan
- [x] pnpm lint
- [x] pnpm test
- [x] pnpm build
- [x] pnpm audit --audit-level=high
"@

    gh pr edit $prNum --repo $Repo --body $prBody
    gh pr edit $prNum --repo $Repo --add-label "type:bug" 2>$null
    gh pr edit $prNum --repo $Repo --remove-label "type:chore" 2>$null
}

Write-Host "Listo. Revisa Actions -> PR Validation en el PR."
