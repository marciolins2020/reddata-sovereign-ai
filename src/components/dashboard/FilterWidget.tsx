import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useDashboardFilters } from "@/contexts/DashboardFiltersContext";

interface FilterWidgetProps {
  id: string;
  config: {
    title: string;
    filterType: string;
    column: string;
    sheetName: string;
  };
  data: any[];
  onDelete: (id: string) => void;
}

export function FilterWidget({ id, config, data, onDelete }: FilterWidgetProps) {
  const { setFilter } = useDashboardFilters();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  // Extract unique values from the data column
  const uniqueValues = data && data.length > 0 && config.column
    ? Array.from(new Set(data.map((row) => row[config.column]))).filter(Boolean)
    : [];

  useEffect(() => {
    if (config.filterType === "dropdown") {
      setFilter(id, selectedValue || null);
    } else if (config.filterType === "search") {
      setFilter(id, searchValue || null);
    }
  }, [selectedValue, searchValue, id, config.filterType]);

  const handleClearFilter = () => {
    setSelectedValue("");
    setSearchValue("");
    setFilter(id, null);
  };

  const renderFilterControl = () => {
    switch (config.filterType) {
      case "dropdown":
        return (
          <div className="space-y-2">
            <Select value={selectedValue} onValueChange={setSelectedValue}>
              <SelectTrigger>
                <SelectValue placeholder={`Filtrar por ${config.column}`} />
              </SelectTrigger>
              <SelectContent>
                {uniqueValues.map((value: any, index) => (
                  <SelectItem key={index} value={String(value)}>
                    {String(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedValue && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilter}
                className="w-full"
              >
                Limpar Filtro
              </Button>
            )}
          </div>
        );

      case "search":
        return (
          <div className="space-y-2">
            <Input
              placeholder={`Buscar em ${config.column}...`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilter}
                className="w-full"
              >
                Limpar Busca
              </Button>
            )}
          </div>
        );

      default:
        return <div>Tipo de filtro não suportado</div>;
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <h4 className="font-semibold text-foreground text-sm">{config.title}</h4>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {renderFilterControl()}
    </Card>
  );
}
