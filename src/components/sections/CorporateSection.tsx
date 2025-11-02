import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToContact } from "@/lib/scroll";

export const CorporateSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: "IA Generativa Privada",
      description: "Responde, gera e aprende com segurança, sem dependência externa."
    },
    {
      title: "Big Data Integrado",
      description: "Analisa qualquer fonte de dados da empresa em um único ambiente."
    },
    {
      title: "Uso Ilimitado",
      description: "Sem tokens, sem cobrança por usuário e sem limites."
    }
  ];

  const deploymentModels = [
    {
      model: "Infinity Cloud",
      environment: "Nuvem privada RedMaxx",
      suitable: "Médias empresas",
      license: "Anual"
    },
    {
      model: "Infinity On-Premises",
      environment: "Infraestrutura do cliente",
      suitable: "Grandes corporações",
      license: "Anual"
    },
    {
      model: "Infinity Appliance",
      environment: "Hardware RedData + GPU",
      suitable: "Ambientes críticos",
      license: "Anual"
    }
  ];

  return (
    <section id="corporativo" className="w-full bg-background py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* HERO */}
        <h2 className="text-4xl font-bold mb-4 text-primary">
          RedData Infinity™ – A Inteligência Privada das Empresas
        </h2>
        <p className="text-lg mb-8">
          A RedMaxx entrega às corporações o que nenhuma Big Tech oferece:<br />
          <strong>IA e Big Data privados, ilimitados e sob total controle.</strong>
        </p>
        <Button 
          onClick={scrollToContact}
          size="lg"
          className="bg-primary hover:bg-primary/90"
        >
          Solicitar demonstração corporativa
        </Button>
      </div>

      {/* DESAFIO DAS EMPRESAS */}
      <div className="max-w-5xl mx-auto mt-20 px-6 text-center">
        <h3 className="text-2xl font-bold mb-4">O Desafio das Empresas</h3>
        <p className="text-base leading-relaxed text-muted-foreground">
          Hoje, toda empresa precisa de IA. Mas a maioria entrega seus dados para provedores externos.<br />
          O <strong>RedData Infinity™</strong> nasce como uma alternativa soberana — a sua própria IA, dentro do seu ambiente, com privacidade total.
        </p>
      </div>

      {/* O QUE ENTREGA */}
      <div className="max-w-6xl mx-auto mt-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 text-center">
            <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
            <p className="text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>

      {/* MODELOS DE IMPLANTAÇÃO */}
      <div className="max-w-5xl mx-auto mt-20 px-6">
        <h3 className="text-2xl font-bold mb-4 text-center">Modelos de Implantação</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-left">
            <thead className="bg-muted">
              <tr>
                <th className="py-3 px-4">Modelo</th>
                <th className="py-3 px-4">Ambiente</th>
                <th className="py-3 px-4">Indicado para</th>
                <th className="py-3 px-4">Licença</th>
              </tr>
            </thead>
            <tbody>
              {deploymentModels.map((model, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3 px-4 font-semibold">{model.model}</td>
                  <td className="py-3 px-4">{model.environment}</td>
                  <td className="py-3 px-4">{model.suitable}</td>
                  <td className="py-3 px-4">{model.license}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NÚCLEO TÉCNICO REDDATA */}
      <div className="max-w-5xl mx-auto mt-20 px-6 text-center">
        <h3 className="text-2xl font-bold mb-4">O Poder do Núcleo RedData</h3>
        <p className="text-base text-muted-foreground leading-relaxed">
          O RedData Infinity™ herda todas as tecnologias que tornaram o RedData referência em Big Data e Inteligência Artificial: infraestrutura flexível, conectores universais, IA preditiva, dashboards interativos e automação com IA generativa.<br /><br />
          Tudo isso com segurança, conformidade e qualidade de dados garantidas pela arquitetura original da RedMaxx.
        </p>
        <Button 
          onClick={() => window.location.href = "/#solucao"}
          variant="secondary"
          className="mt-6"
        >
          Ver funcionalidades do RedData
        </Button>
      </div>

      {/* PRIVACIDADE E SOBERANIA */}
      <div className="max-w-4xl mx-auto mt-20 px-6 text-center">
        <h3 className="text-2xl font-bold mb-4">Privacidade e Soberania</h3>
        <p className="text-base text-muted-foreground leading-relaxed">
          Nenhum dado sai da sua rede. Nenhum token limita seu uso. Nenhuma Big Tech entre você e sua IA.<br />
          O <strong>RedData Infinity™</strong> é 100% fabricado pela RedMaxx, com suporte nacional e conformidade total à LGPD.
        </p>
      </div>

      {/* CHAMADA FINAL */}
      <div className="max-w-5xl mx-auto mt-20 text-center px-6">
        <h3 className="text-3xl font-bold mb-6">
          Pare de alugar inteligência.<br />Passe a ter a sua.
        </h3>
        <p className="text-lg mb-8 text-muted-foreground">O futuro da IA corporativa é soberano.</p>
        <Button 
          onClick={scrollToContact}
          size="lg"
          className="bg-primary hover:bg-primary/90"
        >
          Solicitar demonstração
        </Button>
      </div>
    </section>
  );
};