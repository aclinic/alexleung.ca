# Content Ideas for Personal Website

> **Purpose**: A personal website should act as a digital business card or living portfolio rather than a news site. These ideas help showcase identity and skills without the pressure of a weekly editorial calendar.

## 1. The "Now" Page

**Concept**: Popularized by Derek Sivers - tells people what you're focused on right now (not the past like a resume, not an archive like a blog).

**What to include**:
- Current projects you're working on
- Books you're reading
- City you're living in
- Current personal goals

**Benefit**: Keeps the site feeling fresh with only 5 minutes of updates every month.

**Implementation**: Create `/now` route with dynamic content

---

## 2. A Curated "Manual of Me"

**Concept**: A document explaining how you work best - useful for potential employers or collaborators.

**What to include**:
- Communication preferences (e.g., "I prefer email over Slack")
- Peak productivity hours
- Your values
- How you like to receive feedback

**Benefit**: Establishes you as a self-aware professional.

**Implementation**: Create `/manual` or `/working-with-me` route

---

## 3. The "Digital Bookshelf" or Tool Stack

**Concept**: List resources that have shaped who you are (no need for full reviews).

**What to include**:
- **The Library**: Visual grid of favorite books with 1-sentence takeaway for each
- **The Gear**: Hardware and software used daily (laptop, coding environment, coffee setup)

**Benefit**: Builds authority and provides instant value to visitors looking for recommendations.

**Implementation**: Create `/resources` or `/tools` route with visual grid layout

---

## 4. Interactive Timeline or Map

**Concept**: Visualizing your journey is more engaging than a standard "About Me" paragraph.

**What to include**:
- **The Map**: Places you've lived, worked, or traveled to
- **The Timeline**: Vertical line showing life milestones (not just jobs - include personal achievements like "Learned to cook Thai food" or "Ran my first 5k")

**Benefit**: Makes you memorable and humanizes your brand.

**Implementation**: Create interactive component with timeline visualization, potentially integrate into About section or create dedicated `/journey` route

---

## 5. An Answer Engine (FAQ)

**Concept**: Address questions people always ask when they meet you or find out what you do.

**What to include**:
- "How did you get into [Industry]?"
- "What's the best way to start learning [Skill]?"
- Common questions about your background, expertise, or career path

**Benefit**: Saves time in real life and helps with "Personal SEO" - when people google you, they find the answers you want them to have.

**Implementation**: Create `/faq` route or integrate into About section

---

## Priority Considerations

1. **Start with "Now" page** - Easiest to implement and maintain
2. **Add Tool Stack** - Leverages existing skills data structure
3. **Enhance Timeline** - Build on existing credentials section
4. **Create FAQ** - Addresses common professional questions
5. **Manual of Me** - For deeper professional collaboration context

## SEO & Structured Data

Each new page should include:
- Appropriate meta tags
- JSON-LD structured data (WebPage schema)
- Open Graph and Twitter card metadata
- Meaningful URLs and navigation

## Design Consistency

- Maintain existing Tailwind theme and color scheme
- Use consistent typography and spacing
- Ensure responsive design across all new pages
- Keep minimalist aesthetic
