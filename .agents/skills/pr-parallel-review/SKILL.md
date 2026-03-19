---
name: pr-parallel-review
description: Review a pull request or current branch against main by spawning one sub-agent per review dimension, waiting for all of them, and summarizing the result for each dimension. Use when the user wants a parallel branch-vs-main audit covering security issues, code quality, bugs, race conditions, test flakiness, and maintainability.
---

# Parallel PR Review

Use this skill when the user explicitly wants parallel agent work for a PR or branch review.

Load [references/review-dimensions.md](references/review-dimensions.md) before writing agent prompts.

## Workflow

1. Establish the review target.
   - Default to comparing `HEAD` against `main`.
   - If `main` is unavailable locally, use `origin/main`.
   - State the exact base you used.
   - Collect shared context once before delegating:
     - current branch name
     - merge base
     - `git diff --stat` summary
     - changed-file list
     - any obvious hotspots from the diff

2. Spawn exactly one sub-agent per review dimension.
   - Prefer `explorer` agents for read-only review.
   - Give every agent the same base context and changed files.
   - Change only the review dimension and checklist.
   - Keep the prompts concrete. Ask for evidence-backed findings only, not general advice.
   - Require explicit `no findings` when the agent does not find a real issue.

3. Wait for all agents together.
   - Start all six agents first.
   - Use a single wait over all agent ids instead of serial waits.
   - If an agent times out, note that explicitly in the summary instead of silently omitting it.

4. Summarize by dimension.
   - Preserve the six original headings:
     1. Security issue
     2. Code quality
     3. Bugs
     4. Race
     5. Test flakiness
     6. Maintainability of the code
   - For each heading, report one of:
     - `No findings`
     - `Findings` with the top issues, severity, and file references
     - `Incomplete` with the reason
   - Deduplicate overlapping issues across sections, but still mention them where relevant.

## Output Contract

Return findings first. Keep each section short and evidence-based.

- `Security issue`: confirmed or likely vulnerabilities in the diff
- `Code quality`: harmful complexity, duplication, or poor abstractions
- `Bugs`: functional regressions or correctness defects
- `Race`: race conditions, ordering hazards, stale async state, concurrency risks
- `Test flakiness`: nondeterministic tests or code patterns likely to cause flaky tests
- `Maintainability of the code`: long-term readability, coupling, and change-cost concerns

After the six sections, add a short `Cross-cutting notes` section only if multiple agents reported the same root problem.

## Quality Bar

- Review the actual diff, not the whole repository in the abstract.
- Prefer changed files first, but inspect adjacent code when needed to confirm impact.
- Distinguish confirmed issues from plausible risks.
- Avoid style-only feedback unless it affects correctness, reviewability, or maintenance cost.
- If you did not run tests or static checks, say so.
