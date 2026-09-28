import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { getAllPrerenderRoutes } from "./scripts/seo-head.mjs";
import { prerenderRoutes } from "./scripts/prerender.mjs";

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
      name: "prerender-marketing-routes",
      async closeBundle() {
        const distPath = path.resolve(__dirname, "dist");
        const routes = getAllPrerenderRoutes();

        const start = Date.now();
        await prerenderRoutes({ distPath, routes });
        const seconds = ((Date.now() - start) / 1000).toFixed(1);

        console.log(
          `✓ Prerendered ${routes.length} routes with full body content in ${seconds}s`
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
