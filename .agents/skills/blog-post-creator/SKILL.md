---
name: blog-post-creator
description: Create or revise markdown blog posts for alexleung.ca in Alex Leung's established style, and generate cover-image prompts for image models. Use when asked to draft a new post, expand rough notes into publish-ready prose, rewrite an existing post to match house voice, produce frontmatter/outline/body for files in content/posts/*.md, or create a stylized cover prompt that can be paired with a reference photo of Alex.
---

# Blog Post Creator

Use this skill to produce publish-ready markdown posts that match the patterns used in `content/posts/`.

## Target Voice

- Write analytical, structured, and practical prose.
- Keep tone warm but understated: confident, relationship-aware, and forward-looking.
- Keep prose professional with emotional intelligence.
- Avoid theatrics, hype language, and performative emphasis.

## Hard Constraints

1. Do not use repeated one-sentence paragraphs as the dominant cadence.
2. Default to cohesive paragraphs that carry one clear claim with supporting detail.
3. Prefer specific trade-offs, mechanisms, and implications over slogans.
4. Keep writing concise: remove filler, throat-clearing, and redundant qualifiers.
5. Preserve user-provided facts exactly for agency and ownership (for example, who bought something, who decided, who uses it); do not infer missing relationship details.
6. Default to concise titles; prefer short, plain phrasing unless the user asks for a longer or more stylized title.
7. Use section headings that are specific and neutral; avoid cute, rhetorical, or parenthetical framing.
8. When drafting a new post from notes, include cover prompts by default; only skip prompts if the user explicitly asks for post-only output.

## Workflow

1. Capture constraints and facts.
- Define topic, thesis, audience, and depth target (reflection vs technical deep dive).
- Collect concrete examples, decisions, and trade-offs from user input.
- Avoid inventing anecdotes, metrics, or timeline claims.
- Lock key facts before drafting: actor/ownership details, product/version details, and scope boundaries.

2. Select a post shape.
- Open with context and a clear point of view in the first paragraph.
- Use 2-4 `##` sections that progress by reasoning.
- Keep section headings plain and descriptive (for example, "Why We Chose This Setup"), not rhetorical.
- End with a concrete synthesis or forward-looking close.

3. Draft in house voice.
- Write in first person singular.
- Keep paragraphs mostly multi-sentence.
- Prefer mechanism, constraints, and implications over slogans.
- Use lists only when scanning value is clearly better than prose.

4. Apply repo format.
- Follow frontmatter and skeleton in [post-template](references/post-template.md).
- Keep filenames slug-safe (`lowercase-hyphenated`) under `content/posts/`.
- Write excerpt text as a specific takeaway, not a generic summary.

5. Generate cover-image prompt.
- Follow [cover-prompt-template](references/cover-prompt-template.md).
- Default visual direction to Ghibli-style unless user asks for another style.
- Explicitly include instruction to use the provided Alex reference image for facial consistency.
- Tie composition to the post thesis and keep scene clear at thumbnail size.
- Provide both a primary prompt and a backup prompt in the same response as the draft unless the user opts out.

6. Run final checks.
- Ensure the argument is cohesive from opening to close.
- Remove hype language and repeated one-sentence paragraph cadence.
- Verify section headings are specific and reflect actual content.
- Keep claims bounded and testable; mark assumptions when needed.
- Run an assumption audit: check that agency/ownership wording matches the user's input and that title/heading tone matches the user's preference for directness.
- Confirm output completeness: if this is a new-post draft, include both `Cover Prompt (Primary)` and `Cover Prompt (Backup)` blocks unless explicitly waived.

## Style References

- Use [voice-and-structure](references/voice-and-structure.md) for style defaults inferred from existing posts.
- Use [post-template](references/post-template.md) for frontmatter and drafting scaffolds.
- Use [cover-prompt-template](references/cover-prompt-template.md) to generate model-ready cover prompts.

## Self-Review Checklist

- Ensure the piece reads as a cohesive argument, not a thread.
- Ensure paragraphs are mostly multi-sentence and logically connected.
- Ensure claims are backed by context, not assertion alone.
- Ensure trade-offs and limitations are explicit.
- Ensure the close is forward-looking and concrete.
- Ensure title length and phrasing are intentionally concise by default.
- Ensure heading language is functional, not performative.
- Ensure no inferred facts were introduced around who did what.

## Quick Rewrite Patterns

- Convert hook-only opening lines into a thesis plus context paragraph.
- Combine adjacent short paragraphs that express one idea.
- Replace broad praise or critique with specific criteria.
- Turn hot-take phrasing into observation plus evidence plus implication.

## Output Modes

- Default mode selection: for new-post creation requests, use `Draft + cover prompt` unless the user explicitly requests another mode.
- Full draft: Return complete markdown with frontmatter and final prose.
- Revision pass: Return edited markdown that preserves existing facts and improves flow.
- Outline-first: Return frontmatter plus a sectioned outline before writing the full draft.
- Draft + cover prompt: Return post markdown plus one primary image prompt and one backup prompt.
