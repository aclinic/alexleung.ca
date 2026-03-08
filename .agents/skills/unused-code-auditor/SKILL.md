---
name: unused-code-auditor
description: Scan a repository for likely dead code and dependency bloat, including unused files, unused functions/classes, dead branches, unused imports, and dependencies not referenced in code. Use when asked to perform codebase cleanup audits, produce evidence-backed removal candidates, draft safe deletion patches, and flag findings that require manual verification.
---

# Unused Code Auditor

Use this skill to run an evidence-first dead code audit and propose safe cleanup patches.

## Scope

Identify likely:

1. Unused files
2. Unused functions/classes/exports
3. Dead branches and unreachable logic
4. Unused imports
5. Dependencies declared but not referenced

For every candidate:

- Provide concrete evidence (search hits, tool output, or explicit lack of references).
- Suggest a removal patch (or exact edit plan).
- Label confidence and whether manual verification is required.

## Workflow

1. **Establish repo context**
- Read `package.json`, TypeScript/Next config, and known entry points.
- Note dynamic-loading patterns (`import()`, filesystem routing, string-based lookups, CLI hooks) before claiming something is unused.

2. **Run static analyzers first**
- Prefer project-native tools where available.
- In JS/TS repos, use as needed:
  - `yarn lint`
  - `yarn typecheck`
  - `npx --yes knip` (unused files/exports/deps)
  - `npx --yes ts-prune` (unused exports; often noisy)
- Treat tool output as leads, not final truth.

3. **Validate each lead with targeted evidence**
- Use `rg` for symbol/file reference checks (including aliases like `@/`).
- Check framework conventions that create implicit usage (Next.js routes, metadata files, config-driven hooks).
- For dependencies, verify use in source, scripts, configs, and build tooling.

4. **Classify findings**
- **High confidence:** safe to remove directly.
- **Medium confidence:** likely removable but needs owner confirmation.
- **Manual verification required:** dynamic/runtime/plugin-driven usage cannot be proven statically.

5. **Propose cleanup patches**
- Prefer minimal, reversible edits.
- Include removal of now-unused imports/exports and dependency entries together when applicable.
- If asked to apply changes, stage logically grouped commits.

## Evidence standards

For each finding, include:

- Candidate (file/symbol/dependency)
- Detection source (tool + command)
- Validation (reference search output or “no references found” with searched patterns)
- Risk notes (dynamic usage, side effects, public API concerns)
- Action (remove now / defer / manual check)

Do not report a candidate as safe-to-delete without at least one independent validation pass beyond a single tool warning.

## Output template

Use this concise structure in reports:

- **Candidate:** `<name>`
- **Type:** file | symbol | import | dependency | dead branch
- **Evidence:** `<tool output + search summary>`
- **Confidence:** high | medium | manual verification required
- **Suggested patch:** `<delete/edit summary>`
- **Why manual verification (if needed):** `<reason>`

## Guardrails

- Never remove code used by routing conventions, config hooks, code generation, or runtime reflection without explicit proof.
- Assume test-only utilities may be valid even if absent from production imports.
- Prefer marking uncertain findings for human review over risky auto-deletion.
