import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Monitor, Image, Smartphone, Palette, Download, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DashboardSettings {
  layout: "screen" | "a4" | "custom";
  resizeMode: "none" | "auto" | "manual";
  orientation: "landscape" | "portrait";
  displayAs: "auto" | "desktop" | "mobile";
  theme: string;
  colorScheme: string[];
  font: string;
  backgroundColor: string;
}

interface DashboardSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: DashboardSettings) => void;
  currentSettings?: DashboardSettings;
}

const predefinedThemes = [
  {
    name: "Blue Light",
    colors: ["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd"],
    backgroundColor: "#ffffff",
  },
  {
    name: "Ocean",
    colors: ["#003f5c", "#2f4b7c", "#665191", "#a05195"],
    backgroundColor: "#f0f9ff",
  },
  {
    name: "Forest",
    colors: ["#1a4d2e", "#4f7942", "#80b918", "#c6d57e"],
    backgroundColor: "#f7fef8",
  },
  {
    name: "Sunset",
    colors: ["#ff6b35", "#f7931e", "#fdc82f", "#f2c057"],
    backgroundColor: "#fffdf7",
  },
  {
    name: "Corporate",
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"],
    backgroundColor: "#fafafa",
  },
  {
    name: "Dark",
    colors: ["#2c3e50", "#34495e", "#7f8c8d", "#95a5a6"],
    backgroundColor: "#1a1a1a",
  },
];

const fonts = [
  "Open Sans",
  "Roboto",
  "Lato",
  "Montserrat",
  "Inter",
  "Poppins",
];

