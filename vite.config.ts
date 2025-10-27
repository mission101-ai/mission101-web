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
        // Copy index.html to /en/ and /ua/ directories in dist
        const distPath = path.resolve(__dirname, 'dist');
        const indexPath = path.join(distPath, 'index.html');
        
        // Create language directories if they don't exist
        const enDir = path.join(distPath, 'en');
        const uaDir = path.join(distPath, 'ua');
        
        if (!fs.existsSync(enDir)) {
          fs.mkdirSync(enDir, { recursive: true });
        }
        if (!fs.existsSync(uaDir)) {
          fs.mkdirSync(uaDir, { recursive: true });
        }
        
        // Copy index.html to language folders
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, path.join(enDir, 'index.html'));
          fs.copyFileSync(indexPath, path.join(uaDir, 'index.html'));
          console.log('✓ Copied index.html to /en/ and /ua/ directories');
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
