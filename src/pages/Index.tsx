import { lazy, Suspense } from "react";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { Footer } from "@/components/sections/Footer";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";

// Lazy load below-the-fold sections
const HowItWorksSection = lazy(() => import("@/components/sections/HowItWorksSection").then(m => ({ default: m.HowItWorksSection })));
const ApplianceSection = lazy(() => import("@/components/sections/ApplianceSection").then(m => ({ default: m.ApplianceSection })));
const VirtualMachinesSection = lazy(() => import("@/components/sections/VirtualMachinesSection").then(m => ({ default: m.VirtualMachinesSection })));
const ApplicationsSection = lazy(() => import("@/components/sections/ApplicationsSection").then(m => ({ default: m.ApplicationsSection })));
const TechnicalArchitectureSection = lazy(() => import("@/components/sections/TechnicalArchitectureSection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const ComparisonSection = lazy(() => import("@/components/sections/ComparisonSection").then(m => ({ default: m.ComparisonSection })));
const DashboardDemoSection = lazy(() => import("@/components/sections/DashboardDemoSection").then(m => ({ default: m.DashboardDemoSection })));

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <Suspense fallback={<div className="py-20" />}>
        <HowItWorksSection />
        <ApplianceSection />
        <VirtualMachinesSection />
        <TechnicalArchitectureSection />
        <ApplicationsSection />
        <DashboardDemoSection />
        <ComparisonSection />
        <TestimonialsSection />
      </Suspense>
      <FAQSection />
      <ContactFormSection />
      <Footer />
      <WhatsAppWidget />
    </main>
  );
};

export default Index;