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
        
        if (!fs.existsSync(enDir)) {
          fs.mkdirSync(enDir, { recursive: true });
        }
        if (!fs.existsSync(uaDir)) {
          fs.mkdirSync(uaDir, { recursive: true });
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
        
        console.log('✓ Copied language-specific index.html to /en/ and /ua/ directories');
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
