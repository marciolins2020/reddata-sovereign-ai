import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Factory, TrendingUp, Wrench, Package, DollarSign, BarChart3, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import flexLogo from "@/assets/flex-industries-logo.png";
import redmaxxLogo from "@/assets/redmaxx-logo.png";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState } from "react";

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

  // Dados de últimas vendas
  const ultimasVendas = [
    { cliente: "Comercial Norte", produto: "RedData SaaS", valor: 18500, data: "05/11/2025", status: "Pago", statusColor: "text-green-600" },
    { cliente: "Amanco", produto: "Serviço Big Data", valor: 25000, data: "04/11/2025", status: "Pendente", statusColor: "text-yellow-600" },
    { cliente: "Pref. Manaus", produto: "Licença RedData", valor: 42000, data: "03/11/2025", status: "Pago", statusColor: "text-green-600" },
  ];

  const COLORS = ["#3b82f6", "#06b6d4", "#dc2626"];
  const { t } = useLanguage();
  const [periodoSelecionado, setPeriodoSelecionado] = useState("ultimos-6-meses");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('casosUsoIndustria.backHome')}
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
              <span className="text-sm font-medium text-primary">{t('casosUsoIndustria.badge')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('casosUsoIndustria.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('casosUsoIndustria.intro')}
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
                  <CardTitle className="text-2xl">{t('casosUsoIndustria.areaMeioTitle')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">{t('casosUsoIndustria.areaMeio1')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">{t('casosUsoIndustria.areaMeio2')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">{t('casosUsoIndustria.areaMeio3')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">{t('casosUsoIndustria.areaMeio4')}</p>
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
                  <CardTitle className="text-2xl">{t('casosUsoIndustria.areaFimTitle')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">{t('casosUsoIndustria.areaFim1')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">{t('casosUsoIndustria.areaFim2')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">{t('casosUsoIndustria.areaFim3')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-muted-foreground">{t('casosUsoIndustria.areaFim4')}</p>
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
                    <h3 className="font-semibold text-lg mb-2">{t('casosUsoIndustria.resultLabel')}</h3>
                    <p className="text-muted-foreground">
                      {t('casosUsoIndustria.resultText')}
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
                <span className="text-sm font-medium text-primary">{t('casosUsoIndustria.caseSuccessBadge')}</span>
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
                  <h3 className="text-xl font-semibold mb-3">{t('casosUsoIndustria.flexChallengeTitle')}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('casosUsoIndustria.flexChallengeText')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">{t('casosUsoIndustria.flexSolutionTitle')}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('casosUsoIndustria.flexSolutionText')}
                  </p>
                </div>

                {/* Dashboard do Projeto */}
                <div className="my-8 -mx-8 p-8 bg-gradient-to-br from-muted/50 via-background to-muted/30">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {t('casosUsoIndustria.dashboardProjectTitle')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('casosUsoIndustria.dashboardProjectDesc')}
                    </p>
                  </div>

                  <Card className="border-2 shadow-2xl bg-card/95 backdrop-blur">
                    <CardHeader className="border-b bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 pb-6">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <CardTitle className="text-2xl flex items-center gap-2">
                            <BarChart3 className="h-6 w-6 text-primary" />
                            Painel Executivo
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {t('casosUsoIndustria.realTimeMonitoring')}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                          <select 
                            value={periodoSelecionado}
                            onChange={(e) => setPeriodoSelecionado(e.target.value)}
                            className="bg-background text-foreground px-4 py-2 rounded-xl border border-border text-sm"
                          >
                            <option value="ultimos-6-meses">Últimos 6 meses</option>
                            <option value="ultimos-12-meses">Últimos 12 meses</option>
                            <option value="personalizar">Personalizar...</option>
                          </select>
                          <img 
                            src={redmaxxLogo} 
                            alt="RedMaxx" 
                            className="h-10 w-auto object-contain"
                          />
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8 space-y-8">
                      {/* KPIs Header - Modern Premium Design */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="group relative bg-gradient-to-br from-primary/10 via-primary/5 to-background p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-primary/20 backdrop-blur-sm overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                              <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <DollarSign className="h-6 w-6 text-primary" />
                              </div>
                              <TrendingUp className="h-5 w-5 text-green-600" />
                            </div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">{t('casosUsoIndustria.kpiFinalBalance')}</p>
                            <h2 className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">R$ 9,0M</h2>
                            <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-semibold">
                              ▲ +12.5% <span className="text-muted-foreground font-normal">{t('casosUsoIndustria.vsPrevious')}</span>
                            </p>
                          </div>
                        </div>

                        <div className="group relative bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-background p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-blue-500/20 backdrop-blur-sm overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                              <div className="p-3 rounded-2xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                                <Package className="h-6 w-6 text-blue-600" />
                              </div>
                              <TrendingUp className="h-5 w-5 text-green-600" />
                            </div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">{t('casosUsoIndustria.kpiProductionCost')}</p>
                            <h2 className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">R$ 4,4M</h2>
                            <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-semibold">
                              ▼ -8.2% <span className="text-muted-foreground font-normal">{t('casosUsoIndustria.reduction')}</span>
                            </p>
                          </div>
                        </div>

                        <div className="group relative bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-background p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-amber-500/20 backdrop-blur-sm overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                              <div className="p-3 rounded-2xl bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                                <Factory className="h-6 w-6 text-amber-600" />
                              </div>
                              <TrendingUp className="h-5 w-5 text-green-600" />
                            </div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">{t('casosUsoIndustria.kpiEfficiency')}</p>
                            <h2 className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">94.7%</h2>
                            <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-semibold">
                              ▲ +5.3% <span className="text-muted-foreground font-normal">{t('casosUsoIndustria.improvement')}</span>
                            </p>
                          </div>
                        </div>

                        <div className="group relative bg-gradient-to-br from-green-500/10 via-green-500/5 to-background p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-green-500/20 backdrop-blur-sm overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                              <div className="p-3 rounded-2xl bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                                <Wrench className="h-6 w-6 text-green-600" />
                              </div>
                              <TrendingUp className="h-5 w-5 text-green-600" />
                            </div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">{t('casosUsoIndustria.kpiAvailability')}</p>
                            <h2 className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">98.2%</h2>
                            <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-semibold">
                              ▲ +3.1% <span className="text-muted-foreground font-normal">{t('casosUsoIndustria.uptime')}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Main Charts Row */}
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Evolução de Vendas */}
                        <div className="group relative bg-gradient-to-br from-card via-card to-muted/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-border/50 backdrop-blur-sm overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
                              <h3 className="text-xl font-bold text-foreground">Evolução de Vendas</h3>
                            </div>
                          <ResponsiveContainer width="100%" height={320}>
                            <LineChart data={fluxoCaixaProjetado}>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis 
                                dataKey="dia" 
                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                label={{ value: t('casosUsoIndustria.dayOfMonth'), position: 'insideBottom', offset: -5 }}
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
                                name={t('casosUsoIndustria.finalBalanceLabel')}
                                strokeWidth={3}
                                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="aReceber" 
                                stroke="#10b981" 
                                name={t('casosUsoIndustria.toReceive')}
                                strokeWidth={2}
                                strokeDasharray="5 5"
                              />
                              <Line 
                                type="monotone" 
                                dataKey="aPagar" 
                                stroke="#f59e0b" 
                                name={t('casosUsoIndustria.toPay')}
                                strokeWidth={2}
                                strokeDasharray="5 5"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Top Produtos */}
                        <div className="group relative bg-gradient-to-br from-card via-card to-muted/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-border/50 backdrop-blur-sm overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                              <h3 className="text-xl font-bold text-foreground">Top Produtos</h3>
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
                              <Bar dataKey="direto" fill="hsl(var(--primary))" name={t('casosUsoIndustria.directCost')} radius={[8, 8, 0, 0]} />
                              <Bar dataKey="onera" fill="#3b82f6" name={t('casosUsoIndustria.burden')} radius={[8, 8, 0, 0]} />
                              <Bar dataKey="indireta" fill="#10b981" name={t('casosUsoIndustria.indirectCost')} radius={[8, 8, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                          </div>
                        </div>
                      </div>

                      {/* Tabela de Últimas Vendas */}
                      <div className="group relative bg-gradient-to-br from-card via-card to-muted/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-border/50 backdrop-blur-sm overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
                            <h3 className="text-xl font-bold text-foreground">Últimas Vendas</h3>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead className="text-muted-foreground border-b-2 border-primary/20">
                                <tr>
                                  <th className="pb-4 font-semibold">Cliente</th>
                                  <th className="pb-4 font-semibold">Produto</th>
                                  <th className="pb-4 font-semibold">Valor</th>
                                  <th className="pb-4 font-semibold">Data</th>
                                  <th className="pb-4 text-right font-semibold">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ultimasVendas.map((venda, index) => (
                                  <tr key={index} className="group hover:bg-primary/5 transition-all duration-200 border-b border-border/50 last:border-0">
                                    <td className="py-4 font-medium">{venda.cliente}</td>
                                    <td className="py-4 text-muted-foreground">{venda.produto}</td>
                                    <td className="py-4 font-semibold">R$ {venda.valor.toLocaleString('pt-BR')}</td>
                                    <td className="py-4 text-muted-foreground text-sm">{venda.data}</td>
                                    <td className={`py-4 text-right font-semibold ${venda.statusColor}`}>
                                      <span className="px-3 py-1 rounded-full bg-current/10">{venda.status}</span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* Insight Footer */}
                      <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-5 rounded-2xl border-l-4 border-primary">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">💡</span>
                          <div>
                            <strong className="text-foreground font-semibold">Insight:</strong>
                            <span className="text-muted-foreground ml-2">As vendas corporativas compensaram a leve queda no varejo. Lucro líquido em alta pelo terceiro mês consecutivo.</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">{t('casosUsoIndustria.flexResultsTitle')}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{t('casosUsoIndustria.flexResult1')}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Wrench className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{t('casosUsoIndustria.flexResult2')}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{t('casosUsoIndustria.flexResult3')}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{t('casosUsoIndustria.flexResult4')}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{t('casosUsoIndustria.flexResult5')}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-lg font-medium text-foreground">
                    {t('casosUsoIndustria.flexConclusion')}
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
              {t('casosUsoIndustria.finalCtaTitle')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('casosUsoIndustria.finalCtaSubtitle')}
            </p>
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/#contact-form">{t('casosUsoIndustria.requestDemo')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground text-xs">
            © 2025 RedMaxx – Plataforma RedData • Inteligência para Decisão
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CasosUsoIndustria;
