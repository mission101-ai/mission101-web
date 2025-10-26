<!-- 31d37b33-53d4-4af2-9ba7-b1545ea6ef79 b9848c46-596f-4e21-80d7-153d43f446e8 -->
# Update SEO Meta Tags

## Changes Required

### 1. Update `index.html` Static Meta Tags

Update the following meta tags in `/Users/sergilliukhin/GitHub/mission101-web/index.html`:

**Title tag (line 11):**

```html
<title>Mission101.ai | Intelligent Automation for Modern Business</title>
```

**Meta description (line 12):**

```html
<meta name="description" content="Transform your business with intelligent automation solutions. Mission101.ai provides AI-powered tools to streamline operations, enhance productivity, and accelerate digital growth." />
```

**Open Graph title (line 23):**

```html
<meta property="og:title" content="Mission101.ai | Intelligent Automation for Modern Business" />
```

**Open Graph description (line 24):**

```html
<meta property="og:description" content="Transform your business with intelligent automation solutions. Mission101.ai provides AI-powered tools to streamline operations, enhance productivity, and accelerate digital growth." />
```

**Twitter Card title (line 36):**

```html
<meta name="twitter:title" content="Mission101.ai | Intelligent Automation for Modern Business" />
```

**Twitter Card description (line 37):**

```html
<meta name="twitter:description" content="Transform your business with intelligent automation solutions. Mission101.ai provides AI-powered tools to streamline operations, enhance productivity, and accelerate digital growth." />
```

### 2. Update `src/components/SEO.tsx` Default Values

Update the default SEO values in `/Users/sergilliukhin/GitHub/mission101-web/src/components/SEO.tsx` (lines 30-31):

```typescript
const defaultTitle = 'Mission101.ai | Intelligent Automation for Modern Business';
const defaultDescription = 'Transform your business with intelligent automation solutions. Mission101.ai provides AI-powered tools to streamline operations, enhance productivity, and accelerate digital growth.';
```

## Impact

These changes will ensure that:

- Google and other search engines display the new title and description in search results
- Social media platforms (Facebook, LinkedIn) show the updated Open Graph metadata when links are shared
- Twitter displays the new Twitter Card information
- The dynamic React SEO component maintains consistency with the static HTML