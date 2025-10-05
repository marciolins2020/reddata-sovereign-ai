import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, DollarSign, Scale, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const riskRanking = [
  { type: "Financeiro", count: 12, severity: "high", icon: DollarSign },
  { type: "Jurídico", count: 8, severity: "medium", icon: Scale },
  { type: "Contratual", count: 15, severity: "high", icon: FileText },
  { type: "Operacional", count: 5, severity: "low", icon: AlertTriangle },
];

const alertsByUnit = [
  { unidade: "SEINFRA", critico: 8, alto: 12, medio: 15, baixo: 8 },
  { unidade: "SEDUC", critico: 3, alto: 7, medio: 18, baixo: 12 },
  { unidade: "SESAU", critico: 5, alto: 9, medio: 14, baixo: 10 },
  { unidade: "SECULT", critico: 2, alto: 4, medio: 9, baixo: 15 },
  { unidade: "SEDESV", critico: 4, alto: 6, medio: 11, baixo: 9 },
];

const criticalAlerts = [
  {
    title: "Sobrepreço Identificado - Contrato 4521/2024",
    description: "Variação de +32% acima da média de mercado em serviços de TI",
    unit: "SEINFRA",
    risk: 9.2
  },
  {
    title: "Aditivo Contratual Sem Justificativa Técnica",
    description: "5º termo aditivo sem análise de impacto orçamentário",
    unit: "SEDUC",
    risk: 8.7
  },
  {
    title: "Prazo de Execução Crítico",
    description: "Contrato com atraso de 180 dias e sem penalidades aplicadas",
    unit: "SESAU",
    risk: 8.9
  },
];

export function RisksAlertsModule() {
  return (
    <div className="p-6 space-y-6 bg-muted/30">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Riscos e Alertas</h1>
        <p className="text-muted-foreground">
          Monitoramento inteligente de riscos financeiros, jurídicos e contratuais
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {riskRanking.map((risk) => (
          <Card 
            key={risk.type} 
            className={`hover:shadow-lg transition-shadow ${
              risk.severity === "high" ? "border-red-500/50" :
              risk.severity === "medium" ? "border-yellow-500/50" :
              "border-green-500/50"
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{risk.type}</CardTitle>
              <risk.icon className="h-4 w-4 text-[#E30613]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{risk.count}</div>
              <Badge 
                variant={risk.severity === "high" ? "destructive" : "secondary"}
                className="mt-2"
              >
                {risk.severity === "high" ? "Alto Risco" :
                 risk.severity === "medium" ? "Risco Médio" :
                 "Baixo Risco"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-red-500/20 bg-red-50/50 dark:bg-red-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Alertas Críticos
          </CardTitle>
          <CardDescription>Requerem atenção imediata</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {criticalAlerts.map((alert, idx) => (
            <Card key={idx} className="border-red-200 dark:border-red-900">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base">{alert.title}</CardTitle>
                    <CardDescription className="text-xs mt-1">{alert.unit}</CardDescription>
                  </div>
                  <Badge className="bg-red-600">
                    Risco: {alert.risk}/10
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Alertas por Unidade Fiscalizada</CardTitle>
          <CardDescription>Classificação por gravidade</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={alertsByUnit} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="unidade" type="category" width={80} />
              <Tooltip />
              <Legend />
              <Bar dataKey="critico" stackId="a" fill="#dc2626" name="Crítico" />
              <Bar dataKey="alto" stackId="a" fill="#f97316" name="Alto" />
              <Bar dataKey="medio" stackId="a" fill="#eab308" name="Médio" />
              <Bar dataKey="baixo" stackId="a" fill="#10b981" name="Baixo" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
