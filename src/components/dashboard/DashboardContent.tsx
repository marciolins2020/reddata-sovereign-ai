import { useDashboardFilters } from "@/contexts/DashboardFiltersContext";
import { ChartWidget } from "./ChartWidget";
import { FilterWidget } from "./FilterWidget";

interface ChartConfig {
  id: string;
  title: string;
  chartType: string;
  xAxis?: string;
  yAxis?: string;
  column?: string;
  filterType?: string;
  sheetName: string;
}

interface SheetData {
  name: string;
  data: any[];
  columns: string[];
}

interface DashboardContentProps {
  charts: ChartConfig[];
  sheets: SheetData[];
  onDeleteChart: (id: string) => void;
  readOnly?: boolean;
}

export function DashboardContent({ charts, sheets, onDeleteChart, readOnly }: DashboardContentProps) {
  const { filters } = useDashboardFilters();

  const applyFilters = (data: any[], chart: ChartConfig) => {
    if (!data || data.length === 0) return data;

    let filteredData = [...data];

    // Apply all active filters
    Object.entries(filters).forEach(([filterId, filterValue]) => {
      if (!filterValue) return;

      const filterWidget = charts.find((c) => c.id === filterId);
      if (!filterWidget || !filterWidget.column) return;

      // Only apply filters from the same sheet
      if (filterWidget.sheetName !== chart.sheetName) return;

      const column = filterWidget.column;

      if (filterWidget.chartType === "dropdown") {
        filteredData = filteredData.filter(
          (row) => String(row[column]) === String(filterValue)
        );
      } else if (filterWidget.chartType === "search") {
        filteredData = filteredData.filter((row) =>
          String(row[column]).toLowerCase().includes(String(filterValue).toLowerCase())
        );
      }
    });

    return filteredData;
  };

  return (
    <>
      {charts.map((chart) => {
        const sheetData = sheets.find((s) => s.name === chart.sheetName);
        const rawData = sheetData?.data || [];

        // Check if it's a filter widget
        if (chart.chartType === "dropdown" || chart.chartType === "search") {
          return (
            <FilterWidget
              key={chart.id}
              id={chart.id}
              config={{
                title: chart.title,
                filterType: chart.chartType,
                column: chart.column || "",
                sheetName: chart.sheetName,
              }}
              data={rawData}
              onDelete={onDeleteChart}
              readOnly={readOnly}
            />
          );
        }

        // Apply filters to chart data
        const filteredData = applyFilters(rawData, chart);

        return (
          <ChartWidget
            key={chart.id}
            id={chart.id}
            config={{
              title: chart.title,
              chartType: chart.chartType,
              xAxis: chart.xAxis || "",
              yAxis: chart.yAxis || "",
              sheetName: chart.sheetName,
            }}
            data={filteredData}
            onDelete={onDeleteChart}
            readOnly={readOnly}
          />
        );
      })}
    </>
  );
}
