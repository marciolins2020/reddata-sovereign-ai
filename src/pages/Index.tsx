import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ApplianceSection } from "@/components/sections/ApplianceSection";
import { VirtualMachinesSection } from "@/components/sections/VirtualMachinesSection";
import { ApplicationsSection } from "@/components/sections/ApplicationsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { DashboardDemoSection } from "@/components/sections/DashboardDemoSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <ApplianceSection />
      <VirtualMachinesSection />
      <ApplicationsSection />
      <DashboardDemoSection />
      <ComparisonSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactFormSection />
      <Footer />
      <WhatsAppWidget />
    </main>
  );
};

export default Index;