import { useDraggable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Activity,
  Table,
  Gauge,
  Filter,
  Search,
  ScatterChart as ScatterIcon,
  Radar as RadarIcon,
  GitCompareArrows,
} from "lucide-react";

const chartCategories = [
  {
    name: "Gráficos",
    items: [
      { id: "bar", name: "Gráfico de Barras", icon: BarChart3, color: "text-blue-500" },
      { id: "line", name: "Gráfico de Linhas", icon: LineChart, color: "text-green-500" },
      { id: "pie", name: "Gráfico de Pizza", icon: PieChart, color: "text-purple-500" },
      { id: "area", name: "Gráfico de Área", icon: Activity, color: "text-orange-500" },
      { id: "scatter", name: "Gráfico de Dispersão", icon: ScatterIcon, color: "text-indigo-500" },
      { id: "radar", name: "Gráfico Radar", icon: RadarIcon, color: "text-rose-500" },
      { id: "composed", name: "Gráfico Composto", icon: GitCompareArrows, color: "text-pink-500" },
    ],
  },
  {
    name: "Filtros",
    items: [
      { id: "dropdown", name: "Filtro Dropdown", icon: Filter, color: "text-amber-500" },
      { id: "search", name: "Filtro Busca", icon: Search, color: "text-emerald-500" },
    ],
  },
  {
    name: "Tabelas & KPIs",
    items: [
      { id: "table", name: "Tabela", icon: Table, color: "text-slate-500" },
      { id: "gauge", name: "Medidor", icon: Gauge, color: "text-cyan-500" },
    ],
  },
];

interface DraggableChartWidgetProps {
  type: { id: string; name: string; icon: any; color: string };
}

function DraggableChartWidget({ type }: DraggableChartWidgetProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `chart-widget-${type.id}`,
    data: { type: type.id },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  const Icon = type.icon;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow hover:border-primary/50"
    >
      <div className="flex items-center gap-2">
        <Icon className={`h-6 w-6 ${type.color}`} />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-xs truncate">{type.name}</h4>
        </div>
      </div>
    </Card>
  );
}

export function ChartWidgetsSidebar() {
  return (
    <div className="w-64 bg-card border-r overflow-y-auto z-10">
      <div className="p-4 border-b sticky top-[172px] bg-card z-20">
        <h3 className="font-bold text-base mb-1">Widgets</h3>
        <p className="text-xs text-muted-foreground">
          Arraste os widgets para o canvas
        </p>
      </div>

      <div className="p-3 space-y-4">
        {chartCategories.map((category) => (
          <div key={category.name}>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2 px-1">
              {category.name}
            </h4>
            <div className="space-y-2">
              {category.items.map((type) => (
                <DraggableChartWidget key={type.id} type={type} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
