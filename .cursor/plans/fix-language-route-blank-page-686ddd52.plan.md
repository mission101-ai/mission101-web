<!-- 686ddd52-f776-4c40-bb88-9ad6b3d469ae 41f6835a-ea1d-40f7-b00d-da300d60428d -->
# Fix Language Route Blank Page Issue

## Problem Analysis

The `/en/` and `/ua/` routes serve static HTML from `dist/en/index.html` and `dist/ua/index.html`, but these files are missing the JavaScript bundle reference (`<script src="/assets/index-[hash].js">`). Only the CSS file is present. This causes the page to load HTML but not execute the React application.

## Root Cause

The Vite build plugin in `vite.config.ts` (lines 21-95) attempts to inject script/CSS references into language-specific HTML files, but the script injection logic is failing. The CSS is successfully added but the JavaScript `<script>` tag is not.

## Implementation Steps

### 1. Write Failing E2E Test

Create a new test in `e2e/i18n-routing.spec.ts` that verifies content is actually rendered on `/en/` and `/ua/` routes, not just that the page returns 200 status. The test should:

- Navigate to `/en/` and `/ua/`
- Check for actual visible content (e.g., HeroSection text or specific UI elements)
- Verify the React app has loaded by checking for dynamically rendered content

### 2. Fix Vite Build Plugin

Update the `copy-index-to-lang-folders` plugin in `vite.config.ts`:

- The current script replacement logic (lines 48-56 and 73-81) only replaces the dev script tag `<script type="module" src="/src/main.tsx"></script>`
- Instead, it should inject the script tag into the body or before closing `</body>` tag
- Ensure both CSS (in `<head>`) and JS (in `<body>`) are properly injected

The fix should:

- Keep the CSS injection logic (works correctly)
- Add the script tag before `</body>` instead of trying to replace a non-existent dev script
- Extract the script tag from `builtHtml` and inject it into both `/en/` and `/ua/` HTML files

### 3. Rebuild and Verify

- Run `npm run build` to regenerate the dist folder
- Verify that `dist/en/index.html` and `dist/ua/index.html` contain the JavaScript bundle reference
- Run the E2E tests to confirm the fix works

### 4. Ensure Tests Pass

Run full E2E test suite to confirm:

- New test passes
- All existing tests still pass
- No regressions in routing behavior

### To-dos

- [ ] Write E2E test that verifies content renders on /en/ and /ua/ routes (will fail initially)
- [ ] Fix the Vite build plugin to properly inject JavaScript bundle into language HTML files
- [ ] Rebuild the project and verify dist files have correct script tags
- [ ] Run E2E tests to confirm all tests pass including the new one