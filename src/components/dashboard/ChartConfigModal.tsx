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

interface SheetData {
  name: string;
  data: any[];
  columns: string[];
}

interface ChartConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: any) => void;
  chartType: string;
  sheets: SheetData[];
}

export function ChartConfigModal({
  isOpen,
  onClose,
  onSave,
  chartType,
  sheets,
}: ChartConfigModalProps) {
  const [title, setTitle] = useState("");
  const [selectedSheet, setSelectedSheet] = useState("");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle(`Novo Gráfico ${chartType === "bar" ? "de Barras" : chartType === "line" ? "de Linhas" : chartType === "pie" ? "de Pizza" : ""}`);
      setSelectedSheet(sheets.length > 0 ? sheets[0].name : "");
      setXAxis("");
      setYAxis("");
    }
  }, [isOpen, chartType, sheets]);

  const currentSheet = sheets.find(s => s.name === selectedSheet);
  const columns = currentSheet?.columns || [];

  const handleSave = () => {
    if (!selectedSheet || !xAxis || !yAxis) {
      alert("Selecione a aba e as colunas para os eixos");
      return;
    }

    onSave({
      title,
      chartType,
      sheetName: selectedSheet,
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

          {sheets.length > 1 && (
            <div>
              <Label htmlFor="sheet">Aba da Planilha</Label>
              <Select value={selectedSheet} onValueChange={setSelectedSheet}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma aba" />
                </SelectTrigger>
                <SelectContent>
                  {sheets.map((sheet) => (
                    <SelectItem key={sheet.name} value={sheet.name}>
                      {sheet.name} ({sheet.data.length} linhas)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

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
