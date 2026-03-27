import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  preview: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: 'copy-index-to-lang-folders',
      closeBundle() {
        // Copy language-specific index.html files to dist
        const distPath = path.resolve(__dirname, 'dist');
        const publicPath = path.resolve(__dirname, 'public');
        const distIndexPath = path.join(distPath, 'index.html');
        
        // Create language directories if they don't exist
        const enDir = path.join(distPath, 'en');
        const uaDir = path.join(distPath, 'ua');
        const enUzhhorodDir = path.join(distPath, 'en', 'uzhhorod');
        const uaUzhhorodDir = path.join(distPath, 'ua', 'uzhhorod');
        
        if (!fs.existsSync(enDir)) {
          fs.mkdirSync(enDir, { recursive: true });
        }
        if (!fs.existsSync(uaDir)) {
          fs.mkdirSync(uaDir, { recursive: true });
        }
        if (!fs.existsSync(enUzhhorodDir)) {
          fs.mkdirSync(enUzhhorodDir, { recursive: true });
        }
        if (!fs.existsSync(uaUzhhorodDir)) {
          fs.mkdirSync(uaUzhhorodDir, { recursive: true });
        }
        
        // Read the built index.html to get the asset references
        const builtHtml = fs.readFileSync(distIndexPath, 'utf-8');
        
        // Extract script and style tags from the built HTML
        // Match the production JS bundle (contains /assets/ in the path)
        const scriptMatch = builtHtml.match(/<script[^>]*src="(\/assets\/[^"]*\.js)"[^>]*><\/script>/);
        const styleMatch = builtHtml.match(/<link[^>]*href="([^"]*\.css)"[^>]*>/);
        
        // Copy to /en/ (English version)
        const enPublicIndex = path.join(publicPath, 'en', 'index.html');
        if (fs.existsSync(enPublicIndex)) {
          let enHtml = fs.readFileSync(enPublicIndex, 'utf-8');
          
          // Inject the CSS link before the closing head tag
          if (styleMatch) {
            enHtml = enHtml.replace('</head>', `  ${styleMatch[0]}\n  </head>`);
          }
          
          // Replace the dev script tag with the production script tag
          if (scriptMatch) {
            enHtml = enHtml.replace(
              '<script type="module" src="/src/main.tsx"></script>',
              scriptMatch[0]
            );
          }
          
          fs.writeFileSync(path.join(enDir, 'index.html'), enHtml);
        } else {
          // Fallback: copy built index.html
          fs.copyFileSync(distIndexPath, path.join(enDir, 'index.html'));
        }
        
        // Copy to /ua/ (Ukrainian version)
        const uaPublicIndex = path.join(publicPath, 'ua', 'index.html');
        if (fs.existsSync(uaPublicIndex)) {
          let uaHtml = fs.readFileSync(uaPublicIndex, 'utf-8');
          
          // Inject the CSS link before the closing head tag
          if (styleMatch) {
            uaHtml = uaHtml.replace('</head>', `  ${styleMatch[0]}\n  </head>`);
          }
          
          // Replace the dev script tag with the production script tag
          if (scriptMatch) {
            uaHtml = uaHtml.replace(
              '<script type="module" src="/src/main.tsx"></script>',
              scriptMatch[0]
            );
          }
          
          fs.writeFileSync(path.join(uaDir, 'index.html'), uaHtml);
        } else {
          // Fallback: copy built index.html
          fs.copyFileSync(distIndexPath, path.join(uaDir, 'index.html'));
        }
        
        // Copy to /en/uzhhorod/ (English Uzhhorod version)
        const enUzhhorodPublicIndex = path.join(publicPath, 'en', 'index.html');
        if (fs.existsSync(enUzhhorodPublicIndex)) {
          let enUzhhorodHtml = fs.readFileSync(enUzhhorodPublicIndex, 'utf-8');
          
          // Inject the CSS link before the closing head tag
          if (styleMatch) {
            enUzhhorodHtml = enUzhhorodHtml.replace('</head>', `  ${styleMatch[0]}\n  </head>`);
          }
          
          // Replace the dev script tag with the production script tag
          if (scriptMatch) {
            enUzhhorodHtml = enUzhhorodHtml.replace(
              '<script type="module" src="/src/main.tsx"></script>',
              scriptMatch[0]
            );
          }
          
          fs.writeFileSync(path.join(enUzhhorodDir, 'index.html'), enUzhhorodHtml);
        } else {
          // Fallback: copy built index.html
          fs.copyFileSync(distIndexPath, path.join(enUzhhorodDir, 'index.html'));
        }
        
        // Copy to /ua/uzhhorod/ (Ukrainian Uzhhorod version)
        const uaUzhhorodPublicIndex = path.join(publicPath, 'ua', 'index.html');
        if (fs.existsSync(uaUzhhorodPublicIndex)) {
          let uaUzhhorodHtml = fs.readFileSync(uaUzhhorodPublicIndex, 'utf-8');
          
          // Inject the CSS link before the closing head tag
          if (styleMatch) {
            uaUzhhorodHtml = uaUzhhorodHtml.replace('</head>', `  ${styleMatch[0]}\n  </head>`);
          }
          
          // Replace the dev script tag with the production script tag
          if (scriptMatch) {
            uaUzhhorodHtml = uaUzhhorodHtml.replace(
              '<script type="module" src="/src/main.tsx"></script>',
              scriptMatch[0]
            );
          }
          
          fs.writeFileSync(path.join(uaUzhhorodDir, 'index.html'), uaUzhhorodHtml);
        } else {
          // Fallback: copy built index.html
          fs.copyFileSync(distIndexPath, path.join(uaUzhhorodDir, 'index.html'));
        }
        
        // Process service page directories
        const serviceSlugs = [
          'digital-transformation-strategy',
          'employee-training',
          'voice-agents',
          'ai-assistants',
          'custom-ai-solutions',
          'marketing-automation',
          'ai-websites',
          'business-analytics',
        ];
        const eventSlugs = ['uzhhorod-2026-03-18'];
        for (const slug of serviceSlugs) {
          const enServiceDir = path.join(distPath, 'en', 'services', slug);
          const uaServiceDir = path.join(distPath, 'ua', 'services', slug);
          const enServicePublicIndex = path.join(publicPath, 'en', 'services', slug, 'index.html');
          const uaServicePublicIndex = path.join(publicPath, 'ua', 'services', slug, 'index.html');
          
          if (!fs.existsSync(enServiceDir)) {
            fs.mkdirSync(enServiceDir, { recursive: true });
          }
          if (!fs.existsSync(uaServiceDir)) {
            fs.mkdirSync(uaServiceDir, { recursive: true });
          }
          
          // Copy EN service page
          if (fs.existsSync(enServicePublicIndex)) {
            let enServiceHtml = fs.readFileSync(enServicePublicIndex, 'utf-8');
            if (styleMatch) {
              enServiceHtml = enServiceHtml.replace('</head>', `  ${styleMatch[0]}\n  </head>`);
            }
            if (scriptMatch) {
              enServiceHtml = enServiceHtml.replace(
                '<script type="module" src="/src/main.tsx"></script>',
                scriptMatch[0]
              );
            }
            fs.writeFileSync(path.join(enServiceDir, 'index.html'), enServiceHtml);
          } else {
            fs.copyFileSync(distIndexPath, path.join(enServiceDir, 'index.html'));
          }
          
          // Copy UA service page
          if (fs.existsSync(uaServicePublicIndex)) {
            let uaServiceHtml = fs.readFileSync(uaServicePublicIndex, 'utf-8');
            if (styleMatch) {
              uaServiceHtml = uaServiceHtml.replace('</head>', `  ${styleMatch[0]}\n  </head>`);
            }
            if (scriptMatch) {
              uaServiceHtml = uaServiceHtml.replace(
                '<script type="module" src="/src/main.tsx"></script>',
                scriptMatch[0]
              );
            }
            fs.writeFileSync(path.join(uaServiceDir, 'index.html'), uaServiceHtml);
          } else {
            fs.copyFileSync(distIndexPath, path.join(uaServiceDir, 'index.html'));
          }
        }
        
        // Process events list pages
        const enEventsDir = path.join(distPath, 'en', 'events');
        const uaEventsDir = path.join(distPath, 'ua', 'events');
        const enEventsPublicIndex = path.join(publicPath, 'en', 'events', 'index.html');
        const uaEventsPublicIndex = path.join(publicPath, 'ua', 'events', 'index.html');
        
        if (!fs.existsSync(enEventsDir)) {
          fs.mkdirSync(enEventsDir, { recursive: true });
        }
        if (!fs.existsSync(uaEventsDir)) {
          fs.mkdirSync(uaEventsDir, { recursive: true });
        }
        
        // Copy EN events list page
        if (fs.existsSync(enEventsPublicIndex)) {
          let enEventsHtml = fs.readFileSync(enEventsPublicIndex, 'utf-8');
          if (styleMatch) {
            enEventsHtml = enEventsHtml.replace('</head>', `  ${styleMatch[0]}\n  </head>`);
          }
          if (scriptMatch) {
            enEventsHtml = enEventsHtml.replace(
              '<script type="module" src="/src/main.tsx"></script>',
              scriptMatch[0]
            );
          }
          fs.writeFileSync(path.join(enEventsDir, 'index.html'), enEventsHtml);
        } else {
          fs.copyFileSync(distIndexPath, path.join(enEventsDir, 'index.html'));
        }
        
        // Copy UA events list page
        if (fs.existsSync(uaEventsPublicIndex)) {
          let uaEventsHtml = fs.readFileSync(uaEventsPublicIndex, 'utf-8');
          if (styleMatch) {
            uaEventsHtml = uaEventsHtml.replace('</head>', `  ${styleMatch[0]}\n  </head>`);
          }
          if (scriptMatch) {
            uaEventsHtml = uaEventsHtml.replace(
              '<script type="module" src="/src/main.tsx"></script>',
              scriptMatch[0]
            );
          }
          fs.writeFileSync(path.join(uaEventsDir, 'index.html'), uaEventsHtml);
        } else {
          fs.copyFileSync(distIndexPath, path.join(uaEventsDir, 'index.html'));
        }
        
        // Process event detail pages
        for (const slug of eventSlugs) {
          const enEventDir = path.join(distPath, 'en', 'events', slug);
          const uaEventDir = path.join(distPath, 'ua', 'events', slug);
          const enEventPublicIndex = path.join(publicPath, 'en', 'events', slug, 'index.html');
          const uaEventPublicIndex = path.join(publicPath, 'ua', 'events', slug, 'index.html');
          
          if (!fs.existsSync(enEventDir)) {
            fs.mkdirSync(enEventDir, { recursive: true });
          }
          if (!fs.existsSync(uaEventDir)) {
            fs.mkdirSync(uaEventDir, { recursive: true });
          }
          
          // Copy EN event detail page
          if (fs.existsSync(enEventPublicIndex)) {
            let enEventHtml = fs.readFileSync(enEventPublicIndex, 'utf-8');
            if (styleMatch) {
              enEventHtml = enEventHtml.replace('</head>', `  ${styleMatch[0]}\n  </head>`);
            }
            if (scriptMatch) {
              enEventHtml = enEventHtml.replace(
                '<script type="module" src="/src/main.tsx"></script>',
                scriptMatch[0]
              );
            }
            fs.writeFileSync(path.join(enEventDir, 'index.html'), enEventHtml);
          } else {
            fs.copyFileSync(distIndexPath, path.join(enEventDir, 'index.html'));
          }
          
          // Copy UA event detail page
          if (fs.existsSync(uaEventPublicIndex)) {
            let uaEventHtml = fs.readFileSync(uaEventPublicIndex, 'utf-8');
            if (styleMatch) {
              uaEventHtml = uaEventHtml.replace('</head>', `  ${styleMatch[0]}\n  </head>`);
            }
            if (scriptMatch) {
              uaEventHtml = uaEventHtml.replace(
                '<script type="module" src="/src/main.tsx"></script>',
                scriptMatch[0]
              );
            }
            fs.writeFileSync(path.join(uaEventDir, 'index.html'), uaEventHtml);
          } else {
            fs.copyFileSync(distIndexPath, path.join(uaEventDir, 'index.html'));
          }
        }
        
        console.log('✓ Copied language-specific index.html to /en/, /ua/, /en/uzhhorod/, /ua/uzhhorod/, 12 service page directories, and 4 event page directories');
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
