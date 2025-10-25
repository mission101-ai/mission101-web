# Add Internationalization with English & Ukrainian Support

## Overview
Add English/Ukrainian language support with IP-based detection, URL routing (/en/, /ua/), visible language switcher, and localStorage persistence.

## 1. Install Dependencies

Install `react-i18next` and `i18next` for internationalization support:

```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

## 2. Create Translation Files

Create translation JSON files in `src/i18n/locales/`:

- `src/i18n/locales/en.json` - English translations (extract current content)
- `src/i18n/locales/ua.json` - Ukrainian translations (AI-translated content)

Content to translate includes:

- HeroSection: headline, tagline, buttons, stats labels
- AboutSection: company description, goal, mission, focus areas
- ServicesSection: 6 service titles and descriptions
- PortfolioSection: 6 case study titles and descriptions
- FounderSection: bio and labels
- ContactSection: headings, labels, CTA text
- FooterSection: tagline, copyright text

## 3. Setup i18n Configuration

Create `src/i18n/config.ts`:

- Configure i18next with English and Ukrainian languages
- Set up language detector (checks URL → localStorage → IP detection → browser)
- Default fallback to English
- Add namespace support for organized translations

## 4. Create IP Geolocation Service

Create `src/services/geolocation.ts`:

- Implement function to detect user location via ipapi.co API
- Return detected country code
- Handle API failures gracefully with fallback to English
- Cache result in sessionStorage to avoid repeated API calls

## 5. Create Language Context & Hook

Create `src/context/LanguageContext.tsx`:

- Wrap i18next functionality with React Context
- Provide `currentLanguage` and `changeLanguage` function
- Implement IP-based detection on first visit
- Handle localStorage persistence for language preference
- Manage language switching with URL updates

## 6. Create Language Switcher Component

Create `src/components/LanguageSwitcher.tsx`:

- Toggle button showing current language (EN/UA)
- Dropdown or button group UI with flag icons/text
- Calls `changeLanguage` from context on click
- Updates URL to reflect selected language
- Saves preference to localStorage

## 7. Update Routing Structure

Modify `src/App.tsx`:

- Keep root `/` route as main landing page (no automatic redirect)
- Add optional language routes: `/en/` and `/ua/`
- All routes serve the same Index component
- User stays on `/` unless they explicitly switch language via switcher
- When user switches language, navigate to `/en/` or `/ua/` and save preference
- Wrap app with LanguageContext provider
- Initialize i18n before rendering

## 8. Update All Section Components

Modify all section components to use translations:

- `HeroSection.tsx` - Replace hardcoded strings with `t('hero.title')` calls
- `AboutSection.tsx` - Use translation keys for all text content
- `ServicesSection.tsx` - Translate service titles and descriptions
- `PortfolioSection.tsx` - Translate case study content
- `FounderSection.tsx` - Translate bio and labels
- `ContactSection.tsx` - Translate contact labels and CTA
- `FooterSection.tsx` - Translate footer text

## 9. Add Language Switcher to Layout

Update the navigation/header area:

- Add LanguageSwitcher component to HeroSection or create a Header component
- Position it in the top-right corner
- Ensure it's accessible and visible on all pages

## 10. Handle Language-Aware Navigation

Update navigation links throughout the site:

- Ensure all internal links preserve the current language in URL
- Update scroll-to-section functionality to work with language routes
- Test language switching maintains scroll position/section

## Key Technical Details

### URL Structure and Language Detection Logic

**When User Visits Root `/`:**

First-time visitor (no saved preference):
1. User lands on `https://mission101.ai/` - URL stays as `/`
2. System checks localStorage for saved language preference → not found
3. System makes IP geolocation API call to ipapi.co
4. If IP is from Ukraine (`UA`) → content displays in Ukrainian
5. If IP is from anywhere else → content displays in English
6. URL remains `/` throughout - no redirect happens
7. Language preference is saved to localStorage for next visit

Returning visitor (has saved preference):
1. User lands on `https://mission101.ai/` - URL stays as `/`
2. System checks localStorage → preference found (e.g., "en" or "ua")
3. Content displays in saved language immediately
4. No IP detection call is made (preference already exists)
5. URL remains `/`

**When User Clicks Language Switcher:**
1. User clicks to switch language (e.g., from EN to UA)
2. System navigates to `/ua/` - URL changes
3. Content switches to Ukrainian
4. New preference saved to localStorage
5. From now on, even if they visit `/`, they'll see Ukrainian

**When User Directly Visits `/en/` or `/ua/`:**
1. System respects the URL language parameter
2. Content displays in that language
3. Preference is saved to localStorage
4. They stay on `/en/` or `/ua/` URL

### Language Detection Priority

1. User's saved preference in localStorage
2. Current URL language parameter (if visiting `/en/` or `/ua/`)
3. IP-based geolocation (Ukraine → `ua`, others → `en`)
4. Browser language settings
5. Default fallback: `en`

### IP Detection

- Service: ipapi.co (free tier, 100 req/min)
- Endpoint: `https://ipapi.co/country/`
- Returns country code (e.g., "UA" for Ukraine)
- Only called once per session (cached in sessionStorage)
- Graceful fallback to English on API failure

## Implementation Checklist

- [ ] Install react-i18next, i18next, and language detector packages
- [ ] Create en.json and ua.json translation files with all website content
- [ ] Configure i18next with language detection and fallback settings
- [ ] Implement IP geolocation service using ipapi.co
- [ ] Create LanguageContext with IP detection and localStorage persistence
- [ ] Build LanguageSwitcher UI component
- [ ] Update App.tsx with language-based routing (/, /en/, /ua/)
- [ ] Replace hardcoded strings with translation keys in all section components
- [ ] Add LanguageSwitcher to the header/navigation
- [ ] Test language switching, IP detection, and localStorage persistence

