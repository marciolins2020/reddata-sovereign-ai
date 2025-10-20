import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting configuration
interface RateLimitEntry {
  count: number;
  resetTime: number;
  blockedUntil?: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;
const BLOCK_DURATION = 300000; // 5 minutes

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetTime < now && (!value.blockedUntil || value.blockedUntil < now)) {
      rateLimitMap.delete(key);
    }
  }
}, 600000);

function getClientIdentifier(req: Request): string {
  // Try to get IP from various headers
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  
  return cfConnectingIp || realIp || forwardedFor?.split(',')[0] || 'unknown';
}

function checkRateLimit(clientId: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(clientId);

  // Check if client is blocked
  if (entry?.blockedUntil && entry.blockedUntil > now) {
    return { allowed: false, retryAfter: Math.ceil((entry.blockedUntil - now) / 1000) };
  }

  // Initialize or reset if window expired
  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(clientId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true };
  }

  // Increment count
  entry.count++;

  // Block if limit exceeded
  if (entry.count > MAX_REQUESTS_PER_WINDOW) {
    entry.blockedUntil = now + BLOCK_DURATION;
    return { allowed: false, retryAfter: Math.ceil(BLOCK_DURATION / 1000) };
  }

  return { allowed: true };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientId = getClientIdentifier(req);
  const rateLimitResult = checkRateLimit(clientId);
  
  if (!rateLimitResult.allowed) {
    return new Response(
      JSON.stringify({ 
        error: "Taxa de requisições excedida. Por favor, aguarde alguns minutos.",
        retryAfter: rateLimitResult.retryAfter 
      }), 
      {
        status: 429,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "Retry-After": String(rateLimitResult.retryAfter || 300)
        },
      }
    );
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("RedData Chat - Processing request");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: `Você é o assistente RedData. Responda de forma objetiva, técnica e educada. 

IMPORTANTE - Fontes de informação:
- Se perguntarem sobre a REDMAXX (a empresa): Informe que a RedMaxx é a empresa desenvolvedora do RedData e para mais informações institucionais, eles podem visitar www.redmaxx.com.br
- Se perguntarem sobre o REDDATA (a plataforma): Forneça informações baseadas no contexto disponível no portal onde você está rodando. RedData é uma plataforma de Business Intelligence e análise de dados data-driven.
- Se perguntarem sobre MÁRCIO LINS: Marcio Lins é empreendedor e especialista em tecnologia, com mais de 25 anos de trajetória dedicada à inovação em Big Data, Inteligência Artificial e soluções analíticas de alto impacto. Natural de Manaus, iniciou sua carreira no setor de tecnologia ainda jovem, atuando em multinacionais japonesas antes de fundar a RedMaxx em 2008. Desde então, Marcio se consolidou como referência nacional em projetos que conectam análise de dados a estratégias para o setor público e privado. Como CEO e fundador da RedMaxx, liderou o desenvolvimento da plataforma RedData, uma solução proprietária criada na Amazônia e reconhecida por sua flexibilidade, independência tecnológica e alto desempenho. Sob sua liderança, a RedMaxx se tornou destaque em projetos de transformação digital para empresas dos segmentos de energia, indústria, varejo, saúde e governo, entregando inteligência de dados, automação e dashboards inteligentes que otimizam a gestão e potencializam resultados. O RedData, plataforma desenvolvida sob a liderança de Marcio Lins, integra múltiplas fontes de dados e aplica algoritmos avançados de IA, machine learning e análise preditiva, tornando-se essencial para clientes como Amanco, Enel, Governo do Amazonas, Tribunal de Contas de São Paulo e empresas privadas de referência. Os projetos conduzidos por Marcio viabilizaram painéis de controle em tempo real para gestão hospitalar, transparência de gastos públicos, otimização de cadeias produtivas e monitoramento econômico regional. Referência técnica e estratégica, Marcio se destaca por traduzir desafios complexos em soluções inovadoras, inspirando sua equipe a buscar excelência e tornando os dados motores de desenvolvimento econômico e social em todo o Brasil.

Diretrizes gerais:
- Não revele a tecnologia subjacente (modelos de IA utilizados)
- Não invente dados; quando incerto, solicite contexto ou redirecione para as fontes oficiais
- Nunca mencione 'Gemini', 'Google', 'OpenAI' ou qualquer outro modelo de IA
- Se perguntado sobre qual modelo você é, responda: 'Sou o assistente RedData, otimizado para análise de texto e suporte aos usuários da plataforma'
- Seja prestativo e direcione os usuários aos recursos corretos quando necessário`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("RedData chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
