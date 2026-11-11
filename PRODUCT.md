# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Prospects / clients** evaluating freelance or studio work from Buildforge.
- **Visitor** browsing projects, services, and contact.
- Secondary: site owner managing content via backend APIs (projects, chat, analytics consent).

## Product Purpose

Public **Buildforge** portfolio site: brand presence, services pitch, project catalog, contact, optional services video, GDPR analytics consent, and AI/chat-assisted inquiry flows backed by the portfolio API. Success = clear studio positioning and a credible path to contact/hire.

## Positioning

Software studio / freelance portfolio under **Buildforge** (“Estudio de desarrollo de software” / custom software development) — not a generic agency template brand. Logo text default `</BUILDFORGE>`.

## Operating Context

Next.js 16 + pnpm; Spanish/English mix possible via config; Instagram `buildforge.work`; Coolify deploy from GitHub Actions webhook. Requires `NEXT_PUBLIC_API_URL` to Portfolio_backend.

## Capabilities and Constraints

- Brand and contact driven by env (`lib/site-config.ts`): services list, video/poster, social URLs, analytics toggle.
- Hooks: `useProjects`, `useGithub`, `useChatSession`.
- Vitest + Playwright e2e; privacy banner before anonymous analytics events.
- Companion API: separate `Portfolio_backend` repo.

## Brand Commitments

- Brand name default: **Buildforge**
- Logo text default: `</BUILDFORGE>`
- Role/tagline/pitch defaults in `site-config.ts` / README
- Instagram: https://www.instagram.com/buildforge.work/

## Evidence on Hand

- `README.md`, `lib/site-config.ts`, `public/media/`, e2e tests.
- Do not invent client logos, case-study metrics, or awards not in content/API.

## Product Principles

1. Brand is configurable but defaults must stay recognizably Buildforge.
2. No analytics without consent.
3. Portfolio truth comes from the API/catalog — UI must not invent projects.
4. Contact path stays obvious; chat assists but does not replace reachable email/socials.
