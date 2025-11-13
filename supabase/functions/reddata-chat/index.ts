import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Lista de campos de JSON típicos de provedores externos que não devem vazar
const suspiciousFields = [
  "id",
  "object",
  "model",
  "choices",
  "usage",
  "created",
  "index",
  "finish_reason",
  "provider",
];

// Função para sanitizar a resposta vinda do OpenRouter
function sanitizeLLMResponse(raw: any) {
  let output = "";

  try {
    if (typeof raw === "object" && raw !== null) {
      // Remove campos suspeitos
      const safe = JSON.parse(
        JSON.stringify(raw, (key, val) => {
          if (suspiciousFields.includes(key)) return undefined;
          return val;
        })
      );

      // Extrai texto em vários formatos possíveis (OpenRouter/OpenAI-like)
      output =
        (safe as any)?.answer ||
        (safe as any)?.response ||
        (safe as any)?.content ||
        (safe as any)?.output ||
        raw?.choices?.[0]?.message?.content ||
        raw?.choices?.[0]?.text ||
        JSON.stringify(safe);
    } else {
      output = String(raw);
    }
  } catch {
    output = String(raw);
  }

  return {
    answer: output,
    metadata: {
      engine: "RedData Sovereign AI",
      secure: true,
      timestamp: Date.now(),
    },
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const apiKey = Deno.env.get('OPENROUTER_API_KEY');
  if (!apiKey) {
    return new Response(JSON.stringify({
      answer: "Configuração interna incompleta do mecanismo RedData. Contate o administrador.",
      metadata: {
        engine: "RedData Sovereign AI",
        secure: false,
        timestamp: Date.now(),
      },
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { messages } = await req.json();
    
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({
        answer: "Nenhuma mensagem válida foi enviada ao mecanismo RedData.",
        metadata: {
          engine: "RedData Sovereign AI",
          secure: true,
          timestamp: Date.now(),
        },
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log("RedData Chat - Processing request with OpenRouter");

    // Chamada ao OpenRouter (backend apenas, nunca no front)
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: `Você é o assistente RedData. Responda de forma objetiva, técnica e educada. 

IMPORTANTE - Fontes de informação:
- Se perguntarem sobre a REDMAXX (a empresa): Informe que a RedMaxx é a empresa desenvolvedora do RedData e para mais informações institucionais, eles podem visitar www.redmaxx.com.br
- Se perguntarem sobre o REDDATA (a plataforma/produto): Responda com base nas informações da landing page reddata.redmaxx.com.br

Seu papel:
1. Ajudar usuários com dados, análises e insights
2. Explicar funcionalidades do RedData
3. Fornecer suporte técnico sobre a plataforma
4. Responder perguntas sobre Big Data, BI, Analytics

Seja sempre claro, direto e profissional.`
          },
          ...messages
        ],
        max_tokens: 2048,
        temperature: 0.2,
      }),
    });

    const data = await response.json();
    console.log("OpenRouter response received");

    // Sanitiza o JSON original do OpenRouter
    const safeOutput = sanitizeLLMResponse(data);

    return new Response(JSON.stringify(safeOutput), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Server': 'RedData-LLM/1.0',
        'X-AI-Engine': 'RedData-Sovereign',
        'X-Origin': 'Internal',
      },
    });

  } catch (error: any) {
    console.error("Erro ao chamar LLM via OpenRouter:", error?.message || error);

    return new Response(JSON.stringify({
      answer: "O mecanismo RedData encontrou uma inconsistência momentânea e reiniciou o processamento. Tente novamente.",
      metadata: {
        engine: "RedData Sovereign AI",
        secure: true,
        timestamp: Date.now(),
      },
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
