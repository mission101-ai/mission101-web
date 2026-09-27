## Context

See proposal.md for motivation. Product pages already render App Store and Google Play CTAs from i18n keys (`products.legal.playStoreHref`, `products.imageResizer.playStoreHref`, plus matching `storesNote` strings). Legal currently uses a Play Console testing URL; Image Resizer uses `#play-store-coming-soon`. Page components and test IDs stay as they are.

## Goals / Non-Goals

**Goals:**
- Point both product pages at the public Play Store detail URLs provided for each package id
- Keep EN and UA copy consistent with public Android availability
- Keep e2e assertions in sync with the new hrefs and notes

**Non-Goals:**
- Changing App Store / iOS URLs or badges
- Changing package ids, deep links, or store listing assets
- Redesigning store CTA layout or adding new store platforms
- Publishing or verifying Play Console release state beyond using the URLs supplied for this change

## Decisions

1. **i18n-only URL updates**  
   Update `playStoreHref` (and related `storesNote`) in `en.json` / `ua.json`. Pages already bind `href={t('...playStoreHref')}`, so no component API changes are required.  
   *Alternatives considered:* Hard-coding URLs in page components — rejected because it breaks the existing i18n pattern and EN/UA parity.

2. **Exact public listing URLs**  
   Use the caller-provided destinations:
   - Legal: `https://play.google.com/store/apps/details?id=ai.mission101.legal`
   - Image Resizer: `https://play.google.com/store/apps/details?id=ai.mission101.imageresizer`  
   *Alternatives considered:* Keeping Legal on the `/apps/test/...` URL until a separate copy pass — rejected because the public listing is the requested destination now.

3. **Copy aligned with availability**  
   - Legal: replace “Google Play testing” language with public Google Play availability while keeping the existing App Store availability statement.  
   - Image Resizer: replace the generic “store links will go live” note with copy that Android is on Google Play; leave the App Store href as `#app-store-coming-soon` and note iOS as still forthcoming if the note mentions both platforms.  
   *Alternatives considered:* Leaving notes unchanged — rejected because visitors would see contradictory availability messaging next to live Play buttons.

4. **E2e assertion updates**  
   Update Playwright expectations for `legal-play-store-link` and `image-resizer-play-store-link` (and any store-note assertions if present) to the new URLs/copy.  
   *Alternatives considered:* Dropping href assertions — rejected; these tests are the regression guard for store CTAs.

## Risks / Trade-offs

- [Play listing not yet publicly reachable in some regions] → Mitigation: URLs are the official `store/apps/details?id=` form for the package ids; if a region fails, that is a Play Console distribution issue outside this site change.
- [Image Resizer iOS still placeholder while Android is live] → Mitigation: intentional; keep App Store href unchanged and make the store note describe mixed availability clearly.
- [Stale workspace memory still describing Legal as testing-only] → Mitigation: after apply, update local notes if they still cite the old test URL.

## Migration Plan

1. Land i18n + e2e updates on the marketing site.
2. Deploy via the existing GitHub Pages path.
3. Spot-check `/en/products/legal/`, `/ua/products/legal/`, `/en/products/image-resizer/`, and `/ua/products/image-resizer/` Play buttons.
4. Rollback: restore previous `playStoreHref` / `storesNote` values and e2e expectations in a follow-up commit if needed.
