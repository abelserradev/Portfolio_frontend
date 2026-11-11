---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/pages/Home.tsx","components/hero/HeroSection.tsx"]
---

# Surface brief — Home (`/`)

Mode: Experience  
Scope: Full home portfolio surface (hero → services → status → activity → missions → contact → footer → chat chrome)  
Audience: Prospects evaluating Buildforge for hire  
Job: Let real work lead; make contact/hire obvious  
Constraints: Brand Buildforge / `</BUILDFORGE>`; projects from API only; no invented metrics/clients; chat + consent stay; Spanish UI copy unless site-config says otherwise.

## Direction contract

THESIS: Buildforge is a foundry pattern shop — each mission is a wooden pattern ready to cast into a durable product; refuse the centered cyber-neon hero with glitch clones and icon-card grids.

OWN-WORLD: Warm foundry dark (`#2a2218` ground, `#1c1710` chrome, `#c9a227` brass, `#e8dcc8` type, `#5c4a2e` seams). Pattern-wood plates, sand-mold texture, brass registration marks, fixed-scale project plates. Soft offset shadows with blur (not hard neobrutal blocks). Display type with workshop character (self-hosted; not Orbitron/Geist/Inter/Space Grotesk). Mono only for plate IDs and measurements.

STORY: Visitor sees craft before claim — a 1:1 pattern of the studio’s work — believes Buildforge makes software like durable castings, and acts by opening missions or requesting a quote.

FIRST VIEWPORT: Match `.impeccable/mocks/decision/assigned.html`: top nav with `</BUILDFORGE>` + section links; left vertical rail “PATRÓN · FUNDICIÓN · FORMA → PRODUCTO”; center large pattern plate (PAT-001) with dashed register; right copy stack Buildforge + one sentence + brass CTA “Ver misiones”; right column three fixed-scale plates teasing featured/services/contact. No TypeAnimation loop, no cyan/magenta glitch clones, no scan-frame pulse.

FORM: Foundry Pattern Shop (grounded #7). seed:c1d45b1dfa78359a. Raises: billing-rank density on mission grid; fixed-scale plate registration; one teach-diagram in services; paced density (dense → quiet → anchored close).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Signature interaction

On scroll into missions, plates settle onto a shared baseline with a short register “click” (opacity/transform ease-out-expo); reduced-motion = already registered.

## Untouched behavior

API projects, GitHub activity data, chat widget flows, analytics consent, CSRF/auth if any, site-config env brand strings.
