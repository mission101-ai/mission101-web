## 1. Uzhhorod content depth

- [x] 1.1 Expand EN Uzhhorod i18n copy with local offer summary, consultation path, and multi-item FAQ keys and verify `/en/uzhhorod/` renders the new sections in the browser
- [x] 1.2 Expand UA Uzhhorod i18n copy to matching depth and verify `/ua/uzhhorod/` shows Ukrainian FAQ and offer sections
- [x] 1.3 Wire any new Uzhhorod section UI needed to render FAQ/audience blocks and verify no console errors and no horizontal overflow on mobile viewport

## 2. Priority service page depth

- [x] 2.1 Expand EN+UA content for `voice-agents` and `ai-assistants` (audience, capabilities, FAQ) and verify both language routes show distinct service-specific body copy
- [x] 2.2 Expand EN+UA content for `digital-transformation-strategy` and `marketing-automation` with the same depth pattern and verify pages are visually complete and differentiated
- [x] 2.3 Spot-check that other service pages still render and that shared templates did not break (navigate at least one untouched service)

## 3. Discovery links and homepage SERP copy

- [x] 3.1 Add footer links to Image Resizer and Legal product URLs for the active language and verify hrefs on `/en/` and `/ua/`
- [x] 3.2 Add at least one home and/or footer link to the language-appropriate Uzhhorod page and verify it navigates successfully
- [x] 3.3 Rewrite EN+UA homepage `seo.title` and `seo.description` for clearer brand/value CTR and verify document title/meta on `/` and `/ua/` after load

## 4. Tests and GSC follow-up

- [x] 4.1 Add Playwright smoke assertions for footer product links and presence of Uzhhorod FAQ heading/content and verify tests pass
- [ ] 4.2 After deploy, manually queue GSC Validate fix for crawled-not-indexed URLs and record the date in the PR notes (no in-repo automation required)
