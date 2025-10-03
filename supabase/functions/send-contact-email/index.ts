import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  nome: string;
  email: string;
  telefone: string;
  municipio: string;
  cargo: string;
  interesse: string;
  mensagem: string;
}

// HTML sanitization function to prevent XSS attacks
const sanitizeHtml = (dirty: string): string => {
  if (!dirty) return '';
  return dirty
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

const sendEmail = async (to: string[], subject: string, html: string, from: string = "RedData Website <onboarding@resend.dev>") => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${response.status} - ${error}`);
  }

  return await response.json();
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    const formData: ContactFormData = await req.json();
    
    console.log("Received contact form submission:", {
      nome: formData.nome,
      email: formData.email,
      interesse: formData.interesse
    });

    // Validate required fields
    if (!formData.nome || !formData.email || !formData.interesse) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios não preenchidos" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate field lengths server-side
    if (formData.nome.length > 100 || formData.email.length > 255 || 
        (formData.telefone && formData.telefone.length > 20) ||
        (formData.mensagem && formData.mensagem.length > 2000)) {
      return new Response(
        JSON.stringify({ error: "Dados inválidos - campos muito longos" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize all user inputs before embedding in HTML
    const sanitizedData = {
      nome: sanitizeHtml(formData.nome),
      email: sanitizeHtml(formData.email),
      telefone: sanitizeHtml(formData.telefone || 'Não informado'),
      municipio: sanitizeHtml(formData.municipio || 'Não informado'),
      cargo: sanitizeHtml(formData.cargo || 'Não informado'),
      interesse: sanitizeHtml(formData.interesse),
      mensagem: formData.mensagem ? sanitizeHtml(formData.mensagem) : null,
    };

    // Send notification email to RedMaxx
    const notificationEmail = await sendEmail(
      ["marcio.lins@redmaxx.com.br"],
      `Novo interesse em RedData - ${sanitizedData.interesse}`,
      `
        <h2>Nova solicitação de demonstração do RedData</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Dados do Interessado:</h3>
          <p><strong>Nome:</strong> ${sanitizedData.nome}</p>
          <p><strong>E-mail:</strong> ${sanitizedData.email}</p>
          <p><strong>Telefone:</strong> ${sanitizedData.telefone}</p>
          <p><strong>Município/Órgão:</strong> ${sanitizedData.municipio}</p>
          <p><strong>Cargo:</strong> ${sanitizedData.cargo}</p>
          <p><strong>Interesse:</strong> ${sanitizedData.interesse}</p>
        </div>
        ${sanitizedData.mensagem ? `
          <div style="background: #fff; padding: 20px; border-left: 4px solid #0066cc; margin: 20px 0;">
            <h3>Mensagem:</h3>
            <p>${sanitizedData.mensagem}</p>
          </div>
        ` : ''}
        <p><em>Enviado através do formulário do site RedData</em></p>
      `
    );

    // Send confirmation email to the user
    const confirmationEmail = await sendEmail(
      [formData.email],
      "Obrigado pelo interesse no RedData!",
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0066cc;">Obrigado pelo interesse no RedData!</h2>
          
          <p>Olá ${sanitizedData.nome},</p>
          
          <p>Recebemos sua solicitação sobre <strong>${sanitizedData.interesse}</strong> e nossa equipe técnica entrará em contato nas próximas 24 horas para agendar uma demonstração personalizada.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #0066cc;">O que acontece agora?</h3>
            <ul>
              <li>Nossa equipe irá analisar suas necessidades específicas</li>
              <li>Entraremos em contato em até 24 horas</li>
              <li>Agendaremos uma demonstração personalizada do RedData</li>
              <li>Apresentaremos como o RedData pode transformar seus dados em estratégia</li>
            </ul>
          </div>
          
          <p>O RedData é a única solução 100% brasileira de Business Intelligence com IA Generativa que funciona completamente offline, garantindo total soberania digital para seu órgão.</p>
          
          <p>Atenciosamente,<br>
          <strong>Equipe RedMaxx</strong></p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #666;">
            Este e-mail foi enviado automaticamente. Se você não solicitou informações sobre o RedData, por favor ignore esta mensagem.
          </p>
        </div>
      `,
      "RedMaxx <onboarding@resend.dev>"
    );

    console.log("Emails sent successfully:", {
      notificationId: notificationEmail.id,
      confirmationId: confirmationEmail.id
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Formulário enviado com sucesso! Nossa equipe entrará em contato em breve."
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Erro interno do servidor",
        message: "Tente novamente ou entre em contato diretamente."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);