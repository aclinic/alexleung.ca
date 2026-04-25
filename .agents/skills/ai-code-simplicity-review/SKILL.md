---
name: ai-code-simplicity-review
description: Targeted simplification of overly verbose or AI-inflated code. Use when asked to reduce redundant helpers, pass-through abstractions, obvious comments, impossible defensive branches, or general code bloat while preserving behavior. Do not use as a broad repo audit, security audit, dependency upgrade plan, or dead-code sweep.
---

# AI Code Simplicity Review

Use this skill for focused refactors that make code shorter, clearer, and more idiomatic without changing behavior. For broad repository health reviews, use `repo-maintainability-audit`; for unused files, symbols, or dependencies, use `unused-code-auditor`.

## Workflow

1. Map the behavior before simplifying.
   - Read the caller, tests, and nearby conventions for each candidate.
   - Identify public APIs or user-visible behavior that must not change.

2. Look for complexity inflation.
   - Pass-through wrappers that only rename arguments.
   - One-off interfaces, types, helpers, or components with no reuse value.
   - Null/undefined guards, fallbacks, or catch/rethrow blocks for impossible states.
   - Comments that narrate obvious syntax instead of explaining intent.
   - Near-duplicate helpers that differ only by tiny parameter changes.
   - Overly granular files created for trivial logic.

3. Refactor conservatively.
   - Inline pass-through helpers used once.
   - Delete dead branches and impossible fallbacks when proof is local and clear.
   - Consolidate duplicate logic only when the result is easier to read.
   - Keep comments that capture intent, invariants, or non-obvious constraints.
   - Replace verbose branching with idiomatic language constructs.

4. Validate behavior.
   - Run the smallest relevant checks first, then broaden according to repo guidance.
   - If behavior is uncertain, add or update tests before simplifying.

5. Report impact.
   - Summarize what was removed, why it was unnecessary, and how correctness was validated.
   - Call out net LOC reduction when practical.

## Refactoring Heuristics

- Prefer directness over indirection.
- Prefer existing project idioms over personal style.
- Prefer fewer moving parts over "future-proof" scaffolding.
- Stop simplifying when readability starts to drop.
- Never change public behavior unless explicitly requested.

## Quality Bar

A refactor is complete when:

- The code is shorter **and** easier to follow.
- Duplicate helpers and dead branches are removed.
- Remaining comments justify their existence.
- Tests/checks still pass.