export function DashboardSettingsModal({
  isOpen,
  onClose,
  onSave,
  currentSettings,
}: DashboardSettingsModalProps) {
  const [settings, setSettings] = useState<DashboardSettings>(
    currentSettings || {
      layout: "screen",
      resizeMode: "none",
      orientation: "landscape",
      displayAs: "auto",
      theme: "Blue Light",
      colorScheme: predefinedThemes[0].colors,
      font: "Open Sans",
      backgroundColor: "#ffffff",
    }
  );

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const handleThemeChange = (themeName: string) => {
    const theme = predefinedThemes.find((t) => t.name === themeName);
    if (theme) {
      setSettings({
        ...settings,
        theme: themeName,
        colorScheme: theme.colors,
        backgroundColor: theme.backgroundColor,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[85vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-xl">Configurações do Dashboard</DialogTitle>
          <DialogDescription className="sr-only">
            Configure as opções de tamanho, tema, cores e exportação do dashboard
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="size-theme" className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-muted/30 border-b px-6">
            <TabsList className="bg-transparent h-14 gap-1">
              <TabsTrigger
                value="size-theme"
                className="data-[state=active]:bg-background gap-2"
              >
                <Monitor className="h-4 w-4" />
                Size & Theme
              </TabsTrigger>
              <TabsTrigger
                value="background"
                className="data-[state=active]:bg-background gap-2"
              >
                <Image className="h-4 w-4" />
                Background
              </TabsTrigger>
              <TabsTrigger
                value="mobile"
                className="data-[state=active]:bg-background gap-2"
              >
                <Smartphone className="h-4 w-4" />
                Mobile Display
              </TabsTrigger>
              <TabsTrigger
                value="colors"
                className="data-[state=active]:bg-background gap-2"
              >
                <Palette className="h-4 w-4" />
                Color Scheme
              </TabsTrigger>
              <TabsTrigger
                value="export"
                className="data-[state=active]:bg-background gap-2"
              >
                <Download className="h-4 w-4" />
                Print & Export
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-[400px_1fr] h-full">
              {/* Left Panel - Settings */}
              <div className="border-r bg-muted/10 p-6">
                <TabsContent value="size-theme" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-base font-semibold mb-2">Size & Theme</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Set the size and orientation of the dashboard area
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm mb-2 block">Size/Layout</Label>
                      <Select
                        value={settings.layout}
                        onValueChange={(value: any) =>
                          setSettings({ ...settings, layout: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="screen">Screen</SelectItem>
                          <SelectItem value="a4">A4 Paper</SelectItem>
                          <SelectItem value="custom">Custom Size</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm mb-2 block">Resize mode</Label>
                      <Select
                        value={settings.resizeMode}
                        onValueChange={(value: any) =>
                          setSettings({ ...settings, resizeMode: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Do not resize widgets</SelectItem>
                          <SelectItem value="auto">Auto resize</SelectItem>
                          <SelectItem value="manual">Manual resize</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm mb-2 block">Orientation</Label>
                      <div className="flex gap-2">
                        <Button
                          variant={settings.orientation === "landscape" ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => setSettings({ ...settings, orientation: "landscape" })}
                        >
                          <Monitor className="h-4 w-4 mr-2" />
                          Landscape
                        </Button>
                        <Button
                          variant={settings.orientation === "portrait" ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => setSettings({ ...settings, orientation: "portrait" })}
                        >
                          <Smartphone className="h-4 w-4 mr-2" />
                          Portrait
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm mb-2 block">Display As</Label>
                      <Select
                        value={settings.displayAs}
                        onValueChange={(value: any) =>
                          setSettings({ ...settings, displayAs: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectItem value="desktop">Desktop</SelectItem>
                          <SelectItem value="mobile">Mobile</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm mb-2 block">Theme</Label>
                      <Select value={settings.theme} onValueChange={handleThemeChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {predefinedThemes.map((theme) => (
                            <SelectItem key={theme.name} value={theme.name}>
                              {theme.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm mb-2 block">Color Scheme</Label>
                      <div className="flex gap-1 p-3 border rounded-lg bg-background">
                        {settings.colorScheme.map((color, index) => (
                          <div
                            key={index}
                            className="flex-1 h-8 rounded"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm mb-2 block">Font</Label>
                      <Select
                        value={settings.font}
                        onValueChange={(value) => setSettings({ ...settings, font: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fonts.map((font) => (
                            <SelectItem key={font} value={font}>
                              {font}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="background" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-base font-semibold mb-2">Background</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Customize the dashboard background
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm mb-2 block">Background Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={settings.backgroundColor}
                          onChange={(e) =>
                            setSettings({ ...settings, backgroundColor: e.target.value })
                          }
                          className="h-10 w-20 rounded border cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.backgroundColor}
                          onChange={(e) =>
                            setSettings({ ...settings, backgroundColor: e.target.value })
                          }
                          className="flex-1 h-10 px-3 rounded border bg-background"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="mobile" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-base font-semibold mb-2">Mobile Display</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure how the dashboard appears on mobile devices
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm mb-2 block">Mobile Layout</Label>
                      <Select defaultValue="responsive">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="responsive">Responsive (Recommended)</SelectItem>
                          <SelectItem value="fixed">Fixed Width</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="colors" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-base font-semibold mb-2">Color Scheme</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose from predefined color schemes
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {predefinedThemes.map((theme) => (
                      <Card
                        key={theme.name}
                        className={cn(
                          "p-4 cursor-pointer transition-all hover:shadow-md",
                          settings.theme === theme.name && "border-2 border-primary"
                        )}
                        onClick={() => handleThemeChange(theme.name)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{theme.name}</span>
                          {settings.theme === theme.name && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="flex gap-1">
                          {theme.colors.map((color, index) => (
                            <div
                              key={index}
                              className="flex-1 h-6 rounded"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="export" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-base font-semibold mb-2">Print & Export</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure export and print settings
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm mb-2 block">Export Format</Label>
                      <Select defaultValue="pdf">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="png">PNG Image</SelectItem>
                          <SelectItem value="jpg">JPG Image</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm mb-2 block">Paper Size</Label>
                      <Select defaultValue="a4">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a4">A4</SelectItem>
                          <SelectItem value="letter">Letter</SelectItem>
                          <SelectItem value="legal">Legal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </div>

              {/* Right Panel - Preview */}
              <div className="bg-muted/5 p-6 flex items-center justify-center">
                <div
                  className={cn(
                    "bg-card border-2 rounded-lg shadow-xl transition-all",
                    settings.orientation === "landscape" ? "w-full max-w-4xl h-96" : "w-80 h-[500px]"
                  )}
                  style={{ backgroundColor: settings.backgroundColor }}
                >
                  <div className="h-full flex items-center justify-center p-8">
                    <div className="text-center space-y-4">
                      <Loader className="h-12 w-12 mx-auto text-muted-foreground/50" />
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-48 mx-auto" />
                        <div className="h-4 bg-muted rounded w-32 mx-auto" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        {settings.colorScheme.map((color, index) => (
                          <div
                            key={index}
                            className="h-20 rounded-lg shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tabs>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end gap-2 bg-muted/10">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Configurações</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
