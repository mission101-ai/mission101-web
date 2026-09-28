import fs from 'fs';
import path from 'path';
import http from 'http';
import { chromium } from '@playwright/test';

const READY_SELECTOR = 'html[data-prerender-ready="true"]';
const MIN_ROOT_TEXT_LENGTH = 200;

const CONTENT_TYPES = {
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

/**
 * Only these extensions are ever served from disk; every other request (including
 * every route's own directory path) always gets the pristine build shell. This keeps
 * every route's headless render starting from the same clean, unhydrated state,
 * instead of picking up a stale hand-maintained or previously-rendered file.
 */
function isStaticAssetPath(urlPath) {
  return Object.prototype.hasOwnProperty.call(CONTENT_TYPES, path.extname(urlPath).toLowerCase());
}

function createStaticServer(distPath, shellHtml) {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (isStaticAssetPath(urlPath)) {
      const filePath = path.join(distPath, urlPath);
      if (filePath.startsWith(distPath) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        res.writeHead(200, { 'Content-Type': CONTENT_TYPES[path.extname(filePath).toLowerCase()] });
        fs.createReadStream(filePath).pipe(res);
        return;
      }
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(shellHtml);
  });
}

function extractRootTextLength(html) {
  const match = html.match(/<div id="root">([\s\S]*)<\/div>\s*<\/body>/i);
  const inner = match?.[1] ?? '';
  return inner.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().length;
}

function extractCanonical(html) {
  const match = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i);
  return match?.[1];
}

/**
 * Render every route in `routes` with a real browser against the built `dist/`
 * output, and write the fully-rendered HTML (post-hydration, post-SEO-effects)
 * back to that route's static output file. Fails the build if any route doesn't
 * settle, or settles with a mismatched canonical or suspiciously empty content.
 */
export async function prerenderRoutes({ distPath, routes, concurrency = 4, timeoutMs = 20000 }) {
  const shellHtml = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
  const server = createStaticServer(distPath, shellHtml);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();

  const browser = await chromium.launch();
  const errors = [];
  let nextIndex = 0;

  async function renderOne(route) {
    const page = await browser.newPage();
    try {
      const url = `http://127.0.0.1:${port}${route.urlPath}`;
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: timeoutMs });
      await page.waitForSelector(READY_SELECTOR, { timeout: timeoutMs });
      const html = await page.content();

      const actualCanonical = extractCanonical(html);
      if (actualCanonical !== route.expectedCanonical) {
        throw new Error(
          `canonical mismatch: expected "${route.expectedCanonical}", got "${actualCanonical ?? 'none'}"`
        );
      }

      const rootTextLength = extractRootTextLength(html);
      if (rootTextLength < MIN_ROOT_TEXT_LENGTH) {
        throw new Error(`rendered content too short (${rootTextLength} chars) — page may not have rendered`);
      }

      const destPath = path.join(distPath, ...route.destSegments, 'index.html');
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.writeFileSync(destPath, html);
    } catch (err) {
      errors.push(`${route.urlPath}: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      await page.close();
    }
  }

  async function worker() {
    while (nextIndex < routes.length) {
      const route = routes[nextIndex++];
      await renderOne(route);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, routes.length) }, worker));
  await browser.close();
  await new Promise((resolve) => server.close(resolve));

  if (errors.length > 0) {
    throw new Error(`Prerendering failed for ${errors.length} route(s):\n${errors.join('\n')}`);
  }
}
