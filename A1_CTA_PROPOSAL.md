# A1 Proposal: Reframe Homepage CTA for a Blog-First Site

_Date: 2026-02-12_

## Objective

Implement recommendation **A1** from the portfolio review by updating homepage CTA messaging so the site clearly communicates a **blog-first** purpose while keeping professional details high level.

## Why this change

The current CTA language is broad and can imply a services/engagement funnel. Your stated intent is different:

- mostly a blog site,
- high-level about page,
- no case studies,
- no contract-work positioning.

A1 aligns first impressions with that intent.

---

## Scope (Proposal Only)

This PR proposes content and interaction changes for the homepage hero CTAs and supporting line.

### In scope
- Hero supporting copy (1 short line under title/descriptor)
- Hero button labels and destination links
- Minor aria-label/text updates for accessibility clarity

### Out of scope
- New pages
- Case studies/project pages
- Contact funnel redesign
- Detailed professional disclosure

---

## Proposed CTA Strategy

## Primary CTA
**Read the Blog**
- Destination: `/blog/`
- Purpose: reinforce writing as primary value

## Secondary CTA
**About Me**
- Destination: `/about/`
- Purpose: provide high-level context/personality

## Optional Tertiary Link (text-style or subtle button)
**What I’m Learning**
- Destination: `/now/`
- Purpose: human/ongoing context without over-disclosure

---

## Proposed Hero Supporting Copy

Pick one concise line below your role descriptor:

1. “Engineer writing about software, systems, and learning in public.”
2. “A personal site for technical ideas, reflections, and ongoing learning.”
3. “Notes on building, thinking, and growing across software and AI.”

Recommendation: start with **Option 1** for maximum clarity.

---

## Draft UI Copy (Default Variant)

- Primary button: `Read the Blog`
- Secondary button: `About Me`
- Optional text link: `What I’m Learning`
- Supporting line: `Engineer writing about software, systems, and learning in public.`

---

## UX Notes

- Keep the primary CTA visually strongest (existing primary style token is fine).
- Keep secondary CTA neutral/subtle (existing secondary style token is fine).
- Preserve current layout and animation cadence; this is a copy + destination refactor, not a redesign.

---

## Accessibility Notes

- Ensure button labels are explicit and context-independent.
- If icon-only cues remain, retain readable text in the button body.
- Verify keyboard focus order remains: primary → secondary → optional tertiary.

---

## Acceptance Criteria

1. Homepage hero shows blog-first supporting line.
2. Primary CTA reads “Read the Blog” and links to `/blog/`.
3. Secondary CTA reads “About Me” and links to `/about/`.
4. Optional tertiary link (if included) points to `/now/`.
5. No references to case studies, consulting, contract work, or detailed impact proofs are introduced.

---

## Rollout Plan

1. Apply CTA/supporting text changes in hero component.
2. Verify mobile and desktop layout remains stable.
3. Run lint/tests as available in environment.
4. Ship and monitor click distribution between `/blog/`, `/about/`, and `/now/`.

---

## Success Signal (Simple)

After launch, success looks like:
- higher click-through to `/blog/` from home,
- lower ambiguity in user intent paths,
- consistent brand framing as personal blog + high-level profile.
