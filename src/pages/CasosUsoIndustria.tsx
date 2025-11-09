import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Factory, TrendingUp, Wrench, Package, DollarSign, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0D1117]">
      {/* Header */}
      <header className="border-b border-[#1E293B] bg-[#161B22]/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-[#E6EDF3] hover:text-[#00C8FF]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('casosUsoIndustria.backHome')}
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#161B22] via-[#0D1117] to-[#0D1117]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00C8FF]/10 border border-[#00C8FF]/20 rounded-full mb-6">
              <Factory className="h-5 w-5 text-[#00C8FF]" />
              <span className="text-sm font-medium text-[#00C8FF]">{t('casosUsoIndustria.badge')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#E6EDF3] mb-6">
              {t('casosUsoIndustria.title')}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              {t('casosUsoIndustria.intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="py-16 bg-[#0D1117]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Área Meio */}
            <Card className="border-2 border-[#1E293B] bg-[#161B22] hover:scale-[1.02] transition-transform duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#00C8FF]/10">
                    <DollarSign className="h-6 w-6 text-[#00C8FF]" />
                  </div>
                  <CardTitle className="text-2xl text-[#E6EDF3]">{t('casosUsoIndustria.areaMeioTitle')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#00C8FF] flex-shrink-0" />
                  <p className="text-gray-400">{t('casosUsoIndustria.areaMeio1')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#00C8FF] flex-shrink-0" />
                  <p className="text-gray-400">{t('casosUsoIndustria.areaMeio2')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#00C8FF] flex-shrink-0" />
                  <p className="text-gray-400">{t('casosUsoIndustria.areaMeio3')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#00C8FF] flex-shrink-0" />
                  <p className="text-gray-400">{t('casosUsoIndustria.areaMeio4')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Área Fim */}
            <Card className="border-2 border-[#1E293B] bg-[#161B22] hover:scale-[1.02] transition-transform duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#00C8FF]/10">
                    <Wrench className="h-6 w-6 text-[#00C8FF]" />
                  </div>
                  <CardTitle className="text-2xl text-[#E6EDF3]">{t('casosUsoIndustria.areaFimTitle')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#00C8FF] flex-shrink-0" />
                  <p className="text-gray-400">{t('casosUsoIndustria.areaFim1')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#00C8FF] flex-shrink-0" />
                  <p className="text-gray-400">{t('casosUsoIndustria.areaFim2')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#00C8FF] flex-shrink-0" />
                  <p className="text-gray-400">{t('casosUsoIndustria.areaFim3')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#00C8FF] flex-shrink-0" />
                  <p className="text-gray-400">{t('casosUsoIndustria.areaFim4')}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-6xl mx-auto mt-8">
            <Card className="bg-[#00C8FF]/5 border-[#00C8FF]/20 border-2">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-6 w-6 text-[#00C8FF] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-[#E6EDF3]">{t('casosUsoIndustria.resultLabel')}</h3>
                    <p className="text-gray-400">
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
      <section className="py-16 bg-[#0D1117]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00C8FF]/10 border border-[#00C8FF]/20 rounded-full mb-4">
                <Package className="h-4 w-4 text-[#00C8FF]" />
                <span className="text-sm font-medium text-[#00C8FF]">{t('casosUsoIndustria.caseSuccessBadge')}</span>
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={flexLogo} 
                    alt="Logo Flex Industries" 
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#E6EDF3]">
                  Case: <span className="text-[#00C8FF]">Flex</span>
                </h2>
              </div>
            </div>

            <Card className="border-2 border-[#1E293B] bg-[#161B22]">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[#E6EDF3]">{t('casosUsoIndustria.flexChallengeTitle')}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {t('casosUsoIndustria.flexChallengeText')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[#E6EDF3]">{t('casosUsoIndustria.flexSolutionTitle')}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {t('casosUsoIndustria.flexSolutionText')}
                  </p>
                </div>

                {/* Dashboard do Projeto */}
                <div className="my-8 -mx-8 p-8 bg-[#0D1117]">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#E6EDF3] mb-2">
                      {t('casosUsoIndustria.dashboardProjectTitle')}
                    </h3>
                    <p className="text-gray-400">
                      {t('casosUsoIndustria.dashboardProjectDesc')}
                    </p>
                  </div>

                  <Card className="border-2 border-[#1E293B] shadow-2xl bg-[#161B22] backdrop-blur">
                    <CardHeader className="border-b border-[#1E293B] bg-gradient-to-r from-[#00C8FF]/5 via-[#00C8FF]/10 to-[#00C8FF]/5 pb-6">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <CardTitle className="text-2xl flex items-center gap-2 text-[#E6EDF3]">
                            <BarChart3 className="h-6 w-6 text-[#00C8FF]" />
                            {t('casosUsoIndustria.financialDashboard')}
                          </CardTitle>
                          <CardDescription className="mt-2 text-gray-400">
                            {t('casosUsoIndustria.realTimeMonitoring')}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00C8FF]/10 border border-[#00C8FF]/20">
                          <div className="h-2 w-2 rounded-full bg-[#00C8FF] animate-pulse" />
                          <span className="text-sm font-medium text-[#00C8FF]">{t('casosUsoIndustria.liveLabel')}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                      {/* KPIs Header */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-[#161B22] p-4 rounded-2xl border border-[#1E293B] hover:scale-105 transition-transform duration-300 shadow-lg">
                          <div className="flex items-center justify-between mb-2">
                            <DollarSign className="h-5 w-5 text-[#00C8FF]" />
                            <TrendingUp className="h-4 w-4 text-green-400" />
                          </div>
                          <p className="text-sm text-gray-400 mb-1">{t('casosUsoIndustria.kpiFinalBalance')}</p>
                          <p className="text-2xl font-bold text-[#E6EDF3]">R$ 9,0M</p>
                          <p className="text-xs text-green-400 mt-1 flex items-center gap-1">▲ +12.5% <span className="text-gray-500">{t('casosUsoIndustria.vsPrevious')}</span></p>
                        </div>

                        <div className="bg-[#161B22] p-4 rounded-2xl border border-[#1E293B] hover:scale-105 transition-transform duration-300 shadow-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Package className="h-5 w-5 text-[#007BFF]" />
                            <TrendingUp className="h-4 w-4 text-green-400" />
                          </div>
                          <p className="text-sm text-gray-400 mb-1">{t('casosUsoIndustria.kpiProductionCost')}</p>
                          <p className="text-2xl font-bold text-[#E6EDF3]">R$ 4,4M</p>
                          <p className="text-xs text-green-400 mt-1 flex items-center gap-1">▲ -8.2% <span className="text-gray-500">{t('casosUsoIndustria.reduction')}</span></p>
                        </div>

                        <div className="bg-[#161B22] p-4 rounded-2xl border border-[#1E293B] hover:scale-105 transition-transform duration-300 shadow-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Factory className="h-5 w-5 text-amber-400" />
                            <TrendingUp className="h-4 w-4 text-green-400" />
                          </div>
                          <p className="text-sm text-gray-400 mb-1">{t('casosUsoIndustria.kpiEfficiency')}</p>
                          <p className="text-2xl font-bold text-[#E6EDF3]">94.7%</p>
                          <p className="text-xs text-green-400 mt-1 flex items-center gap-1">▲ +5.3% <span className="text-gray-500">{t('casosUsoIndustria.improvement')}</span></p>
                        </div>

                        <div className="bg-[#161B22] p-4 rounded-2xl border border-[#1E293B] hover:scale-105 transition-transform duration-300 shadow-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Wrench className="h-5 w-5 text-green-400" />
                            <TrendingUp className="h-4 w-4 text-green-400" />
                          </div>
                          <p className="text-sm text-gray-400 mb-1">{t('casosUsoIndustria.kpiAvailability')}</p>
                          <p className="text-2xl font-bold text-[#E6EDF3]">98.2%</p>
                          <p className="text-xs text-green-400 mt-1 flex items-center gap-1">▲ +3.1% <span className="text-gray-500">{t('casosUsoIndustria.uptime')}</span></p>
                        </div>
                      </div>

                      {/* Main Charts Row */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Fluxo de Caixa Consolidado */}
                        <div className="bg-[#161B22] p-5 rounded-2xl border border-[#1E293B] shadow-lg">
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold text-[#00C8FF] flex items-center gap-2">
                              <span className="h-8 w-1 bg-[#00C8FF] rounded-full" />
                              {t('casosUsoIndustria.cashFlowTitle')}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1 ml-3">{t('casosUsoIndustria.cashFlowDesc')}</p>
                          </div>
                          <ResponsiveContainer width="100%" height={320}>
                            <LineChart data={fluxoCaixaProjetado}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                              <XAxis 
                                dataKey="dia" 
                                tick={{ fill: '#E6EDF3' }}
                                label={{ value: t('casosUsoIndustria.dayOfMonth'), position: 'insideBottom', offset: -5, fill: '#E6EDF3' }}
                              />
                              <YAxis 
                                tick={{ fill: '#E6EDF3' }}
                                tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`}
                              />
                              <Tooltip 
                                formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`}
                                contentStyle={{ 
                                  backgroundColor: '#161B22', 
                                  border: '1px solid #1E293B',
                                  borderRadius: '8px',
                                  color: '#E6EDF3'
                                }}
                                labelStyle={{ color: '#E6EDF3' }}
                              />
                              <Legend wrapperStyle={{ color: '#E6EDF3' }} />
                              <Line 
                                type="monotone" 
                                dataKey="saldoFinal" 
                                stroke="#00C8FF" 
                                name={t('casosUsoIndustria.finalBalanceLabel')}
                                strokeWidth={3}
                                dot={{ fill: '#00C8FF', r: 4 }}
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

                        {/* Custos de Produção */}
                        <div className="bg-[#161B22] p-5 rounded-2xl border border-[#1E293B] shadow-lg">
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold text-[#00C8FF] flex items-center gap-2">
                              <span className="h-8 w-1 bg-[#007BFF] rounded-full" />
                              {t('casosUsoIndustria.productionCostsTitle')}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1 ml-3">{t('casosUsoIndustria.productionCostsDesc')}</p>
                          </div>
                          <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={custosProducao}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                              <XAxis dataKey="mes" tick={{ fill: '#E6EDF3' }} />
                              <YAxis tick={{ fill: '#E6EDF3' }} />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: '#161B22', 
                                  border: '1px solid #1E293B',
                                  borderRadius: '8px',
                                  color: '#E6EDF3'
                                }}
                                labelStyle={{ color: '#E6EDF3' }}
                              />
                              <Legend wrapperStyle={{ color: '#E6EDF3' }} />
                              <Bar dataKey="direto" fill="#00C8FF" name={t('casosUsoIndustria.directCost')} radius={[8, 8, 0, 0]} />
                              <Bar dataKey="onera" fill="#007BFF" name={t('casosUsoIndustria.burden')} radius={[8, 8, 0, 0]} />
                              <Bar dataKey="indireta" fill="#0056D2" name={t('casosUsoIndustria.indirectCost')} radius={[8, 8, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Bottom Charts Row */}
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Distribuição de Despesas */}
                        <div className="bg-[#161B22] p-5 rounded-2xl border border-[#1E293B] shadow-lg">
                          <div className="mb-4">
                            <h3 className="text-base font-semibold text-[#E6EDF3] flex items-center gap-2">
                              <span className="h-6 w-1 bg-amber-500 rounded-full" />
                              {t('casosUsoIndustria.expensesDistributionTitle')}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1 ml-2">{t('casosUsoIndustria.expensesDistributionDesc')}</p>
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
                                  backgroundColor: '#161B22', 
                                  border: '1px solid #1E293B',
                                  borderRadius: '8px',
                                  color: '#E6EDF3'
                                }}
                                labelStyle={{ color: '#E6EDF3' }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Comparativo Mensal */}
                        <div className="md:col-span-2 bg-[#161B22] p-5 rounded-2xl border border-[#1E293B] shadow-lg">
                          <div className="mb-4">
                            <h3 className="text-base font-semibold text-[#E6EDF3] flex items-center gap-2">
                              <span className="h-6 w-1 bg-green-500 rounded-full" />
                              {t('casosUsoIndustria.monthlyEvolutionTitle')}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1 ml-2">{t('casosUsoIndustria.monthlyEvolutionDesc')}</p>
                          </div>
                          <ResponsiveContainer width="100%" height={240}>
                            <BarChart data={comparativoMensal}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                              <XAxis dataKey="mes" tick={{ fill: '#E6EDF3' }} />
                              <YAxis tick={{ fill: '#E6EDF3' }} />
                              <Tooltip 
                                formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`}
                                contentStyle={{ 
                                  backgroundColor: '#161B22', 
                                  border: '1px solid #1E293B',
                                  borderRadius: '8px',
                                  color: '#E6EDF3'
                                }}
                                labelStyle={{ color: '#E6EDF3' }}
                              />
                              <Bar 
                                dataKey="valor" 
                                fill="#00C8FF" 
                                radius={[8, 8, 0, 0]}
                              >
                                {comparativoMensal.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={`rgba(0, 200, 255, ${1 - (index * 0.08)})`} 
                                  />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Footer Info */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#1E293B]">
                        <p className="text-xs text-gray-500 italic">
                          💡 <strong className="text-[#E6EDF3]">Insight:</strong> {t('casosUsoIndustria.dashboardFooter')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t('casosUsoIndustria.lastUpdate')} {new Date().toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[#E6EDF3]">{t('casosUsoIndustria.flexResultsTitle')}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-5 w-5 text-[#00C8FF] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-400">{t('casosUsoIndustria.flexResult1')}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Wrench className="h-5 w-5 text-[#00C8FF] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-400">{t('casosUsoIndustria.flexResult2')}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-[#00C8FF] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-400">{t('casosUsoIndustria.flexResult3')}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-5 w-5 text-[#00C8FF] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-400">{t('casosUsoIndustria.flexResult4')}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-[#00C8FF] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-400">{t('casosUsoIndustria.flexResult5')}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1E293B]">
                  <p className="text-lg font-medium text-[#E6EDF3]">
                    {t('casosUsoIndustria.flexConclusion')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#161B22] via-[#0D1117] to-[#0D1117]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#E6EDF3] mb-6">
              {t('casosUsoIndustria.finalCtaTitle')}
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              {t('casosUsoIndustria.finalCtaSubtitle')}
            </p>
            <Button size="lg" className="text-lg px-8 bg-[#00C8FF] hover:bg-[#00A3CC] text-[#0D1117] font-semibold" asChild>
              <Link to="/#contact-form">{t('casosUsoIndustria.requestDemo')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CasosUsoIndustria;
