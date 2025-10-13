import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import { ReddataChatWidget } from "@/components/ui/ReddataChatWidget";

// Lazy load non-home page routes to reduce initial bundle size
const NotFound = lazy(() => import("./pages/NotFound"));
const CasosUsoEnergia = lazy(() => import("./pages/CasosUsoEnergia"));
const CasosUsoIndustria = lazy(() => import("./pages/CasosUsoIndustria"));
const CasosUsoGoverno = lazy(() => import("./pages/CasosUsoGoverno"));
const CasosUsoVarejo = lazy(() => import("./pages/CasosUsoVarejo"));
const Modulos = lazy(() => import("./pages/Modulos"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DashboardView = lazy(() => import("./pages/DashboardView"));
const PublicDashboard = lazy(() => import("./pages/PublicDashboard"));
const Audit = lazy(() => import("./pages/Audit"));

const queryClient = new QueryClient();

// Bilingual app with LanguageProvider
const App = () => (
  <ErrorBoundary>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ReddataChatWidget />
          <BrowserRouter>
            <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/:slug" element={<DashboardView />} />
                <Route path="/view/:id" element={<DashboardView />} />
                <Route path="/dashboard/public/:slug" element={<PublicDashboard />} />
                <Route path="/casos-uso/energia" element={<CasosUsoEnergia />} />
                <Route path="/casos-uso/industria" element={<CasosUsoIndustria />} />
                <Route path="/casos-uso/governo" element={<CasosUsoGoverno />} />
                <Route path="/casos-uso/varejo" element={<CasosUsoVarejo />} />
                <Route path="/modulos" element={<Modulos />} />
                <Route path="/audit" element={<Audit />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </ErrorBoundary>
);

export default App;
