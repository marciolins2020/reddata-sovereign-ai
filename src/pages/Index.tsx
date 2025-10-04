import { lazy, Suspense } from "react";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";

// Lazy load all below-the-fold sections to reduce initial bundle
const PlatformCapabilitiesSection = lazy(() => import("@/components/sections/PlatformCapabilitiesSection").then(m => ({ default: m.PlatformCapabilitiesSection })));
const DataConnectorsSection = lazy(() => import("@/components/sections/DataConnectorsSection").then(m => ({ default: m.DataConnectorsSection })));
const HowItWorksSection = lazy(() => import("@/components/sections/HowItWorksSection").then(m => ({ default: m.HowItWorksSection })));
const ApplianceSection = lazy(() => import("@/components/sections/ApplianceSection").then(m => ({ default: m.ApplianceSection })));
const VirtualMachinesSection = lazy(() => import("@/components/sections/VirtualMachinesSection").then(m => ({ default: m.VirtualMachinesSection })));
const WhiteLabelSection = lazy(() => import("@/components/sections/WhiteLabelSection").then(m => ({ default: m.WhiteLabelSection })));
const AutomationAlertsSection = lazy(() => import("@/components/sections/AutomationAlertsSection").then(m => ({ default: m.AutomationAlertsSection })));
const ApplicationsSection = lazy(() => import("@/components/sections/ApplicationsSection").then(m => ({ default: m.ApplicationsSection })));
const TechnicalArchitectureSection = lazy(() => import("@/components/sections/TechnicalArchitectureSection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const ModulesSection = lazy(() => import("@/components/sections/ModulesSection").then(m => ({ default: m.ModulesSection })));
const ComparisonSection = lazy(() => import("@/components/sections/ComparisonSection").then(m => ({ default: m.ComparisonSection })));
const DashboardDemoSection = lazy(() => import("@/components/sections/DashboardDemoSection").then(m => ({ default: m.DashboardDemoSection })));
const FAQSection = lazy(() => import("@/components/sections/FAQSection").then(m => ({ default: m.FAQSection })));
const ContactFormSection = lazy(() => import("@/components/sections/ContactFormSection").then(m => ({ default: m.ContactFormSection })));
const Footer = lazy(() => import("@/components/sections/Footer").then(m => ({ default: m.Footer })));
const WhatsAppWidget = lazy(() => import("@/components/ui/WhatsAppWidget").then(m => ({ default: m.WhatsAppWidget })));

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <Suspense fallback={<div className="py-20" />}>
        <PlatformCapabilitiesSection />
        <DataConnectorsSection />
        <HowItWorksSection />
        <ApplianceSection />
        <VirtualMachinesSection />
        <WhiteLabelSection />
        <AutomationAlertsSection />
        <TechnicalArchitectureSection />
        <ApplicationsSection />
        <DashboardDemoSection />
        <ModulesSection />
        <ComparisonSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactFormSection />
        <Footer />
        <WhatsAppWidget />
      </Suspense>
    </main>
  );
};

export default Index;