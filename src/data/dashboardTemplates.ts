export interface DashboardTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  widgets: Array<{
    type: string;
    position: { x: number; y: number };
    size: { w: number; h: number };
  }>;
}

export const dashboardTemplates: DashboardTemplate[] = [
  {
    id: "executive",
    name: "Dashboard Executivo",
    description: "Visão geral com KPIs principais e gráficos de tendência",
    category: "Negócios",
    thumbnail: "📊",
    widgets: [
      { type: "gauge", position: { x: 0, y: 0 }, size: { w: 1, h: 1 } },
      { type: "gauge", position: { x: 1, y: 0 }, size: { w: 1, h: 1 } },
      { type: "line", position: { x: 0, y: 1 }, size: { w: 2, h: 1 } },
      { type: "bar", position: { x: 0, y: 2 }, size: { w: 1, h: 1 } },
      { type: "pie", position: { x: 1, y: 2 }, size: { w: 1, h: 1 } },
    ],
  },
  {
    id: "sales",
    name: "Dashboard de Vendas",
    description: "Análise completa de vendas com gráficos e tabelas",
    category: "Vendas",
    thumbnail: "💰",
    widgets: [
      { type: "bar", position: { x: 0, y: 0 }, size: { w: 2, h: 1 } },
      { type: "line", position: { x: 0, y: 1 }, size: { w: 1, h: 1 } },
      { type: "pie", position: { x: 1, y: 1 }, size: { w: 1, h: 1 } },
      { type: "table", position: { x: 0, y: 2 }, size: { w: 2, h: 1 } },
    ],
  },
  {
    id: "analytics",
    name: "Dashboard Analytics",
    description: "Análise detalhada com múltiplas visualizações",
    category: "Análise",
    thumbnail: "📈",
    widgets: [
      { type: "dropdown", position: { x: 0, y: 0 }, size: { w: 1, h: 1 } },
      { type: "area", position: { x: 1, y: 0 }, size: { w: 1, h: 1 } },
      { type: "bar", position: { x: 0, y: 1 }, size: { w: 1, h: 1 } },
      { type: "line", position: { x: 1, y: 1 }, size: { w: 1, h: 1 } },
      { type: "composed", position: { x: 0, y: 2 }, size: { w: 2, h: 1 } },
    ],
  },
  {
    id: "simple",
    name: "Dashboard Simples",
    description: "Layout básico para começar rapidamente",
    category: "Básico",
    thumbnail: "📋",
    widgets: [
      { type: "bar", position: { x: 0, y: 0 }, size: { w: 1, h: 1 } },
      { type: "pie", position: { x: 1, y: 0 }, size: { w: 1, h: 1 } },
      { type: "table", position: { x: 0, y: 1 }, size: { w: 2, h: 1 } },
    ],
  },
  {
    id: "comparison",
    name: "Dashboard de Comparação",
    description: "Compare dados lado a lado com gráficos",
    category: "Análise",
    thumbnail: "⚖️",
    widgets: [
      { type: "search", position: { x: 0, y: 0 }, size: { w: 2, h: 1 } },
      { type: "bar", position: { x: 0, y: 1 }, size: { w: 1, h: 1 } },
      { type: "bar", position: { x: 1, y: 1 }, size: { w: 1, h: 1 } },
      { type: "line", position: { x: 0, y: 2 }, size: { w: 1, h: 1 } },
      { type: "line", position: { x: 1, y: 2 }, size: { w: 1, h: 1 } },
    ],
  },
  {
    id: "kpi_focused",
    name: "Dashboard KPI",
    description: "Foco em indicadores chave de performance",
    category: "Negócios",
    thumbnail: "🎯",
    widgets: [
      { type: "gauge", position: { x: 0, y: 0 }, size: { w: 1, h: 1 } },
      { type: "gauge", position: { x: 1, y: 0 }, size: { w: 1, h: 1 } },
      { type: "gauge", position: { x: 0, y: 1 }, size: { w: 1, h: 1 } },
      { type: "gauge", position: { x: 1, y: 1 }, size: { w: 1, h: 1 } },
      { type: "bar", position: { x: 0, y: 2 }, size: { w: 2, h: 1 } },
    ],
  },
];
