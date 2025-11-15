import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Função para gerar token seguro
function generateSecureToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email || !email.trim()) {
      return new Response(
        JSON.stringify({ error: "Email é obrigatório" }),
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

    console.log("Buscando usuário pelo email:", email);

    // Verificar se usuário existe
    const { data: { users }, error: userError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (userError) {
      console.error("Erro ao buscar usuários:", userError);
      throw userError;
    }

    const user = users?.find(u => u.email?.toLowerCase() === email.toLowerCase());

    if (!user) {
      console.log("Usuário não encontrado, mas retornando sucesso por segurança");
      // Por segurança, sempre retornar sucesso mesmo se usuário não existir
      return new Response(
        JSON.stringify({ success: true, message: "Se o email existir, um link de redefinição será enviado" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Usuário encontrado:", user.id);

    // Gerar token seguro
    const token = generateSecureToken();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    // Salvar token no banco
    const { error: tokenError } = await supabaseAdmin
      .from("password_reset_tokens")
      .insert({
        user_id: user.id,
        token,
        expires_at: expiresAt.toISOString(),
      });

    if (tokenError) {
      console.error("Erro ao salvar token:", tokenError);
      throw tokenError;
    }

    console.log("Token gerado e salvo");

    // Buscar nome do usuário
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    const userName = profile?.full_name || email.split("@")[0];
    const resetUrl = `${req.headers.get("origin") || "https://reddata.com.br"}/reset-password?token=${token}`;

    // Enviar email
    console.log("Enviando email para:", email);
    
    const emailResponse = await resend.emails.send({
      from: "RedData <reddata@redmaxx.com.br>",
      to: [email],
      subject: "Redefinição de Senha - RedData",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 600; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 18px; color: #333; margin-bottom: 20px; }
            .message { color: #555; line-height: 1.6; font-size: 15px; margin: 20px 0; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 25px 0; transition: transform 0.2s; }
            .cta-button:hover { transform: translateY(-2px); }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; color: #856404; }
            .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #888; font-size: 13px; border-top: 1px solid #e9ecef; }
            .footer a { color: #667eea; text-decoration: none; }
            .logo-text { color: white; font-size: 14px; margin-top: 10px; opacity: 0.9; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 RedData</h1>
              <p class="logo-text">Redefinição de Senha</p>
            </div>
            
            <div class="content">
              <p class="greeting">Olá, ${userName}!</p>
              
              <p class="message">
                Recebemos uma solicitação para redefinir a senha da sua conta <strong>RedData</strong>.
              </p>
              
              <p class="message">
                Clique no botão abaixo para criar uma nova senha. Este link é válido por <strong>1 hora</strong>.
              </p>
              
              <div style="text-align: center;">
                <a href="${resetUrl}" class="cta-button">
                  Redefinir Minha Senha
                </a>
              </div>
              
              <div class="warning">
                <strong>⚠️ Importante:</strong> Se você não solicitou esta redefinição, ignore este email. Sua senha permanecerá inalterada.
              </div>
              
              <p class="message" style="font-size: 13px; color: #888;">
                Se o botão não funcionar, copie e cole este link no seu navegador:<br>
                <span style="color: #667eea; word-break: break-all;">${resetUrl}</span>
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 10px 0;">
                <strong>RedData</strong> - Plataforma de Analytics e BI com Inteligência Artificial
              </p>
              <p style="margin: 0 0 15px 0;">
                <a href="https://reddata.com.br">reddata.com.br</a>
              </p>
              <p style="margin: 0; color: #aaa; font-size: 12px;">
                Este email foi enviado automaticamente. Por favor, não responda.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email enviado:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Se o email existir, um link de redefinição será enviado" 
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
