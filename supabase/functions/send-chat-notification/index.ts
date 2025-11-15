import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ChatNotificationRequest {
  userEmail: string;
  userName: string;
  conversationTitle: string;
  messagePreview: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userEmail, userName, conversationTitle, messagePreview }: ChatNotificationRequest = await req.json();

    console.log("Enviando notificação de chat para:", userEmail);

    const emailResponse = await resend.emails.send({
      from: "RedData Chat <reddata@redmaxx.com.br>",
      to: [userEmail],
      subject: `Nova resposta no chat: ${conversationTitle}`,
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
            .message-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 8px; }
            .message-title { font-weight: 600; color: #667eea; margin-bottom: 10px; font-size: 16px; }
            .message-preview { color: #555; line-height: 1.6; font-size: 15px; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 25px 0; transition: transform 0.2s; }
            .cta-button:hover { transform: translateY(-2px); }
            .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #888; font-size: 13px; border-top: 1px solid #e9ecef; }
            .footer a { color: #667eea; text-decoration: none; }
            .logo-text { color: white; font-size: 14px; margin-top: 10px; opacity: 0.9; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💬 RedData Chat</h1>
              <p class="logo-text">Inteligência de Dados com IA</p>
            </div>
            
            <div class="content">
              <p class="greeting">Olá, ${userName || 'Usuário'}!</p>
              
              <p style="color: #555; font-size: 15px; line-height: 1.6;">
                Você recebeu uma nova resposta no chat da <strong>RedData</strong>.
              </p>
              
              <div class="message-box">
                <div class="message-title">📋 ${conversationTitle}</div>
                <div class="message-preview">${messagePreview}</div>
              </div>
              
              <p style="color: #555; font-size: 15px; line-height: 1.6;">
                Acesse seu chat para visualizar a conversa completa e continuar interagindo.
              </p>
              
              <div style="text-align: center;">
                <a href="https://reddata.com.br/chat" class="cta-button">
                  Acessar Chat
                </a>
              </div>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 10px 0;">
                <strong>RedData</strong> - Plataforma de Analytics e BI com Inteligência Artificial
              </p>
              <p style="margin: 0 0 15px 0;">
                <a href="https://reddata.com.br">reddata.com.br</a>
              </p>
              <p style="margin: 0; color: #aaa; font-size: 12px;">
                Se você não solicitou este email, pode ignorá-lo com segurança.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email de notificação enviado:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Erro ao enviar notificação de chat:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
