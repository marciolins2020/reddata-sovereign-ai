import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Função para limpar a resposta e remover traces do OpenRouter
function sanitizeLLMResponse(raw: any) {
  let output = "";

  try {
    if (typeof raw === "object" && raw !== null) {
      // Extrai conteúdo da resposta
      output =
        raw?.choices?.[0]?.message?.content ||
        raw?.choices?.[0]?.text ||
        raw?.content ||
        JSON.stringify(raw);
    } else {
      output = String(raw);
    }
  } catch {
    output = String(raw);
  }

  // Remove tags HTML indesejadas que o modelo pode gerar
  output = output.replace(/<\/?s>/g, ''); // Remove <s> e </s>
  output = output.replace(/<\/?[^>]+(>|$)/g, ''); // Remove outras tags HTML
  
  // Remove tokens de instrução do Mistral e outros modelos
  output = output.replace(/\[INST\]/g, '');
  output = output.replace(/\[\/INST\]/g, '');
  output = output.replace(/<<SYS>>/g, '');
  output = output.replace(/<\/SYS>>/g, '');
  output = output.replace(/\[\/SYS\]/g, '');
  
  output = output.trim();

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
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Pega a chave API do ambiente
  const apiKey = Deno.env.get('OPENROUTER_API_KEY');
  
  console.log("=== RedData Chat Debug ===");
  console.log("API Key exists:", !!apiKey);
  console.log("API Key length:", apiKey?.length || 0);
  console.log("API Key prefix:", apiKey?.substring(0, 10) || "N/A");

  if (!apiKey) {
    console.error("OPENROUTER_API_KEY não configurada!");
    return new Response(JSON.stringify({
      answer: "Configuração interna incompleta. A chave API não está configurada.",
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
        answer: "Nenhuma mensagem válida foi enviada.",
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

    console.log("Enviando request ao OpenRouter...");
    console.log("Número de mensagens:", messages.length);

    // Monta o payload para OpenRouter
    const payload = {
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
      temperature: 0.7,
    };

    console.log("Payload preparado:", JSON.stringify(payload).substring(0, 200));

    // Chama o OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://reddata.redmaxx.com.br",
        "X-Title": "RedData Chat",
      },
      body: JSON.stringify(payload),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", JSON.stringify(Object.fromEntries(response.headers.entries())));

    const data = await response.json();
    console.log("Response data:", JSON.stringify(data).substring(0, 500));

    if (!response.ok) {
      console.error("Erro do OpenRouter:", data);
      return new Response(JSON.stringify({
        answer: `Erro ao processar sua mensagem: ${data.error?.message || "Erro desconhecido"}`,
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

    // Sanitiza e retorna
    const sanitized = sanitizeLLMResponse(data);

    return new Response(JSON.stringify(sanitized), {
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
    console.error("Erro crítico:", error?.message || error);

    return new Response(JSON.stringify({
      answer: "Erro interno ao processar sua mensagem. Tente novamente.",
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
