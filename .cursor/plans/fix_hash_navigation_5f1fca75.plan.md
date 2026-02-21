---
name: Fix Hash Navigation
overview: Add hash navigation handling to the Index page so that links like `/ua/#contact` and `/ua/#services` properly scroll to their target sections.
todos:
  - id: add-hash-navigation
    content: Add useEffect hook to Index.tsx to handle hash navigation on page load
    status: completed
  - id: test-hash-links
    content: "Test hash navigation with #contact and #services links"
    status: completed
isProject: false
---

# Fix Hash Navigation for #contact and #services Links

## Problem Analysis

When navigating from a service page (e.g., `/ua/services/voice-agents`) to the Index page with a hash fragment (e.g., `/ua/#contact`), the page loads but doesn't scroll to the target section.

**Specific Case:** The `[ServiceCTA.tsx](src/components/sections/ServiceCTA.tsx)` component (line 10) creates a link `/${langPrefix}/#contact` that users click from service pages. This navigates to `/ua/#contact` or `/en/#contact`, but the page doesn't scroll to the contact section.

**Root Cause:** The `[src/pages/Index.tsx](src/pages/Index.tsx)` page renders sections with `id="services"` (`[ServicesSection.tsx](src/components/sections/ServicesSection.tsx)` line 15) and `id="contact"` (`[ContactSection.tsx](src/components/sections/ContactSection.tsx)` line 9), but there's no JavaScript code to handle hash fragments when navigating from another page.

**Why same-page navigation works:** When you're already on the Index page and click a `#contact` link, the browser's default hash navigation kicks in. But when navigating from a different route via React Router, the page change happens without triggering the browser's default hash scrolling behavior.

## Solution

Add hash navigation handling to `[src/pages/Index.tsx](src/pages/Index.tsx)` using a `useEffect` hook that:

1. **On mount**: Checks if there's a hash in the URL (e.g., `#contact` or `#services`)
2. **Scrolls to target**: If a hash exists, finds the element with that ID and scrolls to it
3. **Handles timing**: Uses a small delay to ensure sections are rendered before scrolling

## Implementation

### Update Index.tsx

Add this `useEffect` hook after the component declaration in `[src/pages/Index.tsx](src/pages/Index.tsx)`:

```typescript
useEffect(() => {
  // Handle hash navigation on page load
  const hash = window.location.hash;
  if (hash) {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}, []);
```

### Why This Works

- **Timing**: The 100ms delay ensures all React components have rendered before attempting to scroll
- **Smooth scrolling**: Uses `scrollIntoView` with smooth behavior for better UX
- **No dependencies**: Empty dependency array `[]` means it only runs once on mount
- **Flexible**: Works for any hash fragment (#contact, #services, #about, etc.)

## Files to Modify

- `[src/pages/Index.tsx](src/pages/Index.tsx)` - Add hash navigation handling

## Testing

After implementation, verify:

1. **Cross-page navigation (main issue)**: Navigate to any service page (e.g., `/ua/services/voice-agents`), then click the "Contact Us" button in the CTA section - should navigate to `/ua/#contact` and scroll to the contact section
2. **Direct URL navigation**: Manually enter `http://localhost:8080/ua/#contact` in the browser - should load the page and scroll to contact section
3. **Services hash**: Enter `http://localhost:8080/ua/#services` - should scroll to services section
4. **Same-page navigation**: Click the "Learn Our Services" button in the hero section - should scroll smoothly to services (this already works)
5. **No regression**: Regular navigation without hash should still work normally
