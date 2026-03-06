# Blog Post Notification Report

Date: March 6, 2026

## 1. Current State (from your repo)

- Blog posts are file-based markdown under `content/posts/*.md` and parsed by `src/lib/blogApi.ts`.
- Draft handling already exists (`draft: true` frontmatter is filtered from published lists by default).
- Deployment is static export + GitHub Pages, with deploy on `main` via `.github/workflows/build-deploy.yml`.
- RSS feed exists at `/feed.xml` with a visible RSS subscribe link in the footer.
- There is no existing email subscriber system yet.

Implication: your publish event is now "new post is deployed and appears in `/feed.xml`". That is the cleanest trigger point for RSS-to-email forwarding.

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

### Option B: RSS-to-email forwarding service (follow.it recommended baseline)

Subscription mechanism
- Link to a hosted follow.it subscription page, or
- wire an on-site subscribe form to follow.it.

Notification mechanism
- follow.it monitors your RSS feed and sends email updates to subscribers.
- Digest/frequency behavior is managed in follow.it settings.

Trigger
- No CI notification job required.
- When `/feed.xml` gets a new item after deploy, follow.it forwards it by email.

Pros
- Fastest path to email subscriptions with minimal engineering.
- Unsubscribe/deliverability/compliance handled by provider.
- Works cleanly with static-export architecture.

Cons
- Ongoing SaaS dependency.
- Less control over email template/workflow than a full newsletter platform.

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

2. Email notifications via follow.it
- Use follow.it as RSS-to-email forwarding on top of `/feed.xml`.
- Add a visible "Subscribe by email" entry point that links to follow.it.

3. Keep CI workflow unchanged for notifications
- Deploy already updates `/feed.xml`.
- follow.it handles detection + forwarding from the feed.

Why this is best for your stack
- Matches your static GitHub Pages architecture.
- Keeps operational burden low and avoids introducing API-secret notification plumbing now.
- Gives a clear upgrade path to multi-channel notifications later.

## 5. Trigger Strategy Details

### Publish event detection

Preferred rule:
- A new post appears as a new item in `/feed.xml`.
- follow.it picks up that item and sends the corresponding email notification.

Optional stricter rule:
- Keep stable identifiers in feed items (`id`/`guid`) so subscribers are not re-notified for unchanged posts.
- If you revise old posts, decide whether to treat those as fresh notifications or silent updates.

### Idempotency

To avoid duplicate sends:
- Keep canonical post URLs stable.
- Avoid mutating post publish dates unless intentionally re-announcing content.
- Keep one canonical feed URL (`/feed.xml`) to prevent split subscriber behavior.

### Failure handling

- Treat feed validity as critical. If `/feed.xml` is broken, all downstream notifications break.
- Add periodic feed health checks (manual or scheduled CI curl + XML parse).
- If follow.it delivery is delayed, site publishing still succeeds because delivery is decoupled.

## 6. Suggested Rollout Plan

### Phase 1 (done)
- RSS feed at `/feed.xml`.
- Visible RSS subscribe link in UI.

### Phase 2 (1-2 hours)
- Create follow.it feed using `https://alexleung.ca/feed.xml`.
- Add "Subscribe by email" UI entry point (footer and/or dedicated `/subscribe` page) pointing to your follow.it subscription URL.
- Add brief privacy copy explaining subscriber data is handled by follow.it.

### Phase 3 (optional)
- Add a dedicated `/subscribe` page with both RSS-reader and email options.
- Add Slack/Discord webhook fan-out.
- If needed later, migrate to an owned newsletter platform while keeping `/feed.xml` as canonical source.

## 7. Decision Summary

If you want the best effort-to-impact ratio:
- Primary: RSS + follow.it forwarding (no CI notify job).
- Secondary: Slack/Discord webhook for immediate community notifications.
- Defer: fully self-managed or API-driven newsletter automation until scale/requirements justify it.

## 8. Source Links

- GitHub Actions workflow syntax (paths filters, schedules, limits): https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax
- Next.js static export and route handlers as static files: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- Next.js route handlers docs: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- follow.it publisher flow overview: https://follow.it/docs/publishers/introduction/how-does-it-work-basic-process
- follow.it linking existing forms: https://follow.it/docs/publishers/getting-started/how-can-i-link-an-existing-form-to-my-follow-it-feed
- follow.it email-access policy: https://follow.it/docs/publishers/introduction/do-i-get-access-to-my-follower-s-emails
- OneSignal web push setup: https://documentation.onesignal.com/docs/en/web-push-setup
- Slack incoming webhooks: https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/
