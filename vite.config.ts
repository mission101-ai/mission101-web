import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";
import {
  getInjectedRouteMetas,
  writePrerenderedHtml,
} from "./scripts/seo-head.mjs";

const serviceSlugs = [
  "digital-transformation-strategy",
  "employee-training",
  "voice-agents",
  "ai-assistants",
  "custom-ai-solutions",
  "marketing-automation",
  "ai-websites",
  "business-analytics",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
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
      name: "copy-index-to-lang-folders",
      closeBundle() {
        const distPath = path.resolve(__dirname, "dist");
        const publicPath = path.resolve(__dirname, "public");
        const distIndexPath = path.join(distPath, "index.html");
        const distIndexHtml = fs.readFileSync(distIndexPath, "utf-8");

        const scriptMatch = distIndexHtml.match(
          /<script[^>]*src="(\/assets\/[^"]*\.js)"[^>]*><\/script>/
        );
        const styleMatch = distIndexHtml.match(
          /<link[^>]*href="([^"]*\.css)"[^>]*>/
        );
        const styleTag = styleMatch?.[0];
        const scriptTag = scriptMatch?.[0];

        const writeFromPublic = (publicRel: string, destRel: string) => {
          writePrerenderedHtml({
            publicIndexPath: path.join(publicPath, publicRel),
            distIndexHtml,
            destPath: path.join(distPath, destRel),
            styleTag,
            scriptTag,
          });
        };

        // Language homes
        writeFromPublic("en/index.html", "en/index.html");
        writeFromPublic("ua/index.html", "ua/index.html");

        // Uzhhorod (use dedicated prerender templates, not lang-home shells)
        writeFromPublic("en/uzhhorod/index.html", "en/uzhhorod/index.html");
        writeFromPublic("ua/uzhhorod/index.html", "ua/uzhhorod/index.html");

        // Service pages
        for (const slug of serviceSlugs) {
          writeFromPublic(
            `en/services/${slug}/index.html`,
            `en/services/${slug}/index.html`
          );
          writeFromPublic(
            `ua/services/${slug}/index.html`,
            `ua/services/${slug}/index.html`
          );
        }

        // Products + events: inject page-specific heads into the built shell
        for (const route of getInjectedRouteMetas()) {
          const destPath = path.join(
            distPath,
            route.lang,
            ...route.segments,
            "index.html"
          );
          writePrerenderedHtml({
            publicIndexPath: undefined,
            distIndexHtml,
            destPath,
            styleTag,
            scriptTag,
            headMeta: route.meta,
          });
        }

        console.log(
          "✓ Wrote lang/service/uzhhorod prerenders and injected product/events SEO heads"
        );
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
