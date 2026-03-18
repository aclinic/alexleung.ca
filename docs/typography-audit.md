# Typography Audit

Date: 2026-03-04  
Scope: `src/app/**` and `src/components/**` (excluding tests)

## Summary

- Typography is mostly readable and consistent at a high level, but there is one systemic pitfall: `ProseContent` forces larger copy at `md` and up.
- The design token utilities in `globals.css` are underused in favor of ad hoc Tailwind text sizes, which increases drift risk.
- Agent documentation did not previously include typography-specific guardrails.

## Method

1. Inventory typography classes in JSX/TSX (`text-*`, `prose*`, `font-*`, `leading-*`, `tracking-*`).
2. Review shared typography primitives and wrappers.
3. Spot-check route-level components for breakpoint behavior.

## Baseline Metrics

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

1. Hidden prose upscaling in shared component
   - File: `src/components/ProseContent.tsx`
   - `ProseContent` includes `md:prose-lg` by default, which increases typography size at medium breakpoints regardless of local intent.
   - This caused the now-page footer note to appear larger than expected when only `text-sm` was provided at call site.
   - Example call site: `src/app/now/page.tsx`.

### Medium

1. Heavy reliance on ad hoc text classes for regular content
   - Most `text-*` usage is ad hoc (`67/79`) rather than semantic token classes.
   - This makes typography harder to reason about and easier to regress during incremental edits.

2. Shared typography tokens are partially unused
   - `text-body-sm` and `text-body-lg` are defined in `src/app/globals.css` but not currently used by app/components source files.
   - Signals either dead utilities or missing adoption guidance.

### Low

1. No route-level typography verification checklist in docs
   - Without a documented breakpoint check, regressions like prose-size jumps are easy to miss in review.

## Recommended Actions

1. Treat `ProseContent` as opt-in for large desktop prose, not implicit.
   - Add a `size` prop (`\"base\" | \"sm\" | \"lg\"`) or require explicit override when small text is intended.
2. Standardize body-copy usage on semantic token classes first (`text-body`, `text-body-sm`, `text-body-lg`).
3. Add a lightweight typography checklist to agent docs:
   - no `text-md` (invalid in Tailwind defaults)
   - be explicit with prose breakpoint behavior
   - verify mobile and `md+` before finalizing text-class changes

## Immediate Follow-up

- Keep the now-page footer note small at all breakpoints by using `prose-sm md:prose-sm` on that `ProseContent` instance.
- Consider a follow-up PR to introduce a typed `ProseContent` size API so local intent is encoded in props instead of class overrides.
