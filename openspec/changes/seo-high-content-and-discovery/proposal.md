## Why

GSC shows the site’s only meaningful query traction is local Uzhhorod/IT intent, while five crawled pages (including `/en/uzhhorod/` and key services) are “Crawled – currently not indexed,” and product pages have almost no internal links. Without deeper on-page content and clearer discovery paths, technical indexation fixes alone will not grow clicks beyond the current ~6 in three months.

## What Changes

- Substantially expand **EN and UA Uzhhorod local pages** for local IT/AI automation intent (services offered locally, proof, FAQ, clear contact CTA), aligned with the top query cluster (`it компании ужгород` and related).
- Deepen content on the **GSC crawled-not-indexed service pages** (and their language pairs where thin): voice agents, AI assistants, digital transformation strategy, marketing automation—unique body sections, FAQs, and differentiated value—not boilerplate clones.
- Add **site-wide discovery links** to products (Image Resizer, Legal) and Uzhhorod from home and/or footer (and related service pages where natural) so Google and users can reach them without relying on the sitemap alone.
- Improve **homepage SERP copy** (title/meta description) for brand + local CTR, especially given desktop impressions with zero clicks.
- Cover new copy/structure with i18n EN+UA parity and Playwright smoke checks for presence of key sections and nav/footer product links.

## Capabilities

### New Capabilities
- `seo/local-uzhhorod-content`: Depth and local-intent coverage requirements for `/en/uzhhorod/` and `/ua/uzhhorod/`.
- `seo/service-page-depth`: Minimum content depth and differentiation for priority service pages flagged by GSC as crawled-not-indexed.
- `seo/site-navigation-discovery`: Internal linking requirements so products and local pages are reachable from primary chrome (home/footer).
- `seo/homepage-serp-copy`: Homepage title and meta description requirements aimed at brand and local CTR.

### Modified Capabilities
- (none)

## Impact

- **i18n**: Large EN/UA copy updates in `src/i18n/locales/en.json` and `ua.json` for Uzhhorod, listed services, homepage SEO strings, and any new section keys.
- **UI**: Uzhhorod and Service page section components may gain FAQ/content blocks; Footer/Home gain product and local links.
- **Tests**: E2E assertions for new sections and footer/home product links; optional content-length smoke checks.
- **Depends on / pairs with**: `seo-critical-indexation-signals` for schema/phone and indexation heads—content can ship independently but GSC Validate fix is most effective after both.
- **Non-goals**: Full blog/programmatic SEO program; paid link acquisition; rewriting every service page beyond the GSC priority set; App Store listing publication.
