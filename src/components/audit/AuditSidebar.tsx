import { FileText, Scale, AlertTriangle, Brain, TrendingUp, LayoutDashboard } from "lucide-react";
import { AuditModule } from "@/pages/Audit";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import redmaxxLogo from "@/assets/redmaxx-logo.png";

interface AuditSidebarProps {
  activeModule: AuditModule;
  onModuleChange: (module: AuditModule) => void;
}

const menuItems = [
  { id: "dashboard" as AuditModule, title: "Dashboard", icon: LayoutDashboard },
  { id: "documents" as AuditModule, title: "Análise de Documentos", icon: FileText },
  { id: "jurisprudence" as AuditModule, title: "Jurisprudência Inteligente", icon: Scale },
  { id: "risks" as AuditModule, title: "Riscos e Alertas", icon: AlertTriangle },
  { id: "xai" as AuditModule, title: "IA Explicável", icon: Brain },
  { id: "learning" as AuditModule, title: "Aprendizado Contínuo", icon: TrendingUp },
];

export function AuditSidebar({ activeModule, onModuleChange }: AuditSidebarProps) {
  return (
    <Sidebar className="border-r bg-card">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <img src={redmaxxLogo} alt="RedMaxx" className="h-8 w-auto" />
          <div>
            <h2 className="text-lg font-bold text-[#E30613]">RedData.Audit</h2>
            <p className="text-xs text-muted-foreground">Auditoria Inteligente</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onModuleChange(item.id)}
                    isActive={activeModule === item.id}
                    className="w-full"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
