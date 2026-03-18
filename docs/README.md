# Documentation Directory Guide

This folder contains active, maintainer-facing documentation that supports implementation and operational decisions.

## Active Document Index

| File | Purpose | Update cadence |
| --- | --- | --- |
| `architecture-seo-status.md` | Canonical status snapshot for technical architecture and SEO | After meaningful architecture, metadata, schema, or IA changes |
| `blog-notification-report.md` | Current notification architecture and operational runbook for new-post alerts | When notification provider, subscribe UX, or feed workflow changes |
| `codespaces.md` | Codespaces-specific Lighthouse setup and troubleshooting details | When Codespaces base image or Lighthouse prerequisites change |
| `typography-audit.md` | Typography findings and guardrails for app/component edits | After typography-system or prose-behavior changes |
| `playwright-testing-design.md` | Proposed hermetic Playwright smoke + visual testing design and rollout plan | When E2E test architecture, CI strategy, or baseline workflow changes |

## Scope Rules

### Keep in `/docs`

- Current status snapshots that affect decisions
- Environment/troubleshooting references that are too detailed for root `README.md`
- Maintainer process notes with ongoing operational value

### Keep at repository root

- `README.md` (primary project entrypoint)
- `LICENSE` and `LICENSE-CONTENT`
- `AGENTS.md`
- `CLAUDE.md` and `GEMINI.md`

### Keep outside `/docs`

- User-facing site content (`public/`)
- Application content (for example, `content/posts/`)

## Hygiene Checklist

- Prefer concise, status-driven docs over speculative planning notes.
- Keep one canonical document per concern.
- Remove or merge docs when they become duplicative or stale.
