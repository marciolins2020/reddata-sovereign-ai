import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Settings, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ZAxis,
  Brush,
} from "recharts";

interface ChartWidgetProps {
  id: string;
  config: {
    title: string;
    chartType: string;
    xAxis: string;
    yAxis: string;
    sheetName?: string;
  };
  data: any[];
  onDelete: (id: string) => void;
  readOnly?: boolean;
  themeColors?: string[];
}

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-xl">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-semibold text-foreground">
              {typeof entry.value === 'number' 
                ? entry.value.toLocaleString('pt-BR') 
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ChartWidget({ id, config, data, onDelete, readOnly, themeColors }: ChartWidgetProps) {
  const COLORS = themeColors || DEFAULT_COLORS;
  const [zoomEnabled, setZoomEnabled] = useState(true);
  const [brushStartIndex, setBrushStartIndex] = useState(0);
  const [brushEndIndex, setBrushEndIndex] = useState(data.length - 1);

  const handleResetZoom = () => {
    setBrushStartIndex(0);
    setBrushEndIndex(data.length - 1);
  };
  const renderChart = () => {
    if (!data || data.length === 0) {
      return (
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          Sem dados disponíveis
        </div>
      );
    }

    switch (config.chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey={config.xAxis} stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey={config.yAxis} fill={COLORS[0]} radius={[8, 8, 0, 0]} />
              {zoomEnabled && data.length > 5 && (
                <Brush 
                  dataKey={config.xAxis} 
                  height={30} 
                  stroke={COLORS[0]}
                  startIndex={brushStartIndex}
                  endIndex={brushEndIndex}
                  onChange={(e: any) => {
                    setBrushStartIndex(e.startIndex);
                    setBrushEndIndex(e.endIndex);
                  }}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey={config.xAxis} stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={config.yAxis} 
                stroke={COLORS[0]} 
                strokeWidth={3}
                dot={{ fill: COLORS[0], r: 4 }}
                activeDot={{ r: 6 }}
              />
              {zoomEnabled && data.length > 5 && (
                <Brush 
                  dataKey={config.xAxis} 
                  height={30} 
                  stroke={COLORS[0]}
                  startIndex={brushStartIndex}
                  endIndex={brushEndIndex}
                  onChange={(e: any) => {
                    setBrushStartIndex(e.startIndex);
                    setBrushEndIndex(e.endIndex);
                  }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey={config.yAxis}
                nameKey={config.xAxis}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="transition-all hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey={config.xAxis} stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey={config.yAxis} 
                stroke={COLORS[0]} 
                fill={COLORS[0]} 
                fillOpacity={0.6}
                strokeWidth={2}
              />
              {zoomEnabled && data.length > 5 && (
                <Brush 
                  dataKey={config.xAxis} 
                  height={30} 
                  stroke={COLORS[0]}
                  startIndex={brushStartIndex}
                  endIndex={brushEndIndex}
                  onChange={(e: any) => {
                    setBrushStartIndex(e.startIndex);
                    setBrushEndIndex(e.endIndex);
                  }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        );

      case "scatter":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey={config.xAxis} 
                name={config.xAxis} 
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                dataKey={config.yAxis} 
                name={config.yAxis}
                stroke="hsl(var(--muted-foreground))"
              />
              <ZAxis range={[60, 400]} />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name={config.title} data={data} fill={COLORS[0]} />
            </ScatterChart>
          </ResponsiveContainer>
        );

      case "radar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={data}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey={config.xAxis} stroke="hsl(var(--muted-foreground))" />
              <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
              <Radar 
                name={config.yAxis} 
                dataKey={config.yAxis} 
                stroke={COLORS[0]} 
                fill={COLORS[0]} 
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        );

      case "composed":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey={config.xAxis} stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey={config.yAxis} fill={COLORS[0]} radius={[8, 8, 0, 0]} />
              <Line 
                type="monotone" 
                dataKey={config.yAxis} 
                stroke={COLORS[1]}
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              {zoomEnabled && data.length > 5 && (
                <Brush 
                  dataKey={config.xAxis} 
                  height={30} 
                  stroke={COLORS[0]}
                  startIndex={brushStartIndex}
                  endIndex={brushEndIndex}
                  onChange={(e: any) => {
                    setBrushStartIndex(e.startIndex);
                    setBrushEndIndex(e.endIndex);
                  }}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        );

      default:
        return <div>Tipo de gráfico não suportado</div>;
    }
  };

  return (
    <Card className="p-4 relative z-0">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-foreground">{config.title}</h4>
        <div className="flex gap-2">
          {data.length > 5 && !['pie', 'radar', 'scatter'].includes(config.chartType) && (
            <>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setZoomEnabled(!zoomEnabled)}
                title={zoomEnabled ? "Desativar zoom" : "Ativar zoom"}
              >
                {zoomEnabled ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              </Button>
              {zoomEnabled && (brushStartIndex !== 0 || brushEndIndex !== data.length - 1) && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleResetZoom}
                  title="Resetar zoom"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}
            </>
          )}
          {!readOnly && (
            <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {renderChart()}
    </Card>
  );
}
