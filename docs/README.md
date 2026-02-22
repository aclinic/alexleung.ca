# Documentation Directory Guide

This folder contains repository-internal documents that support planning, audits, and maintenance.

## Document Index

| File | Purpose | Update cadence |
| --- | --- | --- |
| `technical-architecture-audit.md` | Architecture patterns, risks, and priorities | After major platform or dependency shifts |
| `seo-audit.md` | SEO implementation audit and optimization backlog | After metadata/schema/content model updates |
| `ui-simplification-analysis.md` | Current simplification/repetition audit and refactor backlog | After notable UI system changes |
| `content-ideas.md` | Idea backlog for new pages and editorial themes | As ideas are added or completed |

## What belongs in `/docs`

- Architecture and implementation audits
- SEO/performance reports
- Planning notes and content strategy documents
- Process guides that are useful to maintainers but are not required at repository root

## What should stay at repository root

- `README.md` (project entrypoint for humans and GitHub)
- `LICENSE` (standard legal location)
- `AGENTS.md` (agent tooling discovers this at root)
- `CLAUDE.md` and `GEMINI.md` (tool-specific pointers expected at root)

## What should stay outside `/docs`

- User-facing web content served by the app (e.g., `public/llms.txt`)
- Application/runtime content such as blog posts in `content/posts/`

## Documentation Hygiene Checklist

- Prefer factual snapshots over speculative statements.
- Mark recommendations as `Done`, `In progress`, or `Open` when possible.
- Remove stale findings once they are superseded by shipped implementation.
- Delete one-off migration plans/QA notes after rollout completion unless they remain active runbooks.
