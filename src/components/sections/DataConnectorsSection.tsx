import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Database, Cloud, FileSpreadsheet, Wifi, Code } from "lucide-react";

export const DataConnectorsSection = () => {
  const { t } = useLanguage();

  const connectorCategories = [
    {
      icon: FileSpreadsheet,
      titleKey: "dataConnectors.files",
      examples: ["Excel", "CSV", "JSON", "XML", "PDF", "Google Sheets", "Parquet", "Avro", "Feather", "TXT/TSV"]
    },
    {
      icon: Wifi,
      titleKey: "dataConnectors.iot",
      examples: ["MQTT", "OPC-UA", "Modbus", "BACnet", "Zigbee", "LoRaWAN", "OPC-DA", "KNX", "CANbus"]
    },
    {
      icon: Code,
      titleKey: "dataConnectors.apis",
      examples: ["REST", "GraphQL", "SOAP", "Webhooks", "gRPC", "OData", "WebSockets", "JSON-RPC"]
    },
    {
      icon: Building2,
      titleKey: "dataConnectors.governmentAPIs",
      examples: ["Portal da Transparência", "SICONV", "e-CAC", "SIAFI", "Gov.br", "IBGE (SIDRA)", "Datasus (SUS APIs)", "Receita Federal (CNPJ/NF-e)", "ComprasNet/TCU"]
    },
    {
      icon: Database,
      titleKey: "dataConnectors.databases",
      examples: ["PostgreSQL", "MySQL", "Oracle", "SQL Server", "MongoDB", "MariaDB", "DB2", "Firebird", "Cassandra", "Redis", "Elasticsearch", "Snowflake", "BigQuery"]
    },
    {
      icon: Cloud,
      titleKey: "dataConnectors.erps",
      examples: ["SAP", "TOTVS", "Oracle ERP", "RM", "Senior", "Protheus", "Sankhya", "Benner", "Linx", "Bling", "NetSuite", "Oracle PeopleSoft", "Workday"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 text-lg px-6 py-2" variant="secondary">
            {t("dataConnectors.badge")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("dataConnectors.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("dataConnectors.subtitle")}
          </p>
          
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-primary/10 border-2 border-primary/20 mb-12">
            <div className="text-6xl font-bold text-primary">300+</div>
            <div className="text-left">
              <div className="text-xl font-semibold">{t("dataConnectors.sourcesTitle")}</div>
              <div className="text-muted-foreground">{t("dataConnectors.sourcesDesc")}</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connectorCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">
                        {t(category.titleKey)}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {category.examples.map((example, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground">
            {t("dataConnectors.footer")}
          </p>
        </div>
      </div>
    </section>
  );
};
