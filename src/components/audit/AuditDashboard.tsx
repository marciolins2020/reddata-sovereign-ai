import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, AlertCircle, Scale, Clock } from "lucide-react";

const kpiData = [
  { title: "Processos Analisados", value: "1.247", icon: FileText, change: "+12%" },
  { title: "Alertas de Risco", value: "43", icon: AlertCircle, change: "-8%" },
  { title: "Jurisprudências Associadas", value: "892", icon: Scale, change: "+23%" },
  { title: "Tempo Médio de Instrução", value: "4.2 dias", icon: Clock, change: "-35%" },
];

const efficiencyData = [
  { ciclo: "Jan", eficiencia: 65 },
  { ciclo: "Fev", eficiencia: 72 },
  { ciclo: "Mar", eficiencia: 78 },
  { ciclo: "Abr", eficiencia: 82 },
  { ciclo: "Mai", eficiencia: 88 },
  { ciclo: "Jun", eficiencia: 91 },
];

const recentAlerts = [
  { text: "Novas decisões identificadas sobre pregão eletrônico", time: "Há 2 horas", severity: "info" },
  { text: "Inconsistência contratual detectada - Proc. 4521/2024", time: "Há 4 horas", severity: "warning" },
  { text: "Análise concluída: Relatório Anual de Gestão", time: "Há 6 horas", severity: "success" },
  { text: "Alerta de risco financeiro - Unidade 0025", time: "Há 1 dia", severity: "error" },
];

export function AuditDashboard() {
  return (
    <div className="p-6 space-y-6 bg-muted/30">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          RedData.Audit – Inteligência Artificial Aplicada à Auditoria Pública
        </h1>
        <p className="text-muted-foreground">
          Combina análise preditiva, IA explicável e automação documental para reduzir o tempo de auditoria e aumentar a precisão técnica.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-[#E30613]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <Badge variant={kpi.change.startsWith("+") ? "default" : "secondary"} className="mt-2">
                {kpi.change} vs mês anterior
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Evolução da Eficiência por Ciclo de Auditoria</CardTitle>
            <CardDescription>Análise preditiva do desempenho institucional</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ciclo" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="eficiencia" 
                  stroke="#E30613" 
                  fill="#E30613" 
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas Recentes</CardTitle>
            <CardDescription>Notificações do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <AlertCircle 
                  className={`h-4 w-4 mt-0.5 ${
                    alert.severity === "error" ? "text-destructive" :
                    alert.severity === "warning" ? "text-yellow-600" :
                    alert.severity === "success" ? "text-green-600" :
                    "text-blue-600"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.text}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#E30613]/5 border-[#E30613]/20">
        <CardContent className="pt-6">
          <p className="text-sm text-center italic">
            "Desenvolvido pela RedMaxx, o RedData.Audit traz soberania digital e inteligência analítica para o controle público."
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
