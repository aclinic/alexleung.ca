# Blog Post Notification Report

Date: March 5, 2026

## 1. Current State (from your repo)

- Blog posts are file-based markdown under `content/posts/*.md` and parsed by `src/lib/blogApi.ts`.
- Draft handling already exists (`draft: true` frontmatter is filtered from published lists by default).
- Deployment is static export + GitHub Pages, with deploy on `main` via `.github/workflows/build-deploy.yml`.
- There is no existing RSS/Atom feed route and no existing subscriber system.

Implication: your publish event is currently "markdown file merged to `main` and deployed". That is the cleanest trigger point.

## 2. Design Dimensions

For each option, we need three things:

- Subscription mechanism: how people opt in
- Notification mechanism: what they receive
- Trigger: how new post publication causes the send

## 3. Options

### Option A: Feed-first (RSS/Atom)

Subscription mechanism
- Users subscribe in any feed reader (Feedly, Inoreader, Reeder, etc.).
- You expose `/feed.xml` and add a visible "Subscribe via RSS" link.

Notification mechanism
- Feed readers notify users when a new item appears.

Trigger
- Post publish updates generated feed during `yarn build`.
- Deploy updates `feed.xml`; readers detect the new item.

Pros
- Lowest complexity, fully compatible with static hosting.
- No subscriber PII stored by you.
- No vendor lock-in.

Cons
- No direct email capture/list ownership unless layered with another channel.
- Reader adoption is lower than email for many audiences.

### Option B: Newsletter SaaS (recommended baseline for email)

Subscription mechanism
- Embed provider signup form on site (static HTML form post is enough).
- Optionally add a dedicated `/subscribe` page.

Notification mechanism
- Provider sends email to subscribers.
- Can be fully automatic or "draft + manual approve".

Trigger
- GitHub Actions step after deploy checks if one or more non-draft posts were newly published.
- If yes, call provider API to create/send campaign.

Pros
- Fastest path to reliable email notifications.
- Unsubscribe/deliverability/compliance handled by provider.
- Works cleanly with static-export architecture.

Cons
- Ongoing SaaS dependency/cost.
- Requires API secrets in GitHub Actions.

### Option C: Self-managed email pipeline (Resend + your own subscription backend)

Subscription mechanism
- Build your own subscribe/unsubscribe endpoint and store contacts.
- Or run a minimal external service for list storage.

Notification mechanism
- Use Resend API to send broadcast-like emails.

Trigger
- Same as Option B (publish event in CI), but you own more orchestration/state.

Pros
- Maximum control over data model and content workflow.
- Easy to extend to segmentation and custom logic.

Cons
- Highest maintenance burden (compliance, list hygiene, unsubscribe UX).
- More moving parts than you likely need right now.

### Option D: Web push notifications (OneSignal)

Subscription mechanism
- Browser permission prompt; user opts into push.

Notification mechanism
- Push notification to browser/device.

Trigger
- CI/API call to provider when new post is published.

Pros
- Immediate real-time delivery.
- Useful as a secondary channel.

Cons
- Permission friction is high.
- Browser/device variability; weaker primary channel than email for most personal blogs.

### Option E: Ops/community webhook fan-out (Slack/Discord)

Subscription mechanism
- Audience subscribes in Slack/Discord (not on your site).

Notification mechanism
- Message posted to channel via webhook.

Trigger
- Same CI publish trigger; send webhook payload.

Pros
- Very low effort for community/internal audiences.
- Good secondary channel.

Cons
- Not a replacement for email list ownership.

## 4. Recommended Architecture

Use a layered model:

1. RSS feed as universal source
- Add `feed.xml` generation from `getAllPosts(...)`.

2. Email notifications via newsletter SaaS
- Start with Buttondown-style integration for subscriber management + sends.
- Keep sending mode as "draft" initially for editorial control, then switch to full auto if desired.

3. CI-based publish trigger in existing deploy workflow
- Extend `.github/workflows/build-deploy.yml` with a post-deploy notify job.
- For `push` runs, detect newly published posts from commit range (`github.event.before` -> `github.sha`) limited to `content/posts/*.md`.
- For `workflow_dispatch` runs, use a fallback baseline (for example `HEAD^ -> HEAD`) or require an explicit input SHA to diff from.
- Parse frontmatter and skip `draft: true`.
- Notify once per new slug.

Why this is best for your stack
- Matches your static GitHub Pages architecture.
- Keeps operational burden low while giving you an owned subscription channel.
- Gives a clear upgrade path to multi-channel notifications later.

## 5. Trigger Strategy Details

### Publish event detection

Preferred rule:
- A file in `content/posts/*.md` is added or modified on `main` AND final frontmatter has `draft: false`.
- Scope `github.event.before -> github.sha` diffing to `push` events only.
- For `workflow_dispatch`, avoid implicit full-history scans; use a deterministic fallback range or a required `from_sha` input.

Optional stricter rule:
- Treat only newly added slugs as "new post" notifications.
- Treat modified existing slugs as "updated post" notifications (separate template or no send).

### Idempotency

To avoid duplicate sends on workflow re-runs:
- Store a sent-event marker externally (provider campaign metadata/tag using slug), or
- Keep a small state file in-repo (for example `.github/notification-state.json`) updated only after successful send.

### Failure handling

- If notification send fails, fail only the notify job, not deployment.
- Add retry/backoff for provider API errors.
- Send failure alert to Slack webhook (optional).

## 6. Suggested Rollout Plan

### Phase 1 (1-2 hours)
- Implement RSS feed (`/feed.xml`) and add visible subscribe link in blog/footer.

### Phase 2 (2-4 hours)
- Add email provider signup form (`/subscribe`) and provider API key in GitHub secrets.
- Add notify job in deploy workflow with `draft` filtering.
- Start with "create draft email" mode.

### Phase 3 (optional)
- Enable auto-send.
- Add Slack/Discord webhook fan-out.
- Add weekly digest mode via scheduled workflow.

## 7. Decision Summary

If you want the best effort-to-impact ratio:
- Primary: RSS + newsletter SaaS + CI trigger after successful deploy.
- Secondary: Slack/Discord webhook for immediate community notifications.
- Defer: fully self-managed subscriber system until list size/requirements justify it.

## 8. Source Links

- GitHub Actions workflow syntax (paths filters, schedules, limits): https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax
- Next.js static export and route handlers as static files: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- Next.js route handlers docs: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- Buttondown API docs (subscribers, emails): https://docs.buttondown.com/
- Buttondown import subscribers (CSV): https://docs.buttondown.com/importing-your-subscribers
- OneSignal web push setup: https://documentation.onesignal.com/docs/en/web-push-setup
- Slack incoming webhooks: https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/
- Resend email send API: https://resend.com/docs/api-reference/emails/send-email
- Resend contacts/audience docs: https://resend.com/docs/api-reference/contacts
