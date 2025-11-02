import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { scrollToContact } from "@/lib/scroll";

const Corporativo = () => {
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
    <div className="min-h-screen">
      <Header />
      
      <section id="corporativo" className="w-full bg-background py-20 mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* HERO */}
          <h1 className="text-4xl font-bold mb-4 text-primary">
            RedData Infinity™ – A Inteligência Privada das Empresas
          </h1>
          <p className="text-lg mb-8">
            A RedMaxx entrega às corporações o que nenhuma Big Tech oferece:<br />
            <strong>IA e Big Data privados, ilimitados e sob total controle.</strong>
          </p>
          <Button 
            onClick={() => window.location.href = "/#contato"}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            Solicitar demonstração corporativa
          </Button>
        </div>

        {/* DESAFIO DAS EMPRESAS */}
        <div className="max-w-5xl mx-auto mt-20 px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">O Desafio das Empresas</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Hoje, toda empresa precisa de IA. Mas a maioria entrega seus dados para provedores externos.<br />
            O <strong>RedData Infinity™</strong> nasce como uma alternativa soberana — a sua própria IA, dentro do seu ambiente, com privacidade total.
          </p>
        </div>

        {/* O QUE ENTREGA */}
        <div className="max-w-6xl mx-auto mt-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* MODELOS DE IMPLANTAÇÃO */}
        <div className="max-w-5xl mx-auto mt-20 px-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Modelos de Implantação</h2>
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
          <h2 className="text-2xl font-bold mb-4">O Poder do Núcleo RedData</h2>
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
          <h2 className="text-2xl font-bold mb-4">Privacidade e Soberania</h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Nenhum dado sai da sua rede. Nenhum token limita seu uso. Nenhuma Big Tech entre você e sua IA.<br />
            O <strong>RedData Infinity™</strong> é 100% fabricado pela RedMaxx, com suporte nacional e conformidade total à LGPD.
          </p>
        </div>

        {/* CHAMADA FINAL */}
        <div className="max-w-5xl mx-auto mt-20 text-center px-6">
          <h2 className="text-3xl font-bold mb-6">
            Pare de alugar inteligência.<br />Passe a ter a sua.
          </h2>
          <p className="text-lg mb-8 text-muted-foreground">O futuro da IA corporativa é soberano.</p>
          <Button 
            onClick={() => window.location.href = "/#contato"}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            Solicitar demonstração
          </Button>
        </div>
      </section>

      {/* OFERTA CORPORATIVA PREMIUM */}
      <section id="corporativo-offer" className="w-full bg-background py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-primary">
            RedData Infinity™ – Oferta Corporativa Premium
          </h2>
          <p className="text-lg mb-8">
            Três pacotes sob medida para empresas médias a grandes —  
            escolha o que melhor se adapta ao seu tamanho, maturidade e setor regulado.
          </p>
        </div>

        <div className="max-w-7xl mx-auto mt-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pacote 1 */}
          <Card className="p-6 text-center">
            <h4 className="text-2xl font-semibold mb-2">Pacote Média Empresa</h4>
            <p className="text-muted-foreground mb-4">
              Para empresas entre 100–500 funcionários com necessidade de IA + Big Data privada.
            </p>
            <ul className="text-left list-disc list-inside text-muted-foreground mb-4 space-y-1">
              <li>Implantação em até 8 semanas</li>
              <li>Licença anual fixa – sem cobrança por usuário ou token</li>
              <li>Suporte padrão + workshop de adoção 2 dias</li>
            </ul>
            <Button 
              onClick={() => window.location.href = "/#contato"}
              className="mt-4 w-full"
            >
              Selecionar este pacote
            </Button>
          </Card>

          {/* Pacote 2 */}
          <Card className="p-6 text-center">
            <h4 className="text-2xl font-semibold mb-2">Pacote Grande Empresa</h4>
            <p className="text-muted-foreground mb-4">
              Para corporações com múltiplas unidades, alto volume de dados e múltiplos casos de uso.
            </p>
            <ul className="text-left list-disc list-inside text-muted-foreground mb-4 space-y-1">
              <li>Implantação em até 12 semanas</li>
              <li>Licença anual fixa – ilimitado usuários e uso</li>
              <li>Suporte premium 24/7 + auditoria de governança IA</li>
            </ul>
            <Button 
              onClick={() => window.location.href = "/#contato"}
              className="mt-4 w-full"
            >
              Selecionar este pacote
            </Button>
          </Card>

          {/* Pacote 3 */}
          <Card className="p-6 text-center">
            <h4 className="text-2xl font-semibold mb-2">Pacote Regulados & Críticos</h4>
            <p className="text-muted-foreground mb-4">
              Para empresas de setores regulados (financeiro, saúde, energia) com exigências de privacidade e soberania máxima.
            </p>
            <ul className="text-left list-disc list-inside text-muted-foreground mb-4 space-y-1">
              <li>Modelo Appliance ou On-Premises com GPU dedicadas</li>
              <li>Auditoria anual + conformidade LGPD/GDPR + ISO 27001</li>
              <li>Upgrades incluídos + garantia de ROI ou devolução parcial</li>
            </ul>
            <Button 
              onClick={() => window.location.href = "/#contato"}
              className="mt-4 w-full"
            >
              Selecionar este pacote
            </Button>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto mt-16 px-6 text-center">
          <p className="text-base text-muted-foreground">
            Todos os pacotes incluem o motor técnico da plataforma RedData – IA Generativa + Big Data privada – com suporte direto da RedMaxx como fabricante.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-12 text-center px-6">
          <h3 className="text-3xl font-bold mb-6">Transforme seu negócio com inteligência própria.</h3>
          <p className="text-lg mb-8 text-muted-foreground">
            Solicite uma demonstração personalizada e veja como o RedData Infinity™ pode se tornar o ativo estratégico da sua empresa.
          </p>
          <Button 
            onClick={() => window.location.href = "/#contato"}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            Solicitar demonstração
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Corporativo;