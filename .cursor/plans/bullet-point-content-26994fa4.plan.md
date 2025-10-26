<!-- 26994fa4-c8c4-4453-8c43-520a055c392a 7b938c07-1151-45f0-8e57-edcf2fb83b2b -->
# Convert Content to Bullet-Point Format

## Sections to Update

### 1. About Section (`en.json` lines 20-21, `ua.json` lines 20-21)

**Current (prose):**

- Intro: Single sentence about founding and location
- Description: Long paragraph about expertise and approach

**Convert to (bullet points):**

- Keep intro as-is (it's already concise)
- Break description into 3-4 key bullet points:
- Expertise areas (process automation, performance optimization, cost reduction)
- Bridge between AI technology and business challenges
- Deliverables (tailored automation solutions)
- Benefits (streamline operations, enhance productivity, measurable results)

### 2. Goal & Mission (`en.json` lines 24, 28, `ua.json` lines 24, 28)

**Current:** Single long sentence for each

**Convert to:** 2-3 concise bullet points per section highlighting:

- **Goal**: Empower businesses, intelligent automation/AI optimization, enterprise-grade AI accessibility
- **Mission**: Bridge AI and business, deliver tailored solutions, measurable outcomes

### 3. Services (`en.json` lines 52, 56, 60, 64, 68, 72, `ua.json` similar)

**Current:** Each service has a long descriptive paragraph

**Convert to:** 3-4 bullet points per service highlighting:

- Core capability
- Key features
- Primary benefits
- Use cases/outcomes

### 4. Founder Bio (`en.json` line 82, `ua.json` line 82)

**Current:** Long paragraph narrative

**Convert to:** 4-5 bullet points covering:

- Founded mission101.ai in 2025
- Vision (enterprise-grade AI for all business sizes)
- Background (AI, automation, business optimization experience)
- Leadership approach
- Impact (helped organizations worldwide)

## Files to Modify

- `/Users/sergilliukhin/GitHub/mission101-web/src/i18n/locales/en.json`
- `/Users/sergilliukhin/GitHub/mission101-web/src/i18n/locales/ua.json`

## Component Updates

The React components already use `{t('...')}` for translations, so they'll automatically pick up the bullet-point formatted content. May need minor adjustments to:

- `AboutSection.tsx` - to render bullet lists for description
- `FounderSection.tsx` - to render bullet lists for bio

## Approach

1. Update English content in `en.json` with bullet-point formatted text
2. Update Ukrainian content in `ua.json` with bullet-point formatted text (translations)
3. Test that components render bullet points properly (may need to add list rendering if strings contain line breaks)