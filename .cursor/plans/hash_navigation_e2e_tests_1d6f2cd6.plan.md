---
name: Hash Navigation E2E Tests
overview: "Create comprehensive e2e tests using Playwright to verify the hash navigation functionality that scrolls to target sections (#contact, #services, #about, #founder) when navigating from service pages or directly via URL."
todos:
  - id: copy-original-plan
    content: Copy original plan from ~/.cursor/plans/fix_hash_navigation_5f1fca75.plan.md to .cursor/plans/
    status: completed
  - id: rebuild-app
    content: Rebuild the app before running tests (npm run build)
    status: completed
  - id: create-test-file
    content: Create e2e/hash-navigation.spec.ts with comprehensive test suite
    status: completed
  - id: test-direct-navigation
    content: Add tests for direct URL navigation with hash fragments
    status: completed
  - id: test-cross-page-navigation
    content: Add tests for navigation from service pages with hash
    status: completed
  - id: test-scroll-verification
    content: Add viewport position verification for scrolled elements
    status: completed
  - id: test-edge-cases
    content: Add tests for invalid/empty hash edge cases
    status: completed
  - id: test-both-languages
    content: Ensure all tests work for both /ua/ and /en/ routes
    status: completed
  - id: run-tests
    content: Run tests locally to verify they pass
    status: completed
isProject: false
---

# E2E Tests for Hash Navigation Functionality

## Background

This plan creates automated e2e tests for the hash navigation feature that was implemented based on the original plan: `[~/.cursor/plans/fix_hash_navigation_5f1fca75.plan.md](~/.cursor/plans/fix_hash_navigation_5f1fca75.plan.md)` (to be copied to `.cursor/plans/` for workspace reference).

The original plan identified the problem where navigating from service pages to the main page with hash fragments (e.g., `/ua/#contact`) would not scroll to the target section. The solution was implemented in commit [157b98e8](157b98e8c0daea213a7ac54fc46d5d4b3f570914).

## Understanding the Implementation

The commit [157b98e8](157b98e8c0daea213a7ac54fc46d5d4b3f570914) added smooth scrolling functionality to `[src/pages/Index.tsx](src/pages/Index.tsx)` using a `useEffect` hook that:

1. Checks for a hash fragment in the URL on page load (e.g., `#contact`, `#services`)
2. Waits 100ms for DOM to render
3. Scrolls smoothly to the target element using `scrollIntoView({ behavior: 'smooth', block: 'start' })`

### Available Hash Targets

Based on the codebase analysis, the following sections have IDs:

- `#services` - Services section (`[ServicesSection.tsx](src/components/sections/ServicesSection.tsx)` line 15)
- `#contact` - Contact section (`[ContactSection.tsx](src/components/sections/ContactSection.tsx)` line 9)
- `#about` - About section (`[AboutSection.tsx](src/components/sections/AboutSection.tsx)`)
- `#founder` - Founder section (`[FounderSection.tsx](src/components/sections/FounderSection.tsx)`)

### Key Use Case

The primary use case is navigation from service pages (e.g., `/ua/services/voice-agents`) back to the main page with a hash. The `[ServiceCTA.tsx](src/components/sections/ServiceCTA.tsx)` component creates links like `/${langPrefix}/#contact` that should scroll to the contact section.

## Test Strategy

The original plan (`fix_hash_navigation_5f1fca75.plan.md`) outlined manual testing scenarios. This plan automates those tests.

Create a new test file `e2e/hash-navigation.spec.ts` with comprehensive test coverage for:

### 1. Direct URL Navigation with Hash

Test that entering URLs with hash fragments directly scrolls to the correct section:

- `/ua/#contact` → scrolls to contact section
- `/ua/#services` → scrolls to services section  
- `/en/#about` → scrolls to about section
- `/en/#founder` → scrolls to founder section

### 2. Cross-Page Navigation (Primary Use Case)

Test navigation from service pages to main page with hash:

- Navigate to `/ua/services/voice-agents`
- Click "Contact Us" button (which links to `/#contact`)
- Verify page navigates to `/ua/#contact`
- Verify page scrolls to contact section

Test for multiple service pages and hash targets to ensure robustness.

### 3. Scroll Position Verification

For each hash navigation test, verify:

- The target element exists and is visible
- The element is scrolled into view (check viewport position)
- The scroll position is near the top of the element (within reasonable tolerance)

### 4. Edge Cases

- Invalid hash (e.g., `#nonexistent`) → should load page normally without error
- Empty hash (e.g., `/ua/#`) → should load page at top
- Hash navigation on page refresh → should maintain scroll position

### 5. Both Languages

Test hash navigation for both `/ua/` and `/en/` routes to ensure language-agnostic functionality.

## Implementation Details

### Test File Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Hash Navigation', () => {
  // Helper function to check if element is in viewport
  async function isElementInViewport(page, selector) {
    return await page.evaluate((sel) => {
      const element = document.querySelector(sel);
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.top <= window.innerHeight / 2 // Element should be in upper half
      );
    }, selector);
  }

  // Tests for direct URL navigation
  // Tests for cross-page navigation  
  // Tests for edge cases
});
```

### Key Assertions

1. **Element exists**: `await expect(page.locator('#contact')).toBeAttached()`
2. **Element visible**: `await expect(page.locator('#contact')).toBeInViewport()`
3. **Scroll position**: Use custom helper to verify element is in upper viewport
4. **URL contains hash**: `expect(page.url()).toContain('#contact')`

### Timing Considerations

- Use `waitForLoadState('networkidle')` after navigation
- Add small delays (e.g., `await page.waitForTimeout(200)`) after navigation to allow smooth scroll animation to complete
- The implementation has a 100ms delay, so tests should wait at least 150-200ms

## Execution Steps

1. **Copy original plan** - Copy the original implementation plan from `~/.cursor/plans/fix_hash_navigation_5f1fca75.plan.md` to `.cursor/plans/` for workspace documentation
2. **Rebuild the application** - Run `npm run build` to ensure the latest code changes are compiled into the `dist` folder
3. **Create test file** - Write comprehensive e2e tests in `e2e/hash-navigation.spec.ts`
4. **Run tests** - Execute `npm test` to verify all tests pass

## Files to Create

- `[e2e/hash-navigation.spec.ts](e2e/hash-navigation.spec.ts)` - New test file with comprehensive hash navigation tests

## Test Coverage

The tests should cover:

1. ✅ Direct URL navigation with hash for all 4 sections (#contact, #services, #about, #founder)
2. ✅ Cross-page navigation from service pages to main page with hash
3. ✅ Both language routes (/ua/ and /en/)
4. ✅ Scroll position verification (element in viewport)
5. ✅ Edge cases (invalid hash, empty hash)
6. ✅ Multiple service pages as starting points

## Success Criteria

All tests should pass when:

- Navigating directly to a URL with hash scrolls to the target
- Clicking links from service pages navigates and scrolls correctly
- Invalid hashes don't cause errors
- Functionality works in both English and Ukrainian
- Scroll position is accurate (element appears in upper viewport)

