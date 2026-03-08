---
name: ai-code-simplicity-review
description: Review repositories for overly verbose or unnecessary AI-generated coding patterns and refactor toward simpler, idiomatic, lower-LOC implementations. Use when asked to identify and remove redundant abstractions, unnecessary defensive code, obvious comments, duplicated helpers, or general code bloat.
---

# AI Code Simplicity Review

## Overview

Audit code for complexity inflation patterns common in AI-assisted output, then apply minimal refactors that preserve behavior while improving clarity and maintainability.

## Workflow

1. **Map likely hotspots first**
   - Prioritize recently changed files, utility-heavy modules, and files with long helper chains.
   - Skim tests to infer expected behavior before changing logic.

2. **Detect verbosity smells**
   - Redundant abstraction: wrapper functions that only rename arguments, one-off interfaces/types, pass-through components.
   - Unnecessary defensive code: repeated null/undefined guards for guaranteed values, catch-and-rethrow without added context, fallback branches that cannot execute.
   - Obvious comments: comments that restate code literally (`// increment i`).
   - Repeated helpers: near-duplicate functions differing only by tiny parameter changes.

3. **Refactor conservatively**
   - Inline pass-through helpers used once.
   - Collapse duplicated logic into one parameterized helper only if it improves readability.
   - Delete comments that explain obvious syntax; keep comments that capture intent, invariants, or non-obvious constraints.
   - Replace verbose branching with idiomatic language constructs.

4. **Validate behavior**
   - Run linting, type checks, and the smallest relevant test subset first; then broaden if needed.
   - If behavior is uncertain, add or update tests before simplifying.

5. **Report impact**
   - Summarize what was removed, why it was unnecessary, and how correctness was validated.
   - Call out net LOC reduction when practical.

## Refactoring Heuristics

- Prefer directness over indirection.
- Prefer existing project idioms over personal style.
- Prefer fewer moving parts over “future-proof” scaffolding.
- Stop simplifying when readability starts to drop.
- Never change public behavior unless explicitly requested.

## Quality Bar

A refactor is complete when:

- The code is shorter **and** easier to follow.
- Duplicate helpers and dead branches are removed.
- Remaining comments justify their existence.
- Tests/checks still pass.

## Reference

Use `references/review-checklist.md` as a quick execution checklist during audits.
