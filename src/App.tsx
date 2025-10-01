import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CasosUsoEnergia from "./pages/CasosUsoEnergia";
import CasosUsoIndustria from "./pages/CasosUsoIndustria";
import CasosUsoGoverno from "./pages/CasosUsoGoverno";

const queryClient = new QueryClient();

// Bilingual app with LanguageProvider
const App = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/casos-uso/energia" element={<CasosUsoEnergia />} />
            <Route path="/casos-uso/industria" element={<CasosUsoIndustria />} />
            <Route path="/casos-uso/governo" element={<CasosUsoGoverno />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

export default App;
