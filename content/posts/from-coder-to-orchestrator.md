---
title: "From Writing Code to Orchestrating Agents"
date: "2026-02-03"
updated: "2026-02-14"
excerpt: "How my AI workflow changed from quick snippets to a practical plan/implement/verify loop."
coverImage: "/assets/blog/from-coder-to-orchestrator/cover.webp"
tags:
  - "AI Engineering"
  - "Developer Workflow"

---

Over the past two years, my day-to-day work has shifted from direct implementation toward orchestration and verification. In early 2024, I used AI mostly for autocomplete-level tasks such as snippets, error explanations, and small refactors. By 2026, I still write code when needed, but far more of my time goes to defining tasks clearly, checking outputs, and fixing edge cases the agents miss.

This post summarizes what changed, what improved, and what remains unreliable in that transition.

![Timeline diagram comparing software development workflow in 2024 versus 2026](/assets/blog/from-coder-to-orchestrator/swe-workflow-evolution.webp)

## 2024: Useful, but limited

I started experimenting with **Cline** for straightforward tasks:

- boilerplate,
- test scaffolding,
- repetitive refactors.

I avoided giving it larger tasks for two reasons:

- It was easy to get code that looked fine but was wrong in non-obvious ways.
- Anything non-trivial took too much prompt back-and-forth.

## 2025: Better plans, same failure modes

I switched to **Claude Code** and stopped asking for immediate implementation. Instead, I asked for a plan first and reviewed it.

That improved outcomes, but two problems were persistent:

- Plans were often overbuilt for the actual problem.
- The agent would report "done" before handling edge cases.

So the bottleneck moved from writing code to verification.

## Late 2025 onward: what actually helped

Three changes made this workflow dependable enough for daily use.

### Better model reasoning

For my use cases, newer models (especially **Opus 4.5**) were noticeably better at keeping constraints in context across longer tasks.

### Better repo context (`CLAUDE.md`)

A lot of bad output came from missing context, not missing capability.

I now keep project expectations in `CLAUDE.md` so every new session starts with the same baseline: architecture preferences, testing requirements, and coding conventions.

### Better execution pattern (Ralph Loop)

The biggest improvement was switching from one-pass execution to a repeatable loop:

1. Plan
2. Implement
3. Verify with build/lint/tests
4. Reflect and continue if needed

![Ralph Loop flow chart showing Plan -> Implement -> Verify -> Reflect](/assets/blog/from-coder-to-orchestrator/ralph-loop.webp)

## Current workflow

I usually run a planner and an implementer in parallel.

1. Write a short feature brief with constraints and non-goals.
2. Turn that into checkpoints.
3. Let the implementer run the loop per checkpoint.
4. Review design and risk, not just syntax.

Example brief:

> Add Google OAuth using existing `AuthService`. Store tokens in Redis, not SQL.

## Trade-offs

This workflow is productive, but it has clear costs:

- **Cost:** Frequent tool calls and retries add up quickly.
- **Legacy code friction:** Agents struggle when systems rely on undocumented history.
- **Personal skill drift:** I type less code directly than I used to.
- **Attention overhead:** Running multiple agents sounds parallel, but review and coordination still funnel through one person. Human attention is limited, and I still don't have a great system for managing that bottleneck consistently.

## What this changes about the job

The useful part of my work has shifted upward: clearer requirements, tighter constraints, and stronger review discipline.

Implementation still matters, but the highest leverage is in deciding what should be built and verifying whether the output is actually correct.

![Software engineering effort evolution from 2024 to 2026](/assets/blog/from-coder-to-orchestrator/swe-effort-evolution.webp)

The biggest open question for me is this: if newer engineers spend less time in low-level debugging, how do they build the judgment needed to review AI-generated changes well?
