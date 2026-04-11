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
- Do not assert significance with phrases like "this is important because", "this matters because", or similar authorial signposting; let significance emerge from the concrete facts, trade-offs, and consequences.
- When the piece is intentionally reflective or artistic, allow a more lyrical register, but keep it anchored in concrete observation, personal judgment, or a clearly stated tension.

## Hard Constraints

1. Do not use repeated one-sentence paragraphs as the dominant cadence.
   Exception: in intentionally reflective/artistic pieces, a few short paragraphs are acceptable if they create rhythm and the overall piece still carries a coherent argument or emotional throughline.
2. Default to cohesive paragraphs that carry one clear claim with supporting detail.
3. Prefer specific trade-offs, mechanisms, and implications over slogans.
4. Keep writing concise: remove filler, throat-clearing, and redundant qualifiers.
5. Preserve user-provided facts exactly for agency and ownership (for example, who bought something, who decided, who uses it); do not infer missing relationship details.
6. Default to concise titles; prefer short, plain phrasing unless the user asks for a longer or more stylized title.
7. Use section headings that are specific and neutral; avoid cute, rhetorical, or parenthetical framing.
8. When drafting a new post from notes, include cover prompts by default; only skip prompts if the user explicitly asks for post-only output.
9. Do not imply hands-on practice the user did not claim. If the input is about reading, reflection, or conceptual learning, keep claims at the level of understanding, interpretation, or future curiosity unless the user explicitly said they build, tune, deploy, or regularly use the systems being discussed.
10. Avoid formulaic heading scaffolds as a dominant pattern. Do not default multiple sections in a post to `What`, `How`, `Why`, `When`, `Where`, `The Goal`, `The Implementation`, or similar organizational labels when a more specific idea-title is available.
11. Avoid explicitly telling the reader that a topic is meaningful, important, or significant. Show that through specificity, stakes, consequences, and judgment instead of declaring it.

## Workflow

1. Capture constraints and facts.
- Define topic, thesis, audience, and depth target (reflection vs technical deep dive).
- Collect concrete examples, decisions, and trade-offs from user input.
- Avoid inventing anecdotes, metrics, or timeline claims.
- Lock key facts before drafting: actor/ownership details, product/version details, and scope boundaries.
- Identify whether the post should read as an essay, a learning note, or a compact reflection before choosing headings or structure.

2. Select a post shape.
- Open with context and a clear point of view in the first paragraph.
- Use 2-4 `##` sections that progress by reasoning.
- Keep section headings plain and descriptive (for example, "Scope Before Specs"), not rhetorical.
- Prefer headings that name the actual idea of the section, not just its question type or document role.
- End with a concrete synthesis or forward-looking close.
- For learning/review posts, default the close to what changed in the author's understanding; only end on operational practice if the user explicitly described a change in what they do.
  Exception: short reflective/artistic posts may be written without headings if the piece is intentionally compact and the movement is still clear from paragraph to paragraph.

### Post Calibration

- `Learning note`: emphasize changed understanding, bounded claims, and a modest close.
- `Technical explainer`: emphasize mechanism, precision, and explicit trade-offs.
- `Reflection`: emphasize tension, judgment, and implications without drifting into slogans.
- `Reflective/artistic short form`: allow more atmosphere, compression, and rhetorical movement, but anchor the piece in a concrete scene, tension, or observation within the first paragraph and keep the close earned rather than vague.
- When a draft sits between categories, bias toward the less grand version; prefer a narrower, more grounded post over a more ambitious one.

3. Draft in house voice.
- Write in first person singular.
- Keep paragraphs mostly multi-sentence.
- Prefer mechanism, constraints, and implications over slogans.
- Prefer plain analytical phrasing over polished summary language; if a sentence sounds like a slogan, flatten it.
- Use lists only when scanning value is clearly better than prose.
- In reflective/artistic mode, do not flatten every rhetorical sentence. Preserve some texture when it is doing real tonal work, but trim lines that sound ornamental without adding meaning.

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
- Remove authorial "this matters/this is important" assertions unless the user explicitly wants that rhetorical style.
- Verify section headings are specific and reflect actual content.
- Run a heading-shape audit: if several headings in the same draft begin with `What`, `How`, `Why`, `When`, `Where`, or generic labels like `The Goal`, rewrite them unless that repetition is clearly intentional.
- Keep claims bounded and testable; mark assumptions when needed.
- Run an assumption audit: check that agency/ownership wording matches the user's input and that title/heading tone matches the user's preference for directness.
- Run a practice audit: remove any implication that the author builds, tunes, deploys, or routinely uses systems unless the user explicitly stated that.
- Run a vagueness audit: replace underspecified abstractions like "shift", "this", "that", "result", or "it" when the referent would be unclear in isolation.
- Run a transition audit: make sure each section clearly connects to the one before it; add a bridging sentence when the relationship is not obvious.
- For reflective/artistic posts, run an anchoring audit: make sure abstract lines are grounded by at least one concrete image, scene, tool, or tension so the piece does not drift into generic musing.
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
- Ensure the close fits the post type: for learning notes, usually land on changed understanding before changed practice.
- Ensure title length and phrasing are intentionally concise by default.
- Ensure heading language is functional, not performative.
- Ensure heading variety is healthy across the piece; avoid making all sections sound like reusable template labels.
- Ensure transitions are explicit when moving between conceptually different sections.
- Ensure no underspecified abstractions remain where the noun can be stated directly.
- Ensure polished or slogan-like phrasing has been flattened into plain analytical prose.
- For reflective/artistic pieces, ensure the abstraction is earned by concrete setup and not sustained for too long without grounding.
- Ensure no inferred facts were introduced around who did what.

## Quick Rewrite Patterns

- Convert hook-only opening lines into a thesis plus context paragraph.
- Combine adjacent short paragraphs that express one idea.
- Replace broad praise or critique with specific criteria.
- Turn hot-take phrasing into observation plus evidence plus implication.

## Voice Anti-Patterns

- Avoid vague evaluative phrasing like "this was a big shift" when the object of the shift can be named directly.
- Avoid significance-signposting such as "this is important because", "this matters because", or "what makes this meaningful is"; replace it with the concrete observation, stake, or consequence itself.
- Avoid "this changes how I use X" unless the user explicitly said they use or build with `X`.
- Avoid polished summary phrases like "clear statistical story" or "substantial result" when plainer analytical language would do.
- Avoid endings that merely restate the thesis in more elevated language.
- In reflective/artistic mode, avoid abstract language stacking for more than a sentence or two without returning to something observable or personal.

## Output Modes

- Default mode selection: for new-post creation requests, use `Draft + cover prompt` unless the user explicitly requests another mode.
- Full draft: Return complete markdown with frontmatter and final prose.
- Revision pass: Return edited markdown that preserves existing facts and improves flow.
- Outline-first: Return frontmatter plus a sectioned outline before writing the full draft.
- Draft + cover prompt: Return post markdown plus one primary image prompt and one backup prompt.

## Ending Test

Before finalizing, ask:
- Does the ending add a new synthesis, implication, or forward point?
- Or does it only restate the thesis in cleaner language?

If it only restates, revise the close so it advances the piece by at least one step.
