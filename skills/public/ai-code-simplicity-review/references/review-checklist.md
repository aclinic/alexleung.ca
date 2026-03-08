# AI Verbosity Reduction Checklist

Use this checklist when asked to simplify potentially AI-generated code.

## Detect

- [ ] Wrapper abstractions that add no meaningful behavior
- [ ] Guard clauses for states that cannot occur
- [ ] Repetitive try/catch or error handling with no extra context
- [ ] Comments that merely narrate obvious code
- [ ] Near-duplicate helpers that can be merged or deleted
- [ ] Overly granular files/types created for trivial logic

## Refactor

- [ ] Inline single-use pass-through helpers
- [ ] Remove dead branches and impossible fallbacks
- [ ] Consolidate duplicate helper logic where readability improves
- [ ] Delete low-value comments; keep intent-level comments
- [ ] Replace verbose branching with idiomatic language patterns

## Verify

- [ ] Behavior preserved (tests/assertions)
- [ ] Lint/type checks clean
- [ ] Diff reflects net simplification (fewer layers/LOC)
- [ ] Change summary explains what was removed and why
