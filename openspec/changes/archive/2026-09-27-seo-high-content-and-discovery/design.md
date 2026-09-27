## Context

See proposal.md for motivation. Content and chrome live in React section components plus `en.json`/`ua.json`. Uzhhorod and service pages already have sectioned layouts (hero, services/advantages, contact/CTA) but body copy is short. Footer today is social/email only—no product or local links. Homepage SEO strings live under `seo.title` / `seo.description`.

## Goals / Non-Goals

**Goals:**
- Ship EN+UA content depth for Uzhhorod and the GSC priority services.
- Expose products + Uzhhorod in shared chrome.
- Refresh homepage SERP strings for clearer CTR.

**Non-Goals:**
- New blog/CMS; programmatic SEO at scale; redesigning visual brand.
- Expanding every service slug beyond the GSC priority set in this change (other services can follow the same pattern later).

## Decisions

### 1. Content lives in i18n JSON with section components
- **Choice:** Add structured keys (FAQ arrays, audience, depth paragraphs) in `en.json`/`ua.json` and render via existing or small new presentational blocks inside Uzhhorod/Service pages.
- **Rationale:** Matches current architecture; keeps EN/UA parity mechanical.
- **Alternatives considered:** MDX/content files (new toolchain); hardcoding JSX strings (hurts UA parity).

### 2. Priority service set is exactly the GSC crawled-not-indexed list (+ language pairs)
- **Choice:** Deepen voice-agents, ai-assistants, digital-transformation-strategy, marketing-automation in both languages. Do not block the change on rewriting ai-websites/business-analytics/custom-ai-solutions/employee-training unless time remains.
- **Rationale:** Direct response to Google’s quality rejection signals.
- **Alternatives considered:** Rewrite all eight services now (scope creep).

### 3. Footer is the primary discovery surface; home gets a light products/local nod
- **Choice:** Add a Footer “Products” (and Local) link group. Optionally add a compact home section or existing services area cross-link to Uzhhorod—footer is mandatory.
- **Rationale:** Footer is on nearly every page; fixes orphan products sitewide with one change.
- **Alternatives considered:** Header mega-menu (larger UX change); sitemap-only (already insufficient).

### 4. Homepage SERP copy: keep brand suffix, lead with outcome
- **Choice:** Rewrite `seo.title` / `seo.description` (EN+UA) to lead with automation/AI outcome + local/credibility cue where it fits length; keep Mission101.ai brand visible.
- **Rationale:** Homepage has 513/600 impressions; CTR is the bottleneck.
- **Alternatives considered:** Keyword-stuffed local-only titles (hurts brand queries).

### 5. FAQ as accordion or simple definition list
- **Choice:** Prefer simple semantic heading+answer blocks first (no new dependency). Accordion only if an existing UI primitive is already used elsewhere.
- **Rationale:** Lowest risk; content matters more than interaction chrome.

## Risks / Trade-offs

- **[Thin translations]** → Author UA with the same outline as EN; review for boilerplate-only chrome.
- **[Content still not indexed after expand]** → Pair with critical technical change + GSC Validate fix; internal links help crawl priority.
- **[Footer clutter]** → Keep product names short; two products + one local link is enough.

## Migration Plan

1. Land i18n + section UI + footer/home links.
2. Deploy; spot-check EN/UA pages in browser; run Playwright smoke.
3. In GSC, Validate fix on crawled-not-indexed after deploy settles.
4. Rollback = revert; copy keys remain backward compatible if UI guards missing keys.

## Open Questions

- Exact final homepage title strings can be iterated in apply with SERP length checks; outline is fixed by specs.
