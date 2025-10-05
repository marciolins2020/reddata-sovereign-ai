import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Info } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts";

const decisionFactors = [
  { factor: "Valor Contratual", peso: 85, description: "Valor acima do limite de alerta" },
  { factor: "Prazo de Execução", peso: 72, description: "Prazo 15% inferior à média histórica" },
  { factor: "Reincidência", peso: 45, description: "Primeira ocorrência desta empresa" },
  { factor: "Histórico do Gestor", peso: 65, description: "2 processos anteriores com ressalvas" },
  { factor: "Complexidade Técnica", peso: 78, description: "Especificações técnicas complexas" },
  { factor: "Impacto Orçamentário", peso: 90, description: "Representa 12% do orçamento anual" },
];

const radarData = [
  { category: "Valor", ia: 85, benchmark: 70 },
  { category: "Prazo", ia: 72, benchmark: 65 },
  { category: "Reincidência", ia: 45, benchmark: 80 },
  { category: "Gestor", ia: 65, benchmark: 60 },
  { category: "Complexidade", ia: 78, benchmark: 75 },
  { category: "Impacto", ia: 90, benchmark: 85 },
];

export function XAIModule() {
  return (
    <div className="p-6 space-y-6 bg-muted/30">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          <Brain className="inline h-8 w-8 mr-2 text-[#E30613]" />
          IA Explicável (XAI)
        </h1>
        <p className="text-muted-foreground">
          Transparência total no processo decisório da Inteligência Artificial
        </p>
      </div>

      <Card className="border-[#E30613]/20">
        <CardHeader>
          <CardTitle>Análise do Processo: 4521/2024</CardTitle>
          <CardDescription>Contratação de serviços de manutenção predial - SEINFRA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Pontuação de Risco Final</p>
              <p className="text-4xl font-bold text-[#E30613]">7.8/10</p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Classificação</p>
              <Badge className="bg-orange-600 text-lg py-1 px-3">Risco Alto</Badge>
            </div>
            <Button variant="outline">
              <Info className="h-4 w-4 mr-2" />
              Ver Explicação Completa
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pesos das Variáveis de Decisão</CardTitle>
            <CardDescription>Fatores considerados pela IA nesta análise</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {decisionFactors.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.factor}</span>
                  <Badge variant="outline">{item.peso}%</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-[#E30613] h-2 rounded-full transition-all"
                    style={{ width: `${item.peso}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Análise Comparativa</CardTitle>
            <CardDescription>Decisão da IA vs Benchmark Histórico</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar 
                  name="Análise da IA" 
                  dataKey="ia" 
                  stroke="#E30613" 
                  fill="#E30613" 
                  fillOpacity={0.5} 
                />
                <Radar 
                  name="Benchmark Histórico" 
                  dataKey="benchmark" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.3} 
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Interpretação</p>
              <p className="text-sm text-muted-foreground">
                A IA identificou valores atípicos principalmente em "Valor Contratual" (+21% vs benchmark) 
                e "Impacto Orçamentário" (+6% vs benchmark), justificando a classificação de risco alto.
                O fator "Reincidência" está 44% abaixo do benchmark por ser primeira ocorrência.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Princípios da IA Explicável
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Este módulo garante que toda decisão automatizada seja rastreável, compreensível e auditável.
                Os algoritmos utilizados são open-source e seguem as diretrizes de ética em IA do governo federal,
                assegurando conformidade com LGPD e transparência pública.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
