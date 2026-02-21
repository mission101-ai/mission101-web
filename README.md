# Mission101 AI - Web Platform

[![Build and Deploy](https://github.com/mission101-ai/mission101-web/actions/workflows/deploy.yml/badge.svg)](https://github.com/mission101-ai/mission101-web/actions/workflows/deploy.yml)

A modern, multilingual landing page for Mission101 AI, built with React, TypeScript, and Vite. The site features comprehensive SEO optimization, internationalization support, and automated E2E testing.

## 🌐 Live Site

**Production:** [https://mission101.ai](https://mission101.ai)

## 📊 Build Status

- **Latest Build**: ![Build Status](https://img.shields.io/github/actions/workflow/status/mission101-ai/mission101-web/deploy.yml?branch=main&label=build&logo=github)
- **Deployment**: Automatic deployment to GitHub Pages on successful build
- **Tests**: 61 E2E tests must pass before deployment
- **View Workflow**: [GitHub Actions](https://github.com/mission101-ai/mission101-web/actions/workflows/deploy.yml)

## ✨ Features

- **Multilingual Support**: Full i18n implementation with English and Ukrainian languages
- **Local Landing Pages**: Dedicated Uzhhorod city page with local SEO optimization
- **SEO Optimized**: Comprehensive meta tags, Open Graph, Twitter Cards, and structured data (JSON-LD)
- **SEO-Friendly Routing**: Proper language-specific routes (`/`, `/en`, `/ua`, `/en/uzhhorod`, `/ua/uzhhorod`) with hreflang tags
- **LocalBusiness Schema**: Rich structured data for enhanced local search visibility
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Interactive Hero**: Animated particle canvas background with mouse interaction
- **Cursor Glow**: Subtle cursor-follow glow effect on the main landing page
- **Scroll Animations**: ScrollTrigger-based reveal animations in About, Services, and Founder sections
- **Light Theme**: Consistent light theme (`.light-theme`) across main and Uzhhorod pages
- **Modern UI Components**: Built with shadcn-ui component library
- **Type-Safe**: Full TypeScript implementation
- **Automated Testing**: 61 comprehensive E2E tests with Playwright
- **CI/CD**: Automated deployment to GitHub Pages via GitHub Actions
- **Custom Domain**: Deployed with SSL certificate on mission101.ai

## 🛠 Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.1.12
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn-ui with Radix UI primitives
- **Internationalization**: i18next, react-i18next
- **Routing**: React Router DOM 7.9.4
- **Testing**: Playwright 1.56.1
- **Linting**: ESLint 9.38.0

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mission101-ai/mission101-web.git

# Navigate to the project directory
cd mission101-web

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173`

## 📜 Available Scripts

### Development
```bash
npm run dev              # Start development server with hot reload
npm run preview          # Preview production build locally
npm run preview:static   # Preview using Python HTTP server on port 8080
```

### Building
```bash
npm run build           # Production build with strict linting
npm run build:dev       # Development build with strict linting
```

### Testing
```bash
npm run test            # Run all Playwright E2E tests
npm run test:ui         # Run tests in interactive UI mode
npm run test:headed     # Run tests in headed browser mode
npm run test:debug      # Run tests in debug mode
```

### Code Quality
```bash
npm run lint            # Run ESLint
npm run lint:strict     # Run ESLint with zero warnings allowed
```

## 🧪 Testing

61 E2E tests with Playwright cover routing, i18n, SEO, and page functionality. See [.wiki/testing/overview.md](.wiki/testing/overview.md) for test suites, coverage, and CI details.

## 🌍 Internationalization

English (`/en`) and Ukrainian (`/ua`) with language-specific routes, localized content, and proper hreflang tags. See [.wiki/architecture/overview.md](.wiki/architecture/overview.md) for routing and i18n flow.

## 📦 Project Structure

```
mission101-web/
├── public/          # Static assets, prerendered HTML, sitemap, robots.txt
├── src/             # components/, context/, i18n/, hooks/, lib/, pages/, services/
├── e2e/             # Playwright E2E tests
└── dist/            # Production build output
```

Full structure and architecture: [.wiki/architecture/overview.md](.wiki/architecture/overview.md)

## 🚢 Deployment

Automatic deployment to GitHub Pages on push to `main`. Lint → build → E2E tests → deploy. See [.wiki/deployment/github-pages.md](.wiki/deployment/github-pages.md) for the full process and manual triggers.

## 🔧 Configuration

Vite, Tailwind, and TypeScript configs with path aliases, custom plugins, and production optimizations. See [.wiki/architecture/overview.md](.wiki/architecture/overview.md).

## 📝 SEO Features

Meta tags, Open Graph, Twitter Cards, canonical URLs, hreflang, sitemap, and JSON-LD structured data (Organization, LocalBusiness, WebSite, Service). See [.wiki/seo/setup.md](.wiki/seo/setup.md) for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run test`)
5. Run linting (`npm run lint:strict`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Quality Standards

- All code must pass strict ESLint checks (zero warnings)
- All E2E tests must pass
- TypeScript strict mode enabled
- Maintain consistent code style

## 📄 License

This project is private and proprietary to Mission101 AI.

## 🔗 Links

- **Live Site**: [https://mission101.ai](https://mission101.ai)
- **Repository**: [https://github.com/mission101-ai/mission101-web](https://github.com/mission101-ai/mission101-web)
- **GitHub Actions**: [CI/CD Workflows](https://github.com/mission101-ai/mission101-web/actions)
- **GitHub Pages**: [Settings](https://github.com/mission101-ai/mission101-web/settings/pages)

## 📚 Documentation

All documentation lives in [.wiki/Home.md](.wiki/Home.md). Wiki pages:

- [Architecture Overview](.wiki/architecture/overview.md) – Project structure, routing, i18n, build, config
- [Testing Overview](.wiki/testing/overview.md) – Test suites, coverage, commands, CI
- [Deployment (GitHub Pages)](.wiki/deployment/github-pages.md) – Deployment process and setup
- [SEO Setup](.wiki/seo/setup.md) – SEO configuration and best practices
- [SEO i18n Routing](.wiki/seo/i18n-routing.md) – Multilingual routing and hreflang
- [SEO Uzhhorod](.wiki/seo/uzhhorod.md) – Local SEO for Uzhhorod pages
- [Favicon](.wiki/assets/favicon.md) – Favicon setup and visibility

## 🐛 Troubleshooting

### Development Server Issues
```bash
# Clear cache and restart
rm -rf node_modules dist
npm install
npm run dev
```

### Build Failures
- Check GitHub Actions logs for detailed error messages
- Ensure all ESLint warnings are resolved
- Run `npm run build` locally to debug

### Test Failures
- Run `npm run test:ui` for interactive debugging
- Check `playwright-report/` for detailed test results
- Ensure development server is not running when executing tests

---

**Built with ❤️ by Mission101 AI**
