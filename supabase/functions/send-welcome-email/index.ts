import { Resend } from 'https://esm.sh/resend@2.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WelcomeEmailRequest {
  email: string
  fullName: string
}

function getWelcomeEmailTemplate(fullName: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bem-vindo ao RedData - RedMaxx</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; background-color: #f6f9fc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f9fc; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <!-- Logo -->
                <tr>
                  <td align="center" style="padding: 40px 20px 20px;">
                    <img src="https://vjxssuywneheecuirxwb.supabase.co/storage/v1/object/public/og-images/reddata-logo-optimized.png" alt="RedData" width="180" style="display: block;">
                  </td>
                </tr>
                
                <!-- Heading -->
                <tr>
                  <td align="center" style="padding: 20px 20px;">
                    <h1 style="margin: 0; color: #1a1a1a; font-size: 32px; font-weight: bold;">Bem-vindo ao RedData!</h1>
                  </td>
                </tr>
                
                <!-- Greeting -->
                <tr>
                  <td style="padding: 0 40px;">
                    <p style="margin: 16px 0; color: #484848; font-size: 18px; line-height: 28px;">
                      Olá <strong>${fullName}</strong>,
                    </p>
                    
                    <p style="margin: 16px 0; color: #484848; font-size: 16px; line-height: 26px;">
                      É um prazer ter você conosco! O RedData é a plataforma de Business Intelligence da RedMaxx, 
                      projetada para transformar seus dados em insights valiosos para o seu negócio.
                    </p>
                  </td>
                </tr>
                
                <!-- Features -->
                <tr>
                  <td style="padding: 20px 40px;">
                    <h2 style="color: #1a1a1a; font-size: 20px; font-weight: bold; margin: 0 0 16px 0;">O que você pode fazer no RedData:</h2>
                    
                    <table cellpadding="0" cellspacing="0" style="width: 100%;">
                      <tr>
                        <td style="padding: 12px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width: 40px; vertical-align: top;">
                                <div style="width: 32px; height: 32px; background-color: #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                  <span style="color: #ffffff; font-size: 18px; font-weight: bold;">📊</span>
                                </div>
                              </td>
                              <td style="padding-left: 16px;">
                                <p style="margin: 0; color: #1a1a1a; font-weight: 600; font-size: 16px;">Dashboards Interativos</p>
                                <p style="margin: 4px 0 0; color: #484848; font-size: 14px; line-height: 20px;">
                                  Crie e personalize dashboards com visualizações em tempo real dos seus dados
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 12px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width: 40px; vertical-align: top;">
                                <div style="width: 32px; height: 32px; background-color: #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                  <span style="color: #ffffff; font-size: 18px; font-weight: bold;">💬</span>
                                </div>
                              </td>
                              <td style="padding-left: 16px;">
                                <p style="margin: 0; color: #1a1a1a; font-weight: 600; font-size: 16px;">Chat Inteligente com IA</p>
                                <p style="margin: 4px 0 0; color: #484848; font-size: 14px; line-height: 20px;">
                                  Converse com seus dados e obtenha insights através de perguntas em linguagem natural
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 12px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width: 40px; vertical-align: top;">
                                <div style="width: 32px; height: 32px; background-color: #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                  <span style="color: #ffffff; font-size: 18px; font-weight: bold;">🔍</span>
                                </div>
                              </td>
                              <td style="padding-left: 16px;">
                                <p style="margin: 0; color: #1a1a1a; font-weight: 600; font-size: 16px;">Auditoria Inteligente</p>
                                <p style="margin: 4px 0 0; color: #484848; font-size: 14px; line-height: 20px;">
                                  Análise automatizada de documentos e detecção de anomalias com inteligência artificial
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 12px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width: 40px; vertical-align: top;">
                                <div style="width: 32px; height: 32px; background-color: #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                  <span style="color: #ffffff; font-size: 18px; font-weight: bold;">📁</span>
                                </div>
                              </td>
                              <td style="padding-left: 16px;">
                                <p style="margin: 0; color: #1a1a1a; font-weight: 600; font-size: 16px;">Importação de Dados</p>
                                <p style="margin: 4px 0 0; color: #484848; font-size: 14px; line-height: 20px;">
                                  Faça upload de arquivos Excel, CSV e conecte múltiplas fontes de dados
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- CTA Button -->
                <tr>
                  <td align="center" style="padding: 32px 40px;">
                    <a href="${Deno.env.get('SITE_URL') || 'https://reddata.redmaxx.com.br'}/dashboard" 
                       style="background-color: #dc2626; color: #ffffff; text-decoration: none; padding: 16px 48px; border-radius: 8px; font-size: 16px; font-weight: 600; display: inline-block;">
                      Começar Agora
                    </a>
                  </td>
                </tr>
                
                <!-- Help Section -->
                <tr>
                  <td style="padding: 20px 40px; background-color: #f8f9fa;">
                    <p style="margin: 0 0 12px 0; color: #1a1a1a; font-weight: 600; font-size: 16px;">Precisa de Ajuda?</p>
                    <p style="margin: 0; color: #484848; font-size: 14px; line-height: 22px;">
                      Nossa equipe está disponível para ajudá-lo a tirar o máximo proveito da plataforma. 
                      Entre em contato conosco através do email 
                      <a href="mailto:suporte@redmaxx.com.br" style="color: #dc2626; text-decoration: none; font-weight: 600;">suporte@redmaxx.com.br</a>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 32px 20px 48px;">
                    <p style="margin: 0 0 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">
                      RedData - Inteligência em Dados
                    </p>
                    <p style="margin: 0; color: #8898aa; font-size: 12px; line-height: 16px;">
                      <a href="https://redmaxx.com.br" style="color: #8898aa; text-decoration: underline;">RedMaxx</a> · 
                      <a href="https://redmaxx.com.br" style="color: #8898aa; text-decoration: underline;">RedData</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, fullName }: WelcomeEmailRequest = await req.json()

    console.log('Sending welcome email to:', email)

    if (!email || !fullName) {
      return new Response(
        JSON.stringify({ error: 'Email and fullName are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const html = getWelcomeEmailTemplate(fullName)

    const { error } = await resend.emails.send({
      from: 'RedData <reddata@redmaxx.com.br>',
      to: [email],
      subject: 'Bem-vindo ao RedData - Transforme seus dados em insights',
      html,
    })

    if (error) {
      console.error('Error sending welcome email:', error)
      throw error
    }

    console.log('Welcome email sent successfully to:', email)

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in send-welcome-email function:', error)
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
