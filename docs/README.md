# Documentation Directory Guide

This folder contains active repository-internal documentation used for planning and maintenance.

## Active Document Index

| File | Purpose | Update cadence |
| --- | --- | --- |
| `technical-architecture-audit.md` | Current architecture status and forward-looking technical recommendations | After major framework/content-pipeline changes |
| `seo-audit.md` | Current SEO implementation status and optimization backlog | After metadata/schema/content-model changes |
| `content-ideas.md` | Backlog of future site/page/content ideas | As ideas are added, promoted, or completed |

## Documentation Scope Rules

### What belongs in `/docs`

- Ongoing architecture and SEO status docs
- Planning backlogs that still influence execution
- Maintainer-facing process notes

### What should stay at repository root

- `README.md` (main project entrypoint)
- `LICENSE` and `LICENSE-CONTENT`
- `AGENTS.md`
- `CLAUDE.md` and `GEMINI.md`

### What should stay outside `/docs`

- User-facing web content (`public/`)
- Application content (e.g., `content/posts/`)

## Hygiene Checklist

- Prefer status snapshots over long-lived speculative audits.
- Remove stale review docs once recommendations are implemented or superseded.
- Keep one canonical document per concern (architecture, SEO, content ideas).
