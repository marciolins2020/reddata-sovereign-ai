import { useDraggable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { BarChart3, LineChart, PieChart, TrendingUp, Activity } from "lucide-react";

const chartTypes = [
  { id: "bar", name: "Gráfico de Barras", icon: BarChart3, color: "text-blue-500" },
  { id: "line", name: "Gráfico de Linhas", icon: LineChart, color: "text-green-500" },
  { id: "pie", name: "Gráfico de Pizza", icon: PieChart, color: "text-purple-500" },
  { id: "area", name: "Gráfico de Área", icon: Activity, color: "text-orange-500" },
  { id: "composed", name: "Gráfico Composto", icon: TrendingUp, color: "text-pink-500" },
];

interface DraggableChartWidgetProps {
  type: typeof chartTypes[0];
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
      className="p-4 cursor-grab active:cursor-grabbing hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-3">
        <Icon className={`h-8 w-8 ${type.color}`} />
        <div>
          <h4 className="font-medium text-sm">{type.name}</h4>
          <p className="text-xs text-muted-foreground">Arraste para o canvas</p>
        </div>
      </div>
    </Card>
  );
}

export function ChartWidgetsSidebar() {
  return (
    <div className="w-64 bg-card border-r p-4 space-y-3 overflow-y-auto">
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-1">Widgets</h3>
        <p className="text-xs text-muted-foreground">
          Arraste os gráficos para o canvas
        </p>
      </div>
      {chartTypes.map((type) => (
        <DraggableChartWidget key={type.id} type={type} />
      ))}
    </div>
  );
}
