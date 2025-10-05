import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const jurisprudenceData = [
  {
    id: "AC-2847/2023",
    organ: "TCE-SP",
    summary: "Critérios de qualificação técnica em contratos de manutenção predial",
    relevance: 95,
    date: "15/03/2023",
    type: "Favorável"
  },
  {
    id: "AC-1523/2024",
    organ: "TCE-SP",
    summary: "Análise de sobrepreço em serviços terceirizados de infraestrutura",
    relevance: 88,
    date: "22/01/2024",
    type: "Favorável"
  },
  {
    id: "AC-3891/2022",
    organ: "TCU",
    summary: "Responsabilização de gestores em contratos com aditivos sucessivos",
    relevance: 82,
    date: "08/11/2022",
    type: "Desfavorável"
  },
  {
    id: "AC-0654/2023",
    organ: "TCE-SP",
    summary: "Exigências de garantias contratuais em obras públicas",
    relevance: 76,
    date: "30/06/2023",
    type: "Favorável"
  },
];

const trendData = [
  { ano: "2020", favoravel: 45, desfavoravel: 55 },
  { ano: "2021", favoravel: 52, desfavoravel: 48 },
  { ano: "2022", favoravel: 61, desfavoravel: 39 },
  { ano: "2023", favoravel: 68, desfavoravel: 32 },
  { ano: "2024", favoravel: 73, desfavoravel: 27 },
];

export function JurisprudenceModule() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6 space-y-6 bg-muted/30">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Jurisprudência Inteligente</h1>
        <p className="text-muted-foreground">
          Busca semântica de decisões correlatas e análise de tendências jurisprudenciais
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Busca por Tema ou Palavra-chave</CardTitle>
          <CardDescription>Sistema de busca semântica com IA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input 
              placeholder="Ex: sobrepreço, pregão eletrônico, responsabilidade solidária..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="bg-[#E30613] hover:bg-[#E30613]/90">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Decisões Encontradas</h2>
          {jurisprudenceData.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{item.id}</CardTitle>
                    <CardDescription className="text-xs">{item.organ} · {item.date}</CardDescription>
                  </div>
                  <Badge 
                    variant={item.type === "Favorável" ? "default" : "secondary"}
                    className={item.type === "Favorável" ? "bg-green-600" : "bg-orange-600"}
                  >
                    {item.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{item.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Relevância:</span>
                    <Badge variant="outline">{item.relevance}%</Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Inteiro Teor
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tendência Jurisprudencial</CardTitle>
            <CardDescription>Evolução de decisões favoráveis vs desfavoráveis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ano" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="favoravel" fill="#10b981" name="Favorável" />
                <Bar dataKey="desfavoravel" fill="#f97316" name="Desfavorável" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Análise de Tendência</p>
              <p className="text-sm text-muted-foreground">
                Observa-se crescimento de 62% em decisões favoráveis à administração em processos 
                de licitação nos últimos 4 anos, indicando maior rigor técnico nas instruções processuais.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
