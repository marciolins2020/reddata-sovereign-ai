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

interface FilterConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: any) => void;
  filterType: string;
  sheets: SheetData[];
}

export function FilterConfigModal({
  isOpen,
  onClose,
  onSave,
  filterType,
  sheets,
}: FilterConfigModalProps) {
  const [title, setTitle] = useState("");
  const [selectedSheet, setSelectedSheet] = useState("");
  const [column, setColumn] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle(`Novo Filtro ${filterType === "dropdown" ? "Dropdown" : "Busca"}`);
      setSelectedSheet(sheets.length > 0 ? sheets[0].name : "");
      setColumn("");
    }
  }, [isOpen, filterType, sheets]);

  const currentSheet = sheets.find(s => s.name === selectedSheet);
  const columns = currentSheet?.columns || [];

  const handleSave = () => {
    if (!selectedSheet || !column) {
      alert("Selecione a aba e a coluna para filtrar");
      return;
    }

    onSave({
      title,
      filterType,
      sheetName: selectedSheet,
      column,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar Filtro</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título do Filtro</Label>
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
            <Label htmlFor="column">Coluna para Filtrar</Label>
            <Select value={column} onValueChange={setColumn}>
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
            Adicionar Filtro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
