# Mission101 AI - Web Platform

A modern, multilingual landing page for Mission101 AI, built with React, TypeScript, and Vite. The site features comprehensive SEO optimization, internationalization support, and automated E2E testing.

## 🌐 Live Site

**Production:** [https://mission101.ai](https://mission101.ai)

## ✨ Features

- **Multilingual Support**: Full i18n implementation with English and Ukrainian languages
- **SEO Optimized**: Comprehensive meta tags, Open Graph, Twitter Cards, and structured data (JSON-LD)
- **SEO-Friendly Routing**: Proper language-specific routes (`/`, `/en`, `/ua`) with hreflang tags
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI Components**: Built with shadcn-ui component library
- **Type-Safe**: Full TypeScript implementation
- **Automated Testing**: Comprehensive E2E tests with Playwright
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

The project includes comprehensive E2E testing with Playwright:

- **21 automated tests** covering routing, i18n, and SEO
- **i18n Routing Tests**: Validate all language routes work correctly
- **SEO Validation Tests**: Verify meta tags, canonical URLs, hreflang tags, and structured data
- **CI Integration**: Tests run automatically on every push to main branch

### Test Coverage

- ✅ All routes accessible (/, /en, /en/, /ua, /ua/)
- ✅ 404 handling for invalid routes
- ✅ Language switcher functionality
- ✅ Canonical URLs and hreflang tags
- ✅ Meta descriptions and Open Graph tags
- ✅ Twitter Card tags
- ✅ HTML lang attribute matching
- ✅ localStorage persistence

## 🌍 Internationalization

The site supports multiple languages with proper SEO routing:

- **English** (`/en`) - Default language
- **Ukrainian** (`/ua`) - Secondary language

Each language version has:
- Dedicated routes with proper HTTP 200 responses
- Localized content loaded from JSON files
- Proper `lang` attributes and hreflang tags
- Language-specific meta tags and Open Graph data
- Automatic language detection based on browser settings

## 📦 Project Structure

```
mission101-web/
├── public/              # Static assets and prerendered HTML
│   ├── en/             # English language route
│   ├── ua/             # Ukrainian language route
│   ├── sitemap.xml     # SEO sitemap
│   └── robots.txt      # Search engine directives
├── src/
│   ├── components/     # React components
│   │   ├── sections/   # Page sections
│   │   ├── ui/         # shadcn-ui components
│   │   └── SEO.tsx     # SEO meta tags component
│   ├── context/        # React Context providers
│   ├── i18n/           # Internationalization config and locales
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   └── services/       # Service modules
├── e2e/                # Playwright E2E tests
└── dist/               # Production build output
```

## 🚢 Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Deployment Process

1. Push to `main` branch
2. GitHub Actions workflow triggers
3. Install dependencies and Playwright browsers
4. Run strict linting (`npm run lint:strict`)
5. Build production bundle (`vite build`)
6. Run all E2E tests
7. Deploy to GitHub Pages (only if tests pass)
8. Site updates at https://mission101.ai

### Manual Deployment

Trigger deployment manually from [GitHub Actions](https://github.com/mission101-ai/mission101-web/actions).

## 🔧 Configuration

### Vite Configuration (`vite.config.ts`)
- Custom plugin to copy index.html to language directories
- Production optimizations
- Path aliases configured

### Tailwind Configuration (`tailwind.config.ts`)
- Custom color scheme
- shadcn-ui integration
- Responsive breakpoints
- Typography plugin

### TypeScript Configuration
- Strict type checking enabled
- Path aliases for cleaner imports
- React JSX support

## 📝 SEO Features

- **Meta Tags**: Title, description, keywords, viewport
- **Open Graph**: Full OG protocol support for social sharing
- **Twitter Cards**: Summary cards with images
- **Structured Data**: JSON-LD for better search engine understanding
- **Canonical URLs**: Proper canonical tags for all pages
- **Hreflang Tags**: Language alternate tags for multilingual SEO
- **Sitemap**: XML sitemap for search engine crawling
- **Robots.txt**: Search engine directives

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

- [Deployment Guide](DEPLOYMENT.md) - GitHub Pages and custom domain setup
- [Implementation Summary](IMPLEMENTATION-SUMMARY.md) - i18n routing implementation details
- [SEO Setup](SEO-SETUP.md) - SEO configuration and best practices

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
