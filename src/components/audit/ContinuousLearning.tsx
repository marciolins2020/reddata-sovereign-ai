import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const feedbackData = [
  { ciclo: "Ciclo 1", aceitou: 45, corrigiu: 55, acuracia: 68 },
  { ciclo: "Ciclo 2", aceitou: 58, corrigiu: 42, acuracia: 74 },
  { ciclo: "Ciclo 3", aceitou: 67, corrigiu: 33, acuracia: 81 },
  { ciclo: "Ciclo 4", aceitou: 75, corrigiu: 25, acuracia: 86 },
  { ciclo: "Ciclo 5", aceitou: 82, corrigiu: 18, acuracia: 91 },
  { ciclo: "Ciclo 6", aceitou: 88, corrigiu: 12, acuracia: 94 },
];

const modelMetrics = [
  { label: "Acurácia Geral", value: "94.2%", change: "+2.8%" },
  { label: "Precisão", value: "92.5%", change: "+3.1%" },
  { label: "Recall", value: "91.8%", change: "+2.5%" },
  { label: "F1-Score", value: "92.1%", change: "+2.9%" },
];

const recentFeedback = [
  {
    fiscal: "Dr. João Silva",
    action: "Aceitou recomendação",
    process: "Proc. 4521/2024",
    type: "positive",
    date: "Há 2 horas"
  },
  {
    fiscal: "Dra. Maria Santos",
    action: "Corrigiu classificação de risco",
    process: "Proc. 3892/2024",
    type: "correction",
    date: "Há 5 horas"
  },
  {
    fiscal: "Dr. Pedro Costa",
    action: "Aceitou análise jurisprudencial",
    process: "Proc. 2156/2024",
    type: "positive",
    date: "Há 1 dia"
  },
  {
    fiscal: "Dra. Ana Oliveira",
    action: "Corrigiu valor de referência",
    process: "Proc. 5678/2024",
    type: "correction",
    date: "Há 1 dia"
  },
];

export function ContinuousLearning() {
  return (
    <div className="p-6 space-y-6 bg-muted/30">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          <TrendingUp className="inline h-8 w-8 mr-2 text-[#E30613]" />
          Aprendizado Contínuo
        </h1>
        <p className="text-muted-foreground">
          Evolução da IA através do feedback dos auditores e fiscais
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modelMetrics.map((metric) => (
          <Card key={metric.label} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <Badge className="mt-2 bg-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                {metric.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução do Aprendizado por Ciclo</CardTitle>
          <CardDescription>Taxa de aceitação vs correções e acurácia do modelo</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={feedbackData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ciclo" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="aceitou" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Recomendações Aceitas (%)"
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="corrigiu" 
                stroke="#f97316" 
                strokeWidth={2}
                name="Correções Aplicadas (%)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="acuracia" 
                stroke="#E30613" 
                strokeWidth={3}
                name="Acurácia do Modelo (%)"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Análise de Performance</p>
            <p className="text-sm text-muted-foreground">
              O modelo apresenta evolução consistente de 38% na acurácia desde o ciclo inicial.
              A taxa de aceitação das recomendações aumentou de 45% para 88%, demonstrando maior
              confiabilidade e assertividade do sistema ao longo dos ciclos de aprendizado.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Feedback Recente dos Fiscais</CardTitle>
            <CardDescription>Últimas interações com o sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentFeedback.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start p-3 bg-muted rounded-lg">
                {item.type === "positive" ? (
                  <ThumbsUp className="h-4 w-4 text-green-600 mt-0.5" />
                ) : (
                  <ThumbsDown className="h-4 w-4 text-orange-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.fiscal}</p>
                  <p className="text-sm text-muted-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.process} · {item.date}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#E30613]/10 to-purple-500/10 border-[#E30613]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Ciclo de Retreinamento
            </CardTitle>
            <CardDescription>Próximo retreinamento agendado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progresso do ciclo atual</span>
                <span className="font-medium">847/1000 feedbacks</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-[#E30613] h-3 rounded-full transition-all"
                  style={{ width: "84.7%" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-xs text-muted-foreground">Feedbacks Positivos</p>
                <p className="text-2xl font-bold text-green-600">723</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Correções Aplicadas</p>
                <p className="text-2xl font-bold text-orange-600">124</p>
              </div>
            </div>

            <div className="p-3 bg-background rounded-lg mt-4">
              <p className="text-sm font-medium mb-1">Próximo Retreinamento</p>
              <p className="text-sm text-muted-foreground">
                Estimado para: <strong>15/10/2025</strong>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                O retreinamento automático ocorre a cada 1000 feedbacks ou mensalmente.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-purple-50/50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <RefreshCw className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <p className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Sistema de Aprendizado Supervisionado
              </p>
              <p className="text-sm text-purple-800 dark:text-purple-200">
                O RedData.Audit utiliza técnicas avançadas de machine learning supervisionado, onde cada feedback
                dos auditores é registrado e usado para refinar os modelos preditivos. O sistema mantém logs
                completos de aprendizado, garantindo rastreabilidade e auditabilidade de todas as melhorias implementadas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
