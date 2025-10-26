<!-- d20ea574-3a4e-433f-aae9-2357dfdf041e 4b69badf-56ed-485f-a9c7-742d0179e09b -->
# SEO Optimization Implementation

## 1. Open Graph Image Setup

- Move/copy `mission101-og-image.png` from dist to `/public/` directory
- Update `index.html` to reference `/mission101-og-image.png` instead of `/og-image.png`
- Add Twitter image meta tag

## 2. Enhanced Meta Tags in index.html

- Add canonical URL: `<link rel="canonical" href="https://mission101.ai/" />`
- Add language alternates: `<link rel="alternate" hreflang="en" href="https://mission101.ai/en" />` and `<link rel="alternate" hreflang="uk" href="https://mission101.ai/ua" />`
- Add `<link rel="alternate" hreflang="x-default" href="https://mission101.ai/" />`
- Add theme-color meta tag
- Update OG and Twitter image URLs to full absolute paths
- Add missing `og:url` and `og:site_name` properties
- Add `twitter:image` meta tag

## 3. Google Analytics Integration

- Add GA4 script to `index.html` `<head>` section
- Create placeholder for GA4 measurement ID (will need actual ID from user later)
- Include both gtag.js initialization and pageview tracking

## 4. Google Search Console Verification

- Add Google Search Console verification meta tag to `index.html`
- Include placeholder comment for user to add their verification code

## 5. Structured Data (JSON-LD)

Create structured data script in `index.html` including:

- Organization schema with contact info, location, founding date
- LocalBusiness schema for Uzhhorod location
- WebSite schema with search action potential
- Include proper @context and @type for all schemas

## 6. Dynamic SEO Component

Create `/src/components/SEO.tsx` component to handle:

- Dynamic title and meta description updates based on current route/language
- Language-specific meta tags for `/en` and `/ua` routes
- Use react-helmet-async or direct DOM manipulation

## 7. Sitemap.xml Generation

Create `/public/sitemap.xml` with:

- Homepage (priority 1.0)
- Language variants `/en` and `/ua` (priority 1.0)
- Last modified dates
- Proper XML structure with xmlns

## 8. Enhanced robots.txt

Update `/public/robots.txt` to:

- Add sitemap reference: `Sitemap: https://mission101.ai/sitemap.xml`
- Keep existing bot allowances
- Add crawl-delay if needed
- Ensure proper formatting

## 9. Additional SEO Enhancements

- Add `lang` attribute dynamically based on route in App.tsx
- Ensure all images have proper alt attributes (audit existing components)
- Add loading="lazy" to non-critical images
- Verify semantic HTML structure (headings hierarchy)

## 10. Performance Optimizations

- Add resource hints: `<link rel="dns-prefetch">` for external domains
- Verify font preconnect is properly configured
- Consider adding preload for critical assets

## Key Files to Modify

- `/index.html` - Enhanced meta tags, GA, Search Console, structured data
- `/public/robots.txt` - Add sitemap reference
- `/public/sitemap.xml` - Create new file
- `/public/mission101-og-image.png` - Move from dist
- `/src/App.tsx` - Add dynamic lang attribute
- `/src/components/SEO.tsx` - Create new dynamic SEO component (optional but recommended)

### To-dos

- [ ] Copy mission101-og-image.png to public directory and update meta tags
- [ ] Add canonical URLs, language alternates, and missing OG/Twitter meta tags to index.html
- [ ] Integrate Google Analytics 4 tracking script in index.html
- [ ] Add Google Search Console verification meta tag
- [ ] Implement JSON-LD structured data for Organization, LocalBusiness, and WebSite schemas
- [ ] Generate sitemap.xml with all routes and language variants
- [ ] Update robots.txt with sitemap reference and proper formatting
- [ ] Create SEO component for dynamic meta tags based on language/route
- [ ] Add resource hints and optimize loading strategy