import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ChartConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: any) => void;
  chartType: string;
  columns: string[];
}

export function ChartConfigModal({
  isOpen,
  onClose,
  onSave,
  chartType,
  columns,
}: ChartConfigModalProps) {
  const [title, setTitle] = useState("");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle(`Novo Gráfico ${chartType === "bar" ? "de Barras" : chartType === "line" ? "de Linhas" : chartType === "pie" ? "de Pizza" : ""}`);
      setXAxis("");
      setYAxis("");
    }
  }, [isOpen, chartType]);

  const handleSave = () => {
    if (!xAxis || !yAxis) {
      alert("Selecione as colunas para os eixos");
      return;
    }

    onSave({
      title,
      chartType,
      xAxis,
      yAxis,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar Gráfico</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título do Gráfico</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título"
            />
          </div>

          <div>
            <Label htmlFor="xAxis">Eixo X (Categoria)</Label>
            <Select value={xAxis} onValueChange={setXAxis}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma coluna" />
              </SelectTrigger>
              <SelectContent>
                {columns.map((col) => (
                  <SelectItem key={col} value={col}>
                    {col}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="yAxis">Eixo Y (Valor)</Label>
            <Select value={yAxis} onValueChange={setYAxis}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma coluna" />
              </SelectTrigger>
              <SelectContent>
                {columns.map((col) => (
                  <SelectItem key={col} value={col}>
                    {col}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Adicionar Gráfico
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
