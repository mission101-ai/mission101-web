import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Uzhhorod from "./pages/Uzhhorod";
import ServicePage from "./pages/ServicePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import ImageResizerProductPage from "./pages/ImageResizerProductPage";
import ImageResizerPrivacyPage from "./pages/ImageResizerPrivacyPage";
import LegalProductPage from "./pages/LegalProductPage";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "@/context/LanguageContext";
import "@/i18n/config";

const queryClient = new QueryClient();

const App = () => {
  // Fires after all descendant effects in this commit — including the routed page's
  // SEO component — so this marks "safe to capture" for the build-time headless
  // prerenderer (scripts/prerender.mjs), which waits for this attribute.
  useEffect(() => {
    document.documentElement.setAttribute('data-prerender-ready', 'true');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LanguageProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/en" element={<Index />} />
              <Route path="/en/" element={<Index />} />
              <Route path="/ua" element={<Index />} />
              <Route path="/ua/" element={<Index />} />
              <Route path="/ua/uzhhorod" element={<Uzhhorod />} />
              <Route path="/ua/uzhhorod/" element={<Uzhhorod />} />
              <Route path="/en/uzhhorod" element={<Uzhhorod />} />
              <Route path="/en/uzhhorod/" element={<Uzhhorod />} />
              <Route path="/en/services/:serviceSlug" element={<ServicePage />} />
              <Route path="/en/services/:serviceSlug/" element={<ServicePage />} />
              <Route path="/ua/services/:serviceSlug" element={<ServicePage />} />
              <Route path="/ua/services/:serviceSlug/" element={<ServicePage />} />
              <Route path="/en/events" element={<EventsPage />} />
              <Route path="/en/events/" element={<EventsPage />} />
              <Route path="/ua/events" element={<EventsPage />} />
              <Route path="/ua/events/" element={<EventsPage />} />
              <Route path="/en/events/:eventSlug" element={<EventDetailPage />} />
              <Route path="/en/events/:eventSlug/" element={<EventDetailPage />} />
              <Route path="/ua/events/:eventSlug" element={<EventDetailPage />} />
              <Route path="/ua/events/:eventSlug/" element={<EventDetailPage />} />
              <Route path="/en/products/image-resizer" element={<ImageResizerProductPage />} />
              <Route path="/en/products/image-resizer/" element={<ImageResizerProductPage />} />
              <Route path="/ua/products/image-resizer" element={<ImageResizerProductPage />} />
              <Route path="/ua/products/image-resizer/" element={<ImageResizerProductPage />} />
              <Route path="/en/products/image-resizer/privacy-policy" element={<ImageResizerPrivacyPage />} />
              <Route path="/en/products/image-resizer/privacy-policy/" element={<ImageResizerPrivacyPage />} />
              <Route path="/ua/products/image-resizer/privacy-policy" element={<ImageResizerPrivacyPage />} />
              <Route path="/ua/products/image-resizer/privacy-policy/" element={<ImageResizerPrivacyPage />} />
              <Route path="/en/products/legal" element={<LegalProductPage />} />
              <Route path="/en/products/legal/" element={<LegalProductPage />} />
              <Route path="/ua/products/legal" element={<LegalProductPage />} />
              <Route path="/ua/products/legal/" element={<LegalProductPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
