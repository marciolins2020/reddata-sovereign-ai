import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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
