import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DocumentAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const { toast } = useToast();

  const handleUpload = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowReport(true);
      toast({
        title: "Documento analisado com sucesso",
        description: "Pré-relatório gerado pela IA",
      });
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6 bg-muted/30">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Documentos</h1>
        <p className="text-muted-foreground">
          Geração automática de pré-relatórios técnicos com extração semântica de informações
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload de Documento</CardTitle>
            <CardDescription>Envie PDFs, DOCs ou arquivos de processos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-[#E30613]/50 transition-colors cursor-pointer">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">
                Arraste arquivos aqui ou clique para selecionar
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, DOC, DOCX (máx. 50MB)
              </p>
            </div>

            <Button 
              onClick={handleUpload} 
              className="w-full bg-[#E30613] hover:bg-[#E30613]/90"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                  Analisando com IA...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Gerar Pré-Relatório
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Extração Automática</CardTitle>
            <CardDescription>Dados identificados pela IA</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">Objeto:</p>
              <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                Contratação de serviços de manutenção predial - Pregão Eletrônico nº 127/2024
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Valor:</p>
              <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                R$ 2.847.500,00 (dois milhões, oitocentos e quarenta e sete mil e quinhentos reais)
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Unidade Fiscalizada:</p>
              <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                Secretaria de Infraestrutura e Obras - SEINFRA
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Tipo de Processo:</p>
              <Badge>Licitação</Badge>
              <Badge variant="outline" className="ml-2">Pregão Eletrônico</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {showReport && (
        <Card className="border-[#E30613]/20 animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pré-Relatório Gerado por IA</CardTitle>
                <CardDescription>Análise automática do processo</CardDescription>
              </div>
              <Badge className="bg-green-600">Pontuação: 8.5/10</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Resumo Executivo</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                O processo de Pregão Eletrônico nº 127/2024 refere-se à contratação de serviços de manutenção predial 
                pela SEINFRA, com valor estimado de R$ 2.847.500,00. A análise preliminar identificou conformidade 
                documental adequada, com todos os anexos obrigatórios presentes. O valor está dentro da média de mercado 
                para contratos similares (variação de -3% em relação ao benchmark).
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Pontos de Atenção</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <Badge variant="outline" className="bg-yellow-50">⚠️</Badge>
                  <span>Prazo de execução (180 dias) é 15% inferior à média de contratos similares</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Badge variant="outline" className="bg-yellow-50">⚠️</Badge>
                  <span>Recomenda-se verificar histórico de performance da empresa vencedora</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Jurisprudências Relacionadas</h3>
              <p className="text-sm text-muted-foreground">
                Identificadas 12 decisões correlatas. Principal precedente: Acórdão TCE-SP 2.847/2023 - 
                critérios de qualificação técnica em serviços prediais.
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Exportar Relatório
              </Button>
              <Button variant="outline" size="sm">
                Ver Detalhes Completos
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
