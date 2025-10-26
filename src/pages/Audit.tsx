import { useState } from "react";
import { AuditSidebar } from "@/components/audit/AuditSidebar";
import { AuditDashboard } from "@/components/audit/AuditDashboard";
import { DocumentAnalysis } from "@/components/audit/DocumentAnalysis";
import { JurisprudenceModule } from "@/components/audit/JurisprudenceModule";
import { RisksAlertsModule } from "@/components/audit/RisksAlertsModule";
import { XAIModule } from "@/components/audit/XAIModule";
import { ContinuousLearning } from "@/components/audit/ContinuousLearning";
import { SidebarProvider } from "@/components/ui/sidebar";

export type AuditModule = "dashboard" | "documents" | "jurisprudence" | "risks" | "xai" | "learning";

export default function Audit() {
  const [activeModule, setActiveModule] = useState<AuditModule>("dashboard");

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <AuditDashboard />;
      case "documents":
        return <DocumentAnalysis />;
      case "jurisprudence":
        return <JurisprudenceModule />;
      case "risks":
        return <RisksAlertsModule />;
      case "xai":
        return <XAIModule />;
      case "learning":
        return <ContinuousLearning />;
      default:
        return <AuditDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AuditSidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        <main className="flex-1 overflow-auto">
          {renderModule()}
        </main>
      </div>
    </SidebarProvider>
  );
}
