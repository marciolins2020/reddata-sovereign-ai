import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Gerar código de 6 dígitos
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone } = await req.json();

    if (!phone || !phone.trim()) {
      return new Response(
        JSON.stringify({ error: "Número de WhatsApp é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Criar cliente Supabase com service role
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    console.log("Buscando usuário pelo telefone:", phone);

    // Buscar usuário pelo telefone no profiles
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, phone")
      .eq("phone", phone)
      .single();

    if (profileError || !profile) {
      console.log("Usuário não encontrado, mas retornando sucesso por segurança");
      // Por segurança, sempre retornar sucesso mesmo se usuário não existir
      return new Response(
        JSON.stringify({ success: true, message: "Se o número existir, um código será enviado" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Usuário encontrado:", profile.id);

    // Gerar código de 6 dígitos
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

    // Salvar código no banco
    const { error: codeError } = await supabaseAdmin
      .from("password_reset_tokens")
      .insert({
        user_id: profile.id,
        token: code,
        expires_at: expiresAt.toISOString(),
      });

    if (codeError) {
      console.error("Erro ao salvar código:", codeError);
      throw codeError;
    }

    console.log("Código gerado e salvo:", code);

    // Enviar via Z-API
    const zapiInstance = Deno.env.get("ZAPI_INSTANCE");
    const zapiToken = Deno.env.get("ZAPI_TOKEN");

    if (!zapiInstance || !zapiToken) {
      console.error("ZAPI_INSTANCE ou ZAPI_TOKEN não configurados");
      throw new Error("Configuração Z-API incompleta");
    }

    const userName = profile.full_name || phone;
    const message = `🔐 *RedData - Código de Recuperação*\n\nOlá, ${userName}!\n\nSeu código de verificação é: *${code}*\n\nEste código é válido por 10 minutos.\n\nSe você não solicitou esta recuperação, ignore esta mensagem.`;

    console.log("Enviando WhatsApp para:", phone);

    const zapiResponse = await fetch(
      `https://api.z-api.io/instances/${zapiInstance}/token/${zapiToken}/send-text`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone,
          message: message,
        }),
      }
    );

    const zapiResult = await zapiResponse.json();
    console.log("Resposta Z-API:", zapiResult);

    if (!zapiResponse.ok) {
      console.error("Erro ao enviar WhatsApp:", zapiResult);
      throw new Error("Erro ao enviar mensagem WhatsApp");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Se o número existir, um código será enviado" 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Erro ao processar solicitação:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao processar solicitação" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
