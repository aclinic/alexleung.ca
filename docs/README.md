# Documentation Directory Guide

This folder is for repository-internal documents that support planning, audits, and maintenance.

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
