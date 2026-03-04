# Documentation Directory Guide

This folder contains active, high-signal internal documentation used for maintenance decisions.

## Active Document Index

| File | Purpose | Update cadence |
| --- | --- | --- |
| `architecture-seo-status.md` | Canonical status snapshot for technical architecture + SEO (consolidated) | After meaningful architecture, metadata, schema, or IA changes |
| `codespaces.md` | Detailed Codespaces-specific setup/troubleshooting notes for Lighthouse | When Codespaces base image or Lighthouse prerequisites change |
| `typography-audit.md` | Typography guidance and guardrails for app/component edits | After typography-system or prose-behavior changes |

## Consolidation Notes

Recent cleanup removed low-value or duplicated docs:

- `codespaces.md` restored as a detailed troubleshooting reference; root `README.md` keeps the quick-start summary
- `technical-architecture-audit.md` + `seo-audit.md` consolidated into `architecture-seo-status.md`
- `content-ideas.md` removed (speculative backlog with low execution value)

## Documentation Scope Rules

### What belongs in `/docs`

- Current architecture/SEO/typography status documents
- Maintainer-facing process notes with ongoing decision value

### What should stay at repository root

- `README.md` (main project entrypoint)
- `LICENSE` and `LICENSE-CONTENT`
- `AGENTS.md`
- `CLAUDE.md` and `GEMINI.md`

### What should stay outside `/docs`

- User-facing web content (`public/`)
- Application content (e.g., `content/posts/`)

## Hygiene Checklist

- Prefer concise status snapshots over speculative audits.
- Keep one canonical document per concern.
- Remove docs that duplicate setup content already maintained elsewhere.
