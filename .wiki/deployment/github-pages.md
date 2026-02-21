# GitHub Pages Deployment Guide

This repository is configured for automatic deployment to GitHub Pages with custom domain **mission101.ai**.

## What Was Configured

### ✅ Code Changes (Completed)

1. **CNAME File** (`public/CNAME`)
   - Contains: `mission101.ai`
   - Tells GitHub Pages to serve on custom domain

2. **.nojekyll File** (`public/.nojekyll`)
   - Prevents Jekyll processing
   - Ensures Vite assets load correctly

3. **Vite Configuration** (`vite.config.ts`)
   - Added `base: '/'` for custom domain
   - Assets will load from root path

4. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
   - Triggers on push to `main` branch
   - Runs lint checks before building
   - Automatically deploys to GitHub Pages
   - Uses npm ci for consistent builds

## Next Steps (Manual Configuration Required)

### 1. Enable GitHub Pages in Repository Settings

1. Go to: https://github.com/mission101-ai/mission101-web/settings/pages
2. Under **"Build and deployment"**:
   - Source: Select **"GitHub Actions"**
3. Under **"Custom domain"**:
   - Enter: `mission101.ai`
   - Click **"Save"**
   - Wait for DNS check (will show as pending until DNS is configured)

### 2. Configure DNS at Your Domain Registrar

Configure the following DNS records for **mission101.ai**:

#### A Records (for apex domain)
Add these 4 A records pointing to GitHub Pages:

```
Type: A    Name: @    Value: 185.199.108.153
Type: A    Name: @    Value: 185.199.109.153
Type: A    Name: @    Value: 185.199.110.153
Type: A    Name: @    Value: 185.199.111.153
```

#### CNAME Record (optional, for www subdomain)

```
Type: CNAME    Name: www    Value: mission101-ai.github.io
```

**Note:** DNS propagation can take 24-48 hours, but usually completes within a few hours.

### 3. Enable HTTPS (After DNS Propagation)

1. Return to GitHub Pages settings
2. Once DNS check passes, enable **"Enforce HTTPS"**
3. GitHub will automatically provision SSL certificate

## Deployment Process

### Automatic Deployment

Every push to the `main` branch will:
1. Trigger GitHub Actions workflow
2. Install dependencies and Playwright browsers
3. Run `npm run build` (runs `npm run lint:strict` then `vite build`; fails if lint has errors/warnings)
4. Run Playwright E2E tests (`npm run test`); deployment proceeds only if tests pass
5. Upload artifact and deploy to GitHub Pages
6. Site updates at https://mission101.ai

### Manual Deployment

You can also trigger deployment manually:
1. Go to: https://github.com/mission101-ai/mission101-web/actions
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

## Verification Checklist

After completing manual steps:

- [ ] GitHub Pages enabled with source set to "GitHub Actions"
- [ ] Custom domain `mission101.ai` added in repository settings
- [ ] DNS A records configured at domain registrar
- [ ] DNS propagation complete (check with: `dig mission101.ai`)
- [ ] GitHub DNS check passed
- [ ] HTTPS enforced
- [ ] Site accessible at https://mission101.ai
- [ ] Workflow runs successfully on push

## Testing Locally

Build and preview locally before pushing:

```bash
npm run build
npm run preview
```

Visit: http://localhost:4173

## Troubleshooting

### DNS Check Failing
- Wait for DNS propagation (can take up to 48 hours)
- Verify A records are correctly configured
- Use `dig mission101.ai` to check DNS resolution

### Build Failing
- Check GitHub Actions logs: https://github.com/mission101-ai/mission101-web/actions
- Lint errors will cause build to fail
- Run `npm run build` locally to debug

### 404 Errors on Refresh
- Ensure `.nojekyll` file exists in `public/` directory
- SPA routing handled by React Router

### Assets Not Loading
- Verify `base: '/'` is set in `vite.config.ts`
- Check CNAME file contains only domain name

## Links

- **Repository:** https://github.com/mission101-ai/mission101-web
- **GitHub Actions:** https://github.com/mission101-ai/mission101-web/actions
- **Pages Settings:** https://github.com/mission101-ai/mission101-web/settings/pages
- **Live Site:** https://mission101.ai (after DNS configuration)

---

**Status:** ✅ Code configuration complete. Awaiting manual DNS and repository settings configuration.

