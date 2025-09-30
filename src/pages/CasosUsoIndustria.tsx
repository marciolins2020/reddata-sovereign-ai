import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Factory, TrendingUp, Wrench, Package, DollarSign, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import flexLogo from "@/assets/flex-industries-logo.png";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CasosUsoIndustria = () => {
  // Dados de Fluxo de Caixa Projetado
  const fluxoCaixaProjetado = [
    { dia: 1, valor: 3966226.76, aPagar: 2800000, aReceber: 6766226.76, saldoFinal: 5217816.06 },
    { dia: 5, valor: 5217816.06, aPagar: 1900000, aReceber: 7117816.06, saldoFinal: 7987321.16 },
    { dia: 10, valor: 7987321.16, aPagar: 4200000, aReceber: 3787321.16, saldoFinal: 8976572.64 },
    { dia: 15, valor: 8976572.64, aPagar: 5300000, aReceber: 3676572.64, saldoFinal: 6655112.80 },
    { dia: 17, valor: 6655112.80, aPagar: 1200000, aReceber: 5455112.80, saldoFinal: 9000000 },
  ];

  // Dados de Fluxo de Caixa Realizado
  const fluxoCaixaRealizado = [
    { dia: 1, valor: 1000000, aPagar: 2500000, aReceber: 3500000, saldoFinal: 897481838.53 },
    { dia: 5, valor: 897481838.53, aPagar: 3200000, aReceber: 894281838.53, saldoFinal: 994664777.43 },
    { dia: 10, valor: 994664777.43, aPagar: 2800000, aReceber: 991864777.43, saldoFinal: 819891258.23 },
    { dia: 15, valor: 819891258.23, aPagar: 3100000, aReceber: 816791258.23, saldoFinal: 798630374.14 },
  ];

  // Dados de Custos de Produção
  const custosProducao = [
    { mes: "Jun", direto: 1823, onera: 1691, indireta: 668 },
    { mes: "Jul", direto: 2012, onera: 1450, indireta: 723 },
    { mes: "Ago", direto: 2134, onera: 1621, indireta: 681 },
  ];

  // Dados de Distribuição de Despesas
  const distribuicaoDespesas = [
    { name: "MCOST", value: 14.8, color: "#3b82f6" },
    { name: "FACLOG", value: 15.5, color: "#06b6d4" },
    { name: "FACN", value: 69.8, color: "#dc2626" },
  ];

  // Dados comparativos mensais
  const comparativoMensal = [
    { mes: "Jan", valor: 68000 },
    { mes: "Fev", valor: 72000 },
    { mes: "Mar", valor: 69000 },
    { mes: "Abr", valor: 64000 },
    { mes: "Mai", valor: 59000 },
    { mes: "Jun", valor: 54000 },
    { mes: "Jul", valor: 51000 },
    { mes: "Ago", valor: 48000 },
  ];

  const COLORS = ["#3b82f6", "#06b6d4", "#dc2626"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para página principal
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Factory className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Caso de Uso: Indústria</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Indústria de Manufatura (Eletroeletrônico)
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Nesta vertical, a RedMaxx, com a plataforma RedData, apoia a evolução da Indústria 4.0 ao integrar dados de chão de fábrica, ERP, sensores IoT e cadeia de suprimentos, aplicando Big Data e Inteligência Artificial para transformar tanto a área meio quanto a área fim.
            </p>
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Área Meio */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Área Meio (Gestão e Suporte)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">Integração de dados financeiros, contábeis e de suprimentos.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">Monitoramento de desempenho de fornecedores e contratos.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">Dashboards gerenciais para tomada de decisão estratégica.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">Compliance com normas e auditorias mais rápidas.</p>
                </div>
              </CardContent>
            </Card>

            {/* Área Fim */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Área Fim (Produção e Operação)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">Manutenção preditiva de máquinas, evitando paradas não programadas.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">Controle de qualidade inteligente com detecção de falhas em tempo real.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">Otimização de insumos e redução de desperdícios.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">Previsão de demanda e logística integrada, garantindo eficiência na cadeia produtiva.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-6xl mx-auto mt-8">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Resultado</h3>
                    <p className="text-muted-foreground">
                      Aumento da produtividade, redução de custos e maior competitividade global.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Case Study Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <Package className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Case de Sucesso</span>
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={flexLogo} 
                    alt="Logo Flex Industries" 
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Case: <span className="text-primary">Flex</span>
                </h2>
              </div>
            </div>

            <Card className="border-2">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">O Desafio</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A Flex, indústria referência no setor eletroeletrônico, buscava evoluir para um modelo de Indústria 4.0, mas enfrentava desafios na integração de informações de chão de fábrica com sistemas de gestão e na utilização estratégica dos dados disponíveis.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">A Solução</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A RedMaxx implementou o RedData como núcleo central de Big Data e Inteligência Artificial, consolidando dados de sensores IoT, linhas de produção, ERPs e cadeia logística em uma única plataforma analítica.
                  </p>
                </div>

                {/* Dashboard do Projeto */}
                <div className="my-8 -mx-8 p-8 bg-gradient-to-br from-muted/50 via-background to-muted/30">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Dashboard <span className="text-primary">do Projeto</span>
                    </h3>
                    <p className="text-muted-foreground">
                      Visão consolidada em tempo real dos KPIs financeiros e operacionais
                    </p>
                  </div>

                  <Card className="border-2 shadow-2xl bg-card/95 backdrop-blur">
                    <CardHeader className="border-b bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 pb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl flex items-center gap-2">
                            <BarChart3 className="h-6 w-6 text-primary" />
                            Dashboard Financeiro - Área Meio
                          </CardTitle>
                          <CardDescription className="mt-2">
                            Dados atualizados em tempo real | Período: Jan - Ago 2024
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                          <span className="text-sm font-medium text-primary">Ao Vivo</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                      {/* KPIs Header */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl border border-primary/20">
                          <div className="flex items-center justify-between mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">Saldo Final</p>
                          <p className="text-2xl font-bold text-foreground">R$ 9,0M</p>
                          <p className="text-xs text-green-600 mt-1">+12.5% vs. anterior</p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-4 rounded-xl border border-blue-500/20">
                          <div className="flex items-center justify-between mb-2">
                            <Package className="h-5 w-5 text-blue-600" />
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">Custo Produção</p>
                          <p className="text-2xl font-bold text-foreground">R$ 4,4M</p>
                          <p className="text-xs text-green-600 mt-1">-8.2% redução</p>
                        </div>

                        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-4 rounded-xl border border-amber-500/20">
                          <div className="flex items-center justify-between mb-2">
                            <Factory className="h-5 w-5 text-amber-600" />
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">Eficiência</p>
                          <p className="text-2xl font-bold text-foreground">94.7%</p>
                          <p className="text-xs text-green-600 mt-1">+5.3% melhoria</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-4 rounded-xl border border-green-500/20">
                          <div className="flex items-center justify-between mb-2">
                            <Wrench className="h-5 w-5 text-green-600" />
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">Disponibilidade</p>
                          <p className="text-2xl font-bold text-foreground">98.2%</p>
                          <p className="text-xs text-green-600 mt-1">+3.1% uptime</p>
                        </div>
                      </div>

                      {/* Main Charts Row */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Fluxo de Caixa Consolidado */}
                        <div className="bg-muted/30 p-5 rounded-xl border">
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                              <span className="h-8 w-1 bg-primary rounded-full" />
                              Fluxo de Caixa - Projetado vs Realizado
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 ml-3">Análise comparativa mensal</p>
                          </div>
                          <ResponsiveContainer width="100%" height={320}>
                            <LineChart data={fluxoCaixaProjetado}>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis 
                                dataKey="dia" 
                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                label={{ value: 'Dia do Mês', position: 'insideBottom', offset: -5 }}
                              />
                              <YAxis 
                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`}
                              />
                              <Tooltip 
                                formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`}
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--card))', 
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: '8px'
                                }}
                              />
                              <Legend />
                              <Line 
                                type="monotone" 
                                dataKey="saldoFinal" 
                                stroke="hsl(var(--primary))" 
                                name="Saldo Final" 
                                strokeWidth={3}
                                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="aReceber" 
                                stroke="#10b981" 
                                name="A Receber" 
                                strokeWidth={2}
                                strokeDasharray="5 5"
                              />
                              <Line 
                                type="monotone" 
                                dataKey="aPagar" 
                                stroke="#f59e0b" 
                                name="A Pagar" 
                                strokeWidth={2}
                                strokeDasharray="5 5"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Custos de Produção */}
                        <div className="bg-muted/30 p-5 rounded-xl border">
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                              <span className="h-8 w-1 bg-blue-600 rounded-full" />
                              Custos de Produção por Categoria
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 ml-3">Evolução trimestral (em milhares)</p>
                          </div>
                          <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={custosProducao}>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis dataKey="mes" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--card))', 
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: '8px'
                                }}
                              />
                              <Legend />
                              <Bar dataKey="direto" fill="hsl(var(--primary))" name="Custo Direto" radius={[8, 8, 0, 0]} />
                              <Bar dataKey="onera" fill="#3b82f6" name="Oneração" radius={[8, 8, 0, 0]} />
                              <Bar dataKey="indireta" fill="#10b981" name="Custo Indireto" radius={[8, 8, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Bottom Charts Row */}
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Distribuição de Despesas */}
                        <div className="bg-muted/30 p-5 rounded-xl border">
                          <div className="mb-4">
                            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                              <span className="h-6 w-1 bg-amber-600 rounded-full" />
                              Distribuição de Despesas
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 ml-2">Por centro de custo (%)</p>
                          </div>
                          <ResponsiveContainer width="100%" height={240}>
                            <PieChart>
                              <Pie
                                data={distribuicaoDespesas}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}\n${(percent * 100).toFixed(1)}%`}
                                outerRadius={85}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {distribuicaoDespesas.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--card))', 
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: '8px'
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Comparativo Mensal */}
                        <div className="md:col-span-2 bg-muted/30 p-5 rounded-xl border">
                          <div className="mb-4">
                            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                              <span className="h-6 w-1 bg-green-600 rounded-full" />
                              Evolução Mensal de Despesas + Custos
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 ml-2">Tendência de redução (em milhares)</p>
                          </div>
                          <ResponsiveContainer width="100%" height={240}>
                            <BarChart data={comparativoMensal}>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis dataKey="mes" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                              <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                              <Tooltip 
                                formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`}
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--card))', 
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: '8px'
                                }}
                              />
                              <Bar 
                                dataKey="valor" 
                                fill="hsl(var(--primary))" 
                                radius={[8, 8, 0, 0]}
                              >
                                {comparativoMensal.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={`hsl(var(--primary) / ${1 - (index * 0.08)})`} 
                                  />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Footer Info */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <p className="text-xs text-muted-foreground">
                          Dashboard desenvolvido com RedData | Powered by RedMaxx
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Última atualização: {new Date().toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Principais entregas e resultados:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">Monitoramento em tempo real do desempenho das linhas de produção.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Wrench className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">Manutenção preditiva aplicada a equipamentos críticos, reduzindo paradas não programadas.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">Controle de qualidade avançado, com detecção de falhas e não conformidades ainda no processo produtivo.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">Dashboards inteligentes para gestores, permitindo decisões rápidas e baseadas em dados.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">Eficiência operacional ampliada, com redução de custos de manutenção e aumento da produtividade.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-lg font-medium text-foreground">
                    Com o RedData, a Flex deu um passo decisivo rumo à Indústria 4.0, alcançando maior competitividade, eficiência e confiabilidade nos processos produtivos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Pronto para transformar sua <span className="text-primary">indústria</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Entre em contato e descubra como o RedData pode impulsionar sua manufatura rumo à Indústria 4.0.
            </p>
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="/#contact">Solicitar Demonstração</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CasosUsoIndustria;
