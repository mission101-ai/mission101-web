import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Uzhhorod from "./pages/Uzhhorod";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "@/context/LanguageContext";
import "@/i18n/config";

const queryClient = new QueryClient();

const App = () => (
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
