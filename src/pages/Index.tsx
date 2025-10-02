import { lazy, Suspense } from "react";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";

// Lazy load below-the-fold sections
const HowItWorksSection = lazy(() => import("@/components/sections/HowItWorksSection").then(m => ({ default: m.HowItWorksSection })));
const ApplianceSection = lazy(() => import("@/components/sections/ApplianceSection").then(m => ({ default: m.ApplianceSection })));
const VirtualMachinesSection = lazy(() => import("@/components/sections/VirtualMachinesSection").then(m => ({ default: m.VirtualMachinesSection })));
const ApplicationsSection = lazy(() => import("@/components/sections/ApplicationsSection").then(m => ({ default: m.ApplicationsSection })));
const TechnicalArchitectureSection = lazy(() => import("@/components/sections/TechnicalArchitectureSection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const ComparisonSection = lazy(() => import("@/components/sections/ComparisonSection").then(m => ({ default: m.ComparisonSection })));
const DashboardDemoSection = lazy(() => import("@/components/sections/DashboardDemoSection").then(m => ({ default: m.DashboardDemoSection })));
const FAQSection = lazy(() => import("@/components/sections/FAQSection").then(m => ({ default: m.FAQSection })));
const ContactFormSection = lazy(() => import("@/components/sections/ContactFormSection").then(m => ({ default: m.ContactFormSection })));
const Footer = lazy(() => import("@/components/sections/Footer").then(m => ({ default: m.Footer })));

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
        <FAQSection />
        <ContactFormSection />
        <Footer />
      </Suspense>
      <WhatsAppWidget />
    </main>
  );
};

export default Index;