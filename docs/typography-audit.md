# Typography Audit

Date: 2026-03-04  
Scope: `src/app/**` and `src/components/**` (excluding tests)

Status: **audit history with current guardrails**. The original high-priority `ProseContent` issue has been addressed by an explicit `size` prop; keep this file as background for typography decisions and update it only when the typography system changes materially.

## Summary

- Typography is mostly readable and consistent at a high level.
- `ProseContent` now defaults to base prose sizing and only applies larger desktop prose through `size="lg"`.
- The design token utilities in `globals.css` are increasingly used, but ad hoc Tailwind text sizes still appear in feature surfaces and should be introduced deliberately.
- Agent documentation now includes typography-specific guardrails.

## Method

1. Inventory typography classes in JSX/TSX (`text-*`, `prose*`, `font-*`, `leading-*`, `tracking-*`).
2. Review shared typography primitives and wrappers.
3. Spot-check route-level components for breakpoint behavior.

## Baseline Metrics

These metrics are from the original March 4, 2026 audit and are retained as historical context.

- Files with typography classes: **17**
- Unique typography tokens: **35**
- `text-*` class usages: **79**
- Semantic token usages (`text-body*`, `text-heading*`, `text-hero-*`): **12**
- Ad hoc `text-*` usages: **67**

Most frequent typography tokens:

- `text-gray-300` (9)
- `text-lg` (8)
- `text-sm` (8)
- `text-white` (8)
- `font-semibold` (7)
- `text-body` (7)
- `text-xl` (7)

## Findings

### High

1. Hidden prose upscaling in shared component (**resolved**)
   - File: `src/components/ProseContent.tsx`
   - `ProseContent` now exposes `size: "sm" | "base" | "lg"` and defaults to `"base"`.
   - Use `size="lg"` when blog-style prose should scale to `md:prose-lg`.
   - Use `size="sm"` for small notes/footers so both `prose-sm` and `md:prose-sm` apply.

### Medium

1. Heavy reliance on ad hoc text classes for regular content
   - The original audit found most `text-*` usage was ad hoc (`67/79`) rather than semantic token classes.
   - This makes typography harder to reason about and easier to regress during incremental edits.

2. Shared typography tokens are partially unused
   - Prefer existing semantic utilities before adding new one-off sizes:
     `text-body-sm`, `text-body`, `text-body-lg`, `text-heading-sm`, `text-heading`, and the `text-hero-*` utilities.

### Low

1. Route-level typography verification remains easy to skip
   - Typography class changes should still be checked at mobile and `md+` breakpoints through local browser inspection or relevant Playwright coverage.

## Recommended Actions

1. Keep `ProseContent` sizing explicit at call sites:
   - default/base prose: omit `size`
   - small notes: `size="sm"`
   - article/body prose that should scale larger at desktop: `size="lg"`
2. Standardize body-copy usage on semantic token classes first (`text-body`, `text-body-sm`, `text-body-lg`).
3. Preserve the lightweight typography checklist in agent docs:
   - no `text-md` (invalid in Tailwind defaults)
   - be explicit with prose breakpoint behavior
   - verify mobile and `md+` before finalizing text-class changes

## Immediate Follow-up

- Completed: the now-page footer note uses `ProseContent size="sm"`.
- Completed: `ProseContent` has a typed size API so local intent is encoded in props instead of class overrides.
