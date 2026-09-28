import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;

// Prerendered routes ship real markup inside #root; hydrate against it instead of
// wiping and re-rendering from empty (which would flash blank content and defeat
// the point of prerendering). The dev server always serves an empty #root, so it
// falls through to a plain client render.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
